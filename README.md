# Finanzas Sanas — Sitio web

Sitio institucional del entrenamiento **Finanzas Sanas** ("Administra como Dios diseñó"), construido con
Next.js 15 (App Router + TypeScript) y Tailwind CSS, con Supabase para guardar registros y resultados del
taller interactivo.

## Estructura

```
app/                  Páginas (Inicio, Sobre Nosotros, Entrenamiento, Recursos, Blog, Contacto)
components/           Header, Footer, secciones del Home, formulario de contacto
lib/supabase.ts        Cliente de Supabase (usa variables de entorno)
public/taller/         Taller interactivo (HTML/CSS/JS autocontenido), servido en /taller/index.html
supabase/schema.sql    Script SQL para crear las tablas en tu proyecto Supabase
design/                Manual de marca (referencia visual, no se usa en el build)
```

## Requisitos

- Node.js 20+ y npm

## Empezar en local

```bash
npm install
cp .env.example .env.local   # y completa tus credenciales de Supabase
npm run dev
```

Abre http://localhost:3000

## Variables de entorno

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon/public key de tu proyecto (segura de exponer en el cliente) |

`.env.local` no se sube a git (está en `.gitignore`). El taller (`public/taller/index.html`) usa estas mismas
credenciales pero hardcodeadas directamente en su script (por ser un archivo estático sin build propio) — si
alguna vez rotas la anon key, actualízala en dos lugares: `.env.local` y dentro de `public/taller/index.html`.

## Supabase

1. Entra al **SQL Editor** de tu proyecto en https://app.supabase.com
2. Pega y ejecuta el contenido de [`supabase/schema.sql`](supabase/schema.sql) (crea las tablas
   `workshop_registrations` y `workshop_results` con seguridad a nivel de fila que solo permite `INSERT`
   desde el cliente).
3. Los datos de tus alumnos quedan visibles en el dashboard de Supabase (Table Editor), no en el sitio.

## El taller interactivo

`public/taller/index.html` es el ejercicio "Construye tu radiografía financiera" (Módulo 3). Es un archivo
estático independiente — Next.js lo sirve tal cual en `/taller/index.html`, sin pasar por React. Tiene una
pantalla inicial de registro (nombre/correo) y, al final del taller, un botón "Guardar mi taller" que envía
el diagnóstico completo a Supabase. Si la conexión falla, el taller sigue funcionando igual (no bloquea la
experiencia del usuario).

## Despliegue en Vercel

1. Sube este repo a GitHub.
2. En [vercel.com](https://vercel.com), "Add New Project" → importa el repo.
3. En la configuración del proyecto, agrega las variables de entorno `NEXT_PUBLIC_SUPABASE_URL` y
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Settings → Environment Variables).
4. Deploy. Next.js no necesita configuración adicional.

## Páginas con contenido de ejemplo

Sobre Nosotros, Entrenamiento, Recursos, Blog y Contacto tienen contenido placeholder marcado entre
corchetes `[...]` — reemplázalo por tu contenido real cuando lo tengas listo.
