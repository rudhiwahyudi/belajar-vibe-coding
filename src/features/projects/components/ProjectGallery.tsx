interface ProjectGalleryProps {
  images: string[]
  title: string
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  if (images.length === 0) return null

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {images.map((image, index) => (
        <div
          key={image}
          className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border bg-secondary"
        >
          <span className="text-sm text-muted-foreground">
            {title} — screenshot {index + 1}
          </span>
        </div>
      ))}
    </div>
  )
}
