-- ── Journey items ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS journey_items (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  type         text        NOT NULL CHECK (type IN ('work', 'education', 'achievement')),
  title        text        NOT NULL,
  organization text        NOT NULL,
  location     text,
  range_start  text        NOT NULL,  -- YYYY-MM
  range_end    text,                  -- YYYY-MM or null = Present
  description  text        NOT NULL DEFAULT '',
  bullets      text[]      NOT NULL DEFAULT '{}',
  logo         text,
  tags         text[]      NOT NULL DEFAULT '{}',
  link         text,
  sort_order   int         NOT NULL DEFAULT 0,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

CREATE TRIGGER set_journey_items_updated_at
  BEFORE UPDATE ON journey_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE journey_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read journey_items"
  ON journey_items FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage journey_items"
  ON journey_items FOR ALL USING (auth.role() = 'authenticated');

-- ── Certificates ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS certificates (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title          text        NOT NULL,
  issuer         text        NOT NULL,
  issued_at      text        NOT NULL,  -- YYYY-MM
  expires_at     text,                  -- YYYY-MM or null = no expiry
  credential_id  text,
  credential_url text,
  cover_image    text,
  tags           text[]      NOT NULL DEFAULT '{}',
  featured       boolean     NOT NULL DEFAULT false,
  sort_order     int         NOT NULL DEFAULT 0,
  created_at     timestamptz DEFAULT now(),
  updated_at     timestamptz DEFAULT now()
);

CREATE TRIGGER set_certificates_updated_at
  BEFORE UPDATE ON certificates
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read certificates"
  ON certificates FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage certificates"
  ON certificates FOR ALL USING (auth.role() = 'authenticated');

-- ── Seed: migrate existing hardcoded journey data ─────────────────────────────
INSERT INTO journey_items
  (type, title, organization, location, range_start, range_end, description, bullets, tags, sort_order)
VALUES
(
  'work', 'System Analyst', 'Astra Credit Companies', 'Indonesia',
  '2023-09', null,
  'Analyze business processes, gather requirements, and coordinate with stakeholders and development teams to design and support system improvements and integrations.',
  ARRAY[
    'Translate business requirements into clear specifications and documentation for development teams',
    'Map business processes using BPMN and use case diagrams to identify improvement opportunities',
    'Use SQL to explore data and validate the impact of proposed system changes',
    'Coordinate with stakeholders across business units, IT, and vendors during system integration projects'
  ],
  ARRAY['System Analysis', 'Business Process Analysis', 'SQL', 'Stakeholder Management'],
  1
),
(
  'work', 'Assistant Lecturer — Big Data & Data Analytics', 'Informatics Department', null,
  '2023-09', null,
  'Support Big Data and Data Analytics courses by designing lab materials and case studies, and mentoring students through SQL-based data analysis projects.',
  ARRAY[
    'Design hands-on lab exercises and case studies for Big Data and Data Analytics courses',
    'Mentor students through SQL-based data analysis projects, from framing questions to presenting findings',
    'Review student work and provide feedback aligned with course learning objectives'
  ],
  ARRAY['Teaching', 'Big Data', 'SQL', 'Data Analysis'],
  2
),
(
  'education', 'Bachelor''s Degree in Informatics', 'Informatics Program', null,
  '2019-08', '2023-06',
  'Focused coursework in software development, databases, and information systems, with practical research experience through a PKM-funded project.',
  ARRAY[
    'Completed a PKM-funded research project as Project Leader',
    'Co-authored two research publications during undergraduate studies',
    'Built a strong foundation in SQL, system analysis, and software development'
  ],
  ARRAY['Informatics', 'SQL', 'Information Systems'],
  3
),
(
  'achievement', 'Research Publications', 'Academic Journals / Conferences', null,
  '2022-11', '2023-04',
  'Co-authored and published two research papers in the fields of information systems and data analytics.',
  ARRAY[
    'Co-authored a research publication on information systems and data analytics',
    'Co-authored a second research publication on business process and system analysis'
  ],
  ARRAY['Research', 'Publication', 'Data Analytics'],
  4
),
(
  'achievement', 'PKM Project Leader', 'Program Kreativitas Mahasiswa (PKM)', null,
  '2022-02', '2022-12',
  'Led a student research team through a nationally funded research and innovation program, from proposal through to final reporting.',
  ARRAY[
    'Coordinated a small research team and managed project milestones',
    'Led data collection and analysis using structured research methods',
    'Presented findings in a final report to the program review committee'
  ],
  ARRAY['Research', 'Project Coordination', 'Data Analysis'],
  5
);
