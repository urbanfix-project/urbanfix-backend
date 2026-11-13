
# UrbanFix Solutions — Backend

Backend y API REST de **UrbanFix Solutions**, una plataforma web que conecta clientes con técnicos independientes de distintos oficios.

Proyecto grupal desarrollado en **Talently Lab**, con el objetivo de construir un MVP funcional mediante una arquitectura modular y un equipo de trabajo colaborativo.

## Tecnologías utilizadas

- Node.js
- Express.js
- JavaScript (ES Modules)
- Prisma ORM 7
- PostgreSQL (Supabase)
- JWT (JSON Web Token)
- Bcryptjs
- Joi
- Swagger / OpenAPI 3.0
- Morgan
- CORS
- Dotenv
- Nodemon

**Deploy:** Render  
**Base de datos:** Supabase PostgreSQL  
**Arquitectura:** Routes → Controllers → Services → Prisma

---

## Funcionalidades implementadas

### Autenticación y usuarios
- Registro de usuarios.
- Inicio de sesión con JWT.
- Contraseñas hasheadas mediante bcrypt.
- Autenticación y autorización por roles.
- Consulta y actualización del perfil.

### Solicitudes de servicio
- Creación de solicitudes por clientes.
- Consulta de solicitudes propias.
- Consulta de solicitudes disponibles para técnicos.
- Filtrado de solicitudes según la profesión del técnico.

### Administración
- Listado de usuarios registrados.
- Listado general de solicitudes.
- Filtro de solicitudes por estado.
- Modificación manual del estado de solicitudes.
- Acceso restringido al rol ADMIN.

---

## Roles del sistema

UrbanFix contempla tres roles:

| Rol | Permisos |
|-----|----------|
| CLIENTE | Crear solicitudes y consultar sus solicitudes |
| TECNICO | Consultar solicitudes disponibles según su profesión |
| ADMIN | Consultar usuarios, supervisar solicitudes y modificar sus estados |

Las rutas protegidas utilizan autenticación JWT y middleware de autorización por roles.

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

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variables de entorno

Crear un archivo `.env` en la raíz:

```env
PORT=3001
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
JWT_SECRET="reemplazar_por_una_clave_segura"
```

`DATABASE_URL` permite la conexión del backend con PostgreSQL.

`DIRECT_URL` puede utilizarse para operaciones de Prisma, como las migraciones. Si no está definida, la configuración utiliza `DATABASE_URL`.

`JWT_SECRET` se utiliza para firmar y verificar tokens JWT.

**Importante:** no subir el archivo `.env` al repositorio.

### 5. Generar el cliente Prisma

```bash
npx prisma generate
```

### 6. Aplicar migraciones

```bash
npx prisma migrate deploy
```

Este comando aplica las migraciones existentes a la base de datos configurada.

### 7. Ejecutar el servidor

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

Servidor local:

```text
http://localhost:3001
```

---

## Endpoints de la API

Base URL:

```text
/api
```

### Health Check

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /health | Verificar el estado del servidor |

Respuesta:

```json
{
  "status": "ok"
}
```

### Autenticación

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| POST | /api/auth/register | Registrar usuario | Público |
| POST | /api/auth/login | Iniciar sesión | Público |

El login devuelve un token JWT para acceder a los endpoints protegidos.

### Usuarios

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| GET | /api/users/me | Consultar perfil propio | Autenticado |
| PATCH | /api/users/me | Actualizar perfil propio | Autenticado |

### Solicitudes de servicio

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| POST | /api/service-requests | Crear solicitud | CLIENTE |
| GET | /api/service-requests/mine | Consultar solicitudes propias | CLIENTE |
| GET | /api/service-requests/available | Consultar solicitudes disponibles | TECNICO |

Las solicitudes disponibles se filtran según la profesión del técnico autenticado.

### Administración — Semana 6

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| GET | /api/admin/users | Listar usuarios registrados | ADMIN |
| GET | /api/admin/service-requests | Listar todas las solicitudes | ADMIN |
| PATCH | /api/admin/service-requests/:id/status | Modificar estado de solicitud | ADMIN |

#### Listar usuarios

```http
GET /api/admin/users
```

Permite consultar todos los usuarios registrados, sin exponer sus contraseñas.

#### Listar solicitudes

```http
GET /api/admin/service-requests
```

Devuelve las solicitudes de servicio registradas.

Permite filtrar por estado:

```http
GET /api/admin/service-requests?status=CANCELADA
```

#### Modificar estado de solicitud

```http
PATCH /api/admin/service-requests/:id/status
```

Body:

```json
{
  "status": "CANCELADA"
}
```

Los estados disponibles son:

- PENDIENTE
- ACEPTADA
- EN_PROGRESO
- COMPLETADA
- RECHAZADA
- CANCELADA

Estas operaciones requieren un usuario autenticado con rol `ADMIN`.

---

## Autenticación y autorización

La API utiliza JWT mediante el encabezado:

```http
Authorization: Bearer <token>
```

El middleware `authenticate` verifica que el token sea válido.

El middleware `authorize` verifica los permisos del usuario según su rol.

Ejemplo:

```javascript
router.use(authenticate, authorize('ADMIN'));
```

### Códigos de respuesta HTTP

