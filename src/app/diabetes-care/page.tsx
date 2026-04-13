import Image from 'next/image';
import Link from 'next/link';

import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const includedServices = [
  'Glucose monitoring',
  'Medication support',
  'Lifestyle guidance',
];

export default function DiabetesCarePage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, rgba(182,219,201,0.28), #ffffff)',
      }}
    >
      <Header />

      <main className="space-y-4 pt-[3.5rem] sm:pt-[4.5rem] md:pt-16">
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                Diabetes Care at Home
              </h1>
              <p className="mt-2 text-base text-gray-600">
                Manage diabetes effectively with regular monitoring and expert care at home.
              </p>

              <ul className="mt-6 space-y-1 text-sm leading-relaxed text-gray-700">
                <li>• Sugar level monitoring</li>
                <li>• Diet guidance</li>
                <li>• Routine checkups</li>
              </ul>

              <Link
                href="/select-location?service=diabetes-care"
                className="mt-8 inline-flex rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold !text-white visited:!text-white hover:!text-white active:!text-white shadow-md transition-all duration-200 ease-in-out hover:scale-105 hover:bg-emerald-700 hover:shadow-lg"
              >
                Book Now
              </Link>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <Image
                src="/images/Diabetes.jpg"
                alt="Diabetes care monitoring at home"
                width={1200}
                height={800}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">What&apos;s Included</h2>
            <ul className="space-y-2 text-gray-600">
              {includedServices.map((service) => (
                <li key={service}>• {service}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-6 max-w-6xl rounded-xl bg-gray-50 p-5">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              Starting from <span className="font-extrabold">₹399 per visit</span>
            </h2>
            <p className="text-sm text-gray-500">
              Final pricing may vary depending on service requirements
            </p>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl justify-center">
            <Link
              href="/select-location?service=diabetes-care"
              className="inline-flex rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold !text-white visited:!text-white hover:!text-white active:!text-white shadow-md transition-all duration-200 ease-in-out hover:scale-105 hover:bg-emerald-700 hover:shadow-lg"
            >
              Book Diabetes Care
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
