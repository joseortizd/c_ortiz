import React, { useRef, useState } from 'react';

export default function UploadXLSXPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setMessage('Subiendo archivo...');
    const res = await fetch('/api/admin/upload-xlsx', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      setMessage('Archivo procesado y stock actualizado.');
      setFile(null);
      if (inputRef.current) inputRef.current.value = '';
    } else {
      setMessage('Error al procesar el archivo.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cargar archivo XLSX de repuestos</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          ref={inputRef}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={!file}
        >
          Subir y procesar
        </button>
      </form>
      {message && <div className="mt-4 text-green-700">{message}</div>}
    </div>
  );
} 