import { UserRound, MapPin, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';

interface ProviderCardProps {
  id: string;
  name: string;
  qualification: string;
  category: string;
  experience: number;
  base_price: number;
  distance_km: number;
  availability?: string;
  onBook: (id: string) => void;
}

export const ProviderCard = ({
  id,
  name,
  qualification,
  category,
  experience,
  base_price,
  distance_km,
  availability = "Available Today",
  onBook,
}: ProviderCardProps) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between p-5 pb-4">
        <div className="flex gap-4">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0 border-2 border-white shadow-sm">
              <UserRound className="h-7 w-7" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 fill-white" />
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">{name}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <GraduationCap className="h-3 w-3" />
                {qualification}
              </span>
              <span className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
                <Briefcase className="h-3 w-3" />
                {experience} yrs exp
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50/50 px-2 py-1 rounded border border-emerald-100/50 inline-block uppercase tracking-wider">
                {category}
              </p>
              {availability && (
                <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {availability}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="flex flex-col items-end">
            <p className="text-xl font-black text-gray-900">₹{base_price}</p>
            <p className="text-[11px] text-gray-500 font-medium">/ visit</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/30 px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>{distance_km} km away</span>
        </div>
        <button
          type="button"
          onClick={() => onBook(id)}
          className="rounded-lg bg-emerald-600 px-8 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 shadow-md hover:shadow-lg active:scale-95"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};
