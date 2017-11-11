/**
* @swagger
* definitions:
*   Signup:
*     type: object
*     properties:
*       email:
*         type: string
*         format: email
*       username:
*         type: string
*       password:
*         type: string
*         format: password
*     example:
*       email: example@example.com
*       username: username
*       password: password
*/

/**
* @swagger
* definitions:
*   Signin:
*     properties:
*       username:
*         type: string
*       email:
*         type: string
*       password:
*         type: string
*         format: password
*     example:
*       username: username
*       email: example@example.com
*       password: password
*/

/**
* @swagger
* definitions:
*   Recipes:
*     properties:
*       name:
*         type: string
*       method:
*         type: string
*       ingredients:
*         type: string
*       upVotes:
*         type: integer
*       downVotes:
*         type: integer
*     example:
*       name: Beans and rice
*       method: Wash the beans and parboil the rice
*       ingredients: 1 cups of beans, 5 cups of rice
*       upVotes: 0
*       downVotes: 0
*/

/**
* @swagger
* definitions:
*   Reviews:
*     properties:
*       recipeId:
*         type: integer
*       review:
*         type: string
*     example:
*       review: Cool Stuff!
*/

/**
* @swagger
* definitions:
*   Favorites:
*     properties:
*       recipeId:
*         type: integer
*       userId:
*         type: integer
*/

/**
 * @swagger
 * definitions:
 *  upVotes:
 *    properties:
 *      recipeId:
 *        type: integer
 *      userId:
 *        type: integer
*/

/**
 * @swagger
 * definitions:
 *  downVotes:
 *    properties:
 *      recipeId:
 *        type: integer
 *      userId:
 *        type: integer
*/

/**
 * @swagger
 * definitions:
 *  Review:
 *    properties:
 *      recipeId:
 *        type: integer
 *      userId:
 *        type: integer
*/

/**
* @swagger
* /api/v1/users/signup:
*   post:
*     tags:
*       - Users
*     description: Creates a new user
*     produces:
*       - application/json
*     parameters:
*       - name: Registration
*         description: Enter your details as shown in the example to the right
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Signup'
*     responses:
*       201:
*         description: Successfully Registered
*/

/**
* @swagger
* /api/v1/users/signin:
*   post:
*     tags:
*       - Users
*     description: Sign in a registered user
*     produces:
*       - application/json
*     parameters:
*       - name: Login
*         description: Click on the example to the right and fill in your details
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Signin'
*     responses:
*       200:
*         description: Successful
*/

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *      tags:
 *        - Users
 *      description: Get the current user
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: Current user
 *          description: current logged in user details
 *          in: body
 *      responses:
 *          200:
 *              description: Successful
 */


/**
 * @swagger
 * /api/v1/recipes:
 *    get:
 *      tags:
 *        - Recipes
 *      description: Get all recipes
 *      produces:
 *        - application/json
 *      parameters:
 *        in: body
 */

/**
 * @swagger
 * securityDefinitions:
 *   ApiKey:
 *     type: apiKey
 *     in: header
 *     name: x-access-token
 * /api/v1/recipes:
 * post:
 *  tags:
 *    - Recipes
 *  description: Create a new Recipe
 *  produces:
 *  - application/json
 *  security:
 *  - ApiKey: []
 *  parameters:
 *  - name: Create a Recipe
 *  schema:
 *     $ref: '#/definitions/Recipes'
 *  responses:
 *   201:
 *      description: Succesfully created
 */

/**
 * @swagger
 * securityDefinitions:
 *   ApiKey:
 *     type: apiKey
 *     in: header
 *     name: x-access-token
 * /api/v1/recipes/{recipeId}:
 *   delete:
 *      tags:
 *        - Recipes
 *      description: Deletes a single recipe
 *      produces:
 *        - application/json
 *      security:
 *         - ApiKeyAuth: []
 *      parameters:
 *        - name: recipeId
 *          description: Recipe's id
 *          in: path
 *          required: true
 *          type: integer
 *      responses:
 *        200:
 *          description: Successfully deleted
 */

/**
 * @swagger
 * securityDefinitions:
 *   ApiKey:
 *     type: apiKey
 *     in: header
 *     name: x-access-token
 * /api/v1/recipes/{recipeId}:
 *    put:
 *      tags:
 *        - Recipes
 *      description: Modify a recipe detail
 *      produces:
 *        - application/json
*      security:
 *         - ApiKeyAuth: []
 *      parameters:
 *        in: body
 *      responses:
 *        200:
 *          description: Successfully modified
*/


/**
* @swagger
* /api/v1/recipes?sort=upvotes&order=desc:
*   get:
*     tags:
*       - Votes
*     description: Returns all Recipes by most Upvotes
*     produces:
*       - application/json
*     parameters:
*       in: body
*     responses:
*       200:
*         description: Successful
*/


/**
 * @swagger
 * securityDefinitions:
 *   ApiKey:
 *     type: apiKey
 *     in: header
 *     name: x-access-token
 * /api/v1/recipes/{recipeId}/upvote:
 *    get:
 *      tags:
 *        - Recipes
 *      description: Upvote all recipes
 *      produces:
 *        - application/json
 *      parameters:
 *        description: Enter a recipe ID
 *        in: path
 *        required: true
 *        type: integer
 *      response:
 *        201:
 *          description: Successful
 */

/**
* @swagger
*  securityDefinitions:
*    ApiKeyAuth:
*      type: apiKey
*      in: header
*      name: authorization
* /api/v1/recipes/{recipeId}/reviews:
*   post:
*     tags:
*       - Reviews
*     description: Post a Review on a particular Recipe
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: recipeID
*         description: Enter Recipe ID
*         in: path
*         required: true
*         type: integer
*       - name: Data
*         description: Click on the example to the right and enter new Review details
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/Reviews'
*     responses:
*       201:
*         description: Successfully created
*/
