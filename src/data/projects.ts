import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    slug: 'cloudops-dashboard',
    title: 'CloudOps Dashboard',
    tagline: 'Unified observability and deployment control for multi-cloud workloads',
    summary:
      'A self-hosted dashboard that consolidates Kubernetes deployments, cost metrics, and alerting across AWS and GCP into a single pane of glass.',
    description: `CloudOps Dashboard was built to solve a recurring problem on small engineering teams: infrastructure visibility scattered across multiple cloud consoles.

The platform aggregates Kubernetes cluster state, deployment pipelines, and billing data from AWS and Google Cloud, surfacing them in a single real-time dashboard. Engineers can trigger rollbacks, scale deployments, and acknowledge alerts without leaving the app.

**Key engineering decisions**

- Used a Go backend with server-sent events to stream cluster state changes with minimal overhead.
- Built a plugin architecture so new cloud providers can be added without touching the core dashboard.
- Deployed via GitOps (ArgoCD) so the dashboard manages infrastructure the same way it's deployed.`,
    focusAreas: ['DevOps', 'Cloud Computing'],
    status: 'in-progress',
    featured: true,
    coverImage: '/images/projects/cloudops-dashboard/cover.jpg',
    gallery: [
      '/images/projects/cloudops-dashboard/dashboard.jpg',
      '/images/projects/cloudops-dashboard/deployments.jpg',
      '/images/projects/cloudops-dashboard/alerts.jpg',
    ],
    techStack: ['Go', 'React', 'Kubernetes', 'AWS', 'Google Cloud', 'Terraform', 'Grafana'],
    role: 'Sole Developer & Infrastructure Lead',
    timeline: { start: '2025-02' },
    links: {
      repo: 'https://github.com/rudhiwahyudi/cloudops-dashboard',
    },
    highlights: [
      'Reduced time-to-detect production incidents from ~15 minutes to under 2 minutes',
      'Consolidated 4 separate monitoring tools into one internal dashboard',
      'Implemented one-click rollback for Kubernetes deployments',
    ],
    metrics: [
      { label: 'Incident detection time', value: '-87%' },
      { label: 'Cloud providers supported', value: '2' },
      { label: 'Active clusters monitored', value: '6' },
    ],
    architecture: {
      image: '/images/projects/cloudops-dashboard/architecture.jpg',
      description:
        'Go API server aggregates data from the Kubernetes API, AWS Cost Explorer, and GCP Billing API, caches it in Redis, and streams updates to the React frontend via SSE.',
    },
  },
  {
    slug: 'ai-content-pipeline',
    title: 'AI Content Pipeline',
    tagline: 'Automated research-to-draft pipeline powered by LLM agents',
    summary:
      'A multi-agent automation pipeline that researches a topic, drafts long-form content, and prepares it for review — cutting first-draft time from hours to minutes.',
    description: `AI Content Pipeline automates the early stages of long-form content production. Given a topic brief, it orchestrates a chain of LLM agents that research sources, outline the piece, draft sections in parallel, and compile a reviewable draft with citations.

**Key engineering decisions**

- Built on LangChain with a custom orchestration layer for parallel agent execution and retry handling.
- Added a citation-verification step that cross-checks claims against retrieved sources before they're included in the draft.
- Exposed the pipeline as a queue-based service so it can run unattended on a schedule.`,
    focusAreas: ['AI Automation', 'Software Engineering'],
    status: 'completed',
    featured: true,
    coverImage: '/images/projects/ai-content-pipeline/cover.jpg',
    gallery: [
      '/images/projects/ai-content-pipeline/pipeline.jpg',
      '/images/projects/ai-content-pipeline/draft-review.jpg',
    ],
    techStack: ['Python', 'LangChain', 'OpenAI API', 'PostgreSQL', 'Redis', 'Docker'],
    role: 'Backend & AI Engineer',
    timeline: { start: '2024-08', end: '2024-12' },
    links: {
      repo: 'https://github.com/rudhiwahyudi/ai-content-pipeline',
      demo: 'https://ai-content-pipeline.vercel.app',
    },
    highlights: [
      'Cut first-draft turnaround from ~3 hours to under 10 minutes',
      'Built a citation-verification agent to reduce hallucinated sources',
      'Processed 200+ articles in pilot testing with a 92% acceptance rate',
    ],
    metrics: [
      { label: 'Draft turnaround', value: '-94%' },
      { label: 'Pilot acceptance rate', value: '92%' },
      { label: 'Articles processed', value: '200+' },
    ],
    architecture: {
      description:
        'A FastAPI service queues content briefs in Redis. Worker processes run a LangChain agent graph (research → outline → draft → verify) and persist results to PostgreSQL for review.',
    },
  },
  {
    slug: 'commerce-platform',
    title: 'Commerce Platform',
    tagline: 'Full-stack e-commerce platform with real-time inventory sync',
    summary:
      'A production e-commerce application with a custom storefront, admin dashboard, and real-time inventory synchronization across warehouses.',
    description: `Commerce Platform is a full-stack web application built for a small retail business needing an online storefront tightly integrated with their existing warehouse inventory.

The system includes a customer-facing storefront, an admin dashboard for managing products and orders, and a background sync service that keeps inventory counts accurate across two physical warehouses.

**Key engineering decisions**

- Designed the data model around an event-sourced inventory ledger to avoid race conditions during concurrent checkouts.
- Used optimistic UI updates on the storefront with server-side reconciliation.
- Containerized all services and deployed behind Nginx with zero-downtime rolling updates.`,
    focusAreas: ['Software Engineering'],
    status: 'completed',
    featured: true,
    coverImage: '/images/projects/commerce-platform/cover.jpg',
    gallery: [
      '/images/projects/commerce-platform/storefront.jpg',
      '/images/projects/commerce-platform/admin.jpg',
      '/images/projects/commerce-platform/checkout.jpg',
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'],
    role: 'Full-Stack Developer',
    timeline: { start: '2023-09', end: '2024-04' },
    links: {
      live: 'https://commerce-platform-demo.vercel.app',
      repo: 'https://github.com/rudhiwahyudi/commerce-platform',
    },
    highlights: [
      'Eliminated overselling incidents with an event-sourced inventory ledger',
      'Achieved sub-200ms p95 response times on the storefront API',
      'Shipped zero-downtime deploys with rolling container updates',
    ],
    metrics: [
      { label: 'API p95 latency', value: '180ms' },
      { label: 'Overselling incidents', value: '0' },
      { label: 'Warehouses synced', value: '2' },
    ],
  },
  {
    slug: 'k8s-gitops-toolkit',
    title: 'Kubernetes GitOps Toolkit',
    tagline: 'Reusable Helm charts and ArgoCD app-of-apps for fast cluster bootstrapping',
    summary:
      'An internal toolkit of Helm charts, ArgoCD application sets, and Terraform modules that bootstrap a production-ready Kubernetes cluster in under an hour.',
    description: `This toolkit grew out of repeatedly setting up new Kubernetes clusters from scratch. It packages opinionated Helm charts, an ArgoCD "app of apps" structure, and Terraform modules for cluster provisioning.

**Key engineering decisions**

- Standardized on ArgoCD ApplicationSets to manage environment-specific overlays (dev/staging/prod) from a single repo.
- Bundled cert-manager, ingress-nginx, Prometheus, and Grafana as default cluster add-ons.
- Wrote Terraform modules for both EKS and GKE so the toolkit is cloud-agnostic.`,
    focusAreas: ['DevOps', 'Cloud Computing'],
    status: 'completed',
    featured: false,
    coverImage: '/images/projects/k8s-gitops-toolkit/cover.jpg',
    gallery: ['/images/projects/k8s-gitops-toolkit/argocd.jpg'],
    techStack: ['Kubernetes', 'Helm', 'ArgoCD', 'Terraform', 'AWS', 'Google Cloud'],
    role: 'DevOps Engineer',
    timeline: { start: '2024-03', end: '2024-06' },
    links: {
      repo: 'https://github.com/rudhiwahyudi/k8s-gitops-toolkit',
    },
    highlights: [
      'Reduced new-cluster bootstrap time from ~2 days to under 1 hour',
      'Standardized observability stack across all environments',
      'Adopted by two internal teams for staging environments',
    ],
  },
  {
    slug: 'smart-resume-screener',
    title: 'Smart Resume Screener',
    tagline: 'LLM-powered resume screening with structured candidate scoring',
    summary:
      'An internal tool that parses resumes against a job description and produces structured, explainable candidate scores for recruiters.',
    description: `Smart Resume Screener helps recruiters triage large applicant pools by extracting structured data from resumes and scoring candidates against a job description's requirements.

**Key engineering decisions**

- Used a structured-output LLM call (JSON schema) to avoid free-text responses that are hard to sort and filter.
- Built a transparent scoring breakdown so recruiters can see *why* a candidate scored the way they did.
- Added a human-in-the-loop review step — the tool ranks and explains, but never auto-rejects.`,
    focusAreas: ['AI Automation'],
    status: 'completed',
    featured: false,
    coverImage: '/images/projects/smart-resume-screener/cover.jpg',
    gallery: ['/images/projects/smart-resume-screener/results.jpg'],
    techStack: ['Python', 'FastAPI', 'OpenAI API', 'PostgreSQL', 'React'],
    role: 'AI Engineer',
    timeline: { start: '2024-05', end: '2024-07' },
    links: {
      repo: 'https://github.com/rudhiwahyudi/smart-resume-screener',
    },
    highlights: [
      'Cut initial resume screening time by roughly 70% in pilot use',
      'Produced explainable, criteria-based scores instead of a black-box rating',
      'Kept a human reviewer in the loop for every hiring decision',
    ],
  },
  {
    slug: 'finance-tracker',
    title: 'Personal Finance Tracker',
    tagline: 'Privacy-first budgeting app with local-first data storage',
    summary:
      'A budgeting and expense-tracking app that keeps all financial data on-device by default, with optional encrypted cloud sync.',
    description: `Personal Finance Tracker started as a side project to learn local-first application architecture. All data is stored locally using IndexedDB, with an optional end-to-end encrypted sync layer for users who want multi-device access.

**Key engineering decisions**

- Implemented a CRDT-based sync layer so the app works fully offline and merges changes without conflicts.
- Used client-side encryption (libsodium) before any data leaves the device.
- Built with a mobile-first responsive design, installable as a PWA.`,
    focusAreas: ['Software Engineering'],
    status: 'archived',
    featured: false,
    coverImage: '/images/projects/finance-tracker/cover.jpg',
    gallery: ['/images/projects/finance-tracker/overview.jpg'],
    techStack: ['React', 'TypeScript', 'IndexedDB', 'Vite', 'PWA'],
    role: 'Solo Developer',
    timeline: { start: '2023-02', end: '2023-06' },
    links: {
      repo: 'https://github.com/rudhiwahyudi/finance-tracker',
    },
    highlights: [
      'Implemented offline-first sync using CRDTs',
      'Client-side encryption ensures the server never sees plaintext data',
      'Installable as a PWA on mobile and desktop',
    ],
  },
]

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProjectBySlug(slug)
  if (!current) return []

  return projects
    .filter((project) => project.slug !== slug)
    .filter((project) =>
      project.focusAreas.some((area) => current.focusAreas.includes(area)),
    )
    .slice(0, limit)
}

export function getAllFocusAreas(): string[] {
  const areas = new Set<string>()
  projects.forEach((project) => project.focusAreas.forEach((area) => areas.add(area)))
  return Array.from(areas)
}

export function getAllTechStacks(): string[] {
  const stacks = new Set<string>()
  projects.forEach((project) => project.techStack.forEach((tech) => stacks.add(tech)))
  return Array.from(stacks).sort()
}
