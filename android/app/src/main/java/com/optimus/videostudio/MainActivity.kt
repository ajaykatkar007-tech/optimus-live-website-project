package com.optimus.videostudio

import android.net.Uri
import android.os.Bundle
import android.os.Environment
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.ContentCut
import androidx.compose.material.icons.filled.FileDownload
import androidx.compose.material.icons.filled.Movie
import androidx.compose.material.icons.filled.Tune
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Divider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.compose.runtime.DisposableEffect
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView
import androidx.media3.common.MediaItem
import androidx.media3.transformer.Composition
import androidx.media3.transformer.EditedMediaItem
import androidx.media3.transformer.Effects
import androidx.media3.transformer.ExportException
import androidx.media3.transformer.ExportResult
import androidx.media3.effect.Presentation
import androidx.media3.transformer.Transformer
import java.io.File
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

private val Ink = Color(0xFF0B1020)
private val Panel = Color(0xFF151D32)
private val Violet = Color(0xFF8B5CF6)
private val Mint = Color(0xFF4DE1C1)
private val Muted = Color(0xFF9CA8C2)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme(colorScheme = darkColorScheme(
                primary = Violet,
                secondary = Mint,
                background = Ink,
                surface = Panel,
                onBackground = Color.White,
                onSurface = Color.White
            )) {
                OptimusEditor()
            }
        }
    }
}