| Código | Significado |
|--------|-------------|
| 200 | Operación exitosa |
| 201 | Recurso creado |
| 400 | Datos inválidos |
| 401 | Token ausente, inválido o expirado |
| 403 | Usuario sin permisos |
| 404 | Recurso no encontrado |
| 409 | Conflicto, por ejemplo, correo duplicado |
| 500 | Error interno del servidor |

Las respuestas utilizan una estructura JSON con campos como `success`, `message` y `data`, según la operación.

---

## Documentación Swagger

La API cuenta con documentación interactiva mediante Swagger y OpenAPI 3.0.

### Swagger local

http://localhost:3001/api-docs/

### Swagger desplegado

https://urbanfix-backend-7k4q.onrender.com/api-docs/

### Especificación JSON

http://localhost:3001/api-docs.json

Swagger permite:

- Consultar los endpoints documentados.
- Visualizar parámetros y respuestas.
- Ingresar el token JWT mediante **Authorize**.
- Ejecutar solicitudes con **Try it out**.

Los endpoints de administración requieren autenticación con rol `ADMIN`.

---

## Base de datos

UrbanFix utiliza PostgreSQL alojado en Supabase y Prisma ORM para acceder a los datos.

### Modelos principales

**User**
- Usuarios registrados.
- Información personal.
- Rol y profesión.

**ServiceRequest**
- Solicitudes de servicio.
- Cliente solicitante.
- Técnico asignado, cuando corresponda.
- Estado de la solicitud.

**Application**
- Postulaciones de técnicos a solicitudes.
- Estado de cada postulación.

**Review**
- Modelo de reseñas definido en el esquema de datos.

La existencia de un modelo en Prisma no implica necesariamente que sus endpoints estén implementados.

### Migraciones

Las migraciones se almacenan en:

```text
prisma/migrations/
```

Para crear una nueva migración en desarrollo:

```bash
npx prisma migrate dev --name nombre_migracion
```

Para generar el cliente Prisma:

```bash
npx prisma generate
```

Para consultar los datos visualmente:

```bash
npx prisma studio
```

---

## Seed de base de datos

El proyecto incluye un script para generar usuarios iniciales de prueba.

```bash
npm run seed
```

El script crea usuarios de los roles ADMIN, CLIENTE y TECNICO, omitiendo registros duplicados.

**Importante:** el seed actual contiene credenciales de prueba. Antes de utilizarlo en producción, deben reemplazarse por credenciales seguras y administradas mediante variables de entorno.

---

## Estructura del proyecto

```text
urbanfix-backend/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
│
├── src/
│   ├── config/
│   │   ├── prisma.js
│   │   └── swagger.js
│   │
│   ├── docs/
│   │   ├── admin.swagger.js
│   │   ├── application.swagger.js
│   │   ├── auth.swagger.js
│   │   ├── serviceRequest.swagger.js
│   │   └── user.swagger.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── validateData.js
│   │
│   ├── modules/
│   │   ├── admin/
│   │   │   ├── admin.controller.js
│   │   │   ├── admin.routes.js
│   │   │   └── admin.service.js
│   │   │
│   │   ├── auth/
│   │   ├── serviceRequests/
│   │   └── users/
│   │
│   ├── utils/
│   │   └── responseHelper.js
│   │
│   ├── api.routes.js
│   └── app.js
│
├── index.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── prisma7.config.ts
└── README.md
```

Los archivos `admin.controller.js` y `admin.service.js` corresponden a la implementación realizada en la semana 6.

---

## Pruebas realizadas

Las funcionalidades de administración fueron verificadas mediante Postman.

| Prueba | Resultado esperado | Estado |
|--------|--------------------|--------|
| Listar usuarios | 200 OK | OK |
| Listar solicitudes | 200 OK | OK |
| Modificar estado | 200 OK | OK |
| Filtrar por estado | 200 OK | OK |
| Consultar cambio realizado | 200 OK | OK |
| Enviar estado inválido | 400 Bad Request | OK |
| Acceder sin token | 401 Unauthorized | OK |
| Acceder con token CLIENTE | 403 Forbidden | OK |
| Acceder con token ADMIN | 200 OK | OK |

Las pruebas confirman el funcionamiento de los endpoints de administración, la persistencia de los cambios y el control de acceso por roles.

Estas verificaciones se realizaron manualmente; no constituyen una suite de pruebas automatizadas.

---

## Estado del proyecto

### Completado

- [x] Configuración de Node.js y Express.
- [x] Conexión PostgreSQL mediante Supabase.
- [x] Integración de Prisma ORM.
- [x] Modelos y migraciones de base de datos.
- [x] Registro e inicio de sesión.
- [x] Autenticación JWT.
- [x] Autorización por roles.
- [x] Consulta y actualización de perfiles.
- [x] Creación de solicitudes.
- [x] Consulta de solicitudes de clientes.
- [x] Consulta de solicitudes disponibles para técnicos.
- [x] Endpoints de administración — Semana 6.
- [x] Pruebas manuales de administración.
- [x] Documentación Swagger de administración.

---

## Equipo

Proyecto colaborativo desarrollado en **Talently Lab**, con participación de las áreas:

- Backend: M Daniela Rios Valencia y Tobias Escobar
- Frontend
- UX/UI
- QA
- Project Management

---

## Repositorio

https://github.com/urbanfix-project/urbanfix-backend

## Proyecto

**UrbanFix Solutions — Talently Lab**

MVP de plataforma web para conectar clientes con técnicos independientes.
