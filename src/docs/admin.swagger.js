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
 *     AdminUser:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: user-uuid
 *         name:
 *           type: string
 *           example: Daniela Rios
 *         email:
 *           type: string
 *           format: email
 *           example: daniela@example.com
 *         role:
 *           type: string
 *           enum:
 *             - CLIENTE
 *             - TECNICO
 *             - ADMIN
 *           example: CLIENTE
 *         profession:
 *           type: string
 *           nullable: true
 *           enum:
 *             - ELECTRICISTA
 *             - PLOMERO
 *             - GASISTA
 *             - TECNICO_AC
 *             - CERRAJERO
 *             - ALBANIL
 *           example: null
 *     AdminServiceRequest:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - status
 *         - clientId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: service-request-uuid
 *         title:
 *           type: string
 *           example: Reparacion de perdida de agua
 *         status:
 *           type: string
 *           enum:
 *             - PENDIENTE
 *             - ACEPTADA
 *             - EN_PROGRESO
 *             - COMPLETADA
 *             - RECHAZADA
 *             - CANCELADA
 *           example: PENDIENTE
 *         requiredProfession:
 *           type: string
 *           nullable: true
 *           enum:
 *             - ELECTRICISTA
 *             - PLOMERO
 *             - GASISTA
 *             - TECNICO_AC
 *             - CERRAJERO
 *             - ALBANIL
 *           example: PLOMERO
 *         clientId:
 *           type: string
 *           format: uuid
 *           example: client-uuid
 *         technicianId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: null
 */

/**
 * @openapi
 * /api/admin/users:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Obtener usuarios registrados
 *     description: Obtiene el listado de usuarios registrados en la plataforma UrbanFix. Este endpoint requiere autenticacion mediante JWT y solo puede ser utilizado por usuarios con rol ADMIN. La respuesta incluye los datos basicos de cada usuario. El campo password nunca aparece en la respuesta.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Devuelve un array con los usuarios registrados. Si no existen usuarios, devuelve un array vacio.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdminUser'
 *             examples:
 *               usuariosRegistrados:
 *                 summary: Usuarios registrados
 *                 value:
 *                   - id: user-uuid
 *                     name: Daniela Rios
 *                     email: daniela@example.com
 *                     role: CLIENTE
 *                     profession: null
 *               sinUsuarios:
 *                 summary: No hay usuarios registrados
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
 *         description: El usuario esta autenticado pero no posee el rol ADMIN.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin access required
 *             example:
 *               message: Admin access required
 *       500:
 *           $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /api/admin/service-requests:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Obtener todas las solicitudes de servicio
 *     description: Obtiene todas las solicitudes de servicio registradas en la plataforma UrbanFix. Este endpoint requiere autenticacion mediante JWT y solo puede ser utilizado por usuarios con rol ADMIN.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Devuelve un array con todas las solicitudes de servicio registradas en la plataforma. Si no existen solicitudes, devuelve un array vacio.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdminServiceRequest'
 *             examples:
 *               solicitudesRegistradas:
 *                 summary: Solicitudes de servicio registradas
 *                 value:
 *                   - id: service-request-uuid
 *                     title: Reparacion de perdida de agua
 *                     status: PENDIENTE
 *                     requiredProfession: PLOMERO
 *                     clientId: client-uuid
 *                     technicianId: null
 *               sinSolicitudes:
 *                 summary: No hay solicitudes registradas
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
 *         description: El usuario esta autenticado pero no posee el rol ADMIN.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin access required
 *             example:
 *               message: Admin access required
 *       500:
 *           $ref: '#/components/responses/InternalServerError'
 */
