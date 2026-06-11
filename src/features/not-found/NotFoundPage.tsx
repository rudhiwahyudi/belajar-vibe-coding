import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageContainer } from '@/components/layout/PageContainer'
import { GradientMesh } from '@/components/shared/GradientMesh'

export default function NotFoundPage() {
  return (
    <PageContainer className="relative flex min-h-[70svh] flex-col items-center justify-center gap-4 py-24 text-center">
      <GradientMesh />
      <span className="text-gradient text-sm font-medium uppercase tracking-widest">
        404
      </span>
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        This page doesn&apos;t exist
      </h1>
      <p className="max-w-md text-muted-foreground">
        The page you&apos;re looking for may have been moved or never existed. Let&apos;s get
        you back on track.
      </p>
      <Button render={<Link to="/" />}>
        <ArrowLeft className="size-4" />
        Back to home
      </Button>
    </PageContainer>
  )
}
