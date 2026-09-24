/**
 * @openapi
 * components:
 *   responses:
 *     InternalServerError:
 *       description: Error interno del servidor.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Internal server error
 */

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
 *       500:
 *           $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /api/service-requests:
 *   post:
 *     tags:
 *       - Service Requests
 *     summary: Crear solicitud de servicio
 *     description: Permite que un usuario con rol CLIENTE cree una nueva solicitud de servicio en UrbanFix. El cliente debe enviar un titulo, una descripcion del problema y opcionalmente la profesion requerida. Si no se especifica requiredProfession, la solicitud puede quedar disponible sin una profesion especifica.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titulo breve de la solicitud.
 *                 example: Reparacion de perdida de agua
 *               description:
 *                 type: string
 *                 description: Descripcion del problema o servicio solicitado.
 *                 example: Tengo una perdida debajo de la pileta.
 *               requiredProfession:
 *                 type: string
 *                 nullable: true
 *                 description: Profesion requerida para atender la solicitud.
 *                 enum:
 *                   - ELECTRICISTA
 *                   - PLOMERO
 *                   - GASISTA
 *                   - TECNICO_AC
 *                   - CERRAJERO
 *                   - ALBANIL
 *           examples:
 *             conProfesion:
 *               summary: Solicitud con profesion requerida
 *               value:
 *                 title: Reparacion de perdida de agua
 *                 description: Tengo una perdida debajo de la pileta.
 *                 requiredProfession: PLOMERO
 *             sinProfesion:
 *               summary: Solicitud sin profesion especifica
 *               value:
 *                 title: Problema de humedad
 *                 description: No se que profesional necesito.
 *                 requiredProfession: null
 *     responses:
 *       201:
 *         description: Solicitud de servicio creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - title
 *                 - description
 *                 - status
 *                 - clientId
 *                 - createdAt
 *                 - updatedAt
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: service-request-uuid
 *                 title:
 *                   type: string
 *                   example: Reparacion de perdida de agua
 *                 description:
 *                   type: string
 *                   example: Tengo una perdida debajo de la pileta.
 *                 status:
 *                   type: string
 *                   enum:
 *                     - PENDIENTE
 *                     - ACEPTADA
 *                     - EN_PROGRESO
 *                     - COMPLETADA
 *                     - RECHAZADA
 *                     - CANCELADA
 *                   example: PENDIENTE
 *                 requiredProfession:
 *                   type: string
 *                   nullable: true
 *                   enum:
 *                     - ELECTRICISTA
 *                     - PLOMERO
 *                     - GASISTA
 *                     - TECNICO_AC
 *                     - CERRAJERO
 *                     - ALBANIL
 *                   example: PLOMERO
 *                 clientId:
 *                   type: string
 *                   format: uuid
 *                   example: client-uuid
 *                 technicianId:
 *                   type: string
 *                   format: uuid
 *                   nullable: true
 *                   example: null
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2026-09-23T12:00:00.000Z'
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2026-09-23T12:00:00.000Z'
 *             example:
 *               id: service-request-uuid
 *               title: Reparacion de perdida de agua
 *               description: Tengo una perdida debajo de la pileta.
 *               status: PENDIENTE
 *               requiredProfession: PLOMERO
 *               clientId: client-uuid
 *               technicianId: null
 *               createdAt: '2026-09-23T12:00:00.000Z'
 *               updatedAt: '2026-09-23T12:00:00.000Z'
 *       400:
 *         description: Los datos enviados no son validos o faltan campos requeridos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid service request data
 *             example:
 *               message: Invalid service request data
 *       401:
 *         description: No se envio un token JWT valido.
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
 *         description: El usuario esta autenticado pero no posee el rol CLIENTE requerido para crear solicitudes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Only clients can create service requests
 *             example:
 *               message: Only clients can create service requests
 *       500:
 *           $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /api/service-requests/mine:
 *   get:
 *     tags:
 *       - Service Requests
 *     summary: Obtener mis solicitudes de servicio
 *     description: Obtiene todas las solicitudes de servicio creadas por el cliente autenticado. El Backend identifica al cliente a partir del token JWT, por lo que Frontend no debe enviar clientId como parametro.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Solicitudes creadas por el cliente autenticado. Si todavia no creo solicitudes, devuelve un array vacio.
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
 *               misSolicitudes:
 *                 summary: Solicitudes del cliente autenticado
 *                 value:
 *                   - id: service-request-uuid
 *                     title: Reparacion de perdida de agua
 *                     description: Tengo una perdida debajo de la pileta.
 *                     status: PENDIENTE
 *                     requiredProfession: PLOMERO
 *                     technicianId: null
 *                     createdAt: '2026-09-23T12:00:00.000Z'
 *                     updatedAt: '2026-09-23T12:00:00.000Z'
 *               sinSolicitudes:
 *                 summary: El cliente todavia no creo solicitudes
 *                 value: []
 *       401:
 *         description: No se envio un token JWT valido.
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
 *         description: El usuario esta autenticado pero no posee el rol CLIENTE requerido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Only clients can access their service requests
 *             example:
 *               message: Only clients can access their service requests
 *       500:
 *           $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /api/service-requests/{id}:
 *   get:
 *     tags:
 *       - Service Requests
 *     summary: Obtener detalle de una solicitud de servicio
 *     description: Obtiene el detalle de una solicitud de servicio especifica a partir de su id. Este endpoint requiere autenticacion mediante JWT.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la solicitud de servicio.
 *         schema:
 *           type: string
 *           format: uuid
 *         example: service-request-uuid
 *     responses:
 *       200:
 *         description: Detalle de la solicitud de servicio.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - title
 *                 - description
 *                 - status
 *                 - clientId
 *                 - createdAt
 *                 - updatedAt
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: service-request-uuid
 *                 title:
 *                   type: string
 *                   example: Reparacion de perdida de agua
 *                 description:
 *                   type: string
 *                   example: Tengo una perdida debajo de la pileta.
 *                 status:
 *                   type: string
 *                   enum:
 *                     - PENDIENTE
 *                     - ACEPTADA
 *                     - EN_PROGRESO
 *                     - COMPLETADA
 *                     - RECHAZADA
 *                     - CANCELADA
 *                   example: PENDIENTE
 *                 requiredProfession:
 *                   type: string
 *                   nullable: true
 *                   enum:
 *                     - ELECTRICISTA
 *                     - PLOMERO
 *                     - GASISTA
 *                     - TECNICO_AC
 *                     - CERRAJERO
 *                     - ALBANIL
 *                   example: PLOMERO
 *                 clientId:
 *                   type: string
 *                   format: uuid
 *                   example: client-uuid
 *                 technicianId:
 *                   type: string
 *                   format: uuid
 *                   nullable: true
 *                   example: null
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2026-09-23T00:00:00.000Z'
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2026-09-23T00:00:00.000Z'
 *             example:
 *               id: service-request-uuid
 *               title: Reparacion de perdida de agua
 *               description: Tengo una perdida debajo de la pileta.
 *               status: PENDIENTE
 *               requiredProfession: PLOMERO
 *               clientId: client-uuid
 *               technicianId: null
 *               createdAt: '2026-09-23T00:00:00.000Z'
 *               updatedAt: '2026-09-23T00:00:00.000Z'
 *       400:
 *        description: No es un formato de ID válido.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - message
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid ID format
 *            example:
 *              message: Invalid ID format
 *       401:
 *         description: No se envio un token JWT valido.
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
 *       404:
 *         description: No existe una solicitud de servicio con el id indicado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service request not found
 *             example:
 *               message: Service request not found
 *       500:
 *           $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /api/service-requests/{id}/complete:
 *   patch:
 *     tags:
 *       - Service Requests
 *     summary: Marcar solicitud como completada
 *     description: Permite que el usuario con rol CLIENTE marque el servicio como COMPLETADA una vez que el técnico haya finalizado el trabajo. Este endpoint no requiere cuerpo (Request Body) ya que la acción está implícita en la URL. Necesita de autenticación mediante JWT.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la solicitud de servicio que se desea marcar como completada.
 *         schema:
 *           type: string
 *           format: uuid
 *         example: service-request-uuid
 *     responses:
 *       200:
 *         description: La solicitud de servicio fue marcada como completada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - title
 *                 - status
 *                 - clientId
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: service-request-uuid
 *                 title:
 *                   type: string
 *                   example: Reparacion de perdida de agua
 *                 status:
 *                   type: string
 *                   enum:
 *                     - COMPLETADA
 *                   example: COMPLETADA
 *                 clientId:
 *                   type: string
 *                   format: uuid
 *                   example: client-uuid
 *             example:
 *               id: service-request-uuid
 *               title: Reparacion de perdida de agua
 *               status: COMPLETADA
 *               clientId: client-uuid
 *       400:
 *         description: Transición de estado inválida (ej. la solicitud ya estaba cancelada o no había sido aceptada).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service request cannot be marked as completed from its current status
 *       401:
 *         description: No se envió un token JWT válido.
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
 *       403:
 *         description: El usuario está autenticado pero no es el cliente propietario de esta solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You do not have permission to complete this service request
 *       404:
 *         description: No existe una solicitud de servicio con el id indicado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service request not found
 *       500:
 *           $ref: '#/components/responses/InternalServerError'
 */
