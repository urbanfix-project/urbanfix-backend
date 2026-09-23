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
 */