@Composable
private fun OptimusEditor() {
    val context = androidx.compose.ui.platform.LocalContext.current
    var selectedVideo by remember { mutableStateOf<Uri?>(null) }
    var videoName by remember { mutableStateOf("No clip selected") }
    var status by remember { mutableStateOf("Choose a video to start editing.") }
    var exporting by remember { mutableStateOf(false) }
    var exportedPath by remember { mutableStateOf<String?>(null) }
    var trimStartSeconds by remember { mutableStateOf("0") }
    var trimEndSeconds by remember { mutableStateOf("") }

    val videoPicker = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.OpenDocument()
    ) { uri ->
        if (uri != null) {
            selectedVideo = uri
            videoName = uri.lastPathSegment?.substringAfterLast('/') ?: "Selected video"
            status = "Clip ready. 1080p export is available."
            exportedPath = null
        }
    }

    fun export1080p() {
        val source = selectedVideo ?: return
        val outputDir = context.getExternalFilesDir(Environment.DIRECTORY_MOVIES)
        if (outputDir == null) {
            status = "Unable to access the app's Movies folder."
            return
        }
        if (!outputDir.exists()) outputDir.mkdirs()
        val stamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.US).format(Date())
        val outputFile = File(outputDir, "Optimus_$stamp.mp4")
        exporting = true
        status = "Exporting MP4 at 1080p…"
        val startMs = (trimStartSeconds.toLongOrNull() ?: 0L).coerceAtLeast(0L) * 1000L
        val endSeconds = trimEndSeconds.toLongOrNull()?.coerceAtLeast(0L)
        val endMs = endSeconds?.times(1000L)
        if (endMs != null && endMs <= startMs) {
            exporting = false
            status = "Trim end must be greater than trim start."
            outputFile.delete()
            return
        }
        val clippingBuilder = MediaItem.ClippingConfiguration.Builder()
            .setStartPositionMs(startMs)
        if (endMs != null) clippingBuilder.setEndPositionMs(endMs)
        val clippedMedia = MediaItem.Builder()
            .setUri(source)
            .setClippingConfiguration(clippingBuilder.build())
            .build()
        val editedItem = EditedMediaItem.Builder(clippedMedia)
            .setEffects(Effects(emptyList(), listOf(Presentation.createForHeight(1080))))
            .build()
        val transformer = Transformer.Builder(context)
            .addListener(object : Transformer.Listener {
                override fun onCompleted(composition: Composition, exportResult: ExportResult) {
                    exporting = false
                    exportedPath = outputFile.absolutePath
                    status = "Export complete! Your MP4 is saved in the app Movies folder."
                }

                override fun onError(
                    composition: Composition,
                    exportResult: ExportResult,
                    exportException: ExportException
                ) {
                    exporting = false
                    status = "Export failed: ${exportException.message ?: "unsupported video format"}"
                    if (outputFile.exists()) outputFile.delete()
                }
            })
            .build()
        try {
            transformer.start(editedItem, outputFile.absolutePath)
        } catch (error: Exception) {
            exporting = false
            status = "Could not start export: ${error.message ?: "unknown error"}"
            if (outputFile.exists()) outputFile.delete()
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Brush.verticalGradient(listOf(Color(0xFF17152F), Ink, Color(0xFF080B14))))
            .padding(horizontal = 18.dp, vertical = 16.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
            Box(
                modifier = Modifier.size(46.dp).background(
                    Brush.linearGradient(listOf(Violet, Color(0xFF4F46E5))),
                    RoundedCornerShape(15.dp)
                ),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Default.Movie, contentDescription = null, tint = Color.White, modifier = Modifier.size(27.dp))
            }
            Spacer(Modifier.width(12.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text("OPTIMUS", color = Color.White, fontSize = 12.sp, letterSpacing = 3.sp, fontWeight = FontWeight.Bold)
                Text("Video Studio", color = Color.White, fontSize = 23.sp, fontWeight = FontWeight.ExtraBold)
            }
            Surface(color = Color(0xFF153D3A), shape = RoundedCornerShape(50)) {
                Text("1080p", color = Mint, fontSize = 12.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(horizontal = 12.dp, vertical = 7.dp))
            }
        }

        Spacer(Modifier.height(22.dp))
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.weight(1f)) {
                Text("YOUR CREATIVE SPACE", color = Mint, fontSize = 10.sp, letterSpacing = 2.sp, fontWeight = FontWeight.Bold)
                Text("Make something great.", color = Color.White, fontSize = 21.sp, fontWeight = FontWeight.Bold)
            }
            Button(
                onClick = { videoPicker.launch(arrayOf("video/*")) },
                colors = ButtonDefaults.buttonColors(containerColor = Violet),
                shape = RoundedCornerShape(13.dp)
            ) {
                Icon(Icons.Default.Add, contentDescription = null)
                Spacer(Modifier.width(5.dp))
                Text("Add clip")
            }
        }

        Spacer(Modifier.height(18.dp))
        Card(
            modifier = Modifier.fillMaxWidth().height(205.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF101629)),
            shape = RoundedCornerShape(22.dp)
        ) {
            val previewUri = selectedVideo
            if (previewUri != null) {
                VideoPreview(previewUri)
            } else {
                Box(Modifier.fillMaxSize().background(
                    Brush.radialGradient(listOf(Color(0xFF30265C), Color(0xFF101629)))
                ), contentAlignment = Alignment.Center) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Box(
                            modifier = Modifier.size(62.dp).background(Color(0xFF28234B), RoundedCornerShape(20.dp)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(Icons.Default.Movie, contentDescription = null, tint = Mint, modifier = Modifier.size(31.dp))
                        }
                        Spacer(Modifier.height(12.dp))
                        Text("Your preview appears here", color = Color.White, fontWeight = FontWeight.SemiBold)
                        Spacer(Modifier.height(4.dp))
                        Text("Import a video to begin", color = Muted, fontSize = 12.sp)
                    }
                }
            }
        }

        Spacer(Modifier.height(17.dp))
        Text("QUICK TOOLS", color = Muted, fontSize = 10.sp, letterSpacing = 2.sp, fontWeight = FontWeight.Bold)
        Spacer(Modifier.height(9.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(9.dp), modifier = Modifier.fillMaxWidth()) {
            ToolTile("Trim / split", Icons.Default.ContentCut, Modifier.weight(1f), "Clip tools are next in the build roadmap.")
            ToolTile("Filters", Icons.Default.Tune, Modifier.weight(1f), "Filter controls are planned for the next milestone.")
            ToolTile("AI tools", Icons.Default.AutoAwesome, Modifier.weight(1f), "AI captions and smart editing are planned.")
        }

        Spacer(Modifier.height(18.dp))
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
            Text("TIMELINE", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 14.sp)
            Spacer(Modifier.weight(1f))
            Text("MULTI-TRACK • MVP", color = Muted, fontSize = 9.sp, letterSpacing = 1.sp)
        }
        Spacer(Modifier.height(10.dp))
        Card(colors = CardDefaults.cardColors(containerColor = Panel), shape = RoundedCornerShape(17.dp), modifier = Modifier.fillMaxWidth()) {
            Column(Modifier.padding(12.dp)) {
                TimelineTrack("VIDEO", if (selectedVideo != null) videoName else "Add a video clip", Color(0xFF7665E8))
                Spacer(Modifier.height(8.dp))
                TimelineTrack("AUDIO", "Audio track", Color(0xFF168D83))
                Spacer(Modifier.height(8.dp))
                TimelineTrack("TEXT", "Titles & captions", Color(0xFFB96AAB))
            }
        }

        Spacer(Modifier.height(12.dp))
        Text("TRIM RANGE • SECONDS", color = Muted, fontSize = 10.sp, letterSpacing = 1.5.sp, fontWeight = FontWeight.Bold)
        Spacer(Modifier.height(6.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp), modifier = Modifier.fillMaxWidth()) {
            OutlinedTextField(
                value = trimStartSeconds,
                onValueChange = { value -> trimStartSeconds = value.filter(Char::isDigit).take(6) },
                label = { Text("Start (sec)") },
                singleLine = true,
                modifier = Modifier.weight(1f)
            )
            OutlinedTextField(
                value = trimEndSeconds,
                onValueChange = { value -> trimEndSeconds = value.filter(Char::isDigit).take(6) },
                label = { Text("End (sec)") },
                placeholder = { Text("Full clip") },
                singleLine = true,
                modifier = Modifier.weight(1f)
            )
        }
        Text("Leave End blank to export through the end of the clip.", color = Muted, fontSize = 10.sp)
        Spacer(Modifier.height(12.dp))
        Card(colors = CardDefaults.cardColors(containerColor = Color(0xFF111A2D)), shape = RoundedCornerShape(15.dp), modifier = Modifier.fillMaxWidth()) {
            Row(Modifier.padding(13.dp), verticalAlignment = Alignment.CenterVertically) {
                if (exporting) {
                    CircularProgressIndicator(modifier = Modifier.size(22.dp), color = Mint, strokeWidth = 2.dp)
                    Spacer(Modifier.width(10.dp))
                } else {
                    Icon(Icons.Default.FileDownload, contentDescription = null, tint = Mint)
                    Spacer(Modifier.width(10.dp))
                }
                Column {
                    Text(if (exporting) "Rendering video" else "Export project", color = Color.White, fontWeight = FontWeight.Bold)
                    Text(status, color = Muted, fontSize = 11.sp, lineHeight = 15.sp)
                }
            }
        }
        Spacer(Modifier.height(12.dp))
        Button(
            onClick = { export1080p() },
            enabled = selectedVideo != null && !exporting,
            modifier = Modifier.fillMaxWidth().height(52.dp),
            shape = RoundedCornerShape(16.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Violet, disabledContainerColor = Color(0xFF33364A))
        ) {
            Icon(Icons.Default.FileDownload, contentDescription = null)
            Spacer(Modifier.width(8.dp))
            Text(if (exporting) "Exporting…" else "Export 1080p MP4", fontWeight = FontWeight.Bold)
        }
        exportedPath?.let { path ->
            Spacer(Modifier.height(6.dp))
            Text("Saved to: $path", color = Mint, fontSize = 10.sp, lineHeight = 13.sp)
        }
        Spacer(Modifier.height(8.dp))
        Text("Early build • Native Android • AI and advanced editing features are being added in stages.", color = Muted, fontSize = 10.sp, lineHeight = 14.sp)
    }
}

