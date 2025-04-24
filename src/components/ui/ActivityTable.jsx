'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function ActivityTable({ data, selectedRow, setSelectedRow }) {
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (column) => {
    if (sortColumn !== column) return <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
    return sortDirection === 'asc' ? (
      <ChevronUp className="ml-1 h-4 w-4 text-gray-900" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4 text-gray-900" />
    )
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="w-full">
        <div className="grid grid-cols-4 bg-gray-50 border-b">
          <div className="px-6 py-3 flex items-center cursor-pointer" onClick={() => handleSort('nombre')}>
            <span className="font-medium text-gray-500 uppercase tracking-wider text-sm">NOMBRE</span>
            {getSortIcon('nombre')}
          </div>
          <div className="px-6 py-3 flex items-center cursor-pointer" onClick={() => handleSort('horas')}>
            <span className="font-medium text-gray-500 uppercase tracking-wider text-sm">HORAS</span>
            {getSortIcon('horas')}
          </div>
          <div className="px-6 py-3 flex items-center cursor-pointer" onClick={() => handleSort('lugar')}>
            <span className="font-medium text-gray-500 uppercase tracking-wider text-sm">LUGAR</span>
            {getSortIcon('lugar')}
          </div>
          <div className="px-6 py-3 flex items-center cursor-pointer" onClick={() => handleSort('fecha')}>
            <span className="font-medium text-gray-500 uppercase tracking-wider text-sm">FECHA</span>
            {getSortIcon('fecha')}
          </div>
        </div>

        {data.map((actividad) => (
          <div
            key={actividad.id}
            className={`grid grid-cols-4 border-b hover:bg-gray-50 ${
              selectedRow === actividad.id ? 'ring-2 ring-blue-400 relative' : ''
            }`}
            onClick={() => setSelectedRow(actividad.id)}
          >
            <div className="px-6 py-4">
              <span className="font-medium">{actividad.nombre}</span>
            </div>
            <div className="px-6 py-4">{actividad.horas} hrs</div>
            <div className="px-6 py-4">{actividad.lugar}</div>
            <div className="px-6 py-4">
              <span>{actividad.estado}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}