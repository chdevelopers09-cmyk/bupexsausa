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
    start_datetime: '2026-10-10T18:00:00Z',
    end_datetime: '2026-10-10T23:00:00Z',
    location_name: 'Friendship Center',
    location_address: '9055 Maier Rd Laurel, MD 20723',
    category: 'Gala',
    thumbnail_path: '/images/gallery/life2.jpg',
    max_attendees: 300,
    is_published: true,
    rsvp_count: 187,
  },
  {
    id: '2',
    title: 'SOME BUPEXSA USA ALUMNI',
    slug: 'texas-spring-meetup-2026',
    description: 'A casual networking meetup for Texas chapter alumni. Come and reconnect with old classmates!',
    start_datetime: '2026-05-10T14:00:00Z',
    end_datetime: '2026-05-10T18:00:00Z',
    location_name: 'Allen\'s Landing Park',
    location_address: '100 Commerce St, Houston, TX 77002',
    category: 'Social',
    thumbnail_path: '/images/events/alumni.jpg',
    max_attendees: 80,
    is_published: true,
    rsvp_count: 34,
  },
  {
    id: '3',
    title: 'SOME BUPEXSA USA ALUMNAE',
    slug: 'california-fundraiser-2026',
    description: 'Join us for an evening of good food, great company, and impactful fundraising for PCSS Buea.',
    start_datetime: '2026-07-20T17:30:00Z',
    end_datetime: '2026-07-20T22:00:00Z',
    location_name: 'The Biltmore Hotel',
    location_address: '506 S Grand Ave, Los Angeles, CA 90071',
    category: 'Fundraiser',
    thumbnail_path: '/images/events/alumnae.png',
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
    thumbnail_path: '/images/gallery/life3.jpg',
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
    banner_image_path: '',
  },
  {
    id: '2',
    name: 'DC/Maryland/VA Chapter',
    slug: 'maryland-dc',
    state: 'DC/Maryland/VA',
    description: 'Serving alumni in the DC, Maryland, and Virginia area. One of our most engaged communities.',
    is_active: true,
    member_count: 48,
    banner_image_path: '',
  },
];

