/**
 * @openapi
 * /api/service-requests:
 *   get:
 *     tags:
 *       - Service Requests
 *     summary: Obtener solicitudes de servicio disponibles
 *     description: Obtiene el listado de solicitudes de servicio disponibles para los tecnicos. Requiere autenticacion mediante JWT y esta destinado a usuarios con rol TECNICO.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de solicitudes de servicio disponibles. Si no existen solicitudes, devuelve un array vacio.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - id
 *                   - title
 *                   - description
 *                   - status
 *                   - clientId
 *                   - createdAt
 *                   - updatedAt
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: service-request-uuid
 *                   title:
 *                     type: string
 *                     example: Reparacion de perdida de agua
 *                   description:
 *                     type: string
 *                     example: Tengo una perdida debajo de la pileta.
 *                   status:
 *                     type: string
 *                     enum:
 *                       - PENDIENTE
 *                       - ACEPTADA
 *                       - EN_PROGRESO
 *                       - COMPLETADA
 *                       - RECHAZADA
 *                       - CANCELADA
 *                     example: PENDIENTE
 *                   requiredProfession:
 *                     type: string
 *                     nullable: true
 *                     enum:
 *                       - ELECTRICISTA
 *                       - PLOMERO
 *                       - GASISTA
 *                       - TECNICO_AC
 *                       - CERRAJERO
 *                       - ALBANIL
 *                     example: PLOMERO
 *                   clientId:
 *                     type: string
 *                     format: uuid
 *                     example: client-uuid
 *                   technicianId:
 *                     type: string
 *                     format: uuid
 *                     nullable: true
 *                     example: null
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: '2026-09-23T12:00:00.000Z'
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: '2026-09-23T12:00:00.000Z'
 *             examples:
 *               solicitudesDisponibles:
 *                 summary: Solicitudes disponibles
 *                 value:
 *                   - id: service-request-uuid
 *                     title: Reparacion de perdida de agua
 *                     description: Tengo una perdida debajo de la pileta.
 *                     status: PENDIENTE
 *                     requiredProfession: PLOMERO
 *                     clientId: client-uuid
 *                     technicianId: null
 *                     createdAt: '2026-09-23T12:00:00.000Z'
 *                     updatedAt: '2026-09-23T12:00:00.000Z'
 *               sinSolicitudes:
 *                 summary: No hay solicitudes disponibles
 *                 value: []
 *       401:
 *         description: El usuario no envio un token JWT valido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication required
 *             example:
 *               message: Authentication required
 *       403:
 *         description: El usuario esta autenticado pero no posee el rol TECNICO requerido para acceder al recurso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Only technicians can access service requests
 *             example:
 *               message: Only technicians can access service requests
 */
