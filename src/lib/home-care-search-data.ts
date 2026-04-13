export type ServiceDetailItem = {
  title: string;
  description: string;
};

export type HomeCareAgency = {
  id: string;
  name: string;
  description: string;
  services: string[];
  location: string;
  address: string;
  rating?: number;
  experienceYears?: number;
  availability?: string;
  priceFrom?: number;
  serviceDetails: Partial<Record<string, ServiceDetailItem[]>>;
};

type ServiceSearchRule = {
  id: string;
  aliases: string[];
};

export const homeCareAgencies: HomeCareAgency[] = [
  {
    id: 'carebridge',
    name: 'CareBridge Home Health',
    description: 'Coordinated home-care team with nurses, rehab specialists, and doctor visits.',
    services: ['nurse', 'physiotherapy', 'elder-care', 'doctor-visit'],
    location: 'Rajkot',
    address: 'Kalawad Road, Rajkot, Gujarat',
    rating: 4.8,
    experienceYears: 11,
    availability: 'Available Today',
    priceFrom: 599,
    serviceDetails: {
      nurse: [
        { title: 'ICU Care', description: 'Critical care nursing support with continuous patient observation.' },
        { title: 'Home Nursing', description: 'Daily in-home nursing for medication, vitals, and recovery care.' },
        { title: 'Post-surgery Care', description: 'Structured post-operative monitoring and dressing support.' },
        { title: 'Elder Care Support', description: 'Nursing and assisted support for elderly patients at home.' },
      ],
      physiotherapy: [
        { title: 'Pain Management Therapy', description: 'Targeted physio plans for chronic pain and stiffness.' },
        { title: 'Mobility Rehabilitation', description: 'Guided recovery programs to improve movement and balance.' },
      ],
      'doctor-visit': [
        { title: 'General Consultation', description: 'At-home physician visit for acute and routine concerns.' },
      ],
      'elder-care': [
        { title: 'Daily Elder Assistance', description: 'Routine care, supervision, and support for senior comfort.' },
      ],
    },
  },
  {
    id: 'healing-hands',
    name: 'Healing Hands Agency',
    description: 'Experienced nursing and elder support focused on safe in-home recovery.',
    services: ['nurse', 'elder-care'],
    location: 'Ahmedabad',
    address: 'Satellite Road, Ahmedabad, Gujarat',
    rating: 4.7,
    experienceYears: 9,
    availability: 'Available Today',
    priceFrom: 549,
    serviceDetails: {
      nurse: [
        { title: 'ICU Care', description: 'Specialized nursing for high-dependency and critical cases at home.' },
        { title: 'Home Nursing', description: 'Professional nursing care for long-term and short-term needs.' },
        { title: 'Post-surgery Care', description: 'Recovery-focused support after discharge and operations.' },
        { title: 'Elder Care Support', description: 'Nurse-backed care plans for age-related health management.' },
      ],
      'elder-care': [
        { title: 'Companion Care', description: 'Compassionate companionship and routine daily support.' },
      ],
    },
  },
  {
    id: 'mobility-first',
    name: 'Mobility First Physio Network',
    description: 'Dedicated physiotherapy network for pain management and mobility rehab.',
    services: ['physiotherapy'],
    location: 'Surat',
    address: 'Vesu Main Road, Surat, Gujarat',
    rating: 4.9,
    experienceYears: 8,
    availability: 'Next Slot in 2 hrs',
    priceFrom: 699,
    serviceDetails: {
      physiotherapy: [
        { title: 'Neck and Shoulder Therapy', description: 'Targeted sessions for posture and upper-body pain relief.' },
        { title: 'Back and Spine Therapy', description: 'Rehabilitation exercises for back pain and spinal mobility.' },
        { title: 'Knee and Mobility Therapy', description: 'Strength and movement programs for knee recovery and balance.' },
      ],
    },
  },
  {
    id: 'smile-on-call',
    name: 'Smile On Call Dental',
    description: 'At-home dental consultation support for urgent and follow-up oral care.',
    services: ['dentist'],
    location: 'Vadodara',
    address: 'Alkapuri Circle, Vadodara, Gujarat',
    rating: 4.6,
    experienceYears: 7,
    availability: 'Available Today',
    priceFrom: 799,
    serviceDetails: {
      dentist: [
        { title: 'Dental Consultation', description: 'At-home oral assessment for pain, swelling, and urgent concerns.' },
        { title: 'Post-procedure Follow-up', description: 'Recovery checks and oral-care guidance after dental procedures.' },
      ],
    },
  },
  {
    id: 'seva-senior',
    name: 'Seva Senior Support',
    description: 'Compassionate senior-focused care with dependable nurse assistance.',
    services: ['elder-care', 'nurse'],
    location: 'Rajkot',
    address: 'University Road, Rajkot, Gujarat',
    rating: 4.8,
    experienceYears: 10,
    availability: 'Available Today',
    priceFrom: 499,
    serviceDetails: {
      nurse: [
        { title: 'Home Nursing', description: 'Routine nursing support for medication and health monitoring.' },
        { title: 'Elder Care Support', description: 'Senior-focused nursing for chronic and age-related conditions.' },
      ],
      'elder-care': [
        { title: 'Daily Assistance', description: 'Help with meals, mobility, and personal routine management.' },
        { title: 'Companionship', description: 'Emotional and social support for better quality of life.' },
      ],
    },
  },
  {
    id: 'homedoctor-plus',
    name: 'HomeDoctor Plus',
    description: 'Physician-led home consultation with coordinated care follow-ups.',
    services: ['doctor-visit', 'dentist'],
    location: 'Ahmedabad',
    address: 'Prahlad Nagar, Ahmedabad, Gujarat',
    rating: 4.7,
    experienceYears: 12,
    availability: 'Next Slot in 1 hr',
    priceFrom: 899,
    serviceDetails: {
      'doctor-visit': [
        { title: 'General Physician Visit', description: 'Medical consultation at home for common health concerns.' },
        { title: 'Chronic Follow-up', description: 'Follow-up visits for BP, diabetes, and ongoing treatment plans.' },
      ],
      dentist: [
        { title: 'Oral Pain Assessment', description: 'At-home screening for dental pain and oral discomfort.' },
      ],
    },
  },
  {
    id: 'mindcare-at-home',
    name: 'MindCare At Home',
    description: 'Mental wellness team offering counseling, stress support, and therapy-led home sessions.',
    services: ['mental-health'],
    location: 'Ahmedabad',
    address: 'C.G. Road, Ahmedabad, Gujarat',
    rating: 4.8,
    experienceYears: 6,
    availability: 'Available Today',
    priceFrom: 999,
    serviceDetails: {
      'mental-health': [
        {
          title: 'Counseling Session',
          description: 'One-on-one emotional support session for stress, anxiety, and life challenges.',
        },
        {
          title: 'Stress Support Session',
          description: 'Guided stress management with practical coping and breathing techniques.',
        },
        {
          title: 'Wellness Follow-up',
          description: 'Planned follow-up sessions to track progress and strengthen mental wellness.',
        },
      ],
    },
  },
];

