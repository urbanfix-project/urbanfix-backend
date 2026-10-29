/**
 * @openapi
 * components:
 *   schemas:
 *     ServiceRequest:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         title: { type: string, example: Reparación de instalación eléctrica }
 *         description: { type: string, example: Necesito reparar varios enchufes que dejaron de funcionar. }
 *         status: { type: string, enum: [PENDIENTE, ACEPTADA, EN_PROGRESO, COMPLETADA, RECHAZADA, CANCELADA], example: PENDIENTE }
 *         requiredProfession: { type: string, nullable: true, enum: [ELECTRICISTA, PLOMERO, GASISTA, TECNICO_AC, CERRAJERO, ALBANIL], example: ELECTRICISTA }
 *         clientId: { type: string, format: uuid }
 *         technicianId: { type: string, format: uuid, nullable: true }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     ServiceRequestResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         message: { type: string }
 *         data:
 *           $ref: '#/components/schemas/ServiceRequest'
 *     ServiceRequestsResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         message: { type: string }
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ServiceRequest'
 *     ServiceRequestError:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: false }
 *         message: { type: string, example: No tenés permiso para acceder }
 *     ServiceRequestValidationError:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: false }
 *         message: { type: string, example: Error de validación en los datos ingresados }
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field: { type: string, example: title }
 *               message: { type: string, example: El título es obligatorio }
 */

/**
 * @openapi
 * /api/service-requests:
 *   post:
 *     tags: [Service Requests]
 *     summary: Crear solicitud de servicio (CLIENTE)
 *     description: Crea una solicitud con estado PENDIENTE. clientId se obtiene del JWT; status y technicianId no se envían en el body.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required: [title, description, requiredProfession]
 *             properties:
 *               title: { type: string, minLength: 5, maxLength: 100, example: Reparación de instalación eléctrica }
 *               description: { type: string, minLength: 10, maxLength: 1000, example: Necesito reparar varios enchufes que dejaron de funcionar. }
 *               requiredProfession:
 *                 type: string
 *                 enum: [ELECTRICISTA, PLOMERO, GASISTA, TECNICO_AC, CERRAJERO, ALBANIL]
 *                 example: ELECTRICISTA
 *     responses:
 *       '201':
 *         description: Solicitud creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequestResponse'
 *       '400':
 *         description: Datos inválidos o faltantes (Joi)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequestValidationError'
 *       '401':
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequestError'
 *             example: { success: false, message: Token no proporcionado }
 *       '403':
 *         description: El usuario autenticado no tiene rol CLIENTE
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequestError'
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequestError'
 */

/**
 * @openapi
 * /api/service-requests/mine:
 *   get:
 *     tags: [Service Requests]
 *     summary: Listar mis solicitudes (CLIENTE)
 *     description: Retorna las solicitudes del cliente autenticado ordenadas de la más reciente a la más antigua. El ID del cliente se obtiene del JWT. Incluye datos básicos del técnico si está asignado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Solicitudes obtenidas correctamente (data puede ser [])
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequestsResponse'
 *       '401':
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequestError'
 *       '403':
 *         description: El usuario autenticado no tiene rol CLIENTE
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequestError'
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequestError'
 */

/**
 * @openapi
 * /api/service-requests/available:
 *   get:
 *     tags: [Service Requests]
 *     summary: Listar solicitudes disponibles (TECNICO)
 *     description: Retorna solicitudes PENDIENTE, sin técnico asignado y que coinciden con la profesión del técnico autenticado. Incluye nombre del cliente. Si el técnico no tiene profesión, responde 400.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Solicitudes disponibles obtenidas correctamente (data puede ser [])
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequestsResponse'
 *       '400':
 *         description: El técnico debe tener una profesión asignada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequestError'
 *       '401':
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequestError'
 *       '403':
 *         description: El usuario autenticado no tiene rol TECNICO
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequestError'
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRequestError'
 */
