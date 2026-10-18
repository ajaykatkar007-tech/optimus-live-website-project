export type DemoStatus = string;

export type DemoClient = {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  specialty: string;
  status: 'Prospect' | 'Onboarding' | 'Active' | 'Inactive' | 'Suspended';
  services: string[];
  openRequests: number;
  lastActivity: string;
};

export type DemoWorkItem = {
  id: string;
  module: string;
  practice: string;
  reference: string;
  payer: string;
  status: string;
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  owner: string;
  followUp: string;
  detail: string;
  amount?: string;
};

export const DEMO_MODE_LABEL = 'DEMO WORKSPACE';

export const demoClient: DemoClient = {
  id: 'client-summit-family-health',
  name: 'Summit Family Health',
  contact: 'Dr. Maya Patel',
  email: 'demo@summitfamilyhealth.example',
  phone: '(555) 010-2040',
  specialty: 'Family Medicine',
  status: 'Active',
  services: ['Medical Billing', 'AR Follow-up', 'Denial Management', 'Insurance Verification'],
  openRequests: 3,
  lastActivity: 'AR review completed today',
};

export const demoClients: DemoClient[] = [
  demoClient,
  { id: 'client-riverside-pt', name: 'Riverside Physical Therapy', contact: 'Jordan Lee', email: 'demo@riversidept.example', phone: '(555) 010-2041', specialty: 'Physical Therapy', status: 'Onboarding', services: ['Billing', 'Credentialing'], openRequests: 1, lastActivity: 'Enrollment documents received' },
  { id: 'client-northstar-behavioral', name: 'Northstar Behavioral Health', contact: 'Avery Morgan', email: 'demo@northstarbh.example', phone: '(555) 010-2042', specialty: 'Behavioral Health', status: 'Prospect', services: ['RCM Assessment'], openRequests: 0, lastActivity: 'Consultation scheduled' },
  { id: 'client-lakeside-urgent-care', name: 'Lakeside Urgent Care', contact: 'Sam Rivera', email: 'demo@lakesideuc.example', phone: '(555) 010-2043', specialty: 'Urgent Care', status: 'Inactive', services: ['Historical review'], openRequests: 0, lastActivity: 'Account archived for demo' },
];

