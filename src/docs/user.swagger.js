/**
 * @openapi
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         email:
 *           type: string
 *           format: email
 *           example: cliente@test.com
 *         name:
 *           type: string
 *           example: Cristian Prueba
 *         phone:
 *           type: string
 *           nullable: true
 *           example: '1198765432'
 *         role:
 *           type: string
 *           enum: [CLIENTE, TECNICO, ADMIN]
 *         profession:
 *           type: string
 *           nullable: true
 *           enum: [ELECTRICISTA, PLOMERO, GASISTA, TECNICO_AC, CERRAJERO, ALBANIL]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     UserProfileResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Perfil obtenido correctamente
 *         data:
 *           $ref: '#/components/schemas/UserProfile'
 *
 *     UpdateProfileInput:
 *       type: object
 *       minProperties: 1
 *       additionalProperties: false
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: Cristian Prueba
 *         phone:
 *           type: string
 *           nullable: true
 *           example: '1198765432'
 *         profession:
 *           type: string
 *           nullable: true
 *           description: Solo un TECNICO puede asignarse una profesión.
 *           enum: [ELECTRICISTA, PLOMERO, GASISTA, TECNICO_AC, CERRAJERO, ALBANIL]
 *
 *     UserError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Token no proporcionado
 */

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     tags: [Users]
 *     summary: Obtener mi perfil
 *     description: Devuelve el perfil del usuario autenticado. El ID se obtiene del JWT y nunca se devuelve la contraseña.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Perfil obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfileResponse'
 *       '401':
 *         description: Token faltante, inválido o expirado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Token no proporcionado
 *       '404':
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserError'
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserError'
 *
 *   patch:
 *     tags: [Users]
 *     summary: Actualizar mi perfil
 *     description: |
 *       Permite modificar nombre, teléfono y profesión.
 *       Un CLIENTE no puede asignarse una profesión técnica.
 *       No permite modificar email, password ni role.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileInput'
 *           examples:
 *             cliente:
 *               summary: Actualizar nombre y teléfono
 *               value:
 *                 name: Cristian Prueba
 *                 phone: '1198765432'
 *             tecnico:
 *               summary: Actualizar profesión de técnico
 *               value:
 *                 profession: ELECTRICISTA
 *     responses:
 *       '200':
 *         description: Perfil actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfileResponse'
 *       '400':
 *         description: Datos inválidos o regla de negocio incumplida
 *         content:
 *           application/json:
 *             examples:
 *               rolNoPermitido:
 *                 summary: Intento de modificar rol
 *                 value:
 *                   success: false
 *                   message: Error de validación en los datos ingresados
 *                   errors:
 *                     - field: role
 *                       message: '"role" is not allowed'
 *               profesionCliente:
 *                 summary: Cliente intenta asignarse una profesión
 *                 value:
 *                   success: false
 *                   message: Un usuario con rol CLIENTE no puede tener una profesión asignada
 *       '401':
 *         description: Token faltante, inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserError'
 *       '404':
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserError'
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserError'
 */
