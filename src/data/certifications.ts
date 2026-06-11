import type { Certification } from '@/types/certification'
import type { FocusArea } from '@/types/common'

export const certifications: Certification[] = [
  {
    id: 'aws-solutions-architect-associate',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    issueDate: '2024-09',
    expiryDate: '2027-09',
    credentialId: 'AWS-SAA-000000',
    credentialUrl: 'https://www.credly.com/badges/example-saa',
    image: '/images/certifications/aws-saa.png',
    focusAreas: ['Cloud Computing', 'DevOps'],
    skills: ['AWS', 'Cloud Architecture', 'VPC', 'EC2', 'S3'],
  },
  {
    id: 'ckad',
    title: 'Certified Kubernetes Application Developer (CKAD)',
    issuer: 'Cloud Native Computing Foundation',
    issueDate: '2024-04',
    expiryDate: '2027-04',
    credentialId: 'CKAD-0000-0000-0000',
    credentialUrl: 'https://www.credly.com/badges/example-ckad',
    image: '/images/certifications/ckad.png',
    focusAreas: ['DevOps', 'Cloud Computing'],
    skills: ['Kubernetes', 'Containers', 'Helm'],
  },
  {
    id: 'gcp-ace',
    title: 'Google Cloud Associate Cloud Engineer',
    issuer: 'Google Cloud',
    issueDate: '2023-11',
    expiryDate: '2026-11',
    credentialId: 'GCP-ACE-000000',
    credentialUrl: 'https://www.credly.com/badges/example-gcp-ace',
    image: '/images/certifications/gcp-ace.png',
    focusAreas: ['Cloud Computing'],
    skills: ['Google Cloud', 'GKE', 'Cloud Run', 'IAM'],
  },
  {
    id: 'terraform-associate',
    title: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    issueDate: '2024-01',
    expiryDate: '2026-01',
    credentialId: 'HCTA-000000',
    credentialUrl: 'https://www.credly.com/badges/example-terraform',
    image: '/images/certifications/terraform-associate.png',
    focusAreas: ['DevOps', 'Cloud Computing'],
    skills: ['Terraform', 'Infrastructure as Code'],
  },
  {
    id: 'deep-learning-specialization',
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI (Coursera)',
    issueDate: '2023-06',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/example-dl',
    image: '/images/certifications/deep-learning-specialization.png',
    focusAreas: ['AI Automation'],
    skills: ['Neural Networks', 'TensorFlow', 'NLP'],
  },
  {
    id: 'professional-scrum-master',
    title: 'Professional Scrum Master I (PSM I)',
    issuer: 'Scrum.org',
    issueDate: '2022-10',
    credentialId: 'PSM-I-000000',
    credentialUrl: 'https://www.credly.com/badges/example-psm',
    image: '/images/certifications/psm-i.png',
    focusAreas: ['Software Engineering'],
    skills: ['Agile', 'Scrum', 'Project Management'],
  },
]

export function isCertificationActive(cert: Certification): boolean {
  if (!cert.expiryDate) return true
  return new Date(cert.expiryDate) > new Date()
}

export function getActiveCertifications(): Certification[] {
  return certifications.filter(isCertificationActive)
}

export function getCertificationsByFocusArea(area: FocusArea): Certification[] {
  return certifications.filter((cert) => cert.focusAreas.includes(area))
}