export const demoHomeCareAgencies: HomeCareAgency[] = [
  {
    id: 'demo-nurse-carebridge',
    name: 'CareBridge Demo Health',
    description: 'Demo agency for testing home nursing booking flow.',
    services: ['nurse'],
    location: 'Demo City',
    address: 'Demo Healthcare Street, Demo City',
    rating: 4.6,
    experienceYears: 5,
    availability: 'Available Today',
    priceFrom: 499,
    serviceDetails: {
      nurse: [
        { title: 'Home Nursing', description: 'Demo nursing support for booking-flow testing.' },
        { title: 'ICU Support', description: 'Demo ICU nurse coverage for advanced care needs.' },
      ],
    },
  },
  {
    id: 'demo-physio-mobility',
    name: 'Mobility Demo Physio Center',
    description: 'Demo agency for physiotherapy appointments and rehab plans.',
    services: ['physiotherapy'],
    location: 'Demo City',
    address: 'Demo Rehab Avenue, Demo City',
    rating: 4.5,
    experienceYears: 4,
    availability: 'Next Slot in 1 hr',
    priceFrom: 599,
    serviceDetails: {
      physiotherapy: [
        { title: 'Pain Relief Session', description: 'Demo session for pain management workflow.' },
        { title: 'Mobility Rehab', description: 'Demo rehabilitation program for movement recovery.' },
      ],
    },
  },
  {
    id: 'demo-diabetes-support',
    name: 'Demo Diabetes Support Hub',
    description: 'Demo provider for diabetes-care booking and follow-up flow.',
    services: ['diabetes-care'],
    location: 'Demo City',
    address: 'Demo Wellness Park, Demo City',
    rating: 4.4,
    experienceYears: 3,
    availability: 'Available Today',
    priceFrom: 549,
    serviceDetails: {
      'diabetes-care': [
        { title: 'Sugar Monitoring', description: 'Demo sugar check and management support.' },
        { title: 'Routine Guidance', description: 'Demo diet and routine tracking for testing flow.' },
      ],
    },
  },
  {
    id: 'demo-mental-mindcare',
    name: 'MindCare Demo Wellness',
    description: 'Demo provider for counseling and mental-health support booking.',
    services: ['mental-health'],
    location: 'Demo City',
    address: 'Demo Calm Lane, Demo City',
    rating: 4.7,
    experienceYears: 6,
    availability: 'Available Today',
    priceFrom: 699,
    serviceDetails: {
      'mental-health': [
        { title: 'Counseling Session', description: 'Demo counseling flow for emotional support.' },
        { title: 'Stress Support', description: 'Demo stress support and wellness planning.' },
      ],
    },
  },
  {
    id: 'demo-elder-seva',
    name: 'Seva Demo Elder Assistance',
    description: 'Demo elder-care provider for end-to-end booking testing.',
    services: ['elder-care'],
    location: 'Demo City',
    address: 'Demo Senior Road, Demo City',
    rating: 4.5,
    experienceYears: 5,
    availability: 'Available Today',
    priceFrom: 529,
    serviceDetails: {
      'elder-care': [
        { title: 'Daily Support', description: 'Demo elder daily-living support workflow.' },
        { title: 'Companion Care', description: 'Demo companion care booking simulation.' },
      ],
    },
  },
  {
    id: 'demo-doctor-homevisit',
    name: 'HomeVisit Demo Doctors',
    description: 'Demo doctor-visit agency for consultation booking tests.',
    services: ['doctor-visit'],
    location: 'Demo City',
    address: 'Demo Clinic Circle, Demo City',
    rating: 4.6,
    experienceYears: 7,
    availability: 'Next Slot in 2 hrs',
    priceFrom: 749,
    serviceDetails: {
      'doctor-visit': [
        { title: 'General Consultation', description: 'Demo home consultation booking flow.' },
        { title: 'Follow-up Visit', description: 'Demo follow-up doctor visit support.' },
      ],
    },
  },
  {
    id: 'demo-postsurgery-recovery',
    name: 'Recovery Demo Home Care',
    description: 'Demo post-surgery provider to keep booking flow uninterrupted.',
    services: ['post-surgery'],
    location: 'Demo City',
    address: 'Demo Recovery Street, Demo City',
    rating: 4.5,
    experienceYears: 4,
    availability: 'Available Today',
    priceFrom: 649,
    serviceDetails: {
      'post-surgery': [
        { title: 'Recovery Monitoring', description: 'Demo recovery checks and follow-up support.' },
        { title: 'Wound Assistance', description: 'Demo dressing and wound support service.' },
      ],
    },
  },
];

