/**
 * @openapi
 * components:
 *   schemas:
 *     AdminUser:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         name: { type: string, example: Cliente Prueba }
 *         email: { type: string, format: email, example: cliente@test.com }
 *         role: { type: string, enum: [CLIENTE, TECNICO, ADMIN] }
 *         profession:
 *           type: string
 *           nullable: true
 *           enum: [ELECTRICISTA, PLOMERO, GASISTA, TECNICO_AC, CERRAJERO, ALBANIL]
 *         createdAt: { type: string, format: date-time }
 *
 *     AdminUserListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         message: { type: string, example: Usuarios obtenidos correctamente }
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AdminUser'
 *
 *     AdminServiceRequest:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         title: { type: string, example: Foco roto }
 *         description: { type: string, example: Reparar lámpara }
 *         address: { type: string, nullable: true, example: Directorio 1234 }
 *         status:
 *           type: string
 *           enum: [PENDIENTE, ACEPTADA, EN_PROGRESO, COMPLETADA, RECHAZADA, CANCELADA]
 *         requiredProfession:
 *           type: string
 *           nullable: true
 *           enum: [ELECTRICISTA, PLOMERO, GASISTA, TECNICO_AC, CERRAJERO, ALBANIL]
 *         clientId: { type: string, format: uuid }
 *         technicianId: { type: string, format: uuid, nullable: true }
 *         client:
 *           type: object
 *           properties:
 *             name: { type: string }
 *             email: { type: string, format: email }
 *         technician:
 *           type: object
 *           nullable: true
 *           properties:
 *             name: { type: string }
 *             email: { type: string, format: email }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *
 *     AdminServiceRequestListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         message: { type: string, example: Solicitudes obtenidas correctamente }
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AdminServiceRequest'
 *
 *     AdminStatusUpdateResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         message: { type: string, example: Estado actualizado correctamente }
 *         data:
 *           $ref: '#/components/schemas/AdminServiceRequest'
 *
 *     AdminError:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: false }
 *         message: { type: string, example: Estado inválido }
 */

/**
 * @openapi
 * /api/admin/users:
 *   get:
 *     tags: [Admin]
 *     summary: Listar usuarios registrados (ADMIN)
 *     description: Devuelve usuarios ordenados por fecha de creación, sin exponer contraseñas. Requiere rol ADMIN.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Usuarios obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUserListResponse'
 *       '401':
 *         description: Token ausente, inválido o expirado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AdminError' }
 *       '403':
 *         description: El usuario no tiene rol ADMIN
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AdminError' }
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AdminError' }
 */

/**
 * @openapi
 * /api/admin/service-requests:
 *   get:
 *     tags: [Admin]
 *     summary: Listar solicitudes de servicio (ADMIN)
 *     description: Devuelve las solicitudes con datos de cliente y técnico. Permite filtrar por estado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         description: Estado por el cual filtrar las solicitudes
 *         schema:
 *           type: string
 *           enum: [PENDIENTE, ACEPTADA, EN_PROGRESO, COMPLETADA, RECHAZADA, CANCELADA]
 *         example: CANCELADA
 *     responses:
 *       '200':
 *         description: Solicitudes obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminServiceRequestListResponse'
 *       '400':
 *         description: Estado de filtro inválido
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AdminError' }
 *       '401':
 *         description: Token ausente, inválido o expirado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AdminError' }
 *       '403':
 *         description: El usuario no tiene rol ADMIN
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AdminError' }
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AdminError' }
 */

/**
 * @openapi
 * /api/admin/service-requests/{id}/status:
 *   patch:
 *     tags: [Admin]
 *     summary: Cambiar el estado de una solicitud (ADMIN)
 *     description: Permite al administrador cambiar manualmente el estado de una solicitud existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID de la solicitud de servicio
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             additionalProperties: false
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDIENTE, ACEPTADA, EN_PROGRESO, COMPLETADA, RECHAZADA, CANCELADA]
 *                 example: CANCELADA
 *           example:
 *             status: CANCELADA
 *     responses:
 *       '200':
 *         description: Estado actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminStatusUpdateResponse'
 *       '400':
 *         description: Estado inválido
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AdminError' }
 *             example: { success: false, message: Estado inválido }
 *       '401':
 *         description: Token ausente, inválido o expirado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AdminError' }
 *       '403':
 *         description: El usuario no tiene rol ADMIN
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AdminError' }
 *       '404':
 *         description: Solicitud no encontrada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AdminError' }
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AdminError' }
 */
