import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectControler'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { validateProjectExists } from '../middleware/project'

export const routerProject = Router()

routerProject.get('/', ProjectController.getAllProjects)

routerProject.post('/',
  body('projectName')
    .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty().withMessage('El nombre del cliente es obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripción del proyecto es obligatoria'),
  handleInputErrors,
  ProjectController.createProject
)

routerProject.get('/:id',
  param('id').isMongoId().withMessage('Id no válido'),
  handleInputErrors,
  ProjectController.getProjectById
)

routerProject.put('/:id',
  param('id').isMongoId().withMessage('Id no válido'),
  body('projectName')
    .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty().withMessage('El nombre del cliente es obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripción del proyecto es obligatoria'),
  handleInputErrors,
  ProjectController.updateProject
)

routerProject.delete('/:id',
  param('id').isMongoId().withMessage('Id no válido'),
  handleInputErrors,
  
  ProjectController.deleteProject
)

// Routes for tasks
routerProject.param('projectId',validateProjectExists)

routerProject.post('/:projectId/tasks', 
  body('name')
    .notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description')
    .notEmpty().withMessage('El nombre de la descripcion es obligatoria'),
  handleInputErrors,
  TaskController.createTask
)

routerProject.get('/:projectId/tasks', 
  TaskController.getTaskProject
)

routerProject.get('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('Id no válido'),
  handleInputErrors,
  TaskController.getTaskById
)

routerProject.put('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('Id no válido'),
  body('name')
    .notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description')
    .notEmpty().withMessage('El nombre de la descripcion es obligatoria'),
  handleInputErrors,
  TaskController.updateTask
)

routerProject.delete('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('Id no válido'),
  handleInputErrors,
  TaskController.deleteTask
)

routerProject.put('/:projectId/tasks/:taskId/status',
  param('taskId').isMongoId().withMessage('Id no válido'),
  body('status')
    .notEmpty().withMessage('El estado de la tarea es obligatorio'),
  handleInputErrors,
  TaskController.updateTaskStatus

)