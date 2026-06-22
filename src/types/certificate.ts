export interface Certificate {
  id: string
  title: string
  issuer: string
  issuedAt: string    // YYYY-MM
  expiresAt?: string  // YYYY-MM or undefined = no expiry
  credentialId?: string
  credentialUrl?: string
  coverImage?: string
  tags: string[]
  featured: boolean
  sortOrder: number
}
