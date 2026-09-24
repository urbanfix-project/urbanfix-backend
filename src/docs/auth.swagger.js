/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registrar usuario
 *     description: Registra un nuevo usuario en la plataforma UrbanFix. El usuario puede registrarse con rol CLIENTE o TECNICO. Si el rol es TECNICO, puede indicar su profesion. Es un endpoint publico y no requiere autenticacion.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Daniela Rios
 *               email:
 *                 type: string
 *                 format: email
 *                 example: daniela@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *               role:
 *                 type: string
 *                 enum:
 *                   - CLIENTE
 *                   - TECNICO
 *               profession:
 *                 type: string
 *                 description: Requerido cuando role es TECNICO.
 *                 enum:
 *                   - ELECTRICISTA
 *                   - PLOMERO
 *                   - GASISTA
 *                   - TECNICO_AC
 *                   - CERRAJERO
 *                   - ALBANIL
 *             oneOf:
 *               - title: Registro de cliente
 *                 properties:
 *                   role:
 *                     enum:
 *                       - CLIENTE
 *               - title: Registro de tecnico
 *                 required:
 *                   - profession
 *                 properties:
 *                   role:
 *                     enum:
 *                       - TECNICO
 *           examples:
 *             cliente:
 *               summary: Registro de cliente
 *               value:
 *                 name: Daniela Rios
 *                 email: daniela@example.com
 *                 password: password123
 *                 role: CLIENTE
 *             tecnico:
 *               summary: Registro de tecnico
 *               value:
 *                 name: Juan Perez
 *                 email: juan@example.com
 *                 password: password123
 *                 role: TECNICO
 *                 profession: ELECTRICISTA
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - name
 *                 - email
 *                 - role
 *                 - createdAt
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: user-uuid
 *                 name:
 *                   type: string
 *                   example: Daniela Rios
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: daniela@example.com
 *                 role:
 *                   type: string
 *                   enum:
 *                     - CLIENTE
 *                     - TECNICO
 *                   example: CLIENTE
 *                 profession:
 *                   type: string
 *                   nullable: true
 *                   enum:
 *                     - ELECTRICISTA
 *                     - PLOMERO
 *                     - GASISTA
 *                     - TECNICO_AC
 *                     - CERRAJERO
 *                     - ALBANIL
 *                   example: null
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2026-09-23T00:00:00.000Z'
 *             example:
 *               id: user-uuid
 *               name: Daniela Rios
 *               email: daniela@example.com
 *               role: CLIENTE
 *               profession: null
 *               createdAt: '2026-09-23T00:00:00.000Z'
 *       400:
 *         description: Datos de usuario invalidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid user data
 *             example:
 *               message: Invalid user data
 *       409:
 *         description: El correo electronico ya esta registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email already registered
 *             example:
 *               message: Email already registered
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Iniciar sesion
 *     description: Autentica a un usuario registrado en UrbanFix mediante email y contrasena. Si las credenciales son validas, devuelve un token JWT y los datos basicos del usuario autenticado.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: daniela@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *           example:
 *             email: daniela@example.com
 *             password: password123
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - token
 *                 - user
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticar solicitudes posteriores.
 *                   example: jwt-token
 *                 user:
 *                   type: object
 *                   required:
 *                     - id
 *                     - name
 *                     - email
 *                     - role
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: user-uuid
 *                     name:
 *                       type: string
 *                       example: Daniela Rios
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: daniela@example.com
 *                     role:
 *                       type: string
 *                       enum:
 *                         - CLIENTE
 *                         - TECNICO
 *                         - ADMIN
 *                       example: CLIENTE
 *                     profession:
 *                       type: string
 *                       nullable: true
 *                       enum:
 *                         - ELECTRICISTA
 *                         - PLOMERO
 *                         - GASISTA
 *                         - TECNICO_AC
 *                         - CERRAJERO
 *                         - ALBANIL
 *                       example: null
 *             example:
 *               token: jwt-token
 *               user:
 *                 id: user-uuid
 *                 name: Daniela Rios
 *                 email: daniela@example.com
 *                 role: CLIENTE
 *                 profession: null
 *       400:
 *         description: Datos de inicio de sesion invalidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid login data
 *             example:
 *               message: Invalid login data
 *       401:
 *         description: Email o contrasena incorrectos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 *             example:
 *               message: Invalid email or password
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
