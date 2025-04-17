'use client';
import AvatarPerfil from '@/components/ui/avatarPerfil';
import {
  Card,
  CardDescription
} from "@/components/ui/card";
import Footer from '@/components/Footer';

const profileData = [
  { label: "Nombre", value: "Leonardo Miguel", col: "left" },
  { label: "Apellido", value: "Davinci", col: "right" },
  { label: "Número de cuenta", value: "20251021001", col: "left" },
  { label: "Teléfono", value: "2222-2222", col: "right" },
  { label: "Correo institucional", value: "leonardo.davinci@unah.hn", col: "left" },
  { label: "Correo personal", value: "leonardo.davinci@gmail.com", col: "right" },
  { label: "Centro de estudio", value: "Ciudad Universitaria", col: "left" },
  { label: "Carrera", value: "Ingeniería en Sistemas", col: "right" },
  { label: "Dirección", value: "123 Calle Principal, Tegucigalpa", col: "left" }
];

const scholarshipData = [
  { label: "Tipo de beca", value: "Beca Excelencia Académica Categoría \"B\"" },
  { label: "Monto", value: "L 1,680.00" },
  { label: "Fecha de inicio", value: "15/09/2023" },
  { 
    label: "Descripción de la beca", 
    value: "Es una asignación mensual no reembolsable de L1,680.00 a estudiantes universitarios de reingreso cuyo índice académico sea igual o superior a 80% de un mínimo de 10 asignaturas aprobadas en el año académico anterior, o las que el plan exija."
  }
];

const ProfileField = ({ label, value }) => (
  <div className="mb-4">
    <CardDescription className="text-sm text-gray-600 mb-1">
      {label}
    </CardDescription>
    <Card className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
      <p className="text-[0.8em] leading-tight text-gray-900">{value}</p>
    </Card>
  </div>
);

export default function MiPerfilPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F2F2F2]">
      <div className="max-w-2xl mx-auto flex-grow">
        <div className="flex justify-center pt-8">
          <AvatarPerfil
            editable
            size={120}
            fallbackText="LM"
            alt="Avatar de Leonardo"
            className="border-4 border-white shadow-md"
          />
        </div>

        <div className="bg-white rounded-none shadow-md p-6 border border-gray-200 mb-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Mi Perfil</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {profileData
                .filter(item => item.col === "left")
                .map((item) => (
                  <ProfileField 
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
            </div>
            
            <div>
              {profileData
                .filter(item => item.col === "right")
                .map((item) => (
                  <ProfileField 
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-none shadow-md p-6 border border-gray-200 mb-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Mi Beca</h1>
          
          <div className="space-y-4">
            {scholarshipData.map((item) => (
              <div key={item.label} className="flex items-start">
                <div className="w-2/5 font-medium text-gray-600 pr-4">
                  {item.label}
                </div>
                <div className="w-3/5 text-gray-900">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}