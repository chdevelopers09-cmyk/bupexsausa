// Mock data for UI demonstration — replace with Supabase queries in production

export const MOCK_STATS = {
  totalMembers: 347,
  activeMembers: 289,
  totalChapters: 12,
  upcomingEvents: 5,
  revenueThisMonth: 4250,
  revenueYTD: 28750,
  pendingApprovals: 8,
  totalDonations: 12400,
};

export const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Annual BUPEXSA USA Gala 2026',
    slug: 'annual-gala-2026',
    description: 'Our flagship annual dinner and awards ceremony celebrating alumni achievements and raising funds for scholarships.',
    start_datetime: '2026-06-14T18:00:00Z',
    end_datetime: '2026-06-14T23:00:00Z',
    location_name: 'Grand Ballroom, Marriott Marquis',
    location_address: '265 Peachtree Center Ave NE, Atlanta, GA 30303',
    category: 'Gala',
    thumbnail_path: '/images/events/gala.jpg',
    max_attendees: 300,
    is_published: true,
    rsvp_count: 187,
  },
  {
    id: '2',
    title: 'Texas Chapter Spring Meetup',
    slug: 'texas-spring-meetup-2026',
    description: 'A casual networking meetup for Texas chapter alumni. Come and reconnect with old classmates!',
    start_datetime: '2026-05-10T14:00:00Z',
    end_datetime: '2026-05-10T18:00:00Z',
    location_name: 'Allen\'s Landing Park',
    location_address: '100 Commerce St, Houston, TX 77002',
    category: 'Social',
    thumbnail_path: '/images/events/meetup.jpg',
    max_attendees: 80,
    is_published: true,
    rsvp_count: 34,
  },
  {
    id: '3',
    title: 'BUPEXSA Fundraiser Dinner — California',
    slug: 'california-fundraiser-2026',
    description: 'Join us for an evening of good food, great company, and impactful fundraising for PCSS Buea.',
    start_datetime: '2026-07-20T17:30:00Z',
    end_datetime: '2026-07-20T22:00:00Z',
    location_name: 'The Biltmore Hotel',
    location_address: '506 S Grand Ave, Los Angeles, CA 90071',
    category: 'Fundraiser',
    thumbnail_path: '/images/events/fundraiser.jpg',
    max_attendees: 150,
    is_published: true,
    rsvp_count: 61,
  },
  {
    id: '4',
    title: 'Annual General Meeting 2026',
    slug: 'agm-2026',
    description: 'The annual general meeting for all BUPEXSA USA members to elect officers and vote on key resolutions.',
    start_datetime: '2026-09-05T10:00:00Z',
    end_datetime: '2026-09-05T16:00:00Z',
    location_name: 'Virtual (Zoom)',
    location_address: 'Online',
    category: 'Meeting',
    thumbnail_path: '/images/events/agm.jpg',
    max_attendees: null,
    is_published: true,
    rsvp_count: 112,
  },
];

export const MOCK_CHAPTERS = [
  {
    id: '1',
    name: 'Texas Chapter',
    slug: 'texas',
    state: 'Texas',
    description: 'Serving BUPEXSA USA alumni across the great state of Texas, including Houston, Dallas, Austin, and San Antonio.',
    is_active: true,
    member_count: 84,
    banner_image_path: '/images/chapters/texas.jpg',
  },
  {
    id: '2',
    name: 'DMV Chapter',
    slug: 'maryland-dc',
    state: 'DC, Maryland & Virginia',
    description: 'Serving alumni in the greater DMV area — Washington DC, Maryland, and Northern Virginia. One of our most engaged communities.',
    is_active: true,
    member_count: 48,
    banner_image_path: '/images/chapters/maryland.jpg',
  },
];

export const MOCK_ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'Registration Open: Annual Gala 2026',
    body: 'Tickets are now available for our highly anticipated Annual Gala in Atlanta. Secure your seat before they sell out!',
    publish_date: '2026-04-01',
    is_published: true,
  },
  {
    id: '2',
    title: 'Scholarship Applications Due May 31',
    body: 'BUPEXSA USA is awarding $5,000 in scholarships to deserving students at PCSS Buea. Applications close May 31st.',
    publish_date: '2026-04-10',
    is_published: true,
  },
  {
    id: '3',
    title: 'New Chapter Launched: Pacific Northwest',
    body: 'We are excited to announce the formation of our Pacific Northwest Chapter covering Washington, Oregon, and Idaho.',
    publish_date: '2026-04-15',
    is_published: true,
  },
];

