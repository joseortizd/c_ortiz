import React from 'react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-4">Carrocerías Ortiz</h1>
        <p className="mb-6 text-lg">Especialistas en repuestos y carrocerías para tu auto.</p>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Buscar repuestos</h2>
          {/* TODO: Componente de búsqueda de repuestos */}
          <input
            type="text"
            placeholder="Buscar por descripción, modelo o marca..."
            className="w-full p-3 border rounded mb-2"
          />
          <div className="text-sm text-gray-500">Solo se mostrará disponibilidad, no precios.</div>
        </div>
        <div className="mb-8">
          {/* TODO: Resultados de búsqueda de repuestos */}
          <div className="bg-white p-4 rounded shadow text-center text-gray-400">
            Resultados de búsqueda aparecerán aquí.
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">¿No encuentras tu repuesto?</h2>
          <p className="mb-2">Contáctanos para ayudarte a conseguirlo:</p>
          <div className="flex gap-4">
            <a
              href="mailto:info@carroceriasortiz.com"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Enviar correo
            </a>
            <a
              href="https://wa.me/584245866826"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