const serviceSearchRules: ServiceSearchRule[] = [
  {
    id: 'nurse',
    aliases: ['nurse', 'nursing', 'icu care', 'home nursing', 'nurse at home', 'caregiver'],
  },
  {
    id: 'physiotherapy',
    aliases: ['physiotherapy', 'physio', 'rehab', 'mobility', 'pain relief', 'exercise therapy'],
  },
  {
    id: 'diabetes-care',
    aliases: ['diabetes', 'diabetes care', 'diabetic care', 'sugar care'],
  },
  {
    id: 'mental-health',
    aliases: ['mental', 'mental health', 'mental-health', 'mental health support', 'therapy', 'counseling', 'counselling'],
  },
  {
    id: 'elder-care',
    aliases: ['elder care', 'elder', 'senior care', 'aging support', 'companion care'],
  },
  {
    id: 'doctor-visit',
    aliases: ['doctor', 'doctor visit', 'physician', 'general consultation', 'home doctor'],
  },
  {
    id: 'post-surgery',
    aliases: ['post surgery', 'post-surgery', 'post op', 'post-operative', 'surgery recovery'],
  },
  {
    id: 'dentist',
    aliases: ['dentist', 'dental', 'tooth pain', 'oral care', 'home dentist'],
  },
];

export const normalizeSearchTerm = (value: string) => value.trim().toLowerCase();