export const MOCK_ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'BUPEXSA USA REGISTRATION',
    body: 'All BUPEXSANS residing in the USA are encouraged to formerly register. Endeavor to pay your yearly dues before the end of March every year.',
    publish_date: '2026-05-01',
    is_published: true,
  },
  {
    id: '2',
    title: 'BUPEXSA USA YEARLY CONVENTION',
    body: 'BUPEXSA USA will be having its yearly conventions in October, during the Columbus Day weekend. All BUPEXSANS are encouraged to secure that weekend for our yearly meet up because it will be our moment to network with more classmates, school mates, and BUPEXSANS in all works of life.',
    publish_date: '2026-05-02',
    is_published: true,
  },
  {
    id: '3',
    title: 'BUPEXSA USA AS A NON-PROFIT ORGANIZATION',
    body: 'BUPEXSA USA is a formerly registered with the Internal Revenue Service (IRS) as a 501 (C ) 3 non-profit organization. This organization can receive and give donations – material and financial, and report them yearly,',
    publish_date: '2026-05-03',
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
    batch: '1998',
    bio: 'Dr Njeck is a dedicated leader who leverages her extensive background in Accounting, Finance, and Technology strategy to drive organizational growth. Her leadership is deeply rooted in the resilience and values she cultivated during her formative years at PCSS Buea Town.',
    longBio: 'Dr Njeck is a dedicated leader who leverages her extensive background in Accounting, Finance, and Technology strategy to drive organizational growth. Her leadership is deeply rooted in the resilience and values she cultivated during her formative years at PCSS Buea Town, which continue to inspire her lifelong commitment to service.\n\nBased in Dallas, Texas, Dr. Njeck serves as a Program Technology Delivery Lead at Bank of America. She holds a Doctorate in Business Administration with a concentration in Technology Entrepreneurship, a foundation that informs both her corporate success and her humanitarian efforts. As the Board Chair of the U.S.-based non-profit (CETALF), she is passionately committed to uplifting underprivileged children. She is a career coach and mentor to many young men and women, and her passion for Ping Pong and soccer makes her a very dynamic leader.\n\nIn her role as President of BUPEXSA USA, Dr. Njeck leads with integrity, humility, and strategic foresight, viewing her position as a call to serve. Her vision focuses on fostering unity and connection within the community by expanding networking opportunities and bridging the gap between established alumni and the next generation of students, ensuring a thriving and supportive legacy for PCSS Buea Town.',
    education: [
      'Doctorate in Business Administration (Technology Entrepreneurship)',
      'Background, MBA in Accounting',
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
    slug: 'narcisse-wilfried',
    name: 'Narcisse Wilfried Choo-Akung',
    title: 'Vice President',
    chapter: 'National',
    batch: '1994',
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
    order: 2,
  },
  {
    id: '3',
    slug: 'theophile-awambeng',
    name: 'Theophile Awambeng',
    title: 'National Secretary General',
    chapter: 'National',
    batch: '2000',
    bio: 'Theophile Awambeng currently serves as the Secretary General of BUPEXSA USA. A proud member of the Batch of 2000, he brings a wealth of experience in alumni engagement.',
    longBio: 'Theophile Awambeng currently serves as the Secretary General of BUPEXSA USA. A proud member of the Batch of 2000, he brings a wealth of experience in alumni engagement, having served in various capacities across multiple alumni organizations around the world.\n\nHe is known for his strong organizational skills, dedication, and collaborative spirit. As a proactive and hardworking team player, Theophile has consistently contributed to the success of alumni initiatives. In his current role, he leverages these strengths to support the restructuring of BUPEXSA USA, with a focus on expanding membership, strengthening engagement, and developing impactful programs and projects that ensure long-term sustainability.\n\nProfessionally, Theophile is a Veterinarian and Social Worker with over a decade of experience. He is also multitalented, highly adaptable, and skilled at multitasking—qualities that further enhance his effectiveness both within and beyond the alumni community.\n\nLocation: MINNESOTA, USA',
    education: [
      'Veterinarian and Social Worker',
      'PCSS Buea - Batch 2000'
    ],
    achievements: [
      'National Secretary General of BUPEXSA USA',
      'Over a decade of experience in Veterinary and Social Work',
      'Multitalented and highly adaptable team player'
    ],
    photo_path: '/images/leadership/theophile-awambeng.png',
    order: 3,
  },
  {
    id: '4',
    slug: 'ebot-leonel',
    name: 'Ebot Leonel',
    title: 'Assistant Secretary General',
    chapter: 'National',
    batch: '1996',
    bio: 'Ebot Leonel serves as the Assistant Secretary General for BUPEXSA USA. Based in Maryland, he is a logistics and operations specialist with a commitment to organizational efficiency.',
    longBio: 'Ebot Leonel serves as the Assistant Secretary General for BUPEXSA USA. Based in Maryland, he is a logistics and operations specialist with a commitment to organizational efficiency and member engagement. He plays a vital role in coordinating the administrative functions of our board and ensuring smooth communication across our national network.',
    education: [
      'B.S. in Logistics and Supply Chain Management',
      'PCSS Buea - Class of 1996'
    ],
    achievements: [
      'Assistant Secretary General of BUPEXSA USA',
      'Operations Specialist'
    ],
    photo_path: '/images/leadership/ebot-leonel-actual.jpg',
    order: 4,
  },
  {
    id: '5',
    slug: 'frida-meyali',
    name: 'Frida Meyali',
    title: 'National Treasurer',
    chapter: 'National',
    batch: '1997',
    bio: 'Frida Meyali serves as the Treasurer for BUPEXSA USA, where she oversees financial stewardship, ensures transparency, and supports the organization’s strategic goals.',
    longBio: 'Frida Meyali serves as the Treasurer for BUPEXSA USA, where she oversees financial stewardship, ensures transparency, and supports the organization’s strategic goals through effective fiscal management. Based in Houston Texas, she plays a key role in budgeting, financial planning, and maintaining accountability, helping to sustain impactful programs that strengthen alumni engagement and community development.\n\nA proud alumna of the Batch of 1997, Frida is committed to fostering trust, collaboration, and responsible resource management within the BUPEXSA network. Her leadership style is grounded in integrity, organization, and consistency, ensuring that financial operations align with the association’s mission and long-term vision.\n\nProfessionally, Frida is a Registered Nurse (RN) with extensive experience in public health, patient-centered care, health promotion, and disease prevention. She has a strong background in community health and caring for diverse populations, with a focus on improving health outcomes through education, prevention, and evidence-based practice. Her clinical expertise, combined with her organizational and leadership skills, allows her to effectively bridge healthcare delivery and administrative excellence.',
    education: [
      'Registered Nurse (RN)',
      'PCSS Buea - Batch of 1997'
    ],
    achievements: [
      'Treasurer of BUPEXSA USA',
      'Fiscal management and transparency lead',
      'Community health advocacy'
    ],
    photo_path: '/images/leadership/frida-meyali-actual.jpeg',
    order: 5,
  },
  {
    id: '6',
    slug: 'simon-ayompe',
    name: 'Wanambowa Simon Ayompe',
    title: 'Chief Whip',
    chapter: 'National',
    batch: '1996',
    bio: 'Wanambowa Simon Ayompe, of the BUPEXSA Class of ’96, serves as Chief Whip for BUPEXSA USA, ensuring structure and order within the organization.',
    longBio: 'Wanambowa Simon Ayompe, of the BUPEXSA Class of ’96, is based in Charlotte, North Carolina, where he serves as Chief Whip for BUPEXSA USA. In this role, he plays a vital part in maintaining structure, order, and effective coordination within the organization, ensuring that meetings are productive and aligned with the association’s goals. Known for his disciplined and dependable leadership style, Simon supports seamless communication between the Executive Committee and members while reinforcing accountability and organizational standards.\n\nProfessionally, Simon is a Data Security Analyst with a strong focus on safeguarding systems and ensuring data integrity across modern digital environments. His expertise in cybersecurity enables him to navigate complex technological landscapes, protect sensitive information, and contribute to the reliability and security of organizational systems. His analytical mindset and attention to detail make him highly effective in both his professional career and leadership role.',
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
    slug: 'cordelia-ngonde',
    name: 'Cordelia Ngonde',
    title: 'Executive PRO',
    chapter: 'National',
    batch: '1999',
    bio: 'Cordelia Ngonde serves as the Executive PRO for BUPEXSA USA, where she is dedicated to fostering engagement, strengthening alumni connections, and curating impactful social experiences.',
    longBio: 'Cordelia Ngonde serves as the Executive PRO for BUPEXSA USA, where she is dedicated to fostering engagement, strengthening alumni connections, and curating impactful social experiences that unite members across the diaspora. Based in Maryland, she brings a vibrant blend of creativity, structure, and leadership to her role.\n\nA proud alumna of the Class of 1999, Cordelia’s journey in social leadership has been both consistent and impactful. She served as Social Prefect from Form 4 through high school at PCSS Buea, continued as Social Coordinator in her department at the University of Buea, and has remained actively engaged in organizing and leading social initiatives within her communities to date. Her ability to bring people together is a defining strength that has shaped her leadership style.\n\nCordelia is currently pursuing a Doctorate in Healthcare Administration, reflecting her commitment to advancing leadership and driving meaningful impact within complex systems. Professionally, she is an Agile Scrum Lead with expertise in project management, team coordination, stakeholder engagement, and strategic execution. In addition, Cordelia is a dynamic Master of Ceremonies (MC), known for her ability to energize audiences, create memorable experiences, and seamlessly manage events. Her combined strengths in communication, organization, and engagement make her an invaluable asset to BUPEXSA USA.',
    education: [
      'Doctorate in Healthcare Administration (Candidate)',
      'University of Buea',
      'PCSS Buea - Class of 1999'
    ],
    achievements: [
      'Executive PRO of BUPEXSA USA',
      'Agile Scrum Lead and Project Management expert',
      'Professional Master of Ceremonies (MC)'
    ],
    photo_path: '/images/leadership/cordelia-ngonde-actual.jpg',
    order: 7,
  },
  {
    id: '8',
    slug: 'tayim-cidoline',
    name: 'Tayim Cidoline',
    title: 'Financial Secretary | BUPEXSA USA',
    chapter: 'National',
    batch: '1998',
    bio: 'Tayim Cido, fondly known as Cocolistic by her 1998 classmates, currently serves as the Financial Secretary of BUPEXSA USA. Based in Maryland, she is recognized for her strong sense of responsibility, integrity, and commitment.',
    longBio: 'Tayim Cido, fondly known as Cocolistic by her 1998 classmates, currently serves as the Financial Secretary of BUPEXSA USA. Based in Maryland, she is recognized for her strong sense of responsibility, integrity, and commitment to ensuring effective financial management and transparency within the organization.\n\nShe is an accomplished nursing professional with a Master of Science in Nursing (MSN) in Informatics and is currently pursuing a Doctor of Nursing Practice (DNP) in Executive Leadership and Organizational Management. Her expertise bridges clinical care, technology, and leadership, equipping her to contribute meaningfully to both healthcare advancement and organizational excellence.\n\nA devoted mother, Christian, and community-oriented leader, Tayim is passionate about service and personal growth. She enjoys staying active through fitness and yoga, as well as engaging in travel, cooking, meditation, and self-care. Deeply committed to the BUPEXSA mission, she continues to remain actively involved and intentional about supporting initiatives that strengthen and unite the alumni community.',
    education: [
      'Master of Science in Nursing (MSN) in Informatics',
      'Doctor of Nursing Practice (DNP) in Executive Leadership (Pursuing)',
      'PCSS Buea Town - Class of 1998'
    ],
    achievements: [
      'Financial Secretary of BUPEXSA USA',
      'Accomplished Nursing Professional'
    ],
    photo_path: '/images/leadership/tayim-cidoline.jpg',
    order: 8,
  },
  {
    id: '9',
    slug: 'sylvia-dasi',
    name: 'Sylvia Dasi, Ph.D, MBA',
    title: 'Public Relations Officer',
    chapter: 'National',
    batch: '1997',
    bio: 'Dr. Sylvia Dasi is a geneticist with a deep-rooted passion for public health and human development. She has extensive experience in genetics research and global health awareness.',
    longBio: 'Dr. Sylvia Dasi is a geneticist with a deep-rooted passion for public health and human development. Her interest in genetics began at the University of Maryland Eastern Shore (UMES), where she majored in Biology and was selected for the prestigious Minority Access to Research Careers Scholar Program, established by the National Institutes of Health.\n\nThrough this program, she received advanced training from institutions such as the Jackson Laboratory, the University of Maryland Biotechnology Institute, and the National Institutes of Health (NHGRI and NIA), focusing on the genetic causes of human diseases. Her early exposure to genetics sparked a lifelong dedication to understanding human susceptibility to diseases and advancing control and prevention strategies.\n\nGraduating in 2008 with a Bachelor of Science degree, Dr. Dasi was recognized as the Most Outstanding Student in the Department of Agriculture and Natural Sciences. She then pursued her doctoral studies at Howard University, focusing on identifying DNA changes that might indicate breast cancer progression in women of African descent. She earned her Ph.D. in Human Genetics in 2014, along with a certificate in International Studies.\n\nDr. Dasi extended her expertise beyond academia into public and global health, particularly in breast cancer awareness within the African immigrant communities in the Washington, D.C. metropolitan area. She collaborated with the African Women’s Cancer Awareness Association (AWCAA) to coordinate medical missions to Cameroon, Nigeria, and Tanzania, delivering culturally competent health education on breast cancer awareness, prevention, and control in rural African communities.\n\nIn 2023, she further expanded her expertise by earning a Master of Business Administration (MBA) with a specialization in project management from Walden University. Throughout her career, Dr. Dasi has received numerous accolades for her scholarly contributions, including a Proclamation of Academic Achievement from the Prince George’s County Executive (2008), the Comcast Student Achievement Award (2004), and the State of Maryland Governor’s Volunteer Service Certificate (2013).',
    education: [
      'Ph.D. in Human Genetics, Howard University (2014)',
      'MBA in Project Management, Walden University (2023)',
      'B.S. in Biology, UMES (2008)',
      'PCSS Buea Town - Class of 1997'
    ],
    achievements: [
      'Public Relations Officer of BUPEXSA USA',
      'Proclamation of Academic Achievement from Prince George’s County Executive',
      'State of Maryland Governor’s Volunteer Service Certificate'
    ],
    photo_path: '/images/leadership/sylvia-dasi.jpg',
    order: 9,
  },
  {
    id: '10',
    slug: 'osong-baron',
    name: 'Emeritus Osong Baron',
    title: '1st BUPEXSA USA President',
    chapter: 'National',
    batch: '1994',
    bio: 'Honoring our former BUPEXSA USA Presidents (Our Advisers). Emeritus Osong Baron served as the first President of BUPEXSA USA, laying the groundwork for our association.',
    longBio: 'Emeritus Osong Baron served as the first President of BUPEXSA USA, laying the groundwork for the association’s growth and unity. He currently serves as a valued adviser to the executive bench, providing strategic guidance and historical perspective to the current leadership.\n\nHis commitment to the PCSS Buea alumni community has been instrumental in fostering the long-term sustainability of the organization. As a former president, he continues to inspire new generations of alumni to serve and give back to their alma mater.',
    education: [
      'Founding Member of BUPEXSA USA',
      'PCSS Buea Town Alumnus'
    ],
    achievements: [
      '1st President of BUPEXSA USA',
      'Executive Adviser to the Board',
      'Pioneer of the National Alumni Network'
    ],
    photo_path: '/images/leadership/osong-baron.jpg',
    order: 10,
    hideProfile: true,
  },
  {
    id: '11',
    slug: 'pancratius-mukeh',
    name: 'EMERITUS Pancratius Mukeh',
    title: '2nd BUPEXSA USA President',
    chapter: 'National',
    batch: '1995',
    bio: 'Honoring our former BUPEXSA USA Presidents (Our Advisers). Emeritus Pancratius Mukeh served as the second President of BUPEXSA USA.',
    longBio: 'Emeritus Pancratius Mukeh served as the second President of BUPEXSA USA, during which he focused on strengthening state chapters and formalizing the organization’s structure. His leadership was marked by a commitment to expanding the association’s reach and impact across the United States.\n\nToday, he continues to serve as an adviser, offering his deep experience and wisdom to the current executive bench.',
    education: [
      'PCSS Buea Town Alumnus'
    ],
    achievements: [
      '2nd President of BUPEXSA USA',
      'Architect of State Chapter Growth',
      'Senior Executive Adviser'
    ],
    photo_path: '/images/leadership/pancratius-mukeh.jpg',
    order: 11,
    hideProfile: true,
  },
];