export const MOCK_LEADERSHIP = [
  {
    id: '1',
    slug: 'celine-njeck',
    name: 'Dr. Celine Ejoh Njeck',
    title: 'President of BUPEXSA USA',
    chapter: 'National',
    bio: 'Dr Celine is a dedicated leader who leverages her extensive background in Accounting, Finance, and technology strategy to drive organizational growth. Her leadership is deeply rooted in the resilience and values she cultivated during her formative years at PCSS Buea Town.',
    longBio: 'Based in Dallas, Texas, Dr. Njeck serves as a Program Technology Delivery Lead at Bank of America. She holds a Doctorate in Business Administration with a concentration in Technology Entrepreneurship, a foundation that informs both her corporate success and her humanitarian efforts. As the Board Chair of the U.S.-based non-profit CETALF, she is passionately committed to uplifting underprivileged children.\n\nIn her role as President of BUPEXSA USA, Dr. Njeck leads with integrity, humility, and strategic foresight, viewing her position as a calling to serve. Her vision focuses on fostering unity and connection within the community by expanding networking opportunities and bridging the gap between established alumni and the next generation of students, ensuring a thriving and supportive legacy for PCSS Buea Town.',
    education: [
      'Doctorate in Business Administration (Technology Entrepreneurship)',
      'Background in Accounting and Finance',
      'PCSS Buea Town - Class of 1998'
    ],
    achievements: [
      'Program Technology Delivery Lead at Bank of America',
      'Board Chair of CETALF (U.S.-based non-profit)',
      'President of BUPEXSA USA'
    ],
    photo_path: '/images/leadership/celine-njeck-actual.jpg',
    order: 1,
  },
  {
    id: '2',
    slug: 'grace-mbah-taylor',
    name: 'Mrs. Grace Mbah-Taylor',
    title: 'National Secretary General',
    chapter: 'National',
    bio: 'Grace is an attorney based in New York City. Class of 1998. She serves as the organizational backbone of BUPEXSA USA.',
    longBio: 'Mrs. Grace Mbah-Taylor is a senior corporate attorney specializing in international trade and compliance. Graduating from PCSS Buea in 1998, Grace has been a pivotal figure in the formalization of BUPEXSA USA as a registered non-profit organization. As Secretary General, she has implemented digital governance tools that have revolutionized how the board operates, ensuring transparency and efficient communication across all chapters. She is a firm believer in the power of the alumni network to create economic opportunities for young graduates.',
    education: [
      'JD from Columbia Law School',
      'BA in Political Science from Howard University',
      'PCSS Buea - Class of 1998'
    ],
    achievements: [
      'Authored the BUPEXSA USA National Constitution',
      'Established the Digital Member Directory',
      'Coordinated the first National Alumni Convention in DC'
    ],
    photo_path: '/images/leadership/secretary.jpg',
    order: 2,
  },
  {
    id: '3',
    slug: 'frida-meyali',
    name: 'Frida Meyali',
    title: 'National Treasurer',
    chapter: 'National',
    bio: 'Frida Meyali serves as the Treasurer for BUPEXSA USA, where she oversees financial stewardship, ensures transparency, and supports the organization’s strategic goals through effective fiscal management.',
    longBio: 'Frida Meyali serves as the Treasurer for BUPEXSA USA, where she oversees financial stewardship, ensures transparency, and supports the organization’s strategic goals through effective fiscal management. Based in Houston Texas, she plays a key role in budgeting, financial planning, and maintaining accountability, helping to sustain impactful programs that strengthen alumni engagement and community development.\n\nA proud alumna of the Batch of 1997, Frida is committed to fostering trust, collaboration, and responsible resource management within the BUPEXSA network. Her leadership style is grounded in integrity, organization, and consistency, ensuring that financial operations align with the association’s mission and long-term vision.\n\nProfessionally, Frida is a Registered Nurse (RN) with extensive experience in public health, patient-centered care, health promotion, and disease prevention. She has a strong background in community health and caring for diverse populations, with a focus on improving health outcomes through education, prevention, and evidence-based practice. Her clinical expertise, combined with her organizational and leadership skills, allows her to effectively bridge healthcare delivery and administrative excellence.\n\nFrida continues to advance her professional and academic development, with a growing interest in integrating nursing, public health, and data-driven strategies to improve population health outcomes. She remains dedicated to contributing to a vibrant, connected alumni community while promoting initiatives that support health awareness, professional growth, and collective impact.',
    education: [
      'Registered Nurse (RN)',
      'PCSS Buea - Batch of 1997'
    ],
    achievements: [
      'Treasurer of BUPEXSA USA',
      'Fiscal management and transparency lead',
      'Community health advocacy'
    ],
    photo_path: '/images/leadership/frida-meyali-actual.jpg',
    order: 3,
  },
  {
    id: '4',
    slug: 'narcisse-wilfried',
    name: 'Narcisse Wilfried Choo-Akung',
    title: 'Vice President',
    chapter: 'National',
    bio: 'Narcisse Wilfried Choo-Akung is a seasoned Agile and technology leader with over a decade of experience delivering enterprise-scale digital solutions across federal, healthcare, transportation, and SaaS ecosystems.',
    longBio: 'Narcisse Wilfried Choo-Akung is a seasoned Agile and technology leader with over a decade of experience delivering enterprise-scale digital solutions across federal, healthcare, transportation, and SaaS ecosystems. He currently serves as a Senior SAFe Scrum Master and Release Train Engineer (RTE), where he leads multiple cross-functional teams in delivering mission-critical systems, driving strategic alignment, and fostering continuous improvement in complex, regulated environments.\n\nWith deep expertise in Scaled Agile Framework (SAFe), Scrum, Lean Portfolio Management, and end-to-end product delivery, Narcisse has built a reputation for bridging business and technology, enabling high-performing teams, and delivering measurable value through Agile transformation and execution.\n\nBeyond his professional career, Narcisse is the Founder and CEO of CARZBNB, a pioneering digital mobility platform based in Cameroon, designed to transform how individuals and businesses access vehicle-related services across Africa. Through CARZBNB, he is driving innovation in car rentals, sales, logistics, and mobility ecosystems, positioning the platform as a leading solution for modern transportation needs.\n\nHe holds dual Master’s degrees in Management Information Systems and International Business Management, along with a strong academic foundation in Law and Business Law. His extensive certifications in SAFe and cloud technologies further reinforce his commitment to continuous learning and leadership excellence.\n\nAs Vice President of the Alumni Association, Narcisse brings a strategic, collaborative, and forward-thinking approach, focused on strengthening alumni engagement, fostering professional networks, and driving impactful initiatives that create lasting value for members globally.',
    education: [
      'Dual Master’s degrees in MIS and International Business Management',
      'Background in Law and Business Law',
      'PCSS Buea - Batch 1994'
    ],
    achievements: [
      'Senior SAFe Scrum Master and Release Train Engineer (RTE)',
      'Founder and CEO of CARZBNB',
      'Vice President of BUPEXSA Alumni Association'
    ],
    photo_path: '/images/leadership/narcisse-wilfried-actual.jpg',
    order: 4,
  },
  {
    id: '5',
    slug: 'cordelia-ngonde',
    name: 'Cordelia Ngonde',
    title: 'Social Coordinator',
    chapter: 'National',
    bio: 'Cordelia Ngonde serves as the Social Coordinator for BUPEXSA USA, where she is dedicated to fostering engagement, strengthening alumni connections, and curating impactful social experiences.',
    longBio: 'Cordelia Ngonde serves as the Social Coordinator for BUPEXSA USA, where she is dedicated to fostering engagement, strengthening alumni connections, and curating impactful social experiences that unite members across the diaspora. Based in Maryland, she brings a vibrant blend of creativity, structure, and leadership to her role.\n\nA proud alumna of the Class of 1999, Cordelia’s journey in social leadership has been both consistent and impactful. She served as Social Prefect from Form 4 through high school at PCSS Buea, continued as Social Coordinator in her department at the University of Buea, and has remained actively engaged in organizing and leading social initiatives within her communities to date. Her ability to bring people together is a defining strength that has shaped her leadership style.\n\nCordelia is currently pursuing a Doctorate in Healthcare Administration, reflecting her commitment to advancing leadership and driving meaningful impact within complex systems. Professionally, she is an Agile Scrum Lead with expertise in project management, team coordination, stakeholder engagement, and strategic execution. In addition, Cordelia is a dynamic Master of Ceremonies (MC), known for her ability to energize audiences, create memorable experiences, and seamlessly manage events. Her combined strengths in communication, organization, and engagement make her an invaluable asset to BUPEXSA USA.',
    education: [
      'Doctorate in Healthcare Administration (Candidate)',
      'University of Buea',
      'PCSS Buea - Class of 1999'
    ],
    achievements: [
      'Social Coordinator of BUPEXSA USA',
      'Agile Scrum Lead and Project Management expert',
      'Professional Master of Ceremonies (MC)'
    ],
    photo_path: '/images/leadership/cordelia-ngonde-actual.jpg',
    order: 5,
  },
  {
    id: '6',
    slug: 'simon-ayompe',
    name: 'Wanambowa Simon Ayompe',
    title: 'Chief Whip',
    chapter: 'National',
    bio: 'Wanambowa Simon Ayompe, of the BUPEXSA Class of ’96, serves as Chief Whip for BUPEXSA USA, ensuring structure and order within the organization.',
    longBio: 'Wanambowa Simon Ayompe, of the BUPEXSA Class of ’96, is based in Charlotte, North Carolina, where he serves as Chief Whip for BUPEXSA USA. In this role, he plays a vital part in maintaining structure, order, and effective coordination within the organization, ensuring that meetings are productive and aligned with the association’s goals. Known for his disciplined and dependable leadership style, Simon supports seamless communication between the Executive Committee and members while reinforcing accountability and organizational standards.\n\nProfessionally, Simon is a Data Security Analyst with a strong focus on safeguarding systems and ensuring data integrity across modern digital environments. His expertise in cybersecurity enables him to navigate complex technological landscapes, protect sensitive information, and contribute to the reliability and security of organizational systems. His analytical mindset and attention to detail make him highly effective in both his professional career and leadership role.\n\nBeyond his professional and leadership responsibilities, Simon is deeply committed to mentorship and capacity building. He actively supports and guides aspiring data security analysts, helping them develop the skills and confidence needed to succeed in the cybersecurity field. His passion for empowering others, combined with his dedication to excellence, makes him a valuable asset to BUPEXSA USA and a respected figure within both his professional and alumni communities.',
    education: [
      'Cybersecurity & Data Security Analysis',
      'PCSS Buea - Batch \'96'
    ],
    achievements: [
      'Chief Whip of BUPEXSA USA',
      'Professional Data Security Analyst',
      'Mentor in Cybersecurity'
    ],
    photo_path: '/images/leadership/simon-ayompe-actual.jpg',
    order: 6,
  },
  {
    id: '7',
    slug: 'ebot-leonel',
    name: 'Ebot Leonel',
    title: 'Deputy Secretariat General',
    chapter: 'National',
    bio: 'Ebot Leonel serves as the Deputy Secretariat General for BUPEXSA USA, representing the Batch of 1996, where he plays a key role in supporting strategic coordination and communication.',
    longBio: 'Ebot Leonel serves as the Deputy Secretariat General for BUPEXSA USA, representing the Batch of 1996, where he plays a key role in supporting strategic coordination, communication, and organizational effectiveness across the alumni network. Based in North Carolina, he brings a structured, results-oriented approach to strengthening alumni engagement, streamlining operations, and driving initiatives that create lasting value for members.\n\nA proud alumnus of the Class of 1996, Ebot is committed to fostering collaboration, enhancing transparency, and building strong connections within the BUPEXSA community. His leadership style is grounded in accountability, inclusiveness, and continuous improvement, ensuring that alumni programs are both impactful and sustainable.\n\nProfessionally, Ebot is a Senior Agile Program Manager and Business Systems Analyst with extensive experience leading cross-functional teams and delivering enterprise technology solutions in regulated environments. He brings expertise in strategic execution, stakeholder engagement, process optimization, and data-driven decision-making—skills he leverages to support BUPEXSA’s mission and long-term vision.\n\nEbot is currently pursuing a Master of Business Administration (MBA) at the University of North Carolina at Chapel Hill, further strengthening his leadership capabilities and strategic perspective. He remains dedicated to contributing to a vibrant, connected alumni community while advancing initiatives that promote professional growth, collaboration, and collective impact.',
    education: [
      'Master of Business Administration (Candidate) - UNC Chapel Hill',
      'PCSS Buea - Batch 1996'
    ],
    achievements: [
      'Deputy Secretariat General of BUPEXSA USA',
      'Senior Agile Program Manager',
      'Business Systems Analyst'
    ],
    photo_path: '/images/leadership/ebot-leonel-actual.jpg',
    order: 7,
  },
];