@Composable
private fun ToolTile(title: String, icon: androidx.compose.ui.graphics.vector.ImageVector, modifier: Modifier, hint: String) {
    Card(modifier = modifier, colors = CardDefaults.cardColors(containerColor = Panel), shape = RoundedCornerShape(15.dp)) {
        Column(Modifier.padding(10.dp)) {
            Icon(icon, contentDescription = null, tint = Mint, modifier = Modifier.size(22.dp))
            Spacer(Modifier.height(8.dp))
            Text(title, color = Color.White, fontSize = 11.sp, fontWeight = FontWeight.Bold)
            Spacer(Modifier.height(3.dp))
            Text("Planned", color = Muted, fontSize = 9.sp)
        }
    }
}

@Composable
private fun TimelineTrack(label: String, value: String, color: Color) {
    Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
        Text(label, color = Muted, fontSize = 9.sp, fontWeight = FontWeight.Bold, modifier = Modifier.width(48.dp))
        Box(
            modifier = Modifier
                .weight(1f)
                .height(30.dp)
                .background(color.copy(alpha = 0.20f), RoundedCornerShape(7.dp))
                .padding(horizontal = 9.dp),
            contentAlignment = Alignment.CenterStart
        ) {
            Text(value, color = Color.White, fontSize = 10.sp, maxLines = 1)
        }
    }
}

@Composable
private fun VideoPreview(uri: Uri) {
    val context = androidx.compose.ui.platform.LocalContext.current
    val player = remember(uri) {
        ExoPlayer.Builder(context).build().apply {
            setMediaItem(MediaItem.fromUri(uri))
            prepare()
            playWhenReady = false
        }
    }
    DisposableEffect(player) {
        onDispose { player.release() }
    }
    AndroidView(
        modifier = Modifier.fillMaxSize(),
        factory = { viewContext ->
            PlayerView(viewContext).apply {
                this.player = player
                useController = true
                setShowBuffering(PlayerView.SHOW_BUFFERING_WHEN_PLAYING)
            }
        },
        update = { it.player = player }
    )
}

