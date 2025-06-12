import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow h-screen p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="hover:underline">Inicio</Link>
          <Link href="/admin/empresa" className="hover:underline">Empresa</Link>
          <Link href="/admin/horarios" className="hover:underline">Horarios</Link>
          <Link href="/admin/repuestos" className="hover:underline">Repuestos</Link>
          <Link href="/admin/upload" className="hover:underline">Cargar XLSX</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
} 