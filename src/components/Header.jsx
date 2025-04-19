// 

"use client"

import React from "react"

import { useState } from "react"
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react"
import { Bars3Icon, XMarkIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalRecuperacion, setMostrarModalRecuperacion] = useState(false);
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);
  const [email, setEmail] = useState("");

  const abrirModalRecuperacion = () => {
    setMostrarModal(false);
    setMostrarModalRecuperacion(true);
  };

  const enviarSolicitudRecuperacion = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la solicitud de recuperación
    setMostrarModalRecuperacion(false);
    setMostrarModalConfirmacion(true);
  };

  const volverAInicioSesion = () => {
    setMostrarModalRecuperacion(false);
    setMostrarModal(true);
  };

  const cerrarTodosLosModales = () => {
    setMostrarModal(false);
    setMostrarModalRecuperacion(false);
    setMostrarModalConfirmacion(false);
  };


  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/home" className="-m-1.5 p-1.5">
            <span className="sr-only">VOAE</span>
            <img
              style={{ width: "200px", height: "auto" }}
              alt=""
              src="https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//voaelogo2.png"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="size-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="#" className="text-sm/6 font-extralight text-gray-900">
            Oferta Academica
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Estudiante
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Servicios
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Transparencia
          </a>
          <a href="/home/becaInfo" className="text-sm/6 font-semibold text-gray-900">
            Becas
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={() => setMostrarModal(true)}
            className="text-sm/6 font-semibold text-gray-900 hover:text-[#253A69] transition-colors"
          >
            Iniciar Sesión <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>

      {/* Modal de inicio de sesión */}
      <Dialog open={mostrarModal} onClose={() => setMostrarModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="flex justify-end overflow-hidden min-h-[420px] bg-[url('https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//bannerfondo.jpg')] bg-cover bg-center rounded-lg shadow-xl max-w-3xl w-full">
            <div className="hidden md:block md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#253A69]/80 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <h2 className="text-2xl font-bold mb-2">Bienvenido de vuelta</h2>
                <p className="text-sm opacity-90">Accede a tu cuenta para gestionar tus actividades y servicios</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-white p-8 rounded-l-lg shadow-lg">
              <div className="flex justify-center mb-6">
                <img
                  src="https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//voaelogo2.png"
                  className="h-[100px] w-auto"
                  alt="VOAE Logo"
                />
              </div>

              <h2 className="text-xl font-semibold text-center text-[#253A69] mb-6">Iniciar Sesión</h2>

              <form className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Usuario"
                    className="bg-white py-3 pl-10 pr-4 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#253A69] focus:border-transparent transition-all"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="bg-white py-3 pl-10 pr-4 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#253A69] focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3 px-5 bg-[#253A69] text-white font-medium w-full rounded-lg uppercase hover:bg-[#1c2d50] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#253A69]"
                >
                  Iniciar Sesión
                </button>
              </form>

              <div className="text-center mt-6">
                <button
                  onClick={abrirModalRecuperacion}
                  className="text-[#253A69] text-sm hover:underline focus:outline-none"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Modal de recuperación de contraseña */}
      <Dialog
        open={mostrarModalRecuperacion}
        onClose={() => setMostrarModalRecuperacion(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="flex justify-end overflow-hidden min-h-[420px] bg-[url('https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//bannerfondo.jpg')] bg-cover bg-center rounded-lg shadow-xl max-w-3xl w-full">
            <div className="hidden md:block md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#253A69]/80 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <h2 className="text-2xl font-bold mb-2">Recupera tu acceso</h2>
                <p className="text-sm opacity-90">Te enviaremos instrucciones para restablecer tu contraseña</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-white p-8 rounded-l-lg shadow-lg">
              <div className="flex justify-center mb-6">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/980/980496.png"
                  className="h-[100px] w-auto"
                  alt="VOAE Logo"
                />
              </div>

              <h2 className="text-xl font-semibold text-center text-[#253A69] mb-2">Restablecer Contraseña</h2>
              <p className="text-sm text-gray-600 text-center mb-6">
              Ingresa el código de verificación que enviamos a su correo electrónico. 
              </p>

              <form className="space-y-4" onSubmit={enviarSolicitudRecuperacion}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* <EnvelopeIcon className="h-5 w-5 text-gray-400" /> */}
                  </div>
                  <input
                    type="email"
                    placeholder="Codigo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white py-3 pl-10 pr-4 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#253A69] focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3 px-5 bg-[#253A69] text-white font-medium w-full rounded-lg uppercase hover:bg-[#1c2d50] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#253A69]"
                >
                  Enviar
                </button>
              </form>

              <div className="text-center mt-6">
                <button
                  onClick={volverAInicioSesion}
                  className="text-[#253A69] text-sm hover:underline focus:outline-none"
                >
                  Volver a Iniciar Sesión
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Modal de confirmación de recuperación */}
      <Dialog
        open={mostrarModalConfirmacion}
        onClose={() => setMostrarModalConfirmacion(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="flex justify-end overflow-hidden min-h-[420px] bg-[url('https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//bannerfondo.jpg')] bg-cover bg-center rounded-lg shadow-xl max-w-3xl w-full">
            <div className="hidden md:block md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#253A69]/80 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <h2 className="text-2xl font-bold mb-2">¡Correo enviado!</h2>
                <p className="text-sm opacity-90">Revisa tu bandeja de entrada para continuar con el proceso</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-white p-8 rounded-l-lg shadow-lg flex flex-col items-center justify-center">
              <div className="flex justify-center mb-6">
                <img
                  src="https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//voaelogo2.png"
                  className="h-[100px] w-auto"
                  alt="VOAE Logo"
                />
              </div>

              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-xl font-semibold text-center text-[#253A69] mb-2">Correo Enviado</h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                Hemos enviado instrucciones para restablecer tu contraseña a{" "}
                <span className="font-medium">{email || "tu correo"}</span>. Por favor revisa tu bandeja de entrada y
                sigue las instrucciones.
              </p>

              <button
                onClick={cerrarTodosLosModales}
                className="py-3 px-5 bg-[#253A69] text-white font-medium w-full rounded-lg uppercase hover:bg-[#1c2d50] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#253A69]"
              >
                Entendido
              </button>

              <div className="text-center mt-6">
                <button
                  onClick={volverAInicioSesion}
                  className="text-[#253A69] text-sm hover:underline focus:outline-none"
                >
                  Volver a Iniciar Sesión
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                style={{ height: "auto", width: "100px" }}
                src="https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//voaelogo2.png"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="size-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-extralight text-gray-900 hover:bg-gray-50"
                >
                  Oferta Academica
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-extralight text-gray-900 hover:bg-gray-50"
                >
                  Estudiantes
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Servicios
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Transparencia
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Becas
                </a>
              </div>
              <div className="py-6">
                <button
                  onClick={() => setMostrarModal(true)}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
