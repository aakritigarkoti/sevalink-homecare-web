import Footer from "@/components/layout/Footer";
import { HeroSearch } from "@/components/home/HeroSearch";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSearch />
      </main>
      <Footer />
    </div>
  );
}
