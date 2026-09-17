# UrbanFix Backend

Backend y API REST de **UrbanFix Solutions**, una plataforma web orientada a conectar clientes con técnicos independientes de distintos oficios.

Este repositorio contiene el backend del proyecto, desarrollado con **Node.js**, **Express** y **Prisma ORM**, utilizando **PostgreSQL mediante Supabase** como base de datos.

---

## Tecnologías

Actualmente el proyecto utiliza:

- **Node.js**
- **Express**
- **Prisma ORM 7**
- **PostgreSQL**
- **CORS**
- **Dotenv**
- **Morgan**
- **Nodemon**
- **pg**
- **@prisma/adapter-pg**

### Servicios previstos

- **Supabase PostgreSQL** para persistencia de datos

> La conexión con Supabase y la autenticación todavía no se encuentran implementadas.

---

## Requisitos

Para ejecutar el proyecto localmente se recomienda tener instalado:

- Node.js 22+
- npm
- Git

Versión utilizada actualmente durante el desarrollo:

```text
Node.js v22.18.0
```

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/urbanfix-project/urbanfix-backend.git
```

### 2. Ingresar al proyecto

```bash
cd urbanfix-backend
```

### 3. Instalar las dependencias

```bash
npm install
```

Este comando instalará todas las dependencias definidas en `package.json`.

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
PORT=3001
DATABASE_URL=
```

La variable `DATABASE_URL` será utilizada posteriormente para conectar Prisma con PostgreSQL en Supabase.

> El archivo `.env` contiene información sensible y no debe subirse al repositorio.

Se recomienda utilizar un archivo `.env.example` como referencia:

```env
PORT=3001
DATABASE_URL=
```

---

## Ejecución

### Modo desarrollo

```bash
npm run dev
```

El proyecto utiliza **Nodemon**, por lo que el servidor se reinicia automáticamente cuando se detectan cambios en el código.

### Modo normal

```bash
npm start
```

Por defecto, el servidor se ejecuta en:

```text
http://localhost:3001
```

---

## Health Check

El proyecto cuenta con un endpoint para verificar que el servidor esté funcionando correctamente.

### Endpoint

```http
GET /health
```

Ejemplo:

```text
http://localhost:3001/health
```

### Respuesta esperada

```json
{
  "status": "ok"
}
```

### Status HTTP

```text
200 OK
```

---

## Logging

Durante el desarrollo se utiliza **Morgan** para registrar las peticiones HTTP realizadas al servidor.

Por ejemplo:

```text
GET /health 200 5.604 ms - 15
```

Esto permite visualizar:

- Método HTTP
- Endpoint solicitado
- Código de respuesta
- Tiempo de respuesta

---

## Prisma ORM

El proyecto utiliza **Prisma ORM 7** para gestionar la comunicación entre el backend y PostgreSQL.

Versiones utilizadas actualmente:

```text
prisma                 7.10.0
@prisma/client         7.10.0
@prisma/adapter-pg     7.10.0
pg                     8.23.0
```

### Schema

La definición de los modelos de datos se encuentra en:

```text
prisma/schema.prisma
```

Actualmente Prisma está configurado para utilizar PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
}
```

### Prisma Client

El cliente generado por Prisma será ubicado en:

```text
src/generated/prisma
```

según la configuración definida en `schema.prisma`.

### Configuración

La configuración general de Prisma se encuentra en:

```text
prisma7.config.ts
```

La conexión con la base de datos utiliza la variable de entorno:

```text
DATABASE_URL
```

La URL real será configurada posteriormente con los datos del proyecto de Supabase.

---

## Estructura actual del proyecto
```text
urbanfix-backend/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   └── index.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── prisma7.config.ts
└── README.md
```

> Las carpetas generadas automáticamente por herramientas auxiliares de Prisma que no sean necesarias para el proyecto pueden ser eliminadas para mantener limpio el repositorio.

---

## Scripts disponibles

Los principales scripts definidos en `package.json` son:

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

### `npm run dev`

Ejecuta el servidor utilizando Nodemon.

```bash
npm run dev
```

### `npm start`

Ejecuta el servidor utilizando Node.js.

```bash
npm start
```

---

## Estado actual

Actualmente se encuentra implementado:

- [x] Repositorio backend inicializado
- [x] Proyecto Node.js configurado
- [x] Servidor Express
- [x] CORS configurado
- [x] Variables de entorno con Dotenv
- [x] Logging HTTP con Morgan
- [x] Nodemon para desarrollo
- [x] Endpoint `GET /health`
- [x] Prisma ORM instalado
- [x] Prisma configurado para PostgreSQL
- [x] Driver y adaptador PostgreSQL instalados
- [ ] Conexión con Supabase
- [ ] Definición de modelos de datos
- [ ] Migraciones
- [ ] Endpoints principales de UrbanFix

## Proyecto

**UrbanFix Solutions**

Proyecto grupal desarrollado dentro de **Talently Lab**.