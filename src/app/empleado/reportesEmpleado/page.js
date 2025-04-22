// export default function ReportesEmpleado(){
//     return (
//         <div>
//             aqui va tabla de reportes
//         </div>
//     )
// }

// "use client"
// import { useState, useEffect } from "react"
// import axios from "axios"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Download, FileSpreadsheet, Calendar } from "lucide-react"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// // Tipos de datos
// interface Reporte {
//   nocuenta: string
//   categoria: string
//   primernombre: string
//   segundonombre: string
//   primerapellido: string
//   segundoapellido: string
//   sexo: string
//   indiceperiodo: number
//   nombrecarrera: string
//   nombrefacultad: string
//   nombrecentro: string
// }

// interface Pago {
//   idpago: number
//   nocuenta: string
//   primernombre: string
//   primerapellido: string
//   monto: number
//   fecha: string
//   mes: string
//   año: number
// }

// export default function ReportesEmpleado() {
//   const [reportes, setReportes] = useState<Reporte[]>([])
//   const [pagos, setPagos] = useState<Pago[]>([])
//   const [pagosMes, setPagosMes] = useState<Pago[]>([])
//   const [mesSeleccionado, setMesSeleccionado] = useState<string>("")
//   const [loading, setLoading] = useState({
//     reportes: false,
//     pagos: false,
//     pagosMes: false,
//   })

//   // Obtener reportes completos
//   const obtenerReportes = async () => {
//     try {
//       setLoading((prev) => ({ ...prev, reportes: true }))
//       const token = localStorage.getItem("token")
//       const response = await axios.get("http://localhost:3031/api/reporte_completo", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       setReportes(response.data.respuesta)
//     } catch (error) {
//       console.error("Error al obtener reportes:", error)
//     } finally {
//       setLoading((prev) => ({ ...prev, reportes: false }))
//     }
//   }

//   // Obtener pagos
//   const obtenerPagos = async () => {
//     try {
//       setLoading((prev) => ({ ...prev, pagos: true }))
//       const token = localStorage.getItem("token")
//       const response = await axios.get("http://localhost:3031/api/obtener_pagos", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       setPagos(response.data.respuesta || [])
//     } catch (error) {
//       console.error("Error al obtener pagos:", error)
//     } finally {
//       setLoading((prev) => ({ ...prev, pagos: false }))
//     }
//   }

//   // Obtener pagos por mes
//   const obtenerPagosMes = async () => {
//     if (!mesSeleccionado) return

//     try {
//       setLoading((prev) => ({ ...prev, pagosMes: true }))
//       const token = localStorage.getItem("token")
//       const response = await axios.get("http://localhost:3031/api/obtener_pagos_mes", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: {
//           mes: mesSeleccionado,
//         },
//       })
//       setPagosMes(response.data.respuesta || [])
//     } catch (error) {
//       console.error("Error al obtener pagos por mes:", error)
//     } finally {
//       setLoading((prev) => ({ ...prev, pagosMes: false }))
//     }
//   }

//   // Descargar reporte completo
//   const descargarReporteCompleto = async () => {
//     try {
//       const token = localStorage.getItem("token")
//       const response = await axios.get("http://localhost:3031/api/reporte_completo_excel", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         responseType: "blob",
//       })

//       // Crear un objeto URL para el blob
//       const url = window.URL.createObjectURL(new Blob([response.data]))
//       const link = document.createElement("a")
//       link.href = url
//       link.setAttribute("download", "reporte_completo.xlsx")
//       document.body.appendChild(link)
//       link.click()
//       link.remove()
//     } catch (error) {
//       console.error("Error al descargar reporte:", error)
//     }
//   }

//   // Cargar datos iniciales
//   useEffect(() => {
//     obtenerReportes()
//   }, [])

//   // Cargar pagos por mes cuando cambia el mes seleccionado
//   useEffect(() => {
//     if (mesSeleccionado) {
//       obtenerPagosMes()
//     }
//   }, [mesSeleccionado])

