'use client'

import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';

export default function Example() {
  const condicionesOpciones = [
    "Ceguera",
    "Silla de ruedas",
    "Mala visión",
    "Sordera",
    "Dificultad para hablar",
    "Ninguna",
    "Otra"
  ];
  
  const [condicionesSeleccionadas, setCondicionesSeleccionadas] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    dni: '',
    nocuenta: '',
    telefono: '',
    correoinstitucional: '',
    primernombre: '',
    segundonombre: '',
    primerapellido: '',
    segundoapellido: '',
    fechanacimiento: '',
    sexo: '',
    estadocivil: '',
    cantidadhijos: '',
    departamento: '',
    municipio: '',
    coloniaaldea: '',
    etnia: '',
    condicion: '',
    ocupacion: '',
    indiceglobal: '',
    indiceperiodo: '',
    // file: null,
    idcarrera: ''
  });
  console.log("aqui",formData.sexo);

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCondicionCheckboxChange = (e) => {
    const { value, checked } = e.target;
  
    let nuevasCondiciones;
    if (checked) {
      nuevasCondiciones = [...condicionesSeleccionadas, value];
    } else {
      nuevasCondiciones = condicionesSeleccionadas.filter(c => c !== value);
    }
  
    setCondicionesSeleccionadas(nuevasCondiciones);
    setFormData(prev => ({
      ...prev,
      condicion: nuevasCondiciones.join(', ')
    }));
  };
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    //Validacion para subir PDF
    if (!file) {
      alert('Por favor, sube un archivo PDF antes de enviar el formulario.');
      return;
    }

    //Validacion para enviar estado civil
    if (!formData.estadocivil) {
      alert('Por favor, selecciona el estado civil.');
      return;
    }

    //Validacion para enviar Depto
    if(!formData.departamento){
      alert('Por favor, selecciona un departamento')
    }

    //Validacion para enviar Municipio
    if(!formData.municipio){
      alert('Por favor, selecciona un municipio')
    }

    //Validacion para enviar una Etnia
    if(!formData.etnia){
      alert('Por favor, selecciona tu etnia')
    }

    //Validacion para enviar Municipio
    if(!formData.idcarrera){
      alert('Por favor, selecciona tu carrera')
    }

    //Validacion para ingresar un genero
    if (!formData.sexo) {
      alert('Por favor, selecciona el género.');
      return;
    }

    const data = new FormData();

    // Adjuntar los campos del formulario
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    // Adjuntar el archivo si existe
    if (file) {
      data.append('file', file);
    }

    try {
      const response = await axios.post('http://localhost:3031/api/ingresar_solicitante', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Enviado correctamente:', response.data);
      alert('Formulario enviado correctamente');
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Error al enviar el formulario: ' + error.message);
    }finally {
      setLoading(false);
      router.push('/home')
    }
  };
  return (
    <> 
      
       <div className="w-full max-w-6xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-300 pb-4 mb-6">
              Formulario de Registro para Solicitar una Beca
            </h2>
          <div>
        </div>
       
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* primernombre */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="primernombre"
                onChange={handleChange}
                value={formData.primernombre}
                id="primernombre"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="primernombre"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Primer Nombre
              </label>
            </div>
            {/* segundonombre */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="segundonombre"
                onChange={handleChange}
                value={formData.segundonombre}
                id="segundonombre"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="segundonombre"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Segundo Nombre
              </label>
            </div>
            {/* primerapellido */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="primerapellido"
                onChange={handleChange}
                value={formData.primerapellido}
                id="primerapellido"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="primerapellido"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Primer Apellido
              </label>
            </div>
            {/* segundoapellido */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="segundoapellido"
                onChange={handleChange}
                value={formData.segundoapellido}
                id="segundoapellido"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="segundoapellido"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Segundo Apellido
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="dni"
                onChange={handleChange}
                value={formData.dni}
                pattern="[0-9]{4}[0-9]{4}[0-9]{5}"
                id="dni"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="dni"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Identidad
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="tel"
                name="telefono"
                onChange={handleChange}
                value={formData.telefono}
                id="telefono"
                pattern="[0-9]{4}[0-9]{4}"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="telefono"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Telefono (00000000)
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="date"
                max="2006-12-31"
                name="fechanacimiento"
                onChange={handleChange}
                value={formData.fechanacimiento}
                id="fechanacimiento"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="fechanacimiento"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Fecha de Nacimiento
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-rows-2 gap-6 mb-6">
            <div>
              <label htmlFor="sexo" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Género
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    id="sexo-femenino"
                    type="radio"
                    name="sexo"
                    checked={formData.sexo === "femenino"}
                    onChange={handleChange}
                    value="femenino"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="sexo-femenino" className="block ms-2 text-sm text-gray-500 dark:text-gray-300">
                    Femenino
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="sexo-masculino"
                    type="radio"
                    name="sexo"
                    checked={formData.sexo === "masculino"}
                    onChange={handleChange}
                    value="masculino"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="sexo-masculino" className="block ms-2 text-sm text-gray-500 dark:text-gray-300">
                    Masculino
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="estadocivil" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Estado Civil
              </label>
              <select
                id="estadocivil"
                name="estadocivil"
                value={formData.estadocivil}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-sm text-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="casado">Casado/a</option>
                <option value="soltero">Soltero/a</option>
                <option value="divorciado">Divorciado/a</option>
                <option value="union libre">Unión Libre</option>
                <option value="viudo">Viudo/a</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-rows-2 gap-6 mb-6">
            <div className="col-span-2">
              <label htmlFor="cantidadhijos" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Cantidad Hijos
              </label>
              <input
                type="number"
                name="cantidadhijos"
                min="0"
                max="10"
                onChange={handleChange}
                value={formData.cantidadhijos}
                id="cantidadhijos"
                className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border border-gray-300 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder=" "
                required
              />
            </div>
            <div>
              <label htmlFor="departamento" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Departamento
              </label>
              <select
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-sm text-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Selecciona un Depto.
                </option>
                <option value="Atlántida">Atlántida</option>
                <option value="Choluteca">Choluteca</option>
                <option value="Colón">Colón</option>
                <option value="Comayagua">Comayagua</option>
                <option value="Copán">Copán</option>
                <option value="Cortés">Cortés</option>
                <option value="El Paraíso">El Paraíso</option>
                <option value="Francisco Morazán">Francisco Morazán</option>
                <option value="Gracias a Dios">Gracias a Dios</option>
                <option value="Intibucá">Intibucá</option>
                <option value="Islas de la Bahía">Islas de la Bahía</option>
                <option value="La Paz">La Paz</option>
                <option value="Lempira">Lempira</option>
                <option value="Ocotepeque">Ocotepeque</option>
                <option value="Olancho">Olancho</option>
                <option value="Santa Bárbara">Santa Bárbara</option>
                <option value="Valle">Valle</option>
                <option value="Yoro">Yoro</option>
              </select>
            </div>
            <div>
              <label htmlFor="municipio" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Municipio
              </label>
              <select
                id="municipio"
                name="municipio"
                value={formData.municipio}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-sm text-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Selecciona un Municipio
                </option>
                <option value="Tegucigalpa">Tegucigalpa</option>
                <option value="San Pedro Sula">San Pedro Sula</option>
                <option value="La Ceiba">La Ceiba</option>
                <option value="Choluteca">Choluteca</option>
                <option value="Comayagua">Comayagua</option>
                <option value="Puerto Cortés">Puerto Cortés</option>
                <option value="Danlí">Danlí</option>
                <option value="Juticalpa">Juticalpa</option>
                <option value="Santa Rosa de Copán">Santa Rosa de Copán</option>
                <option value="Tocoa">Tocoa</option>
                <option value="Yoro">Yoro</option>
                <option value="El Progreso">El Progreso</option>
                <option value="La Lima">La Lima</option>
                <option value="Villanueva">Villanueva</option>
                <option value="Siguatepeque">Siguatepeque</option>
                <option value="Ocotepeque">Ocotepeque</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-rows-2 gap-6 mb-6">
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="coloniaaldea"
                value={formData.coloniaaldea}
                onChange={handleChange}
                id="coloniaaldea"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="coloniaaldea"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Colonia o Aldea
              </label>
            </div>
            <div>
              <label htmlFor="etnia" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Etnia
              </label>
              <select
                id="etnia"
                name="etnia"
                value={formData.etnia}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-sm text-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Selecciona una etnia
                </option>
                <option value="lenca">Lenca</option>
                <option value="chorti">Chortí</option>
                <option value="garifuna">Garífuna</option>
                <option value="tawahkas">Tawahkas</option>
                <option value="tolupan">Tolupán / Jicaque</option>
                <option value="mestizo">Mestizo</option>
                <option value="negro inglés">Negro de Habla Inglesa</option>
                <option value="nahua">Náhuatl</option>
                <option value="miskito">Miskito</option>
                <option value="pech">Pech (Payas)</option>
              </select>
            </div>
          </div>

          {/* <div className="mb-6">
            <label htmlFor="condicion" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
              Describa su condición
            </label>
            <input
                type="text"
                name="condicion"
                onChange={handleChange}
                value={formData.condicion}
                id="condicion"
                className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border border-gray-300 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder=" "
                required
              />
          </div> */}

            <div className="mb-6">
              <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Seleccione su condición
              </label>
              <div className="grid grid-cols-2 gap-2">
                {condicionesOpciones.map((opcion, index) => (
                  <label key={index} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-white">
                    <input
                      type="checkbox"
                      value={opcion}
                      checked={condicionesSeleccionadas.includes(opcion)}
                      onChange={handleCondicionCheckboxChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>{opcion}</span>
                  </label>
                ))}
              </div>
            </div>


          <div className="mb-6">
            <label htmlFor="ocupacion" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
              Seleccione una opción
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  id="ocupacion-estudiante"
                  type="radio"
                  name="ocupacion"
                  checked={formData.ocupacion === 'Estudiante jornada completa'} 
                  onChange={handleChange}  
                  value="Estudiante jornada completa"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="ocupacion-estudiante" className="block ms-2 text-sm text-gray-500 dark:text-gray-300">
                  Estudiante jornada completa
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="ocupacion-mixta"
                  type="radio"
                  name="ocupacion"
                  checked={formData.ocupacion === 'Trabajo y estudio'} 
                  onChange={handleChange}  
                  value="Trabajo y estudio"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="ocupacion-mixta" className="block ms-2 text-sm text-gray-500 dark:text-gray-300">
                  Trabajo y estudio
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="centros" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Selecciona un centro de estudio
              </label>
              <select
                id="centros"
                className="bg-gray-50 border border-gray-300 text-sm text-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="">(CURLA) Centro Universitario Regional del Litoral Atlántico</option>
                <option value="">(CUROC) Centro Universitario Regional de Occidente</option>
                <option value="">(CURC) Centro Universitario Regional del Centro</option>
                <option value="">(CURLP) Centro Universitario Regional del Litoral Pacífico</option>
                <option value="">(CURNO) Centro Universitario Regional Nor Oriental</option>
                <option value="">(UNAH-VS) UNAH Valle de Sula</option>
                <option value="">(UNAH-CU) UNAH Ciudad Universitaria</option>
              </select>
            </div>
            <div>
              <label htmlFor="carreras" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Selecciona una carrera
              </label>
              <select
                id="carreras"
                name="idcarrera"
                onChange={handleChange}
                value={formData.idcarrera}
                className="bg-gray-50 border border-gray-300 text-sm text-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="1">Ingeniería Agronómica</option>
                <option value="2">Ingeniería Forestal</option>
                <option value="3">Ingeniería Agroindustrial</option>
                <option value="5">Técnico Universitario en Producción Agrícola</option>
                <option value="6">Licenciatura en Ciencias Ambientales</option>
                <option value="7">Licenciatura en Educación Básica</option>
                <option value="10">Licenciatura en Administración de Empresas</option>
                <option value="11">Técnico Universitario en Administración de Empresas Cafetaleras</option>
                <option value="12">Licenciatura en Enfermería</option>
                <option value="14">Medicina</option>
                <option value="17">Licenciatura en Psicología</option>
                <option value="18">Licenciatura en Periodismo</option>
                <option value="19">Licenciatura en Pedagogía</option>
                <option value="20">Licenciatura en Letras</option>
                <option value="21">Licenciatura en Psicología</option>
                <option value="22">Licenciatura en Desarrollo Local</option>
                <option value="23">Licenciatura en Derecho</option>
                <option value="24">Licenciatura en Trabajo Social</option>
                <option value="25">Licenciatura en Sociología</option>
                <option value="26">Técnico Universitario en Tecnología de Alimentos</option>
                <option value="27">Ingeniería en Sistemas</option>
                <option value="28">Licenciatura en Comercio Internacional</option>
                <option value="29">Odontología</option>
                <option value="30">Licenciatura en Derecho</option>
                <option value="31">Licenciatura en Química y Farmacia</option>
                <option value="32">Ingeniería en Ciencias Espaciales</option>
                <option value="33">Ingeniería Civil</option>
                <option value="34">Ingeniería Mecánica Industrial</option>
                <option value="35">Ingeniería en Sistemas</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="indiceglobal" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Índice Global
              </label>
              <input
                type="number"
                name="indiceglobal"
                onChange={handleChange}
                value={formData.indiceglobal}
                min="0"
                max="100"
                id="indiceglobal"
                className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border border-gray-300 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder=" "
                required
              />
            </div>
            <div>
              <label htmlFor="indiceperiodo" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Índice Periodo
              </label>
              <input
                type="number"
                name="indiceperiodo"
                onChange={handleChange}
                value={formData.indiceperiodo}
                min="0"
                max="100"
                id="indiceperiodo"
                className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border border-gray-300 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder=" "
                required
              />
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="nocuenta"
                onChange={handleChange}
                value={formData.nocuenta}
                pattern="^20\d{9}$"
                maxLength={11}
                id="nocuenta"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="nocuenta"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Numero de Cuenta
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="correoinstitucional"
                onChange={handleChange}
                value={formData.correoinstitucional}
                id="correoinstitucional"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="correoinstitucional"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Correo Institucional
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">
              Subir Archivo PDF
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2.5"
              aria-describedby="user_avatar_help"
              id="file"
              name='file'
              onChange={handleFileChange}
              accept="application/pdf"
              type="file"
            />
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">
              Suba su archivo PDF de documentos escaneados
            </div>
          </div>
          {/* <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Enviar Solicitud
            </button>
          </div> */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={loading} // Deshabilitar el botón mientras se envía
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" /> // Mostrar ícono de carga
              ) : (
                'Enviar Solicitud'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}