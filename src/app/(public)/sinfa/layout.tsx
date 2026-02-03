import "./site-css.css"
import FooterSite from "@/components/site-component/footer";
import HeaderSite from "@/components/site-component/header";

export default function SiteLayout({ children }:{children:React.ReactNode}) {

  return (
   <div className="site">
      <HeaderSite />
       
      {children}

      <FooterSite />
    </div>
  );
}