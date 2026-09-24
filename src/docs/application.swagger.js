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
 * components:
 *   schemas:
 *     Application:
 *       type: object
 *       required:
 *         - id
 *         - serviceRequestId
 *         - technicianId
 *         - status
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: application-uuid
 *         serviceRequestId:
 *           type: string
 *           format: uuid
 *           example: service-request-uuid
 *         technicianId:
 *           type: string
 *           format: uuid
 *           example: technician-uuid
 *         status:
 *           type: string
 *           description: Estado inicial de la postulacion. Al crearse se inicializa como PENDIENTE.
 *           enum:
 *             - PENDIENTE
 *             - ACEPTADA
 *             - RECHAZADA
 *           example: PENDIENTE
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: '2026-09-23T12:30:00.000Z'
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: '2026-09-23T12:30:00.000Z'
 */

/**
 * @openapi
 * /api/service-requests/{id}/applications:
 *   get:
 *     tags:
 *       - Applications
 *     summary: Obtener postulaciones de una solicitud
 *     description: Obtiene todas las postulaciones asociadas a una solicitud de servicio especifica. Este endpoint esta destinado al usuario con rol CLIENTE para que pueda consultar los tecnicos que se postularon a su solicitud. La respuesta incluye los datos basicos de cada tecnico para que Frontend pueda mostrar la informacion necesaria sin realizar una llamada adicional.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la solicitud de servicio cuyas postulaciones se desean consultar.
 *         schema:
 *           type: string
 *           format: uuid
 *         example: service-request-uuid
 *     responses:
 *       200:
 *         description: Devuelve un array con las postulaciones asociadas a la solicitud. Si no existen postulaciones, devuelve un array vacio.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - id
 *                   - status
 *                   - serviceRequestId
 *                   - technicianId
 *                   - technician
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: application-uuid
 *                   status:
 *                     type: string
 *                     enum:
 *                       - PENDIENTE
 *                       - ACEPTADA
 *                       - RECHAZADA
 *                     example: PENDIENTE
 *                   serviceRequestId:
 *                     type: string
 *                     format: uuid
 *                     example: service-request-uuid
 *                   technicianId:
 *                     type: string
 *                     format: uuid
 *                     example: technician-uuid
 *                   technician:
 *                     type: object
 *                     description: Datos basicos del tecnico que realizo la postulacion.
 *                     required:
 *                       - id
 *                       - name
 *                       - profession
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: technician-uuid
 *                       name:
 *                         type: string
 *                         example: Juan Perez
 *                       profession:
 *                         type: string
 *                         nullable: true
 *                         enum:
 *                           - ELECTRICISTA
 *                           - PLOMERO
 *                           - GASISTA
 *                           - TECNICO_AC
 *                           - CERRAJERO
 *                           - ALBANIL
 *                         example: PLOMERO
 *             examples:
 *               withApplications:
 *                 summary: Solicitud con postulaciones
 *                 value:
 *                   - id: application-uuid
 *                     status: PENDIENTE
 *                     serviceRequestId: service-request-uuid
 *                     technicianId: technician-uuid
 *                     technician:
 *                       id: technician-uuid
 *                       name: Juan Perez
 *                       profession: PLOMERO
 *               withoutApplications:
 *                 summary: Solicitud sin postulaciones
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
 *         description: El usuario esta autenticado pero no posee el rol CLIENTE requerido para consultar las postulaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Only clients can access applications
 *             example:
 *               message: Only clients can access applications
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
 *   post:
 *     tags:
 *       - Applications
 *     summary: Postularse a una solicitud de servicio
 *     description: Permite que un usuario con rol TECNICO se postule a una solicitud de servicio disponible. Al crear la postulacion, serviceRequestId se obtiene del parametro id de la URL, technicianId se obtiene del usuario autenticado mediante JWT y status se inicializa como PENDIENTE. Frontend no debe enviar estos valores manualmente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la solicitud de servicio a la que el tecnico desea postularse.
 *         schema:
 *           type: string
 *           format: uuid
 *         example: service-request-uuid
 *     responses:
 *       201:
 *         description: La postulacion fue creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *             example:
 *               id: application-uuid
 *               serviceRequestId: service-request-uuid
 *               technicianId: technician-uuid
 *               status: PENDIENTE
 *               createdAt: '2026-09-23T12:30:00.000Z'
 *               updatedAt: '2026-09-23T12:30:00.000Z'
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
 *         description: El usuario esta autenticado pero no posee el rol TECNICO.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Only technicians can apply to service requests
 *             example:
 *               message: Only technicians can apply to service requests
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
 *       409:
 *         description: El tecnico ya posee una postulacion para esa solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You already applied to this service request
 *             example:
 *               message: You already applied to this service request
 *       500:
 *           $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /api/applications/{id}/accept:
 *   patch:
 *     tags:
 *       - Applications
 *     summary: Aceptar postulacion
 *     description: Permite que un usuario con rol CLIENTE acepte una postulacion realizada por un tecnico. Al aceptar la postulacion, Application.status pasa a ACEPTADA, ServiceRequest.status pasa a ACEPTADA y ServiceRequest.technicianId se asigna con el technicianId correspondiente a la Application aceptada. Este endpoint no requiere Request Body.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la postulacion que el cliente desea aceptar.
 *         schema:
 *           type: string
 *           format: uuid
 *         example: application-uuid
 *     responses:
 *       200:
 *         description: La postulacion fue aceptada correctamente y el tecnico quedo asignado a la solicitud de servicio.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - application
 *                 - serviceRequest
 *               properties:
 *                 application:
 *                   type: object
 *                   required:
 *                     - id
 *                     - status
 *                     - technicianId
 *                     - serviceRequestId
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: application-uuid
 *                     status:
 *                       type: string
 *                       enum:
 *                         - ACEPTADA
 *                       example: ACEPTADA
 *                     technicianId:
 *                       type: string
 *                       format: uuid
 *                       example: technician-uuid
 *                     serviceRequestId:
 *                       type: string
 *                       format: uuid
 *                       example: service-request-uuid
 *                 serviceRequest:
 *                   type: object
 *                   required:
 *                     - id
 *                     - status
 *                     - technicianId
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: service-request-uuid
 *                     status:
 *                       type: string
 *                       enum:
 *                         - ACEPTADA
 *                       example: ACEPTADA
 *                     technicianId:
 *                       type: string
 *                       format: uuid
 *                       example: technician-uuid
 *             example:
 *               application:
 *                 id: application-uuid
 *                 status: ACEPTADA
 *                 technicianId: technician-uuid
 *                 serviceRequestId: service-request-uuid
 *               serviceRequest:
 *                 id: service-request-uuid
 *                 status: ACEPTADA
 *                 technicianId: technician-uuid
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
 *         description: El usuario esta autenticado pero no posee el rol CLIENTE.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Only clients can accept applications
 *             example:
 *               message: Only clients can accept applications
 *       404:
 *         description: No existe una postulacion con el id indicado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Application not found
 *             example:
 *               message: Application not found
 *       500:
 *           $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /api/applications/{id}/reject:
 *   patch:
 *     tags:
 *       - Applications
 *     summary: Rechazar postulacion
 *     description: Permite que un usuario con rol CLIENTE rechace una postulacion realizada por un tecnico. Al rechazar la postulacion, Application.status pasa a RECHAZADA. Este endpoint no requiere Request Body.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la postulacion que el cliente desea rechazar.
 *         schema:
 *           type: string
 *           format: uuid
 *         example: application-uuid
 *     responses:
 *       200:
 *         description: La postulacion fue rechazada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - status
 *                 - serviceRequestId
 *                 - technicianId
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: application-uuid
 *                 status:
 *                   type: string
 *                   enum:
 *                     - RECHAZADA
 *                   example: RECHAZADA
 *                 serviceRequestId:
 *                   type: string
 *                   format: uuid
 *                   example: service-request-uuid
 *                 technicianId:
 *                   type: string
 *                   format: uuid
 *                   example: technician-uuid
 *             example:
 *               id: application-uuid
 *               status: RECHAZADA
 *               serviceRequestId: service-request-uuid
 *               technicianId: technician-uuid
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
 *         description: El usuario esta autenticado pero no posee el rol CLIENTE.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Only clients can reject applications
 *             example:
 *               message: Only clients can reject applications
 *       404:
 *         description: No existe una postulacion con el id indicado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Application not found
 *             example:
 *               message: Application not found
 *       500:
 *           $ref: '#/components/responses/InternalServerError'
 */