export const demoWorkItems: DemoWorkItem[] = [
  { id: 'ar-1001', module: 'AR Calling', practice: demoClient.name, reference: 'CLM-DEMO-1001', payer: 'Blue Horizon', status: 'Follow-up Required', priority: 'High', owner: 'Alex Morgan', followUp: 'Today', detail: 'Claim aging in the 91-120 day bucket.', amount: '$4,820.00' },
  { id: 'ar-1002', module: 'AR Calling', practice: demoClient.name, reference: 'CLM-DEMO-1002', payer: 'United Community', status: 'In Progress', priority: 'Normal', owner: 'Alex Morgan', followUp: 'Tomorrow', detail: 'Payer portal review is in progress.', amount: '$1,240.00' },
  { id: 'denial-2001', module: 'Denials', practice: demoClient.name, reference: 'DEN-DEMO-2001', payer: 'Blue Horizon', status: 'Appeal Required', priority: 'Urgent', owner: 'Taylor Brooks', followUp: 'Today', detail: 'Eligibility denial needs supporting coverage documentation.', amount: '$860.00' },
  { id: 'denial-2002', module: 'Denials', practice: demoClient.name, reference: 'DEN-DEMO-2002', payer: 'Community Health', status: 'Under Review', priority: 'Normal', owner: 'Taylor Brooks', followUp: 'Friday', detail: 'Coding review requested before appeal.', amount: '$415.00' },
  { id: 'verify-3001', module: 'Verification', practice: demoClient.name, reference: 'VER-DEMO-3001', payer: 'United Community', status: 'Needs Follow-up', priority: 'High', owner: 'Jamie Chen', followUp: 'Tomorrow', detail: 'Coverage effective date needs confirmation.' },
  { id: 'payment-4001', module: 'Payments', practice: demoClient.name, reference: 'PAY-DEMO-4001', payer: 'Blue Horizon', status: 'Exception', priority: 'High', owner: 'Jamie Chen', followUp: 'Thursday', detail: 'Payment batch requires reconciliation review.', amount: '$2,175.00' },
  { id: 'auth-5001', module: 'Authorizations', practice: demoClient.name, reference: 'AUTH-DEMO-5001', payer: 'Community Health', status: 'Follow-up Required', priority: 'Normal', owner: 'Alex Morgan', followUp: 'Friday', detail: 'Authorization expiration is approaching.' },
  { id: 'billing-6001', module: 'Billing', practice: demoClient.name, reference: 'CLM-DEMO-6001', payer: 'Blue Horizon', status: 'Ready', priority: 'Normal', owner: 'Taylor Brooks', followUp: 'Today', detail: 'Claim passed internal pre-submission review.', amount: '$1,980.00' },
  { id: 'credential-7001', module: 'Credentialing', practice: 'Riverside Physical Therapy', reference: 'CRED-DEMO-7001', payer: 'United Community', status: 'Renewal Required', priority: 'High', owner: 'Jamie Chen', followUp: 'Next week', detail: 'Provider renewal packet is ready for review.' },
  { id: 'enrollment-8001', module: 'Enrollment', practice: 'Riverside Physical Therapy', reference: 'ENR-DEMO-8001', payer: 'Community Health', status: 'Submitted', priority: 'Normal', owner: 'Jamie Chen', followUp: 'Next week', detail: 'Payer enrollment confirmation is pending.' },
];

export const demoActivity = [
  { time: 'Today, 9:40 AM', title: 'AR review completed', detail: 'Summit Family Health demo account' },
  { time: 'Yesterday, 3:15 PM', title: 'Denial moved to appeal', detail: 'DEN-DEMO-2001 requires documentation' },
  { time: 'Yesterday, 11:20 AM', title: 'Verification follow-up scheduled', detail: 'VER-DEMO-3001' },
];

export const operationModules = [
  { slug: 'ar', label: 'AR Calling', description: 'Prioritized aging account follow-up', statuses: ['Pending', 'In Progress', 'Follow-up Required', 'Escalated', 'Resolved'] },
  { slug: 'denials', label: 'Denials', description: 'Review, appeal, and resolve denials', statuses: ['New', 'Under Review', 'Appeal Required', 'Appealed', 'Resolved'] },
  { slug: 'verification', label: 'Verification', description: 'Confirm coverage before care', statuses: ['Pending', 'Verified', 'Inactive', 'Needs Follow-up'] },
  { slug: 'payments', label: 'Payments', description: 'Post and reconcile payer payments', statuses: ['Pending', 'Posted', 'Exception', 'Reconciliation Required'] },
  { slug: 'authorizations', label: 'Prior Authorization', description: 'Track authorization requests', statuses: ['Pending', 'Submitted', 'Approved', 'Denied', 'Expired'] },
  { slug: 'billing', label: 'Medical Billing', description: 'Manage claim readiness and status', statuses: ['Draft', 'Ready', 'Submitted', 'Accepted', 'Rejected', 'Denied', 'Paid'] },
  { slug: 'credentialing', label: 'Credentialing', description: 'Track provider credentialing', statuses: ['Not Started', 'In Progress', 'Submitted', 'Approved', 'Expired'] },
  { slug: 'enrollment', label: 'Provider Enrollment', description: 'Monitor payer enrollment', statuses: ['Pending', 'Submitted', 'Approved', 'Rejected'] },
];

export function itemsForModule(slug: string) {
  const module = operationModules.find((item) => item.slug === slug);
  return demoWorkItems.filter((item) => item.module === module?.label || (slug === 'ar' && item.module === 'AR Calling'));
}
