/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Authentication related operations
 *   - name: Leads
 *     description: Lead management operations
 */

// Google Authentication Routes
/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Redirect to Google for authentication
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth2 login page
 */
/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth2 callback for handling the response
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Authentication successful, user logged in
 *       401:
 *         description: Authentication failed
 */

// Microsoft Authentication Routes
/**
 * @swagger
 * /api/auth/microsoft:
 *   get:
 *     summary: Redirect to Microsoft for authentication
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to Microsoft OAuth2 login page
 */
/**
 * @swagger
 * /api/auth/microsoft/callback:
 *   get:
 *     summary: Microsoft OAuth2 callback for handling the response
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Authentication successful, user logged in
 *       401:
 *         description: Authentication failed
 */

// Authentication Failure Route
/**
 * @swagger
 * /api/auth/failure:
 *   get:
 *     summary: Authentication failure route
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Render a message or redirect due to failed authentication
 */

// Lead Management Routes
/**
 * @swagger
 * /api/leads:
 *   post:
 *     summary: Create a new lead
 *     tags: [Leads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lead created successfully
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/leads:
 *   get:
 *     summary: Get all leads
 *     tags: [Leads]
 *     responses:
 *       200:
 *         description: Successfully fetched all leads
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/leads/{id}:
 *   get:
 *     summary: Get a lead by ID
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lead ID
 *     responses:
 *       200:
 *         description: Lead fetched successfully
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/leads/{id}:
 *   put:
 *     summary: Update a lead by ID
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lead ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lead updated successfully
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/leads/{id}:
 *   delete:
 *     summary: Delete a lead by ID
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lead ID
 *     responses:
 *       200:
 *         description: Lead deleted successfully
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/leads/{id}/score:
 *   get:
 *     summary: Score a lead
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lead ID
 *     responses:
 *       200:
 *         description: Lead scored successfully
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/leads/{id}/send-email:
 *   post:
 *     summary: Send a personalized email to a lead
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lead ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Server error
 */

