'use client'
import { Button } from "@/components/ui/button"

export default function Footer(){
    return(
      <footer className="footer">
        <div className="div1-footer">
          <img src="https://voae.unah.edu.hn/assets/footer-a.jpg" alt=""/>
        </div>

        <div className="div2-footer" style={{ display: "flex", flexDirection: "row", gap: "8px", alignItems: "center" }}>
        <p>VICERRECTORÍA DE ORIENTACIÓN Y ASUNTOS ESTUDIANTILES</p>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <img style={{ width: "18px", height: "18px" }} src="https://cdn-icons-png.flaticon.com/128/15/15874.png" alt="" />
          <a href="tel:22163043">Teléfonos: 2216-3043, 2216-3044, 2216-3045, 2216-3046</a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <img style={{ width: "18px", height: "18px" }} src="https://cdn-icons-png.flaticon.com/128/2165/2165061.png" alt="" />
          <a href="mailto:soportecampusvirtual@unah.edu.hn">soportecampusvirtual@unah.edu.hn</a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <img style={{ width: "18px", height: "18px" }} src="https://cdn-icons-png.flaticon.com/128/2165/2165061.png" alt="" />
            <a href="voae.cu@unah.edu.hn">voae.cu@unah.edu.hn</a>
        </div>
      </div>

        <div className="div3-footer" >
          <img src="https://cdn-icons-png.flaticon.com/128/1077/1077042.png" alt="" style={{width:"25px", height:"25px"}} />
          <img src="https://cdn-icons-png.flaticon.com/128/1384/1384005.png" alt="" style={{width:"25px", height:"25px"}} />
          <img src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png" alt="" style={{width:"25px", height:"25px"}} />
          <img src="https://cdn-icons-png.flaticon.com/128/2111/2111710.png" alt="" style={{width:"25px", height:"25px"}} />
        </div>
        <div className="div4-footer">
          <div>
            <img style={{width:"auto", height:"100px"}} src="https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//voaelogo2.png" alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px"}}>
            <p><strong>UNAH</strong> Universidad Nacional Autónoma de Honduras</p>
            <a href="/becaInfo">
              <Button className="secondary" variant="outline">Contáctanos</Button>
            </a>
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          </div>
          <div>
            <img style={{width:"auto", height:"100px"}}  src="https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//logo-unah.png" alt="" />
          </div>
        </div>
      </footer>
    )
}