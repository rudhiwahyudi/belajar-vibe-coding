-- =============================================================================
-- SEED — existing projects from src/data/projects.ts
-- Run this AFTER schema.sql in Supabase SQL Editor
-- =============================================================================

INSERT INTO public.projects
  (slug, title, tagline, summary, description, focus_areas, status, featured,
   cover_image, gallery, tech_stack, role, timeline_start, timeline_end,
   links, highlights)
VALUES
(
  'business-process-system-analysis',
  'Business Process & System Analysis',
  'Translating business requirements into system improvements at Astra Credit Companies',
  'Ongoing work as a System Analyst — mapping business processes, gathering requirements from stakeholders, and coordinating with development teams to design and integrate system enhancements.',
  $desc$As a System Analyst at Astra Credit Companies, I work closely with business units to understand how operational processes work today and where they can be improved.

This involves running requirement-gathering sessions with stakeholders, documenting current and proposed workflows using BPMN and use case diagrams, and translating those findings into specifications that development teams can build from.

**How I approach this work**

- Map existing business processes end-to-end before proposing changes, so improvements address root causes rather than symptoms.
- Write clear, structured requirements and use case documentation that both business stakeholders and engineers can use as a shared reference.
- Use SQL to explore and validate data when assessing the impact of a proposed process or system change.
- Coordinate between business stakeholders, IT, and vendors during system integration efforts to keep everyone aligned on scope and timeline.$desc$,
  ARRAY['System Analysis', 'Business Process Analysis'],
  'in-progress',
  true,
  '/images/projects/business-process-system-analysis/cover.jpg',
  ARRAY[]::text[],
  ARRAY['SQL', 'BPMN', 'UML', 'Requirements Documentation', 'System Integration', 'Stakeholder Management'],
  'System Analyst',
  '2023-09',
  NULL,
  '{}'::jsonb,
  ARRAY[
    'Act as the bridge between business units and the development team, documenting requirements and processes',
    'Use BPMN and use case diagrams to map current and proposed workflows',
    'Support system integration efforts by validating data flows and business rules with SQL'
  ]
),
(
  'big-data-course-development',
  'Big Data & Data Analytics Course Development',
  'Designing lab materials and mentoring students as an Assistant Lecturer',
  'As an Assistant Lecturer for Big Data and Data Analytics courses, I develop hands-on lab exercises and case studies, and mentor students through SQL-based data analysis projects.',
  $desc$Alongside my work as a System Analyst, I serve as an Assistant Lecturer supporting Big Data and Data Analytics courses.

**What this involves**

- Designing hands-on lab exercises and case studies that give students practical experience with SQL and data analysis workflows.
- Mentoring students through course projects, from framing a problem and querying data to presenting findings.
- Reviewing student work and providing feedback aligned with the learning objectives set by the lead lecturer.$desc$,
  ARRAY['Data & Research', 'Technology Solutions'],
  'in-progress',
  true,
  '/images/projects/big-data-course-development/cover.jpg',
  ARRAY[]::text[],
  ARRAY['SQL', 'Data Analysis', 'Big Data Concepts', 'Teaching', 'Curriculum Design'],
  'Assistant Lecturer',
  '2023-09',
  NULL,
  '{}'::jsonb,
  ARRAY[
    'Develop lab exercises and case studies for Big Data and Data Analytics courses',
    'Mentor students on SQL-based data analysis projects, from problem framing to presenting findings',
    'Provide feedback on student work aligned with course learning objectives'
  ]
),
(
  'pkm-research-project',
  'PKM Research Project',
  'Led a university research team from proposal to completion (Program Kreativitas Mahasiswa)',
  'As Project Leader for a PKM-funded research initiative, I coordinated a small student research team through proposal development, data collection and analysis, and final reporting.',
  $desc$Program Kreativitas Mahasiswa (PKM) is a nationally funded student research and innovation program in Indonesia. As Project Leader, I was responsible for coordinating the team through each stage of the research lifecycle.

**My responsibilities**

- Coordinated a small research team, setting milestones and keeping the project on track from proposal to final report.
- Led data collection and analysis, applying structured research methods to test the project's hypotheses.
- Compiled findings into a final report and presentation for the funding review.$desc$,
  ARRAY['Data & Research', 'Technology Solutions'],
  'completed',
  false,
  '/images/projects/pkm-research-project/cover.jpg',
  ARRAY[]::text[],
  ARRAY['Research Methodology', 'Data Analysis', 'SQL', 'Project Coordination', 'Technical Writing'],
  'Project Leader',
  '2022-02',
  '2022-12',
  '{}'::jsonb,
  ARRAY[
    'Coordinated a student research team from initial proposal through to final reporting',
    'Applied structured research methods to collect and analyze project data',
    'Presented findings and outcomes to the program review committee'
  ]
);
