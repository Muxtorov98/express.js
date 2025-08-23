/**
 * @openapi
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
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
 *             properties:
 *               name:
 *                 type: string
 *                 description: Foydalanuvchi ismi
 *                 example: Test User
 *               email:
 *                 type: string
 *                 description: Foydalanuvchi email manzili
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 description: Foydalanuvchi paroli (kamida 6 belgi)
 *                 example: password123
 *               phone:
 *                 type: string
 *                 description: Foydalanuvchi telefon raqami (E.164 formati, ixtiyoriy)
 *                 example: +998901234567
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 messages:
 *                   type: string
 *                   example: Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi
 *                 data:
 *                   type: object
 *                   properties:
 *                     responseData:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 507f1f77bcf86cd799439011
 *                         name:
 *                           type: string
 *                           example: Test User
 *                         email:
 *                           type: string
 *                           example: test@example.com
 *                     token:
 *                       type: string
 *                       example: jwt_access_token
 *                     refreshToken:
 *                       type: string
 *                       example: jwt_refresh_token
 *       400:
 *         description: Noto'g'ri so'rov (masalan, noto'g'ri email formati yoki parol uzunligi yetarli emas)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 messages:
 *                   type: string
 *                   example: Noto'g'ri email formati, Parol kamida 6 ta belgidan iborat bo'lishi kerak
 *
 * /login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Auth
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
 *                 description: Foydalanuvchi email manzili
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 description: Foydalanuvchi paroli
 *                 example: password123
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli kirdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 messages:
 *                   type: string
 *                   example: Foydalanuvchi muvaffaqiyatli kirdi
 *                 data:
 *                   type: object
 *                   properties:
 *                     responseData:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 507f1f77bcf86cd799439011
 *                         name:
 *                           type: string
 *                           example: Test User
 *                         email:
 *                           type: string
 *                           example: test@example.com
 *                     token:
 *                       type: string
 *                       example: jwt_access_token
 *                     refreshToken:
 *                       type: string
 *                       example: jwt_refresh_token
 *       401:
 *         description: Ruxsat berilmadi (noto'g'ri email yoki parol)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 messages:
 *                   type: string
 *                   example: Noto'g'ri email yoki parol
 *
 * /refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Yangilash tokeni (JWT)
 *                 example: jwt_refresh_token
 *     responses:
 *       200:
 *         description: Token muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 messages:
 *                   type: string
 *                   example: Token muvaffaqiyatli yangilandi
 *                 data:
 *                   type: object
 *                   properties:
 *                     responseData:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 507f1f77bcf86cd799439011
 *                         name:
 *                           type: string
 *                           example: Test User
 *                         email:
 *                           type: string
 *                           example: test@example.com
 *                     token:
 *                       type: string
 *                       example: new_access_token
 *                     refreshToken:
 *                       type: string
 *                       example: new_refresh_token
 *       400:
 *         description: Noto'g'ri so'rov (masalan, refreshToken kiritilmagan yoki juda qisqa)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 messages:
 *                   type: string
 *                   example: Token kiritish majburiy, Token kamida 10 ta belgidan iborat bo'lishi kerak
 *       403:
 *         description: Noto'g'ri yangilash tokeni
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 403
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 messages:
 *                   type: string
 *                   example: Noto'g'ri yangilash tokeni
 *       404:
 *         description: Foydalanuvchi topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 messages:
 *                   type: string
 *                   example: Foydalanuvchi topilmadi
 *
 * /me:
 *   get:
 *     summary: Get authenticated user details
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchi ma'lumotlari muvaffaqiyatli olingan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 messages:
 *                   type: string
 *                   example: Foydalanuvchi ma'lumotlari muvaffaqiyatli olingan
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 507f1f77bcf86cd799439011
 *                     name:
 *                       type: string
 *                       example: Test User
 *                     email:
 *                       type: string
 *                       example: test@example.com
 *       401:
 *         description: Ruxsat berilmadi (tokenda xatolik yoki yo'q)
 */