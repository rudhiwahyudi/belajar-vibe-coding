export interface TranslationDictionary {
  nav: {
    home: string
    projects: string
    journey: string
    certificates: string
    resume: string
    blog: string
    contact: string
    search: string
  }
  hero: {
    role: string
    tagline: string
    viewProjects: string
    getInTouch: string
    resume: string
    location: string
    availability: {
      'open-to-collab': string
      'open-to-roles': string
      'not-available': string
      'open-to-work': string
    }
  }
  focusAreas: {
    eyebrow: string
    title: string
    description: string
    items: {
      systemAnalysis: { title: string; desc: string }
      businessAnalysis: { title: string; desc: string }
      techSolutions: { title: string; desc: string }
      dataResearch: { title: string; desc: string }
    }
  }
  featuredProjects: {
    eyebrow: string
    title: string
    description: string
    viewAll: string
  }
  journey: {
    eyebrow: string
    title: string
    description: string
    viewFull: string
  }
  certificates: {
    eyebrow: string
    title: string
    description: string
    viewAll: string
  }
  blog: {
    eyebrow: string
    title: string
    description: string
    readBlog: string
  }
  contactCTA: {
    title: string
    subtitle: string
    getInTouch: string
  }
  contact: {
    title: string
    description: string
    form: {
      name: string
      email: string
      subject: string
      message: string
      sending: string
      send: string
      success: string
    }
  }
  footer: {
    tagline: string
    builtWith: string
  }
  commandPalette: {
    placeholder: string
    noResults: string
    navigate: string
    actions: string
    emailMe: string
    downloadResume: string
    toggleTheme: string
    toggleLang: string
  }
  notFound: {
    title: string
    description: string
    backHome: string
  }
  bio: {
    shortBio: string
  }
  projectsPage: {
    eyebrow: string
    title: string
    description: string
    filterAll: string
    noProjects: string
  }
  journeyPage: {
    eyebrow: string
    title: string
    description: string
    filterAll: string
    filterWork: string
    filterEducation: string
    filterMilestones: string
  }
  certificatesPage: {
    eyebrow: string
    title: string
    description: string
    filterAll: string
    noCertificatesYet: string
    noCertificatesMatch: string
  }
  resumePage: {
    loading: string
    notAvailable: string
    print: string
    downloadPdf: string
    summary: string
    experience: string
    education: string
    skills: string
  }
  blogPage: {
    eyebrow: string
    title: string
    description: string
    searchPlaceholder: string
    noPosts: string
  }
}