//   // Obtener nombre completo
//   const getNombreCompleto = (reporte: Reporte) => {
//     return `${reporte.primernombre} ${reporte.segundonombre || ""} ${reporte.primerapellido} ${reporte.segundoapellido || ""}`
//       .trim()
//       .replace(/\s+/g, " ")
//   }

//   // Lista de meses para el selector
//   const meses = [
//     { value: "1", label: "Enero" },
//     { value: "2", label: "Febrero" },
//     { value: "3", label: "Marzo" },
//     { value: "4", label: "Abril" },
//     { value: "5", label: "Mayo" },
//     { value: "6", label: "Junio" },
//     { value: "7", label: "Julio" },
//     { value: "8", label: "Agosto" },
//     { value: "9", label: "Septiembre" },
//     { value: "10", label: "Octubre" },
//     { value: "11", label: "Noviembre" },
//     { value: "12", label: "Diciembre" },
//   ]

//   return (
//     <div className="container mx-auto p-6 max-w-7xl">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Gestión de Reportes</h1>

//       <Tabs defaultValue="becados">
//         <TabsList className="mb-6 grid w-full grid-cols-3">
//           <TabsTrigger value="becados">Reporte de Becados</TabsTrigger>
//           <TabsTrigger value="pagos" onClick={obtenerPagos}>
//             Reporte de Pagos
//           </TabsTrigger>
//           <TabsTrigger value="pagosMes">Pagos por Mes</TabsTrigger>
//         </TabsList>

