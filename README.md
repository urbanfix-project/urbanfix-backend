# UrbanFix Solutions — Backend

API REST de **UrbanFix Solutions**, una plataforma web que conecta clientes con técnicos independientes de diferentes oficios.

Proyecto colaborativo desarrollado en **Talently Lab**, orientado a construir un MVP funcional con autenticación, gestión de solicitudes de servicio y administración.

## Tecnologías utilizadas

- **Backend:** Node.js, Express.js, JavaScript (ES Modules)
- **Base de datos:** PostgreSQL alojado en Supabase
- **ORM:** Prisma 7
- **Autenticación:** JWT y Bcryptjs
- **Validaciones:** Joi
- **Documentación:** Swagger / OpenAPI 3.0
- **Herramientas:** Morgan, CORS, Dotenv y Nodemon
- **Deploy:** Render

**Arquitectura:** Routes → Controllers → Services → Prisma

---

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/urbanfix-project/urbanfix-backend.git
cd urbanfix-backend
npm install
```

### 2. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3001
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
JWT_SECRET="clave_segura"
```

- `PORT`: puerto del servidor.
- `DATABASE_URL`: conexión con PostgreSQL.
- `DIRECT_URL`: conexión directa para operaciones de Prisma.
- `JWT_SECRET`: clave utilizada para firmar y verificar los tokens JWT.

**Importante:** no subir el archivo `.env` a GitHub.

### 3. Preparar Prisma

```bash
npx prisma generate
npx prisma migrate deploy
```

### 4. Ejecutar el servidor

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

**Servidor local:** http://localhost:3001

---

## Roles y permisos

| Rol | Funcionalidades |
|---|---|
| CLIENTE | Crear y consultar sus solicitudes |
| TECNICO | Consultar solicitudes disponibles, aceptar y rechazar trabajos asignados |
| ADMIN | Consultar usuarios, supervisar solicitudes y modificar sus estados |

Los endpoints protegidos utilizan JWT y middlewares de autenticación y autorización.

### Profesiones disponibles

`ELECTRICISTA`, `PLOMERO`, `GASISTA`, `TECNICO_AC`, `CERRAJERO`, `ALBANIL`

---

## Endpoints implementados

**Base URL:** `/api`

### Health Check

| Método | Endpoint | Acceso |
|---|---|---|
| GET | `/health` | Público |

Permite verificar el funcionamiento del servidor.

### Autenticación

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| POST | `/api/auth/register` | Registrar usuario | Público |
| POST | `/api/auth/login` | Iniciar sesión y obtener JWT | Público |

Las contraseñas se almacenan hasheadas mediante bcrypt.

### Usuarios

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| GET | `/api/users/me` | Consultar perfil propio | Autenticado |
| PATCH | `/api/users/me` | Actualizar perfil propio | Autenticado |

### Solicitudes de servicio

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| POST | `/api/service-requests` | Crear solicitud | CLIENTE |
| GET | `/api/service-requests/mine` | Consultar solicitudes propias | CLIENTE |
| GET | `/api/service-requests/available` | Consultar solicitudes disponibles | TECNICO |
| PATCH | `/api/service-requests/:id/accept` | Aceptar solicitud disponible | TECNICO |
| PATCH | `/api/service-requests/:id/reject` | Rechazar solicitud asignada | TECNICO |

**Reglas de negocio:**

- Las solicitudes se crean con estado `PENDIENTE` y sin técnico asignado.
- Cada cliente puede consultar únicamente sus solicitudes.
- Los técnicos visualizan solicitudes pendientes, sin asignación y correspondientes a su profesión.
- Para aceptar una solicitud, el técnico debe tener la profesión requerida y la solicitud debe estar disponible.
- Al aceptar, el estado cambia a `ACEPTADA` y se asigna el `technicianId` del técnico autenticado.
- La aceptación utiliza una actualización condicional de Prisma para evitar que dos técnicos acepten simultáneamente el mismo trabajo.
- Solo el técnico asignado puede rechazar una solicitud en estado `ACEPTADA`.
- Al rechazar, el estado cambia a `RECHAZADA` y `technicianId` queda en `null`.
- Las solicitudes rechazadas no vuelven automáticamente a estar disponibles.

Los endpoints de aceptación y rechazo no requieren body JSON.

### Administración

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| GET | `/api/admin/users` | Listar usuarios registrados | ADMIN |
| GET | `/api/admin/service-requests` | Listar todas las solicitudes | ADMIN |
| PATCH | `/api/admin/service-requests/:id/status` | Modificar estado de una solicitud | ADMIN |

**Reglas de negocio:**

- Todas las rutas requieren autenticación JWT y rol `ADMIN`.
- El listado de usuarios no expone contraseñas.
- El administrador puede consultar solicitudes independientemente de su estado o técnico asignado.
- Se permite filtrar solicitudes mediante `?status=PENDIENTE`.
- La modificación de estado valida que el valor enviado pertenezca al enum `ServiceStatus`.
- Se devuelve `404` si la solicitud no existe.

