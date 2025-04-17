'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FilterA from "@/components/FilterA";
import FilterM from "@/components/FilterM";
import { Button } from "@/components/ui/button";
import Footer from '@/components/Footer';

const historialDeActividades = [
  {
    nombre: "Taller de React",
    horasAcreditadas: "4",
    lugar: "Sala de Conferencias A",
    fecha: "15/04/2023",
  }, 
  {
    nombre: "Seminario de TypeScript",
    horasAcreditadas: "6",
    lugar: "Auditorio Principal",
    fecha: "22/05/2023",
  },
];

export default function HistorialDeActividades() {
  const horasRealizadas = 0;
  const mora = 3;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-row items-center mb-6 w-full">
          <div className="scale-[0.7] origin-left mr-0">
            <FilterA />
          </div>
          
          <div className="scale-[0.7] origin-left mr-0">
            <FilterM />
          </div>
          
          <Button 
            className="h-10 px-6 ml-2"
            style={{ backgroundColor: '#4b77f4', color: 'white' }}
          >
            Buscar
          </Button>

          <div className="ml-4 flex flex-col">
            <span className="text-sm">Horas realizadas: {horasRealizadas}</span>
            <span className="text-sm">Mora: {mora} horas</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableCaption>Actividades recientes</TableCaption>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="text-center w-[30%]">Nombre</TableHead>
                <TableHead className="text-center w-[20%]">Horas</TableHead>
                <TableHead className="text-center w-[25%]">Lugar</TableHead>
                <TableHead className="text-center w-[25%]">Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historialDeActividades.map((actividad) => (
                <TableRow key={actividad.nombre}>
                  <TableCell className="text-center">{actividad.nombre}</TableCell>
                  <TableCell className="text-center">{actividad.horasAcreditadas}</TableCell>
                  <TableCell className="text-center">{actividad.lugar}</TableCell>
                  <TableCell className="text-center">{actividad.fecha}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}