export const MOCK_GALLERY = [


  { id: '2b', category: 'Social', alt: 'BUPEXSA USA Gathering', path: '/images/gallery/bupexsa-gathering.jpg' },
  { id: '1', category: 'Convention', alt: 'BUPEXSA Alumni Convention', path: '/images/gallery/life2.jpg' },
  { id: '3', category: 'Chapter', alt: 'Chapter Meeting Engagement', path: '/images/gallery/life3.jpg' },
  { id: '4', category: 'Community', alt: 'BUPEXSA Member Support', path: '/images/gallery/life4.jpg' },
  { id: '5', category: 'Apparel', alt: 'BUPEXSA USA Chapter Shirts', path: '/images/gallery/life5.jpg' },
  { id: '6', category: 'Apparel', alt: 'Official Chapter Gear', path: '/images/gallery/life6.jpg' },
  { id: '7', category: 'Convention', alt: 'Group Photo with Guest', path: '/images/membership/group.jpg' },
  { id: '22', category: 'Social', alt: 'Church community fellowship', path: '/images/gallery/community-2.jpg' },
  { id: '23', category: 'Social', alt: 'Group selfie at alumni event', path: '/images/gallery/community-3.jpg' },
  { id: '24', category: 'Convention', alt: 'BUPEXSANS in purple scarves', path: '/images/gallery/community-4.jpg' },
  { id: '25', category: 'Social', alt: 'Alumni couple at fellowship night', path: '/images/gallery/community-5.jpg' },
  { id: '16', category: 'Memories', alt: 'Old school friends catching up', path: '/images/gallery/memories-1.jpg' },
  { id: '17', category: 'Memories', alt: 'Group photo of alumni brothers', path: '/images/gallery/memories-2.jpg' },
  { id: '18', category: 'Memories', alt: 'Alumni gathering on a ledge', path: '/images/gallery/memories-3.jpg' },
  { id: '19', category: 'Social', alt: 'Modern fellowship gathering', path: '/images/gallery/memories-4.jpg' },
  { id: '20', category: 'Memories', alt: 'Childhood school memories', path: '/images/gallery/memories-5.jpg' },
  { id: '26', category: 'Memories', alt: 'Students in Human Rights shirts', path: '/images/gallery/legacy-1.jpg' },
  { id: '27', category: 'Memories', alt: 'PCSS Choir and Graduation group', path: '/images/gallery/legacy-2.jpg' },
  { id: '28', category: 'Apparel', alt: 'Mountain Whispers 20th Anniversary Edition', path: '/images/gallery/legacy-3.jpg' },
  { id: '21', category: 'Social', alt: 'Alumni gathering at PCC Dallas', path: '/images/gallery/community-1.jpg' },
];

