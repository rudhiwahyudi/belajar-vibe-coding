import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'

const HomePage = lazy(() => import('@/features/home/HomePage'))
const ProjectsPage = lazy(() => import('@/features/projects/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('@/features/projects/ProjectDetailPage'))
const JourneyPage = lazy(() => import('@/features/journey/JourneyPage'))
const CertificationsPage = lazy(() => import('@/features/certifications/CertificationsPage'))
const BlogPage = lazy(() => import('@/features/blog/BlogPage'))
const BlogDetailPage = lazy(() => import('@/features/blog/BlogDetailPage'))
const ContactPage = lazy(() => import('@/features/contact/ContactPage'))
const NotFoundPage = lazy(() => import('@/features/not-found/NotFoundPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, Component: HomePage },
      { path: 'projects', Component: ProjectsPage },
      { path: 'projects/:slug', Component: ProjectDetailPage },
      { path: 'journey', Component: JourneyPage },
      { path: 'certifications', Component: CertificationsPage },
      { path: 'blog', Component: BlogPage },
      { path: 'blog/:slug', Component: BlogDetailPage },
      { path: 'contact', Component: ContactPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
