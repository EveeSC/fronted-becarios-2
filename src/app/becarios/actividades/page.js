
export default function ActividadesPage() {
  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Actividades</h2>
      <div className="bg-gray-100 p-6 rounded-lg">
        <p className="text-gray-600 mb-4">Listado de actividades disponibles:</p>
        <ul className="space-y-3">
          <li className="p-3 bg-white rounded-md shadow">Taller de React</li>
          <li className="p-3 bg-white rounded-md shadow">Seminario de TypeScript</li>
          <li className="p-3 bg-white rounded-md shadow">Workshop de Next.js</li>
        </ul>
      </div>
    </>
  );
}