import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { repuesto } from '@/lib/schema';
import xlsx from 'xlsx';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ ok: false, message: 'Archivo no recibido.' }, { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const workbook = xlsx.read(arrayBuffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  // Filas a partir de la 11 (índice 10)
  const productos = data.slice(10).map((row: any) => ({
    descripcion: row[0]?.toString() || '',
    modelo: row[1]?.toString() || '',
    marca: row[2]?.toString() || '',
    stock: Number(row[3]) || 0,
    disponible: (Number(row[3]) || 0) > 0,
  })).filter(p => p.descripcion && p.modelo && p.marca);
  // Limpiar tabla y cargar nuevos datos
  await db.delete(repuesto);
  await db.insert(repuesto).values(productos);
  return NextResponse.json({ ok: true, count: productos.length });
} 