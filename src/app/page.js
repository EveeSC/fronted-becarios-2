"use client";
import "../app/globals.css"
import Header from "../components/Header.jsx";
import * as React from "react";
import { Button } from "../components/ui/button"


export default function Home() {

  return (
    <>
      <Header />

     <div>
      <h1 className="text-banner">APLICA A NUESTRO <br/> 
        PROGRAMA DE BECAS VOAE</h1>
      <a href="/becaInfo">
      <Button className="button-banner" variant="outline">MAS INFORMACION SOBRE BECAS AQUÍ</Button>
      </a>
      <img
        src={"https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//bannerfondo2.jpg"}
        className="w-full h-full object-cover"
      />
      </div>

      {/* Cajas de Visión y Misión */}
      <div className="visionMisionContainer">
        {/* Caja de Visión */}
        <div className="visionMisionBox">
          <div className="visionMisionTitle">VISIÓN</div>
          <p className="visionMisionParagraph">
            La VOAE en el 2020, será la instancia institucional responsable de velar y asegurar que se provean conocimientos y servicios de alta calidad y pertinencia a los estudiantes, utilizando y poniendo a disposición de éstos el talento humano, recursos logísticos, tecnológicos y financieros requeridos para lograr su eficiente y eficaz desempeño, para así contribuir a su formación humana y profesional integral; propiciando para todo ello, una articulación y coordinación interdisciplinaria entre las distintas unidades académicas y administrativas.
          </p>
        </div>

        {/* Caja de Misión */}
        <div className="visionMisionBox">
          <div className="visionMisionTitle">MISIÓN</div>
          <p className="visionMisionParagraph">
            Somos la instancia co-responsable de dirigir, orientar y promover el mejoramiento continuo e integral de los estudiantes en su quehacer académico, mediante la articulación y coordinación de las áreas de orientación y asesoría académica, salud integral, becas y estímulos educativos, atención diferenciada e inclusiva, promoción cultural y deportiva; canalizándolos al desarrollo estudiantil para el logro de su excelencia académica y profesional.
          </p>
        </div>
      </div>
    </>
  );
}
