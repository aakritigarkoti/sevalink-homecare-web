import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeroSearch } from "@/components/home/HeroSearch";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-14 sm:pt-18 md:pt-16">
        <HeroSearch />
      </main>
      <Footer />
    </div>
  );
}
