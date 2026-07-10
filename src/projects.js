export const projects = [
  {
    slug: 'tl-ke-bolo-platform',
    title: 'TL Ke Bolo',
    category: 'Community Platform Backend',
    summary:
      'A production community platform backend covering profiles, subscriptions, coupons, messaging, and location-based discovery.',
    description:
      'TL Ke Bolo brings community discovery, messaging, membership benefits, and promotional coupons into one scalable product experience. The backend focus includes reliable API workflows, reusable service modules, and practical data models for user engagement.',
    website: 'https://tlkebolo.com',
    playstore: 'https://play.google.com/store/apps/details?id=com.tlkebolo.app',
    icon: 'TL',
    metrics: [
      { label: 'Platform', value: 'Web + Mobile' },
      { label: 'Role', value: 'Backend Lead' },
      { label: 'Focus', value: 'NestJS APIs' }
    ],
    features: [
      'User profiles with badges and membership status',
      'Subscription and coupon workflows',
      'Direct messaging and community interactions',
      'Location-based discovery for nearby users',
      'Admin-ready backend structure for managing platform data'
    ],
    stack: ['NestJS', 'Node.js', 'TypeScript', 'MongoDB', 'REST APIs', 'JWT Auth'],
    results: [
      'Built reusable backend modules for future features',
      'Improved user discovery with location-aware flows',
      'Supported web and mobile clients from a single API layer'
    ]
  },
  {
    slug: 'auth-service',
    title: 'Authentication Service',
    category: 'Secure API Infrastructure',
    summary:
      'A reusable Node.js authentication layer with JWT sessions, role-based access, validation, and protected route patterns.',
    description:
      'A backend authentication service designed for SaaS and marketplace products. It keeps auth logic modular with clear DTOs, guards, hashed credentials, refresh-ready sessions, and role-based authorization.',
    website: 'https://tlkebolo.com',
    playstore: 'https://play.google.com/store/apps/details?id=com.tlkebolo.app',
    icon: 'AU',
    metrics: [
      { label: 'Layer', value: 'Auth API' },
      { label: 'Role', value: 'Backend Dev' },
      { label: 'Focus', value: 'Security' }
    ],
    features: [
      'JWT-based login and protected API routes',
      'Role-based permissions for users and admins',
      'Request validation with typed DTO patterns',
      'Password hashing and secure credential handling',
      'Reusable guards for product modules'
    ],
    stack: ['Node.js', 'NestJS', 'TypeScript', 'JWT', 'MongoDB', 'REST APIs'],
    results: [
      'Reduced repeated auth logic across product modules',
      'Improved API access control clarity',
      'Created a maintainable base for future backend services'
    ]
  },
  {
    slug: 'coupon-subscription-api',
    title: 'Coupon & Subscription API',
    category: 'Business Workflow Backend',
    summary:
      'A backend workflow for coupons, memberships, subscription status, and admin-managed promotional rules.',
    description:
      'A business-focused API layer for handling membership benefits, coupon availability, redemption flows, and admin controls. The implementation emphasizes predictable service boundaries and clean data updates.',
    website: 'https://tlkebolo.com',
    playstore: 'https://play.google.com/store/apps/details?id=com.tlkebolo.app',
    icon: 'CS',
    metrics: [
      { label: 'Workflow', value: 'Coupons' },
      { label: 'Role', value: 'API Dev' },
      { label: 'Focus', value: 'Data Rules' }
    ],
    features: [
      'Coupon creation and redemption workflows',
      'Membership-aware offer availability',
      'Admin APIs for managing promotions',
      'Status tracking for user benefits',
      'Structured data models for business rules'
    ],
    stack: ['NestJS', 'Node.js', 'MongoDB', 'TypeScript', 'REST APIs', 'Docker'],
    results: [
      'Made promotional workflows easier to manage',
      'Improved consistency in coupon and subscription state',
      'Kept business rules isolated from client-side code'
    ]
  }
];
