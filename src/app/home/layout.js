// import Footer from "@/components/Footer";
// import Header from "../../components/Header"; // Importamos el Header

// export default function home({ children }) {
//   return (
//     <html>
//       <body>
//         <header>
//       <Header/>
//         </header>
//       {children}
//       <footer>
//         <Footer />
//       </footer>
//       </body>
//     </html>
//   );
// }
import Footer from "@/components/Footer"
import Header from "../../components/Header"

export default function HomeLayout({ children }) {
  return (
    <>
      <header>
        <Header />
      </header>
      {children}
      <footer>
        <Footer />
      </footer>
    </>
  )
}