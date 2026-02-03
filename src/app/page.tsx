import HeaderSite from "@/components/site-component/header";
import HomePage from "./(public)/sinfa/page";
import FooterSite from "@/components/site-component/footer";

export default function Home() {
  return (
    <main className="text-white">
    <HeaderSite/>
     <HomePage />
     <FooterSite/>
    </main>
  );
}
