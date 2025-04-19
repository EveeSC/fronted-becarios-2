'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function becaInfo() {
    const [listaPublicaciones, setListaPublicaciones] = useState([]);

  useEffect(() => {
    const obtenerPublicaciones = async () => {
      try {
        const response = await axios.get('http://localhost:3031/api/obtener_publicaciones');
        setListaPublicaciones(response.data);
        console.log("publicaciones", response.data);
      } catch (error) {
        console.error('Error al obtener publicaciones:', error);
      }
    };

    obtenerPublicaciones();
  }, []);

    return (
      <>
          <div className="grid grid-cols-[2fr_1fr] grid-rows-auto gap-2">
            <div className="flex items-center justify-center flex-col gap-y-6 h-fit">
              <h1 className={` text-base/10 font-semibold text-gray-900`}>MODALIDADES DE BECAS Y CREDITOS EDUCATIVOS</h1>
              <p className="pl-[40px] pr-[40px] text-justify">
              <strong>Beca Excelencia Académica Categoría “A” </strong>
              Es una asignación mensual no reembolsable de L2,000.00 que se otorga durante el año académico a estudiantes 
              de Primer Ingreso cuyo promedio académico de Educación Secundaria sea igual o superior a 90%.
              Para los estudiantes de Reingreso índice debe ser de 90% de un mínimo de 10 asignaturas aprobadas en el año académico anterior.
              </p>

              <p className="pl-[40px] pr-[40px] text-justify">
                <strong>Beca Excelencia Académica Categoría “B” </strong>
                Es una asignación mensual no reembolsable de L1,680.00 a estudiantes universitarios de reingreso cuyo índice  académico sea igual o superior 
                a 80% de un mínimo de 10 asignaturas aprobadas en el año académico anterior, o las que el plan exija.
              </p>

              <p className="pl-[40px] pr-[40px] text-justify">
              <strong>Beca Equidad Alma Mater </strong>
              Es la oportunidad de acceso y permanencia a la educación superior mediante un sistema solidario de becas para estudiantes provenientes 
              de zonas postergadas, escasos recursos económicos, y con excelencia académica, con deseos de continuar su formación académica en la UNAH.
              </p>

              <p className="pl-[40px] pr-[40px] text-justify">
              <strong>Beca Apoyo al Deporte </strong>
              Consiste en una asignación mensual no reembolsable de L1,840.00 que se le otorga al estudiante durante el año académico que además de su 
              carrera universitaria, representa a la UNAH en diferentes disciplinas deportivas, y mantiene un índice académico de 75%.
              </p>

              <p className="pl-[40px] pr-[40px] text-justify">
              <strong>Beca Apoyo al Arte </strong>
              Es un asignación mensual no reembolsable de L1,840.00 que se otorga a estudiantes universitarios, durante el año académico,
              que además de la carrera que estudia participan en representación de la UNAH en grupos artísticos de danza, música y coro cuyo promedio académico sea igual o superior al 75%.
              </p>

              <p className="pl-[40px] pr-[40px] text-justify">
              <strong>Beca por Desempeño Estudiantil </strong>
              Es una asignación mensual no reembolsable orientada a la generación de oportunidades y estímulos que garantice la permanencia y promoción 
              de estudiantes de grado, con índice académico de 75%, mediante su aporte a programas, proyectos de distintas Unidades Académicas y Administrativas de la Institución. Para que el o los estudiantes
              desarrollen sus capacidades, habilidades y competencias en el ámbito profesional. La asignación mensual dependerá del presupuesto que cada unidad asigne para este fin.
              </p>

              <p className="pl-[40px] pr-[40px] text-justify">
              <strong>Préstamo educativo a largo plazo </strong>
              Es una facilidad crediticia que se otorga al Estudiante como complemento para cubrir sus gastos. Su asignación mensual 
              es de L.1, 840.00.
              </p>
              
            </div>
            <div className="flex items-center justify-center flex-col gap-2">
              <div>
              <img style={{ width: "auto", height: "650px" }} src="https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//bannerlateral1.jpg" alt="" />
              </div>
              <div>
                <a href="https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//Requisitos_Becas.pdf?download=1" download>
                <button style={{width: "270px", fontSize:"10px"}} className="buttonDownload">REQUISITOS PARA OPTAR A UNA BECA</button>
                </a>
              </div>
              <div>
                <a href="becaInfo/formSolicitud">
                <Button  style={{width: "270px", fontSize:"10px", backgroundColor:"#253A69", color:"white"}} variant="outline">¡APLICA A UNA BECA AQUÍ!</Button>
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center h-fit">
              <Accordion type="single" collapsible className="w-full p-[40px]">
              <AccordionItem value="item-1">
                <AccordionTrigger>Historia</AccordionTrigger>
                  <AccordionContent>
                     <p className="pl-[40px] pr-[40px] text-justify">
                     Este programa de Becas surge según el art. Nº 54 de la Ley Orgánica de 1959, por el honorable Claustro Pleno Universitario, 
                     mediante la asignación presupuestaria a fin de que esta unidad cumpliera la función primordial de atender los diversos problemas 
                     y necesidades de los estudiantes, basándose en el contexto histórico, mismo el que se funda el programa de crédito educativo
                      “La universidad dará protección a sus alumnos y procurará su bienestar y mejoramiento”.<br/>
                      <br/>
                      Esta unidad de servicio (becas) entra en ejecución el año de 1960 a través del Departamento de Bienestar Universitario, que 
                      ofrece financiamiento educativo reembolsable a estudiantes universitarios.
                      <br/>
                      <br/>
                      Hasta 1982, la Dirección de Servicios Estudiantiles, entidad encargada de brindar los servicios que ofrece el programa de préstamos educativos y 
                      becas internas al estudiantado universitario.  En este sentido surge la necesidad de reorientar estos servicios hacia el desarrollo estudiantil; pretendiendo 
                      con este enfoque responder como unidad académica central a la formación integral del educando y contribuir con acierto a elevar el nivel académico de la institución 
                      y en consecuencia se procede a otorgar modalidades de becas por excelencia académica no reembolsables, a excepción de los préstamos educativos reembolsables. 
                      <br/><br/>
                      Luego de que en 1987 se plantean reformas en la Alma Mater, tanto a nivel organizativo, administrativo como de funcionamiento 
                      (según antecedentes de los Servicios Estudiantiles en la UNAH).
                      En el lapso de 1988 a 2004 entra en funcionamiento la Dirección de Desarrollo Estudiantil (DIDE), encaminada a brindar asistencia a los 
                      estudiantes universitarios.
                      <br/><br/>
                      Esta contaba con las siguientes áreas: Información e Investigación socio– educativo y socio-económico; Orientación y Salud.
                      Finalmente, en el marco de la implementación de la IV Reforma Universitaria en el año 2005-la VOAE surge al amparo de la nueva Ley 
                      Orgánica de la Universidad Nacional Autónoma de Honduras (UNAH) bajo decreto 209-2004 del Congreso Nacional de la República, y publicada 
                      en el Diario Oficial la Gaceta en el numeral 30621 de fecha 12 de febrero de 2005. Así se le conoce actualmente. Esto implica realizar cambios 
                      en las distintas unidades de la VOAE hasta convertirlas en Áreas Académicas, para poder cumplir con el rol a emprender cómo Vicerrectoría.
                      <br/><br/>
                      Por lo tanto, el Área Desarrollo Humano, es la entidad encargada de dirigir las políticas que están relacionadas con el desarrollo humano y académico de 
                      la población estudiantil.
                      En consecuencia, el PASEE "En apego a lo dispuesto en los artículos 121 al 123 del Reglamento de la Ley Orgánica designa como la unidad encargada de Implementar 
                      el "Sistema de Becas, Distinciones e Incentivos, Ayudas Financieras y Créditos para el Estudio" implementando los criterios de asignación, rembolso, utilización, 
                      revocación e incompatibilidades de los  beneficios, ayudas financieras y créditos; así como los parámetros para otorgar el reconocimiento e incentivos,  a estudiantes 
                      que se distingan en diferentes actividades de la vida estudiantil.
                      <br/><br/>
                      Por consiguiente el PASEE: promueve, organiza y otorga el financiamiento de Becas, Préstamos Educativos y Estímulos Académicos a estudiantes universitarios 
                      que solicitan el beneficio y que reúnen los requisitos establecidos en el Reglamento.
                      Lo anterior en consonancia con el objetivo estratégico específico “fortalecer el Programa de Atención Socioeconómica y Estímulos Educativos mediante la oferta 
                      de oportunidades educativas a aquellos estratos que económicamente se ven limitados a realizar estudios en el nivel superior”.
                     </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                <AccordionTrigger>Organirama</AccordionTrigger>
                  <AccordionContent>
                      <img src="https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//organigrama.jpg" alt=""/>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-1">
                <AccordionTrigger>¿Cómo solicitar una beca?</AccordionTrigger>
                  <AccordionContent>
                      
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
            </div>

            <div className="grid grid-rows-2 grid-cols-1 gap-4 flex items-center justify-center row-start-3 h-fit w-full">
              <div className="w-full rounded-lg p-8">
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-300 pb-4 mb-6">
                  Comunicados
                </h2>
                {/* <div className="w-full">
                  <div className="flex items-center justify-between bg-white border border-gray-200 px-6 py-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 w-full">
                    <span className="text-base font-medium text-gray-800 truncate">
                      Acta de Nacimiento.pdf
                    </span>
                    <a
                      href="http://localhost:3031/public/acta.pdf"
                      download
                      className="flex items-center gap-2 text-sm font-semibold border px-4 py-2 rounded-lg transition duration-300"
                      style={{
                        borderColor: '#253A69',
                        color: '#253A69',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#253A69';
                        e.target.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#253A69';
                      }}>
                      <Download className="w-4 h-4" />
                      Descargar
                    </a>
                  </div>
                </div> */}
                {listaPublicaciones.map((publicacion, index) => (
                  <div key={publicacion.idpublicacion} className="w-full">
                    <div className="flex items-center justify-between bg-white border border-gray-200 px-6 py-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 w-full mb-4">
                      <span className="text-base font-medium text-gray-800 truncate">
                        COMUNICADO N0. {index + 1}
                      </span>
                      <a
                        href={publicacion.urlfile}
                        download
                        className="flex items-center gap-2 text-sm font-semibold border px-4 py-2 rounded-lg transition duration-300"
                        style={{
                          borderColor: '#253A69',
                          color: '#253A69',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#253A69';
                          e.target.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#253A69';
                        }}
                      >
                        <Download className="w-4 h-4" />
                        Descargar
                      </a>
                    </div>
                  </div>
                ))}

              </div>
            </div>


          </div>
      </>
    )
}

