export const projects = [
  {
    slug: 'taarom-astrologer-app',
    title: 'Taarom – Astrologer App',
    category: 'Astrology Platform Backend',
    summary:
      'Astrology platform connecting users with astrologers for chat, call and consultation. Built with real-time features and wallet system.',
    description:
      'Taarom connects users with certified astrologers for live chat, voice calls, horoscope readings, and consultation services. Features include real-time WebSockets, wallet integration, session history, and scalable NestJS backend microservices.',
    website: 'https://taarom.com',
    playstore: 'https://play.google.com/store/apps/details?id=com.taarom.app',
    icon: 'TR',
    metrics: [
      { label: 'Platform', value: 'Web + Mobile' },
      { label: 'Role', value: 'Backend Engineer' },
      { label: 'Focus', value: 'Real-time & Wallet' }
    ],
    features: [
      'Live chat and voice call consultation with WebSockets',
      'Wallet system with secure payment gateway integration',
      'Horoscope and kundli generation engine',
      'Astrologer availability tracking & queue management',
      'Admin analytics dashboard for revenue and sessions'
    ],
    stack: ['NestJS', 'MongoDB', 'Socket.io', 'AWS', 'Node.js', 'REST APIs'],
    results: [
      'Engineered real-time chat with 99.9% uptime',
      'Supported concurrent consultation calls with low latency',
      'Implemented secure wallet transaction history'
    ]
  },
  {
    slug: 'movement-baby',
    title: 'Movement Baby',
    category: 'Parenting & Baby Care App',
    summary:
      'Parenting & baby care app with expert guidance, articles, tracking and personalized suggestions.',
    description:
      'Movement Baby helps new parents track baby development milestones, vaccination schedules, sleep cycles, and daily feeding logs, backed by curated expert pediatric articles and personalized growth insights.',
    website: 'https://movementbaby.com',
    playstore: 'https://play.google.com/store/apps/details?id=com.movementbaby.app',
    icon: 'MB',
    metrics: [
      { label: 'Platform', value: 'Mobile' },
      { label: 'Role', value: 'Node.js Developer' },
      { label: 'Focus', value: 'Data & Tracking APIs' }
    ],
    features: [
      'Baby growth milestone and vaccination tracker',
      'Personalized expert articles & recommendations engine',
      'Daily feeding, sleep, and diaper logging APIs',
      'Push notification alerts for vaccination schedules',
      'MongoDB schemas optimized for rapid timeline queries'
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT Auth'],
    results: [
      'Reduced database response time for daily logs by 40%',
      'Built automated notification system for vaccinations',
      'Delivered clean API architecture for mobile app'
    ]
  },
  {
    slug: 'bullshift2020-admin-panel',
    title: 'Bullshift2020 – Admin Panel',
    category: 'MLM & Enterprise Operations',
    summary:
      'Admin panel for managing MLM operations, users, commissions and reports with advanced analytics.',
    description:
      'A comprehensive administrative dashboard system built to handle user management, binary tree commission calculations, withdrawal approvals, transaction reporting, and real-time operational analytics.',
    website: 'https://bullshift2020.com',
    playstore: 'https://bullshift2020.com',
    icon: 'BS',
    metrics: [
      { label: 'Platform', value: 'Admin Web Dashboard' },
      { label: 'Role', value: 'Backend Lead' },
      { label: 'Focus', value: 'Analytics & Commissions' }
    ],
    features: [
      'Automated commission calculation engine using PostgreSQL',
      'User hierarchy and genealogy tree management',
      'Financial reporting and ledger transaction logs',
      'Role-based access control (RBAC) with NestJS guards',
      'TypeORM query optimizations for complex report aggregations'
    ],
    stack: ['NestJS', 'PostgreSQL', 'TypeORM', 'Node.js', 'Redis', 'Docker'],
    results: [
      'Handled automated payout calculations for 50k+ active accounts',
      'Optimized query performance for financial reporting',
      'Zero downtime commission calculation cycles'
    ]
  }
];
