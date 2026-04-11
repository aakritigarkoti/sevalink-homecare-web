import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeroSearch } from "@/components/home/HeroSearch";

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
