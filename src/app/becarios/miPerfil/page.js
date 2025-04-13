// app/becarios/miPerfil/page.js
import AvatarPerfil from '@/components/ui/avatarPerfil'
import {
  Card,
  CardContent,
  CardDescription
} from "@/components/ui/card"

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
]

// Componente modificado para tamaño del 80%
const ProfileField = ({ label, value }) => (
  <div className="mb-4">
    <CardDescription className="text-sm text-gray-600 mb-1">
      {label}
    </CardDescription>
    <Card className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
      <p className="text-[0.8em] leading-snug text-gray-900">{value}</p> {/* Cambio clave aquí */}
    </Card>
  </div>
)

export default function MiPerfilPage() {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <div className="max-w-2xl mx-auto">
        {/* Avatar */}
        <div className="flex justify-center pt-8">
          <AvatarPerfil
            editable
            size={120}
            fallbackText="LM"
            alt="Avatar de Leonardo"
            className="border-4 border-white shadow-md"
          />
        </div>

        {/* Tarjeta de perfil */}
        <div className="bg-white rounded-none shadow-md p-6 border border-gray-200">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Mi Perfil</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columnas renderizadas dinámicamente */}
            {['left', 'right'].map(col => (
              <div key={col}>
                {profileData
                  .filter(item => item.col === col)
                  .map(item => (
                    <ProfileField 
                      key={item.label} 
                      label={item.label} 
                      value={item.value} 
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}