export const resolveServiceMatch = (query: string) => {
  const normalizedQuery = normalizeSearchTerm(query);

  if (!normalizedQuery) {
    return null;
  }

  return (
    serviceSearchRules.find((service) =>
      service.aliases.some(
        (alias) =>
          alias.includes(normalizedQuery) ||
          normalizedQuery.includes(alias) ||
          normalizedQuery.includes(service.id) ||
          service.id.includes(normalizedQuery),
      ),
    ) ?? null
  );
};

export const filterAgenciesByService = (query: string) => {
  const match = resolveServiceMatch(query);

  if (!match) {
    return [] as HomeCareAgency[];
  }

  return homeCareAgencies.filter((agency) => agency.services.includes(match.id));
};

export const getDemoAgenciesForService = (query: string) => {
  const match = resolveServiceMatch(query);

  if (!match) {
    return [] as HomeCareAgency[];
  }

  return demoHomeCareAgencies.filter((agency) => agency.services.includes(match.id));
};

export const resolveServiceId = (query: string) => resolveServiceMatch(query)?.id ?? '';

export const getAgencyById = (agencyId: string) =>
  homeCareAgencies.find((agency) => agency.id === agencyId) ??
  demoHomeCareAgencies.find((agency) => agency.id === agencyId) ??
  null;

export const getServiceLabelForBooking = (serviceId: string) => {
  switch (serviceId) {
    case 'nurse':
      return 'Nursing Care';
    case 'elder-care':
      return 'Elder Care';
    case 'doctor-visit':
      return 'Doctor Visit';
    case 'post-surgery':
      return 'Post-Surgery';
    case 'physiotherapy':
      return 'Physiotherapy';
    case 'diabetes-care':
      return 'Diabetes Care';
    case 'mental-health':
      return 'Mental Health Support';
    case 'dentist':
      return 'Doctor Visit';
    default:
      return 'Nursing Care';
  }
};

export const getServiceDisplayLabel = (serviceId: string) => {
  switch (serviceId) {
    case 'nurse':
      return 'Nursing Care';
    case 'elder-care':
      return 'Elder Care';
    case 'doctor-visit':
      return 'Doctor Visit';
    case 'post-surgery':
      return 'Post-Surgery';
    case 'physiotherapy':
      return 'Physiotherapy';
    case 'diabetes-care':
      return 'Diabetes Care';
    case 'mental-health':
      return 'Mental Health Support';
    case 'dentist':
      return 'Dentist';
    default:
      return 'Home Care';
  }
};

export const getSubServiceOptionsForPrimary = (serviceId: string) => {
  switch (serviceId) {
    case 'nurse':
      return [
        'Nurse at Home',
        'ICU Nurse',
        'Post-Surgery Nursing',
        'Elder Nursing Care',
        'Injection and IV Care',
        'Bedridden Patient Care',
      ];
    case 'physiotherapy':
      return ['Neck and Shoulder Therapy', 'Back and Spine Therapy', 'Knee and Mobility Therapy'];
    case 'elder-care':
      return ['Daily Living Support', 'Companionship Care', 'Assisted Mobility Care'];
    case 'doctor-visit':
      return ['General Physician Visit', 'Chronic Condition Follow-up', 'Post-Discharge Review'];
    case 'post-surgery':
      return ['Wound Dressing Support', 'Recovery Monitoring', 'Mobility Assistance'];
    case 'diabetes-care':
      return ['Sugar Monitoring Support', 'Diet and Routine Guidance', 'Insulin and Injection Support'];
    case 'mental-health':
      return ['Counseling Session', 'Stress Support Session', 'Wellness Follow-up'];
    case 'dentist':
      return ['General Dental Consultation', 'Pain Assessment Visit', 'Post-Procedure Follow-up'];
    default:
      return ['General Home Care Support'];
  }
};

export const getServiceDetailsForAgency = (agency: HomeCareAgency, serviceId: string): ServiceDetailItem[] => {
  const detailedItems = agency.serviceDetails[serviceId];

  if (detailedItems?.length) {
    return detailedItems;
  }

  return getSubServiceOptionsForPrimary(serviceId).map((title) => ({
    title,
    description: `${title} is available under this agency's ${getServiceDisplayLabel(serviceId)} support program.`,
  }));
};
