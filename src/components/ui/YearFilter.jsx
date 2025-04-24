'use client';

export default function YearFilter({ year, setYear, availableYears }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="year" className="text-sm font-medium text-gray-700 mb-1">
        Año
      </label>
      <select
        id="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todos los años</option>
        {availableYears.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}