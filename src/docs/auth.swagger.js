/**
 * @openapi
 * components:
 *   schemas:
 *     AuthUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: Juan Pérez
 *         email:
 *           type: string
 *           format: email
 *           example: juan@example.com
 *         phone:
 *           type: string
 *           nullable: true
 *           example: '1123456789'
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
 *     AuthSuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Inicio de sesión exitoso
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: Token JWT
 *               example: eyJhbGciOiJIUzI1NiIs...
 *             user:
 *               $ref: '#/components/schemas/AuthUser'
 *
 *     AuthError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Credenciales inválidas
 */

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registrar usuario (CLIENTE o TECNICO)
 *     description: |
 *       Registra un usuario nuevo.
 *       Si no se envía role, se asigna CLIENTE.
 *       No permite registrar usuarios ADMIN.
 *       La contraseña se almacena hasheada con bcrypt.
 *       La profesión es opcional para TECNICO y no se permite para CLIENTE.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 maxLength: 72
 *                 example: Password123
 *               phone:
 *                 type: string
 *                 nullable: true
 *                 example: '1123456789'
 *               role:
 *                 type: string
 *                 enum: [CLIENTE, TECNICO]
 *                 default: CLIENTE
 *               profession:
 *                 type: string
 *                 nullable: true
 *                 description: Solo para TECNICO.
 *                 enum: [ELECTRICISTA, PLOMERO, GASISTA, TECNICO_AC, CERRAJERO, ALBANIL]
 *           examples:
 *             cliente:
 *               summary: Registro de cliente
 *               value:
 *                 name: María García
 *                 email: maria@example.com
 *                 password: Password123
 *                 role: CLIENTE
 *             tecnico:
 *               summary: Registro de técnico electricista
 *               value:
 *                 name: Juan Pérez
 *                 email: juan@example.com
 *                 password: Password123
 *                 phone: '1123456789'
 *                 role: TECNICO
 *                 profession: ELECTRICISTA
 *     responses:
 *       '201':
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthSuccessResponse'
 *       '400':
 *         description: Error de validación de datos o rol no permitido
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error de validación en los datos ingresados
 *               errors:
 *                 - field: role
 *                   message: El rol debe ser CLIENTE o TECNICO
 *       '409':
 *         description: El email ya está registrado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: El correo electrónico ya está registrado
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthError'
 */

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesión
 *     description: Autentica un usuario mediante email y contraseña. Devuelve un JWT y los datos del usuario sin incluir su contraseña.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: cliente@test.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthSuccessResponse'
 *       '400':
 *         description: Datos de inicio de sesión inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthError'
 *       '401':
 *         description: Email o contraseña incorrectos
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Credenciales inválidas
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthError'
 */