Ejemplo para modificar el estado:

```http
PATCH /api/admin/service-requests/:id/status
```

**Body:**

```json
{
  "status": "CANCELADA"
}
```

---

## Estados de solicitudes

| Estado | Descripción |
|---|---|
| PENDIENTE | Solicitud creada y disponible |
| ACEPTADA | Solicitud aceptada por un técnico |
| EN_PROGRESO | Trabajo en ejecución |
| COMPLETADA | Trabajo finalizado |
| RECHAZADA | Solicitud rechazada |
| CANCELADA | Solicitud cancelada |

Los estados están definidos en el enum `ServiceStatus` de Prisma.

---

## Autenticación y manejo de errores

Los endpoints protegidos requieren el encabezado:

```http
Authorization: Bearer <token>
```

Los middlewares `authenticate` y `authorize` verifican la validez del JWT y los permisos del usuario.

La API utiliza respuestas JSON con los campos `success`, `message` y `data`, según corresponda.

### Códigos HTTP

| Código | Significado |
|---|---|
| 200 | Operación exitosa |
| 201 | Recurso creado |
| 400 | Datos inválidos |
| 401 | Token ausente, inválido o expirado |
| 403 | Usuario sin permisos |
| 404 | Recurso no encontrado |
| 409 | Conflicto con el estado actual del recurso |
| 500 | Error interno del servidor |

---

## Base de datos

Se utiliza **PostgreSQL alojado en Supabase**, mediante Prisma ORM.

### Modelos principales

- **User:** usuarios, roles y profesiones.
- **ServiceRequest:** solicitudes, clientes, técnicos asignados y estados.
- **Application:** postulaciones de técnicos a solicitudes.
- **Review:** calificaciones y comentarios vinculados a servicios.

Los modelos `Application` y `Review` están definidos en Prisma, pero sus endpoints no forman parte de las rutas implementadas de esta versión.

### Comandos Prisma

Generar cliente:

```bash
npx prisma generate
```

Crear migración:

```bash
npx prisma migrate dev --name nombre_migracion
```

Aplicar migraciones:

```bash
npx prisma migrate deploy
```

Visualizar los datos:

```bash
npx prisma studio
```

### Seed de usuarios

El proyecto incluye un script para generar usuarios iniciales:

```bash
npm run seed
```

Permite crear usuarios de los roles `ADMIN`, `CLIENTE` y `TECNICO`, evitando registros duplicados.

Las credenciales de prueba deben reemplazarse por credenciales seguras antes de utilizar el seed en producción.

---

## Estructura del proyecto

```text
urbanfix-backend/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/
│   │   ├── prisma.js
│   │   └── swagger.js
│   ├── docs/
│   │   ├── admin.swagger.js
│   │   ├── application.swagger.js
│   │   ├── auth.swagger.js
│   │   ├── serviceRequest.swagger.js
│   │   └── user.swagger.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── validateData.js
│   ├── modules/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── serviceRequests/
│   │   └── users/
│   ├── utils/
│   │   └── responseHelper.js
│   ├── api.routes.js
│   └── app.js
├── index.js
├── .env.example
├── package.json
├── prisma7.config.ts
└── README.md
```

---

## Documentación Swagger

La API cuenta con documentación interactiva mediante Swagger / OpenAPI 3.0.

Permite consultar endpoints, parámetros, códigos de respuesta y ejecutar solicitudes utilizando **Authorize** con JWT.

- **Swagger local:** http://localhost:3001/api-docs/
- **Swagger deploy:** https://urbanfix-backend-7k4q.onrender.com/api-docs/
- **Especificación JSON:** http://localhost:3001/api-docs.json

Los módulos documentados son:

- Auth
- Users
- Service Requests
- Admin

---

## Pruebas realizadas

Se realizaron pruebas manuales mediante **Postman**, verificando también los cambios persistidos en **Supabase**.

| Funcionalidad | Validaciones realizadas |
|---|---|
| Administración | Listado de usuarios, filtro y modificación de estados |
| Autorización ADMIN | Respuestas 200, 401 y 403 según token y rol |
| Aceptar solicitud | Aceptación exitosa, solicitud inexistente y doble aceptación |
| Rechazar solicitud | Rechazo exitoso, rechazo repetido, solicitud inexistente y permisos |
| Persistencia | Estados ACEPTADA y RECHAZADA verificados en PostgreSQL |
| Manejo de errores | Respuestas 400, 401, 403, 404 y 409 según el caso |

Las pruebas fueron manuales. Quedan como mejoras futuras las pruebas automatizadas, las pruebas de concurrencia real y la auditoría de modificaciones administrativas.

---

## Equipo y repositorio

Proyecto desarrollado en **Talently Lab** con participación de las áreas:

- Frontend
- UX/UI
- QA
- Project Management

**Responsable Backend: M.Daniela Rios**

**Repositorio:** https://github.com/urbanfix-project/urbanfix-backend

**UrbanFix Solutions — MVP de plataforma web para conectar clientes con técnicos independientes.**
