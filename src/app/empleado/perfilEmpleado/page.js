'use client'
import { jwtDecode } from "jwt-decode"
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useEffect } from "react";

export default function PerfilEmpleado(){
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/home");
    } else {
      try {
        const decoded = jwtDecode(token);
        // Si el rol no es el correcto
        if (decoded.idrol !== 2) {
          router.push("/home"); //regresa al login
        }
      } catch (error) {
        console.log("error: ", error)
        router.push("/home");
      }
    }
  }, []);
    // const [datos, setDatos] = useState({
    //     nombre: "",
    //     dni: "",
    //     email: "",
    //   });
    
    //   useEffect(() => {
    //     const obtenerDatos = async () => {
    //       try {
    //         const res = await axios.get("https://tuapi.com/api/empleado/123");
    //         setDatos(res.data);
    //       } catch (error) {
    //         console.error("Error al obtener datos", error);
    //       }
    //     };
    
    //     obtenerDatos();
    //   }, []);
    return(
        <div className="bg-white rounded-lg shadow p-6 w-2/3 mx-auto">
        <h2 className="text-2xl font-bold mb-4">Bienvenido, Usuario</h2>
        <p className="text-gray-600">Sistema de manejo de Becas VOAE</p>
  
        <div className="grid grid-cols-1 gap-6 mt-6 ">
        <h3 className="font-medium text-blue-800">Mi Cuenta</h3>
          <div className="grid gap-y-6 " style={{gridTemplateColumns: "repeat(2, minmax(0, 0.8fr))", gridTemplateRows: "repeat(4, minmax(0, 1fr))", }}>
            {/* primer nombre */}
            <input
            type="text"
            id="disabled-input-2"
            aria-label="disabled input 2"
            style={{width:"300px"}}
            className=" bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-md px-3 py-1.5 cursor-not-allowed placeholder-gray-400"
            // value={datos.nombre}
            value="Ana"
            disabled
            readOnly
            />
            {/* segundo nombre */}
            <input
            type="text"
            id="disabled-input-2"
            aria-label="disabled input 2"
            style={{width:"300px"}}
            className=" bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-md px-3 py-1.5 cursor-not-allowed placeholder-gray-400"
            value="Disabled readOnly input"
            disabled
            readOnly
            />
            {/* primer apellido */}
            <input
            type="text"
            id="disabled-input-2"
            aria-label="disabled input 2"
            style={{width:"300px"}}
            className=" bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-md px-3 py-1.5 cursor-not-allowed placeholder-gray-400"
            value="Disabled readOnly input"
            disabled
            readOnly
            />
            {/* segundo apellido */}
            <input
            type="text"
            id="disabled-input-2"
            aria-label="disabled input 2"
            style={{width:"300px"}}
            className=" bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-md px-3 py-1.5 cursor-not-allowed placeholder-gray-400"
            value="Disabled readOnly input"
            disabled
            readOnly
            />
            {/* email */}
            <input
            type="text"
            id="disabled-input-2"
            aria-label="disabled input 2"
            style={{width:"300px"}}
            className=" bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-md px-3 py-1.5 cursor-not-allowed placeholder-gray-400"
            value="Disabled readOnly input"
            disabled
            readOnly
            />
            {/* telefono */}
            <input

            type="text"
            id="disabled-input-2"
            aria-label="disabled input 2"
            style={{width:"300px"}}
            className="row-start-4 bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-md px-3 py-1.5 cursor-not-allowed placeholder-gray-400"
            value="Disabled readOnly input"
            disabled
            readOnly
            />
          </div>
        </div>
      </div>
    )
}

{/* <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Bienvenido, Usuario</h2>
        <p className="text-gray-600">Sistema de manejo de Becas VOAE</p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800">Actividades Pendientes</h3>
            <p className="text-sm text-blue-600 mt-1">Tienes 5 actividades pendientes</p>
          </div>
  
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="font-medium text-green-800">Becas Disponibles</h3>
            <p className="text-sm text-green-600 mt-1">Hay 3 nuevas becas disponibles</p>
          </div>
        </div>
      </div> */}