export const translations: Record<'en' | 'id', TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      journey: 'Journey',
      certificates: 'Certificates',
      resume: 'Resume',
      blog: 'Blog',
      contact: 'Contact',
      search: 'Search',
    },
    hero: {
      role: 'System Analyst',
      tagline: 'Business Process Analyst & Technology Problem Solver — turning business needs into practical system solutions.',
      viewProjects: 'View projects',
      getInTouch: 'Get in touch',
      resume: 'Résumé',
      location: 'Indonesia',
      availability: {
        'open-to-collab': 'Open to collaboration',
        'open-to-roles': 'Open to roles',
        'not-available': 'Not available',
        'open-to-work': 'Open to work',
      },
    },
    focusAreas: {
      eyebrow: 'What I do',
      title: 'Focus areas',
      description: 'A blend of analytical and technical disciplines that shape how I bridge business needs and technology.',
      items: {
        systemAnalysis: {
          title: 'System Analysis',
          desc: 'Gathering requirements, mapping workflows, and translating business needs into clear specifications for development teams.',
        },
        businessAnalysis: {
          title: 'Business Process Analysis',
          desc: 'Analyzing and improving business processes through BPMN mapping, gap analysis, and close stakeholder collaboration.',
        },
        techSolutions: {
          title: 'Technology Solutions',
          desc: 'Solving operational and system integration challenges with practical, well-documented technical solutions.',
        },
        dataResearch: {
          title: 'Data & Research',
          desc: 'Using SQL and data analysis to support decisions, teaching, and academic research.',
        },
      },
    },
    featuredProjects: {
      eyebrow: 'Selected work',
      title: 'Featured projects',
      description: 'A mix of business process analysis, system analysis, and data-driven initiatives.',
      viewAll: 'View all projects',
    },
    journey: {
      eyebrow: 'Journey',
      title: 'Recent milestones',
      description: "A snapshot of where I've worked, studied, and what I'm building toward next.",
      viewFull: 'View full journey',
    },
    certificates: {
      eyebrow: 'Certificates',
      title: 'Credentials & certifications',
      description: "A selection of professional certifications and courses I've completed.",
      viewAll: 'View all',
    },
    blog: {
      eyebrow: 'Writing',
      title: 'From the blog',
      description: 'Notes on business process analysis, system analysis, and data analytics.',
      readBlog: 'Read the blog',
    },
    contactCTA: {
      title: 'Have a role, project, or question in mind?',
      subtitle: "Let's talk.",
      getInTouch: 'Get in touch',
    },
    contact: {
      title: "Let's build something together",
      description: "Whether it's a role, a project, a collaboration, or just a question about business process and system analysis — I'd love to hear from you.",
      form: {
        name: 'Full Name',
        email: 'Email Address',
        subject: 'Subject',
        message: 'Message',
        sending: 'Sending...',
        send: 'Send Message',
        success: "Thanks for reaching out — I'll get back to you soon.",
      },
    },
    footer: {
      tagline: 'Business Process Analyst & Technology Problem Solver — turning business needs into practical system solutions.',
      builtWith: 'Built with React, Tailwind CSS, and Framer Motion.',
    },
    commandPalette: {
      placeholder: 'Type a command or search...',
      noResults: 'No results found.',
      navigate: 'Navigate',
      actions: 'Actions',
      emailMe: 'Email me',
      downloadResume: 'Download résumé',
      toggleTheme: 'Toggle theme',
      toggleLang: 'Switch language (ID/EN)',
    },
    notFound: {
      title: 'Page Not Found',
      description: "Sorry, the page you are looking for doesn't exist.",
      backHome: 'Go Back Home',
    },
    bio: {
      shortBio: 'System Analyst at Astra Credit Companies, focused on business process analysis, requirements gathering, and system integration — also an Assistant Lecturer in Big Data & Data Analytics.',
    },
    projectsPage: {
      eyebrow: 'Projects',
      title: "Things I've worked on",
      description: 'A selection of business process analysis, system analysis, and research-driven work — from my current role to academic projects.',
      filterAll: 'All',
      noProjects: 'No projects match this filter yet.',
    },
    journeyPage: {
      eyebrow: 'Journey',
      title: "Where I've been, and where I'm headed",
      description: 'A timeline of my work experience, education, and the milestones along the way.',
      filterAll: 'All',
      filterWork: 'Work',
      filterEducation: 'Education',
      filterMilestones: 'Milestones',
    },
    certificatesPage: {
      eyebrow: 'Certificates',
      title: 'Credentials & certifications',
      description: "Professional certifications and courses I've completed to sharpen my skills.",
      filterAll: 'All',
      noCertificatesYet: 'No certificates yet.',
      noCertificatesMatch: 'No certificates match this filter.',
    },
    resumePage: {
      loading: 'Loading resume...',
      notAvailable: 'Resume not available.',
      print: 'Print',
      downloadPdf: 'Download PDF',
      summary: 'Summary',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
    },
    blogPage: {
      eyebrow: 'Blog',
      title: 'Thoughts & writings',
      description: 'Notes on business process analysis, system analysis, and data analytics.',
      searchPlaceholder: 'Search articles...',
      noPosts: 'No articles found.',
    },
  },
  id: {
    nav: {
      home: 'Beranda',
      projects: 'Proyek',
      journey: 'Perjalanan',
      certificates: 'Sertifikat',
      resume: 'Resume',
      blog: 'Blog',
      contact: 'Kontak',
      search: 'Cari',
    },
    hero: {
      role: 'System Analyst',
      tagline: 'Analis Proses Bisnis & Pemecah Masalah Teknologi — mengubah kebutuhan bisnis menjadi solusi sistem praktis.',
      viewProjects: 'Lihat proyek',
      getInTouch: 'Hubungi saya',
      resume: 'Resume',
      location: 'Indonesia',
      availability: {
        'open-to-collab': 'Terbuka untuk kolaborasi',
        'open-to-roles': 'Terbuka untuk pekerjaan',
        'not-available': 'Tidak tersedia',
        'open-to-work': 'Terbuka untuk pekerjaan',
      },
    },
    focusAreas: {
      eyebrow: 'Apa yang saya lakukan',
      title: 'Fokus Utama',
      description: 'Perpaduan disiplin analisis dan teknis yang membentuk cara saya menjembatani kebutuhan bisnis dan teknologi.',
      items: {
        systemAnalysis: {
          title: 'Analisis Sistem',
          desc: 'Mengumpulkan kebutuhan, memetakan alur kerja, dan menerjemahkan kebutuhan bisnis menjadi spesifikasi yang jelas untuk tim pengembang.',
        },
        businessAnalysis: {
          title: 'Analisis Proses Bisnis',
          desc: 'Menggunakan pemetaan BPMN, analisis kesenjangan (gap analysis), serta kolaborasi erat dengan pemangku kepentingan untuk menganalisis dan meningkatkan proses bisnis.',
        },
        techSolutions: {
          title: 'Solusi Teknologi',
          desc: 'Menyelesaikan tantangan operasional dan integrasi sistem dengan solusi teknis yang praktis dan terdokumentasi dengan baik.',
        },
        dataResearch: {
          title: 'Data & Penelitian',
          desc: 'Menggunakan SQL dan analisis data untuk mendukung pengambilan keputusan, pengajaran, dan penelitian akademik.',
        },
      },
    },
    featuredProjects: {
      eyebrow: 'Pilihan karya',
      title: 'Proyek unggulan',
      description: 'Perpaduan analisis proses bisnis, analisis sistem, dan inisiatif berbasis data.',
      viewAll: 'Lihat semua proyek',
    },
    journey: {
      eyebrow: 'Perjalanan',
      title: 'Pencapaian terbaru',
      description: 'Linimasa pengalaman kerja, pendidikan, dan pencapaian saya sepanjang perjalanan.',
      viewFull: 'Lihat perjalanan lengkap',
    },
    certificates: {
      eyebrow: 'Sertifikat',
      title: 'Kredensial & sertifikasi',
      description: 'Pilihan sertifikasi profesional dan kursus yang telah saya selesaikan.',
      viewAll: 'Lihat semua',
    },
    blog: {
      eyebrow: 'Tulisan',
      title: 'Dari blog',
      description: 'Catatan tentang analisis proses bisnis, analisis sistem, dan analitik data.',
      readBlog: 'Baca blog',
    },
    contactCTA: {
      title: 'Punya lowongan, proyek, atau pertanyaan?',
      subtitle: 'Mari bicara.',
      getInTouch: 'Hubungi saya',
    },
    contact: {
      title: 'Mari membangun sesuatu bersama',
      description: 'Baik itu lowongan pekerjaan, proyek kerjasama, kolaborasi, atau sekadar pertanyaan mengenai analisis proses bisnis dan sistem — saya akan senang mendengar dari Anda.',
      form: {
        name: 'Nama Lengkap',
        email: 'Alamat Email',
        subject: 'Subjek',
        message: 'Pesan',
        sending: 'Mengirim...',
        send: 'Kirim Pesan',
        success: 'Terima kasih telah menghubungi — saya akan segera membalas pesan Anda.',
      },
    },
    footer: {
      tagline: 'Analis Proses Bisnis & Pemecah Masalah Teknologi — mengubah kebutuhan bisnis menjadi solusi sistem praktis.',
      builtWith: 'Dibuat dengan React, Tailwind CSS, dan Framer Motion.',
    },
    commandPalette: {
      placeholder: 'Ketik perintah atau cari...',
      noResults: 'Tidak ada hasil ditemukan.',
      navigate: 'Navigasi',
      actions: 'Tindakan',
      emailMe: 'Kirim email ke saya',
      downloadResume: 'Unduh resume',
      toggleTheme: 'Ubah tema',
      toggleLang: 'Ubah bahasa (ID/EN)',
    },
    notFound: {
      title: 'Halaman Tidak Ditemukan',
      description: 'Maaf, halaman yang Anda cari tidak dapat ditemukan.',
      backHome: 'Kembali ke Beranda',
    },
    bio: {
      shortBio: 'System Analyst di Astra Credit Companies, berfokus pada analisis proses bisnis, pengumpulan kebutuhan, dan integrasi sistem — juga Asisten Dosen di bidang Big Data & Data Analytics.',
    },
    projectsPage: {
      eyebrow: 'Proyek',
      title: 'Karya yang telah saya kerjakan',
      description: 'Pilihan analisis proses bisnis, analisis sistem, dan karya berbasis penelitian — mulai dari peran saya saat ini hingga proyek akademik.',
      filterAll: 'Semua',
      noProjects: 'Belum ada proyek yang cocok dengan filter ini.',
    },
    journeyPage: {
      eyebrow: 'Perjalanan',
      title: 'Tempat saya pernah berada, dan arah yang saya tuju',
      description: 'Linimasa pengalaman kerja, pendidikan, dan pencapaian saya sepanjang perjalanan.',
      filterAll: 'Semua',
      filterWork: 'Pekerjaan',
      filterEducation: 'Pendidikan',
      filterMilestones: 'Pencapaian',
    },
    certificatesPage: {
      eyebrow: 'Sertifikat',
      title: 'Kredensial & sertifikasi',
      description: 'Sertifikasi profesional dan kursus yang telah saya selesaikan untuk mengasah keahlian saya.',
      filterAll: 'Semua',
      noCertificatesYet: 'Belum ada sertifikat.',
      noCertificatesMatch: 'Tidak ada sertifikat yang cocok dengan filter ini.',
    },
    resumePage: {
      loading: 'Memuat resume...',
      notAvailable: 'Resume tidak tersedia.',
      print: 'Cetak',
      downloadPdf: 'Unduh PDF',
      summary: 'Ringkasan',
      experience: 'Pengalaman',
      education: 'Pendidikan',
      skills: 'Keahlian',
    },
    blogPage: {
      eyebrow: 'Blog',
      title: 'Pemikiran & tulisan',
      description: 'Catatan tentang analisis proses bisnis, analisis sistem, dan analitik data.',
      searchPlaceholder: 'Cari artikel...',
      noPosts: 'Artikel tidak ditemukan.',
    },
  },
}
