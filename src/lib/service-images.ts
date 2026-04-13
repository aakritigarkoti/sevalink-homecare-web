import { normalizeSearchTerm } from '@/lib/home-care-search-data';

const serviceImages: Record<string, string> = {
  nurse: '/assets/images/nurse.webp',
  doctor: '/assets/images/doctor.jpg',
  'doctor-visit': '/assets/images/doctor.jpg',
  physiotherapy: '/assets/images/physiotherapy_images.jpg',
  eldercare: '/assets/images/family-service.webp',
  'elder-care': '/assets/images/family-service.webp',
  mental: '/assets/images/mental_health.png',
  'mental-health': '/assets/images/mental_health.png',
  ambulance: '/assets/images/ambulance.png',
  'post-surgery': '/assets/images/patient.jpg',
  'diabetes-care': '/assets/images/Diabetes.jpg',
};

const aliases: Record<string, string> = {
  nursing: 'nurse',
  'nurse at home': 'nurse',
  'doctor visit': 'doctor-visit',
  'doctor-visit': 'doctor-visit',
  'post operative care': 'post-surgery',
  'post-operative care': 'post-surgery',
  'post-surgery': 'post-surgery',
  'mental health support': 'mental-health',
  'elder care': 'elder-care',
  'diabetes management': 'diabetes-care',
};

export const resolveServiceImage = (serviceId: string) => {
  const normalized = normalizeSearchTerm(serviceId);
  const resolved = aliases[normalized] ?? normalized;

  return serviceImages[resolved] ?? '/assets/images/nurse.webp';
};
