import { Router } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import { isExist } from '../../middlewares/isExistTodo';
import { JoiValidator } from '../../middlewares/joiValidator';
import { joiTodoSchema } from '../../models/JoiTodo';
import todoController from '../../controllers/todo.controller';
import { checkToken } from '../../middlewares/checkToken';

const todosRouter: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Todo
 *   description: Todo management
 */

/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Get all todos for the user
 *     tags: [Todo]
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   description:
 *                     type: string
 *                   isCompleted:
 *                     type: boolean
 *                   userId:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */
todosRouter.get(
  '',
  checkToken(),
  asyncHandler(todoController.getAllTodo.bind(todoController)),
);

/**
 * @swagger
 * /todo/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo
 *     responses:
 *       200:
 *         description: The todo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 description:
 *                   type: string
 *                 isCompleted:
 *                   type: boolean
 *                 userId:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found
 */
todosRouter.get(
  '/:id',
  checkToken(),
  isExist(),
  asyncHandler(todoController.getTodo.bind(todoController)),
);

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Add a new todo
 *     tags: [Todo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               isCompleted:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: The created todo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 description:
 *                   type: string
 *                 isCompleted:
 *                   type: boolean
 *                 userId:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
todosRouter.post(
  '/',
  checkToken(),
  JoiValidator(joiTodoSchema),
  asyncHandler(todoController.addTodo.bind(todoController)),
);

/**
 * @swagger
 * /todo/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               isCompleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: The updated todo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 description:
 *                   type: string
 *                 isCompleted:
 *                   type: boolean
 *                 userId:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found
 */
todosRouter.put(
  '/:id',
  checkToken(),
  JoiValidator(joiTodoSchema),
  isExist(),
  asyncHandler(todoController.updateTodo.bind(todoController)),
);

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found
 */
todosRouter.delete(
  '/:id',
  checkToken(),
  isExist(),
  asyncHandler(todoController.deleteTodo.bind(todoController)),
);

export default todosRouter;
