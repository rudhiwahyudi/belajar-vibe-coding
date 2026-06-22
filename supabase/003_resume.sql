-- ── Resume (single-row, always upserted) ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS resume (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text        NOT NULL DEFAULT '',
  tagline     text        NOT NULL DEFAULT '',
  summary     text        NOT NULL DEFAULT '',
  email       text,
  phone       text,
  location    text,
  website     text,
  linkedin    text,
  github      text,
  experience  jsonb       NOT NULL DEFAULT '[]',
  education   jsonb       NOT NULL DEFAULT '[]',
  skills      jsonb       NOT NULL DEFAULT '[]',
  pdf_url     text,
  updated_at  timestamptz DEFAULT now()
);

CREATE TRIGGER set_resume_updated_at
  BEFORE UPDATE ON resume
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE resume ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read resume"
  ON resume FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage resume"
  ON resume FOR ALL USING (auth.role() = 'authenticated');

-- ── Seed: pre-populate from existing site data ────────────────────────────────
INSERT INTO resume (name, tagline, summary, email, location, website, linkedin, github, experience, education, skills, pdf_url)
VALUES (
  'Rudhi Wahyudi',
  'System Analyst · Business Process Analyst · Technology Problem Solver',
  'System Analyst at Astra Credit Companies, focused on business process analysis, requirements gathering, and system integration. Also an Assistant Lecturer in Big Data & Data Analytics, helping students build practical SQL and data analysis skills.',
  'rinnecentio@gmail.com',
  'Indonesia',
  'https://rudhiwahyudi.vercel.app',
  'https://linkedin.com/in/rudhiwahyudi',
  'https://github.com/rudhiwahyudi',
  '[
    {
      "title": "System Analyst",
      "organization": "Astra Credit Companies",
      "period": "Sep 2023 – Present",
      "location": "Indonesia",
      "bullets": [
        "Translate business requirements into clear specifications and documentation for development teams",
        "Map business processes using BPMN and use case diagrams to identify improvement opportunities",
        "Use SQL to explore data and validate the impact of proposed system changes",
        "Coordinate with stakeholders across business units, IT, and vendors during system integration projects"
      ]
    },
    {
      "title": "Assistant Lecturer — Big Data & Data Analytics",
      "organization": "Informatics Department",
      "period": "Sep 2023 – Present",
      "location": "",
      "bullets": [
        "Design hands-on lab exercises and case studies for Big Data and Data Analytics courses",
        "Mentor students through SQL-based data analysis projects",
        "Review student work and provide feedback aligned with course learning objectives"
      ]
    }
  ]'::jsonb,
  '[
    {
      "degree": "Bachelor''s Degree in Informatics",
      "institution": "Informatics Program",
      "period": "Aug 2019 – Jun 2023",
      "note": "PKM Project Leader · Co-authored two research publications"
    }
  ]'::jsonb,
  '[
    {"category": "Business Analysis", "items": "Business Process Analysis, Requirements Gathering, BPMN, Use Case Diagrams, Stakeholder Management"},
    {"category": "Data & SQL", "items": "SQL, Data Analysis, Big Data, Data Validation"},
    {"category": "Systems & Tools", "items": "System Integration, System Design, Documentation, Microsoft Office"},
    {"category": "Research", "items": "Research Methods, Academic Writing, Project Coordination"}
  ]'::jsonb,
  '/resume-rudhi-wahyudi.pdf'
);
