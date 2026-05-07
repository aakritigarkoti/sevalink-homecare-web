export const BOOKING_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type BookingStatus = typeof BOOKING_STATUS[keyof typeof BOOKING_STATUS];

export const STATUS_LABELS: Record<BookingStatus, string> = {
  pending: 'Waiting for provider',
  accepted: 'Accepted',
  in_progress: 'Service in progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};
