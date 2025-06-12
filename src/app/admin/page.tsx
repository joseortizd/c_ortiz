import React from 'react';

export default function AdminHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bienvenido al Panel de Administración</h1>
      <p className="mb-2">Desde aquí puedes gestionar la información de la empresa, horarios y el stock de repuestos.</p>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Editar información de contacto y horarios</li>
        <li>Subir archivo XLSX para actualizar el stock</li>
        <li>Ver y buscar repuestos</li>
      </ul>
    </div>
  );
} 