//         {/* Reporte de Becados */}
//         <TabsContent value="becados">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle>Reporte Completo de Becados</CardTitle>
//               <Button variant="outline" onClick={descargarReporteCompleto} className="flex items-center gap-2">
//                 <Download size={16} />
//                 Descargar Excel
//               </Button>
//             </CardHeader>
//             <CardContent>
//               {loading.reportes ? (
//                 <div className="flex justify-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
//                 </div>
//               ) : (
//                 <div className="rounded-md border overflow-hidden">
//                   <div className="overflow-x-auto">
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>No. Cuenta</TableHead>
//                           <TableHead>Nombre Completo</TableHead>
//                           <TableHead>Categoría</TableHead>
//                           <TableHead>Sexo</TableHead>
//                           <TableHead>Índice</TableHead>
//                           <TableHead>Carrera</TableHead>
//                           <TableHead>Facultad</TableHead>
//                           <TableHead>Centro</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {reportes.length === 0 ? (
//                           <TableRow>
//                             <TableCell colSpan={8} className="text-center py-4 text-gray-500">
//                               No hay datos disponibles
//                             </TableCell>
//                           </TableRow>
//                         ) : (
//                           reportes.map((reporte, index) => (
//                             <TableRow key={index}>
//                               <TableCell className="font-medium">{reporte.nocuenta}</TableCell>
//                               <TableCell>{getNombreCompleto(reporte)}</TableCell>
//                               <TableCell>{reporte.categoria}</TableCell>
//                               <TableCell>{reporte.sexo}</TableCell>
//                               <TableCell>{reporte.indiceperiodo}</TableCell>
//                               <TableCell>{reporte.nombrecarrera}</TableCell>
//                               <TableCell>{reporte.nombrefacultad}</TableCell>
//                               <TableCell>{reporte.nombrecentro}</TableCell>
//                             </TableRow>
//                           ))
//                         )}
//                       </TableBody>
//                     </Table>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Reporte de Pagos */}
//         <TabsContent value="pagos">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle>Reporte General de Pagos</CardTitle>
//               <Button variant="outline" className="flex items-center gap-2" disabled>
//                 <FileSpreadsheet size={16} />
//                 Descargar Reporte
//               </Button>
//             </CardHeader>
//             <CardContent>
//               {loading.pagos ? (
//                 <div className="flex justify-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
//                 </div>
//               ) : (
//                 <div className="rounded-md border overflow-hidden">
//                   <div className="overflow-x-auto">
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>ID Pago</TableHead>
//                           <TableHead>No. Cuenta</TableHead>
//                           <TableHead>Nombre</TableHead>
//                           <TableHead>Monto</TableHead>
//                           <TableHead>Fecha</TableHead>
//                           <TableHead>Mes</TableHead>
//                           <TableHead>Año</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {pagos.length === 0 ? (
//                           <TableRow>
//                             <TableCell colSpan={7} className="text-center py-4 text-gray-500">
//                               No hay datos disponibles
//                             </TableCell>
//                           </TableRow>
//                         ) : (
//                           pagos.map((pago) => (
//                             <TableRow key={pago.idpago}>
//                               <TableCell className="font-medium">{pago.idpago}</TableCell>
//                               <TableCell>{pago.nocuenta}</TableCell>
//                               <TableCell>{`${pago.primernombre} ${pago.primerapellido}`}</TableCell>
//                               <TableCell>L. {pago.monto.toFixed(2)}</TableCell>
//                               <TableCell>{pago.fecha}</TableCell>
//                               <TableCell>{pago.mes}</TableCell>
//                               <TableCell>{pago.año}</TableCell>
//                             </TableRow>
//                           ))
//                         )}
//                       </TableBody>
//                     </Table>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Pagos por Mes */}
//         <TabsContent value="pagosMes">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <CardTitle>Pagos por Mes</CardTitle>
//                 <div className="w-48">
//                   <Select value={mesSeleccionado} onValueChange={setMesSeleccionado}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Seleccionar mes" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {meses.map((mes) => (
//                         <SelectItem key={mes.value} value={mes.value}>
//                           {mes.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <Button variant="outline" className="flex items-center gap-2" disabled>
//                 <Calendar size={16} />
//                 Descargar Reporte Mensual
//               </Button>
//             </CardHeader>
//             <CardContent>
//               {loading.pagosMes ? (
//                 <div className="flex justify-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
//                 </div>
//               ) : !mesSeleccionado ? (
//                 <div className="text-center py-8 text-gray-500">Seleccione un mes para ver los pagos</div>
//               ) : (
//                 <div className="rounded-md border overflow-hidden">
//                   <div className="overflow-x-auto">
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>ID Pago</TableHead>
//                           <TableHead>No. Cuenta</TableHead>
//                           <TableHead>Nombre</TableHead>
//                           <TableHead>Monto</TableHead>
//                           <TableHead>Fecha</TableHead>
//                           <TableHead>Mes</TableHead>
//                           <TableHead>Año</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {pagosMes.length === 0 ? (
//                           <TableRow>
//                             <TableCell colSpan={7} className="text-center py-4 text-gray-500">
//                               No hay pagos para el mes seleccionado
//                             </TableCell>
//                           </TableRow>
//                         ) : (
//                           pagosMes.map((pago) => (
//                             <TableRow key={pago.idpago}>
//                               <TableCell className="font-medium">{pago.idpago}</TableCell>
//                               <TableCell>{pago.nocuenta}</TableCell>
//                               <TableCell>{`${pago.primernombre} ${pago.primerapellido}`}</TableCell>
//                               <TableCell>L. {pago.monto.toFixed(2)}</TableCell>
//                               <TableCell>{pago.fecha}</TableCell>
//                               <TableCell>{pago.mes}</TableCell>
//                               <TableCell>{pago.año}</TableCell>
//                             </TableRow>
//                           ))
//                         )}
//                       </TableBody>
//                     </Table>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileSpreadsheet, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportesEmpleado() {
  const [reportes, setReportes] = useState([])
  const [pagos, setPagos] = useState([])
  const [pagosMes, setPagosMes] = useState([])
  const [mesSeleccionado, setMesSeleccionado] = useState("")
  const [loading, setLoading] = useState({
    reportes: false,
    pagos: false,
    pagosMes: false,
  })

  // Obtener reportes completos
  const obtenerReportes = async () => {
    try {
      setLoading((prev) => ({ ...prev, reportes: true }))
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:3031/api/reporte_completo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setReportes(response.data.respuesta)
    } catch (error) {
      console.error("Error al obtener reportes:", error)
    } finally {
      setLoading((prev) => ({ ...prev, reportes: false }))
    }
  }

  // Obtener pagos
  const obtenerPagos = async () => {
    try {
      setLoading((prev) => ({ ...prev, pagos: true }))
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:3031/api/obtener_pagos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPagos(response.data.respuesta || [])
    } catch (error) {
      console.error("Error al obtener pagos:", error)
    } finally {
      setLoading((prev) => ({ ...prev, pagos: false }))
    }
  }

  // Obtener pagos por mes
  const obtenerPagosMes = async () => {

    try {
      setLoading((prev) => ({ ...prev, pagosMes: true }))
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:3031/api/obtener_pagos_mes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPagosMes(response.data.respuesta || [])
      console.log(response.data)
    } catch (error) {
      console.error("Error al obtener pagos por mes:", error)
    } finally {
      setLoading((prev) => ({ ...prev, pagosMes: false }))
    }
  }

  // Descargar reporte completo
  const descargarReporteCompleto = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:3031/api/reporte_completo_excel", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      })

      // Crear un objeto URL para el blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "reporte_completo.xlsx")
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error("Error al descargar reporte:", error)
    }
  }

  // Cargar datos iniciales
  useEffect(() => {
    obtenerReportes()
  }, [])

  // Cargar pagos por mes cuando cambia el mes seleccionado
  useEffect(() => {
    if (mesSeleccionado) {
      obtenerPagosMes()
    }
  }, [mesSeleccionado])

  // Obtener nombre completo
  const getNombreCompleto = (reporte) => {
    return `${reporte.primernombre} ${reporte.segundonombre || ""} ${reporte.primerapellido} ${reporte.segundoapellido || ""}`
      .trim()
      .replace(/\s+/g, " ")
  }

  // Lista de meses para el selector
  const meses = [
    { value: "1", label: "Enero" },
    { value: "2", label: "Febrero" },
    { value: "3", label: "Marzo" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Mayo" },
    { value: "6", label: "Junio" },
    { value: "7", label: "Julio" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ]

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Gestión de Reportes</h1>

      <Tabs defaultValue="becados">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="becados">Reporte de Becados</TabsTrigger>
          <TabsTrigger value="pagos" onClick={obtenerPagos}>
            Reporte de Pagos
          </TabsTrigger>
          <TabsTrigger value="pagosMes" onClick={obtenerPagosMes}>Pagos por Mes</TabsTrigger>
        </TabsList>

        {/* Reporte de Becados */}
        <TabsContent value="becados">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Reporte Completo de Becados</CardTitle>
              <Button variant="outline" onClick={descargarReporteCompleto} className="flex items-center gap-2">
                <Download size={16} />
                Descargar Excel
              </Button>
            </CardHeader>
            <CardContent>
              {loading.reportes ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>No. Cuenta</TableHead>
                          <TableHead>Nombre Completo</TableHead>
                          <TableHead>Categoría</TableHead>
                          <TableHead>Sexo</TableHead>
                          <TableHead>Índice</TableHead>
                          <TableHead>Carrera</TableHead>
                          <TableHead>Facultad</TableHead>
                          <TableHead>Centro</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reportes.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                              No hay datos disponibles
                            </TableCell>
                          </TableRow>
                        ) : (
                          reportes.map((reporte, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{reporte.nocuenta}</TableCell>
                              <TableCell>{getNombreCompleto(reporte)}</TableCell>
                              <TableCell>{reporte.categoria}</TableCell>
                              <TableCell>{reporte.sexo}</TableCell>
                              <TableCell>{reporte.indiceperiodo}</TableCell>
                              <TableCell>{reporte.nombrecarrera}</TableCell>
                              <TableCell>{reporte.nombrefacultad}</TableCell>
                              <TableCell>{reporte.nombrecentro}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reporte de Pagos */}
        <TabsContent value="pagos">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Reporte General de Pagos</CardTitle>
              <Button variant="outline" className="flex items-center gap-2" disabled>
                <FileSpreadsheet size={16} />
                Descargar Reporte
              </Button>
            </CardHeader>
            <CardContent>
              {loading.pagos ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID Pago</TableHead>
                          <TableHead>No. Cuenta</TableHead>
                          <TableHead>Tipo de Beca</TableHead>
                          <TableHead>Monto</TableHead>
                          <TableHead>Pago Realizado</TableHead>
                          <TableHead>Fecha</TableHead>
                          {/* <TableHead>Fecha</TableHead>
                          <TableHead>Mes</TableHead>
                          <TableHead>Año</TableHead> */}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pagos.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                              No hay datos disponibles
                            </TableCell>
                          </TableRow>
                        ) : (
                          pagos.map((pago) => (
                            <TableRow key={pago.idpago}>
                              <TableCell className="font-medium">{pago.idpago}</TableCell>
                              <TableCell>{pago.nocuenta}</TableCell>
                              <TableCell>{pago.tipo_beca}</TableCell>
                              {/* <TableCell>{`${pago.primernombre} ${pago.primerapellido}`}</TableCell> */}
                              <TableCell>L. {pago.monto_beca}</TableCell>
                              <TableCell>L. {pago.pago_realizado}</TableCell>
                              {/* <TableCell>L. {pago.monto.toFixed(2)}</TableCell> */}
                              <TableCell>{pago.fechaemisioncheque}</TableCell>
                              {/* <TableCell>{pago.mes}</TableCell>
                              <TableCell>{pago.año}</TableCell> */}
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pagos por Mes */}
        {/* <TabsContent value="pagosMes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <CardTitle>Pagos del Mes Actual</CardTitle>
                <div className="w-48">
                  <Select value={mesSeleccionado} onValueChange={setMesSeleccionado}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar mes" />
                    </SelectTrigger>
                    <SelectContent>
                      {meses.map((mes) => (
                        <SelectItem key={mes.value} value={mes.value}>
                          {mes.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button variant="outline" className="flex items-center gap-2" disabled>
                <Calendar size={16} />
                Descargar Reporte Mensual
              </Button>
            </CardHeader>
            <CardContent>
              {loading.pagosMes ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
                </div>
              ) : !mesSeleccionado ? (
                <div className="text-center py-8 text-gray-500">Seleccione un mes para ver los pagos</div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID Pago</TableHead>
                          <TableHead>No. Cuenta</TableHead>
                          <TableHead>Tipo de Beca</TableHead>
                          <TableHead>Monto</TableHead>
                          <TableHead>Pago Realizado</TableHead>
                          <TableHead>Fecha de Pago</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pagosMes.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                              No hay pagos para el mes seleccionado
                            </TableCell>
                          </TableRow>
                        ) : (
                          pagosMes.map((pago) => (
                            <TableRow key={pago.idpago}>
                              <TableCell className="font-medium">{pago.idpago}</TableCell>
                              <TableCell>{pago.nocuenta}</TableCell>
                              <TableCell>{pago.tipo_beca}</TableCell>
                              
                              <TableCell>L. {pago.monto_beca}</TableCell>
                              <TableCell>{pago.pago_realizado}</TableCell>
                             
                              <TableCell>{pago.fechaemisioncheque}</TableCell>
                             
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent> */}

<TabsContent value="pagosMes">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>Pagos del Mes Actual</CardTitle>
      <Button variant="outline" className="flex items-center gap-2" disabled>
        <Calendar size={16} />
        Descargar Reporte Mensual
      </Button>
    </CardHeader>
    <CardContent>
      {loading.pagosMes ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Pago</TableHead>
                  <TableHead>No. Cuenta</TableHead>
                  <TableHead>Tipo de Beca</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Pago Realizado</TableHead>
                  <TableHead>Fecha de Pago</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagosMes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      No hay pagos registrados este mes
                    </TableCell>
                  </TableRow>
                ) : (
                  pagosMes.map((pago) => (
                    <TableRow key={pago.idpago}>
                      <TableCell className="font-medium">{pago.idpago}</TableCell>
                      <TableCell>{pago.nocuenta}</TableCell>
                      <TableCell>{pago.tipo_beca}</TableCell>
                      <TableCell>L. {pago.monto_beca}</TableCell>
                      <TableCell>{pago.pago_realizado}</TableCell>
                      <TableCell>{pago.fechaemisioncheque}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
</TabsContent>
       
      </Tabs>
    </div>
  )
}