export const SITE_CONFIG = {
  name: 'BUPEXSA USA',
  tagline: 'Connecting PCSS Buea Alumni Across America',
  description: 'BUPEXSA USA is the official alumni association of Presbyterian College Secondary School Buea, uniting graduates residing in the United States.',
  url: process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://bupexsausa.org'),
  email: 'bupexsausa25@gmail.com',
  phone: '+1 (404) 555-0123',
  address: 'P.O. Box 12345, Atlanta, GA 30301',
  membershipFee: 150,
  annualFee: 100,
  registrationFee: 50,
  zelleHandle: 'bupexsausa25@gmail.com',
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
      email: 'bupexsausa25@gmail.com',
      clientId: 'AaBbCcDdEeFf-BUPEXSAUSA-MOCK-PAYPAL',
      checkoutUrl: 'https://www.paypal.com/paypalme/bupexsausa/100',
    },
    cashapp: {
      cashtag: '$BUPEXSAUSA',
      displayName: 'BUPEXSA USA Treasury',
    },
    zelle: {
      email: 'bupexsausa25@gmail.com',
      phone: '+1 (404) 555-0123',
      recipientName: 'BUPEXSA USA',
    },
    applePay: {
      merchantId: 'merchant.org.bupexsausa.pay',
      displayName: 'BUPEXSA USA',
    },
  },
};
