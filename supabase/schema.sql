-- =============================================================================
-- SCHEMA
-- Run this in Supabase SQL Editor: Dashboard → SQL Editor → New query
-- =============================================================================

-- ---------------------------------------------------------------------------
-- TABLES
-- ---------------------------------------------------------------------------

CREATE TABLE public.blog_posts (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text        UNIQUE NOT NULL,
  title         text        NOT NULL,
  excerpt       text        NOT NULL DEFAULT '',
  content       text        NOT NULL DEFAULT '',   -- plain Markdown (not MDX)
  cover_image   text        NOT NULL DEFAULT '',
  published_at  timestamptz,
  updated_at    timestamptz,
  reading_time  integer     NOT NULL DEFAULT 1,
  tags          text[]      NOT NULL DEFAULT '{}',
  category      text        NOT NULL DEFAULT '',
  status        text        NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.projects (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           text        UNIQUE NOT NULL,
  title          text        NOT NULL,
  tagline        text        NOT NULL DEFAULT '',
  summary        text        NOT NULL DEFAULT '',
  description    text        NOT NULL DEFAULT '',  -- Markdown
  focus_areas    text[]      NOT NULL DEFAULT '{}',
  status         text        NOT NULL DEFAULT 'in-progress'
                             CHECK (status IN ('completed', 'in-progress', 'archived')),
  featured       boolean     NOT NULL DEFAULT false,
  cover_image    text        NOT NULL DEFAULT '',
  gallery        text[]      NOT NULL DEFAULT '{}',
  tech_stack     text[]      NOT NULL DEFAULT '{}',
  role           text        NOT NULL DEFAULT '',
  timeline_start text        NOT NULL DEFAULT '',  -- ISO month string, e.g. "2023-09"
  timeline_end   text,                             -- NULL means "Present"
  links          jsonb       NOT NULL DEFAULT '{}',
  highlights     text[]      NOT NULL DEFAULT '{}',
  metrics        jsonb,                            -- [{label, value}, ...]
  architecture   jsonb,                            -- {image?, description?}
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects   ENABLE ROW LEVEL SECURITY;

-- Public visitors: read published posts only
CREATE POLICY "public_read_published_posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');

-- Authenticated admin: full access to all posts (including drafts)
CREATE POLICY "admin_all_posts"
  ON public.blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public visitors: read all projects
CREATE POLICY "public_read_projects"
  ON public.projects FOR SELECT
  USING (true);

-- Authenticated admin: full access to projects
CREATE POLICY "admin_all_projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ---------------------------------------------------------------------------
-- STORAGE BUCKET
-- ---------------------------------------------------------------------------

-- Create a public bucket for cover images and gallery photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Anyone can read files in the bucket (it's public)
CREATE POLICY "public_read_media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-media');

-- Only authenticated admin can upload
CREATE POLICY "admin_upload_media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio-media');

-- Only authenticated admin can update/replace
CREATE POLICY "admin_update_media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'portfolio-media');

-- Only authenticated admin can delete
CREATE POLICY "admin_delete_media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio-media');

-- ---------------------------------------------------------------------------
-- HELPER: auto-update updated_at on projects
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER projects_set_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
