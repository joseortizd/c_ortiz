import { pgTable, serial, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const repuesto = pgTable('repuesto', {
  id: serial('id').primaryKey(),
  descripcion: varchar('descripcion', { length: 255 }),
  modelo: varchar('modelo', { length: 255 }),
  marca: varchar('marca', { length: 255 }),
  stock: integer('stock'),
  disponible: boolean('disponible').default(true),
  actualizado: timestamp('actualizado').defaultNow(),
});

export const empresa = pgTable('empresa', {
  id: serial('id').primaryKey(),
  nombre: varchar('nombre', { length: 255 }),
  direccion: varchar('direccion', { length: 255 }),
  telefono: varchar('telefono', { length: 32 }),
  email: varchar('email', { length: 128 }),
  whatsapp: varchar('whatsapp', { length: 32 }),
});

export const usuario_admin = pgTable('usuario_admin', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 128 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
});

export const horario = pgTable('horario', {
  id: serial('id').primaryKey(),
  dia: varchar('dia', { length: 32 }),
  apertura: varchar('apertura', { length: 16 }),
  cierre: varchar('cierre', { length: 16 }),
}); 