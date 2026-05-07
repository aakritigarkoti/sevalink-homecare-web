import { BookingStatus, STATUS_LABELS } from '@/lib/constants';
import { Clock, CheckCircle2, PlayCircle, CheckCircle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: BookingStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const label = STATUS_LABELS[status] || status;
  
  const styles: Record<BookingStatus, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-100',
    accepted: 'bg-blue-50 text-blue-700 border-blue-100',
    in_progress: 'bg-purple-50 text-purple-700 border-purple-100',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    cancelled: 'bg-red-50 text-red-700 border-red-100',
  };

  const icons: Record<BookingStatus, React.ReactNode> = {
    pending: <Clock className="h-3 w-3" />,
    accepted: <CheckCircle2 className="h-3 w-3" />,
    in_progress: <PlayCircle className="h-3 w-3" />,
    completed: <CheckCircle className="h-3 w-3" />,
    cancelled: <XCircle className="h-3 w-3" />,
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
      {icons[status]}
      {label}
    </span>
  );
};
