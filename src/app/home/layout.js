import Footer from "@/components/Footer";
import Header from "../../components/Header"; // Importamos el Header


export default function home({ children }) {
  return (
    <html>
      <body>
        <header>
      <Header/>
        </header>
      {children}

      <footer>
        <Footer />
      </footer>
      </body>
    </html>
  );
}
