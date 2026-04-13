import Link from 'next/link';
import Image from 'next/image';

import Footer from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import {
  getAgencyById,
  getServiceDetailsForAgency,
  getServiceDisplayLabel,
  normalizeSearchTerm,
  resolveServiceId,
} from '@/lib/home-care-search-data';
import { resolveServiceImage } from '@/lib/service-images';

type AgencyDetailPageProps = {
  params: {
    id: string;
  };
  searchParams?: {
    service?: string;
    location?: string;
  };
};

export default function AgencyDetailPage({ params, searchParams }: AgencyDetailPageProps) {
  const agency = getAgencyById(params.id);

  const requestedService = searchParams?.service ?? '';
  const requestedLocation = searchParams?.location ?? '';
  const normalizedService = normalizeSearchTerm(requestedService);
  const resolvedServiceId = resolveServiceId(normalizedService) || normalizedService;
  const selectedServiceId = agency?.services.includes(resolvedServiceId)
    ? resolvedServiceId
    : agency?.services[0] ?? 'nurse';
  const selectedServiceLabel = getServiceDisplayLabel(selectedServiceId);
  const selectedServiceDetails = agency ? getServiceDetailsForAgency(agency, selectedServiceId) : [];
  const otherServices = agency
    ? agency.services.filter((serviceId) => serviceId !== selectedServiceId)
    : [];

  if (!agency) {
    return (
      <div
        className="min-h-screen"
        style={{
          background: 'linear-gradient(to bottom, rgba(182,219,201,0.28), #ffffff)',
        }}
      >
        <Header />

        <main className="pt-[3.5rem] sm:pt-[4.5rem] md:pt-16">
          <section className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Agency not found</h1>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, rgba(182,219,201,0.28), #ffffff)',
      }}
    >
      <Header />

      <main className="pt-[3.5rem] sm:pt-[4.5rem] md:pt-16">
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-5 h-52 w-full overflow-hidden rounded-xl border border-gray-200">
                <Image
                  src={resolveServiceImage(selectedServiceId)}
                  alt={selectedServiceLabel}
                  width={1200}
                  height={400}
                  quality={100}
                  className="h-52 w-full object-cover"
                />
              </div>

              <p className="text-sm font-semibold text-emerald-700">
                Selected Service: {selectedServiceLabel}
              </p>

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{agency.name}</h1>
              <p className="mt-3 text-sm text-gray-600 sm:text-base">{agency.description}</p>
              <p className="mt-3 text-sm text-gray-700">Location: {agency.location}</p>

              <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedServiceLabel} Services at this Agency
                </h2>

                <div className="mt-3 space-y-3">
                  {selectedServiceDetails.map((detail) => (
                    <div key={detail.title}>
                      <p className="text-sm font-medium text-gray-900">{detail.title}</p>
                      <p className="text-sm text-gray-600">{detail.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-900">Other Services Offered</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {otherServices.length > 0 ? (
                    otherServices.map((serviceId) => (
                      <span
                        key={`${agency.id}-${serviceId}`}
                        className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600"
                      >
                        {getServiceDisplayLabel(serviceId)}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600">
                      No additional services
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={`/booking?service=${encodeURIComponent(selectedServiceId)}&location=${encodeURIComponent(requestedLocation || agency.location)}&agency=${encodeURIComponent(agency.id)}`}
                  className="inline-flex rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold !text-white visited:!text-white hover:!text-white active:!text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-emerald-700 hover:shadow-lg"
                >
                  Book {selectedServiceLabel} Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