export const MOCK_GALLERY = [
  { id: '1', category: 'Gala', alt: 'Annual Gala 2025 dinner event', path: '/images/gallery/gala1.jpg' },
  { id: '2', category: 'Gala', alt: 'Awards ceremony at Gala', path: '/images/gallery/gala2.jpg' },
  { id: '3', category: 'Meetups', alt: 'Texas chapter spring meetup', path: '/images/gallery/meetup1.jpg' },
  { id: '4', category: 'Meetups', alt: 'California alumni gathering', path: '/images/gallery/meetup2.jpg' },
  { id: '5', category: 'PCSS Buea', alt: 'PCSS Buea main campus', path: '/images/gallery/pcss1.jpg' },
  { id: '6', category: 'PCSS Buea', alt: 'Historic school building', path: '/images/gallery/pcss2.jpg' },
  { id: '7', category: 'Community', alt: 'Scholarship award ceremony', path: '/images/gallery/community1.jpg' },
  { id: '8', category: 'Community', alt: 'Community outreach event', path: '/images/gallery/community2.jpg' },
];

export const SITE_CONFIG = {
  name: 'BUPEXSA USA',
  tagline: 'Connecting PCSS Buea Alumni Across America',
  description: 'BUPEXSA USA is the official alumni association of Presbyterian College Secondary School Buea, uniting graduates residing in the United States.',
  url: process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://bupexsausa.org'),
  email: 'info@bupexsausa.org',
  phone: '+1 (404) 555-0123',
  address: 'P.O. Box 12345, Atlanta, GA 30301',
  membershipFee: 150,
  annualFee: 100,
  registrationFee: 50,
  zelleHandle: 'payments@bupexsausa.org',
  cashappHandle: '$BUPEXSAUSA',
  socialLinks: {
    facebook: 'https://facebook.com/bupexsausa',
    instagram: 'https://instagram.com/bupexsausa',
    twitter: 'https://twitter.com/bupexsausa',
    youtube: 'https://youtube.com/@bupexsausa',
    whatsapp: 'https://wa.me/14045550123',
  },
  // Payment method mock handles & links
  payments: {
    stripe: {
      checkoutUrl: 'https://checkout.stripe.com/pay/cs_test_bupexsausa_100',
      publishableKey: 'pk_test_51BupexsaUSA000000000000000',
    },
    paypal: {
      email: 'treasurer@bupexsausa.org',
      clientId: 'AaBbCcDdEeFf-BUPEXSAUSA-MOCK-PAYPAL',
      checkoutUrl: 'https://www.paypal.com/paypalme/bupexsausa/100',
    },
    cashapp: {
      cashtag: '$BUPEXSAUSA',
      displayName: 'BUPEXSA USA Treasury',
    },
    zelle: {
      email: 'payments@bupexsausa.org',
      phone: '+1 (404) 555-0123',
      recipientName: 'BUPEXSA USA',
    },
    applePay: {
      merchantId: 'merchant.org.bupexsausa.pay',
      displayName: 'BUPEXSA USA',
    },
  },
};
