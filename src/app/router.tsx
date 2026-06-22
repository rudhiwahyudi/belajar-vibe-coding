import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'

// Public pages
const HomePage = lazy(() => import('@/features/home/HomePage'))
const ProjectsPage = lazy(() => import('@/features/projects/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('@/features/projects/ProjectDetailPage'))
const JourneyPage = lazy(() => import('@/features/journey/JourneyPage'))
const BlogPage = lazy(() => import('@/features/blog/BlogPage'))
const BlogDetailPage = lazy(() => import('@/features/blog/BlogDetailPage'))
const ContactPage = lazy(() => import('@/features/contact/ContactPage'))
const NotFoundPage = lazy(() => import('@/features/not-found/NotFoundPage'))

// Admin pages
const AdminLogin = lazy(() => import('@/features/admin/AdminLogin'))
const AdminLayout = lazy(() => import('@/features/admin/AdminLayout'))
const AdminBlogPage = lazy(() => import('@/features/admin/blog/AdminBlogPage'))
const AdminBlogForm = lazy(() => import('@/features/admin/blog/AdminBlogForm'))
const AdminProjectsPage = lazy(() => import('@/features/admin/projects/AdminProjectsPage'))
const AdminProjectsForm = lazy(() => import('@/features/admin/projects/AdminProjectsForm'))

export const router = createBrowserRouter([
  // ── Admin (no public layout, must come before the '/' layout route) ──────
  { path: '/admin/login', Component: AdminLogin },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, element: <Navigate to="/admin/blog" replace /> },
      { path: 'blog', Component: AdminBlogPage },
      { path: 'blog/new', Component: AdminBlogForm },
      { path: 'blog/:id/edit', Component: AdminBlogForm },
      { path: 'projects', Component: AdminProjectsPage },
      { path: 'projects/new', Component: AdminProjectsForm },
      { path: 'projects/:id/edit', Component: AdminProjectsForm },
    ],
  },

  // ── Public site ──────────────────────────────────────────────────────────
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, Component: HomePage },
      { path: 'projects', Component: ProjectsPage },
      { path: 'projects/:slug', Component: ProjectDetailPage },
      { path: 'journey', Component: JourneyPage },
      { path: 'blog', Component: BlogPage },
      { path: 'blog/:slug', Component: BlogDetailPage },
      { path: 'contact', Component: ContactPage },
    ],
  },

  // ── Top-level 404 (still wrapped in RootLayout so header/footer render) ─
  {
    path: '*',
    element: <RootLayout />,
    children: [{ index: true, Component: NotFoundPage }],
  },
])
