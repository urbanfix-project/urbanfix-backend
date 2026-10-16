/**
 * @openapi
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - name
 *         - role
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *         email:
 *           type: string
 *           format: email
 *           example: tecnico@test.com
 *         name:
 *           type: string
 *           example: Juan Pérez
 *         role:
 *           type: string
 *           enum:
 *             - CLIENTE
 *             - TECNICO
 *             - ADMIN
 *           example: TECNICO
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
 *           example: PLOMERO
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: '2026-09-23T12:00:00.000Z'
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: '2026-09-23T12:00:00.000Z'
 *
 *     UpdateProfileInput:
 *       type: object
 *       minProperties: 1
 *       description: Debe enviarse al menos uno de los campos permitidos.
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: Juan Carlos Pérez
 *         profession:
 *           type: string
 *           nullable: true
 *           description: Exclusivo para usuarios con rol TECNICO.
 *           enum:
 *             - ELECTRICISTA
 *             - PLOMERO
 *             - GASISTA
 *             - TECNICO_AC
 *             - CERRAJERO
 *             - ALBANIL
 *           example: ELECTRICISTA
 */

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener perfil del usuario autenticado
 *     description: Devuelve la información del perfil correspondiente al usuario que realiza la petición. El ID se extrae automáticamente del token JWT enviado en el header Authorization. Nunca devuelve el campo password.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Perfil obtenido correctamente
 *                 data:
 *                   $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Token no proporcionado, inválido o expirado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Token no proporcionado
 *       404:
 *         description: El usuario del token ya no existe en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Ocurrió un error inesperado en el servidor
 *
 *   patch:
 *     tags:
 *       - Users
 *     summary: Actualizar perfil del usuario autenticado
 *     description: Permite actualizar parcialmente los datos del usuario logueado (nombre y/o profesión). Si un usuario con rol CLIENTE intenta asignarse una profesión, devolverá un error 400.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileInput'
 *           examples:
 *             actualizarNombre:
 *               summary: Actualizar solo el nombre (Cliente o Técnico)
 *               value:
 *                 name: María Elena García
 *             actualizarTecnico:
 *               summary: Actualizar nombre y profesión (Solo Técnicos)
 *               value:
 *                 name: Juan Pérez
 *                 profession: GASISTA
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Perfil actualizado correctamente
 *                 data:
 *                   $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Error de validación de datos (Joi) o regla de negocio (ej. CLIENTE intentando asignarse profesión).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error de validación en los datos ingresados
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: name
 *                       message:
 *                         type: string
 *                         example: El nombre debe tener al menos 2 caracteres
 *             examples:
 *               validacionJoi:
 *                 summary: Error de validación de esquema (Joi)
 *                 value:
 *                   success: false
 *                   message: Error de validación en los datos ingresados
 *                   errors:
 *                     - field: name
 *                       message: El nombre debe tener al menos 2 caracteres
 *               reglaNegocio:
 *                 summary: Cliente intentando asignar profesión
 *                 value:
 *                   success: false
 *                   message: Un usuario con rol CLIENTE no puede tener una profesión asignada
 *       401:
 *         description: Token no proporcionado, inválido o expirado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Token inválido o expirado
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Ocurrió un error inesperado en el servidor
 */