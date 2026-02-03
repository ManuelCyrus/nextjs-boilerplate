import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import Main from "./main";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "SINFA",
  description: "Projeto Next.js com TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-BR"  className="light">
      <body className={montserrat.variable}>
        
        <AuthProvider>

        <Main children={children} />

        </AuthProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}


// hit: bem vindo a dery...