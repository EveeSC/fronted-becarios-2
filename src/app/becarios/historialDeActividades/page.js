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

const actividades = [
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
  // Variables para horas realizadas y mora
  const horasRealizadas = 0;
  const mora = 3;

  return (
    <>
      <div className="flex flex-row items-center mb-6 w-full">
        {/* Filtro A */}
        <div className="scale-[0.7] origin-left mr-0">
          <FilterA />
        </div>
        
        {/* Filtro M */}
        <div className="scale-[0.7] origin-left mr-0">
          <FilterM />
        </div>
        
        {/* Botón Buscar con padding aumentado */}
        <Button 
          className="h-10 px-6 ml-2"  // Aumentado a h-10 (40px) y px-6 (24px)
          style={{ backgroundColor: '#4b77f4', color: 'white' }}
        >
          Buscar
        </Button>

        {/* Mostrar horas realizadas y mora */}
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
            {actividades.map((actividad) => (
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
    </>
  );
}