import { StatusBadge } from '@/components/ui/StatusBadge';
import { BookingStatus } from '@/lib/constants';
import { Calendar, MapPin, UserRound } from 'lucide-react';

interface BookingCardProps {
  id: string;
  provider_name: string;
  category: string;
  scheduled_at: string;
  address: string;
  status: BookingStatus;
}

export const BookingCard = ({
  provider_name,
  category,
  scheduled_at,
  address,
  status,
}: BookingCardProps) => {
  const dateObj = new Date(scheduled_at);
  const formattedDate = dateObj.toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
  const formattedTime = dateObj.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition duration-200">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <UserRound className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{provider_name}</h3>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{category}</p>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="space-y-3 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="font-medium">{formattedDate} at {formattedTime}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="truncate">{address}</span>
          </div>
        </div>
      </div>
      
      {status === 'completed' && (
        <div className="bg-emerald-50/50 px-5 py-3 border-t border-emerald-50">
          <button className="text-xs font-bold text-emerald-700 hover:underline">Download Invoice</button>
        </div>
      )}
    </div>
  );
};
