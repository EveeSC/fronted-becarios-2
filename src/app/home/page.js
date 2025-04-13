"use client";
import * as React from "react";
import { Button } from "../../components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
// import ModalLogin from "@/components/ModalLogin";
// import Header from "../components/Header.jsx"; // Importamos el Header

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-banner">APLICA A NUESTRO <br/> 
          PROGRAMA DE BECAS VOAE</h1>
        <a href="home/becaInfo">
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

      <div className="grid grid-cols-2 grid-rows-1 gap-4">
        <div className="flex justify-center items-center">
          <img style={{ width: "auto", height: "550px" }} src="https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//noticia02.jpg" alt="" />
        </div>
        <div className="flex justify-center items-center">
          <img style={{ width: "auto", height: "550px" }} src="https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//noticia01.jpg" alt="" />
        </div>
      </div>


      <div style={{padding: "40px 60px"}}>
        <center>
          <strong>
            <h1 className="visionMisionTitle">PREGUNTAS FRECUENTES</h1>
          </strong>
        </center>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>¿Qué es la VOAE y cuál es su función en la UNAH?</AccordionTrigger>
          <AccordionContent>
          La VOAE es la unidad encargada de brindar apoyo y orientación integral a los estudiantes de la UNAH. 
          Su objetivo es promover el bienestar estudiantil mediante programas de becas, acompañamiento académico, 
          orientación vocacional, tutorías y actividades de desarrollo personal y profesional.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>¿Cómo puedo solicitar una beca estudiantil?</AccordionTrigger>
          <AccordionContent>
          Debes ingresar al portal de la VOAE y acceder a la sección de becas. Ahí encontrarás los requisitos, 
          formularios y fechas de convocatoria. Es importante estar atento a los comunicados oficiales para no perderte 
          los plazos de aplicación.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>¿Qué servicios ofrece la VOAE a los estudiantes?</AccordionTrigger>
          <AccordionContent>
          <p>La VOAE ofrece una variedad de servicios orientados al bienestar y desarrollo integral de los estudiantes, tales como:</p>
            <ul>
              <li><strong>Becas:</strong> Apoyo económico para estudiantes con necesidades o méritos académicos.</li>
              <li><strong>Acompañamiento académico:</strong> Asesorías y tutorías personalizadas para mejorar el rendimiento académico.</li>
              <li><strong>Orientación vocacional:</strong> Apoyo en la toma de decisiones sobre tu carrera profesional y proyectos de vida.</li>
              <li><strong>Actividades culturales y recreativas:</strong> Espacios para el desarrollo de habilidades personales y el fortalecimiento de la comunidad estudiantil.</li>
              <li><strong>Atención a la diversidad estudiantil:</strong> Inclusión y apoyo a estudiantes con diferentes necesidades y condiciones.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>¿Dónde puedo acudir si tengo problemas académicos o personales?</AccordionTrigger>
          <AccordionContent>
          Puedes acudir directamente a las oficinas de la VOAE en tu campus o comunicarte por correo electrónico. El personal está capacitado para brindarte orientación, 
          ayudarte a identificar alternativas y canalizarte a otras instancias si es necesario.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>¿Cómo llegar a la VOAE en Ciudad Universitaria?</AccordionTrigger>
          <AccordionContent>
          La VOAE está ubicada en el Edificio VOAE, entre las canchas deportivas y la Dirección de Infraestructura
           y Proyectos de la UNAH (DIPP). Para llegar, ingresa al campus y dirígete hacia las canchas de fútbol. 
           El edificio se encuentra justo entre estas canchas y la DIPP.
          </AccordionContent>
        </AccordionItem>
      </Accordion>


      </div>
    </>
  );
}