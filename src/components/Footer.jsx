'use client'
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button"
import axios from 'axios';

export default function Footer(){
  const[formData, setFormData] = useState({
    nombre_usuario: '',
    correo_usuario: '',
    asunto: '',
    mensaje:''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData (prev => (
      {
        ...prev,
        [name] : value,
      }
    ));
  }

  const enviarFormulario = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3031/api/soporte_tecnico', formData)
      console.log(response.data);
      console.log(response.data.message);
      alert('¡Correo enviado exitosamente :D!');
      setFormData({
        nombre_usuario: '',
        correo_usuario: '',
        asunto: '',
        mensaje: ''
      });
    } catch (error) {
      console.error('ERROR AL ENVIAR EL FORMULARIO', error)
    }
  }




  const [mostrarModal, setMostrarModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setMostrarModal(false);
      }
    };

    if (mostrarModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mostrarModal]);

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
            {/* <a href="/becaInfo">
              <Button className="secondary" variant="outline">Contáctanos</Button>
            </a> */}
            {/* Botón para abrir el modal */}
      <a href="#" onClick={(e) => {
        e.preventDefault();
        setMostrarModal(true);
      }}>
        <Button className="secondary" variant="outline">Contáctanos</Button>
      </a>
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg w-full max-w-4xl shadow-lg flex overflow-hidden"
          >
            <div className="w-2/5 hidden md:flex items-center justify-center bg-white p-4">
              <img
                src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg"
                alt="Soporte"
                className="max-h-[400px] w-auto object-contain mx-auto"
              />
            </div>
            <div className="w-full md:w-3/5 flex items-center justify-center p-6">
              <form className="w-full max-w-sm" onSubmit={enviarFormulario}>
                <p className="text-xl leading-7 font-semibold text-center text-black mb-4">
                  ¡Contáctanos!
                </p>

                <div className="relative">
                  <input
                    type="text"
                    name='nombre_usuario'
                    onChange={handleChange}
                    value={formData.nombre_usuario}
                    placeholder="Nombre Completo"
                    className="bg-white p-4 pr-12 text-sm leading-5 w-full rounded-lg border border-gray-200 shadow-sm my-2 outline-none"
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    name='correo_usuario'
                    onChange={handleChange}
                    value={formData.correo_usuario}
                    className="bg-white p-4 pr-12 text-sm leading-5 w-full rounded-lg border border-gray-200 shadow-sm my-2 outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Dinos tu Asunto"
                    name='asunto'
                    onChange={handleChange}
                    value={formData.asunto}
                    className="bg-white p-4 pr-12 text-sm leading-5 w-full rounded-lg border border-gray-200 shadow-sm my-2 outline-none"
                  />
                </div>
                <div className="relative">
                  <textarea
                    type="text"
                    placeholder="Escribe tu mensaje"
                    name='mensaje'
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="bg-white p-4 pr-12 text-sm leading-5 w-full rounded-lg border border-gray-200 shadow-sm my-2 outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="block py-3 px-5 bg-indigo-600 text-white text-sm leading-5 font-medium w-full rounded-lg uppercase mt-2"
                >
                  Enviar
                </button>

                {/* <p className="text-gray-500 text-sm leading-5 text-center mt-4">
                  No account? <a href="#" className="underline">Sign up</a>
                </p> */}
              </form>
            </div>
          </div>
        </div>
      )}

            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          </div>
          <div>
            <img style={{width:"auto", height:"100px"}}  src="https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//logo-unah.png" alt="" />
          </div>
        </div>
      

      </footer>
    )
}
