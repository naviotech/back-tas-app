import type { Request, Response, NextFunction } from 'express'
import Project, { IProject } from '../models/project'

declare global {
  namespace Express {
    interface Request {
      project?: IProject
    }
  }
}



export async function validateProjectExists(req: Request,res: Response,next: NextFunction) {
  try {
    const { projectId } = req.params
    
    if(!projectId){
      const error = new Error('Proyecto no encontrado')
      return res.status(404).json({error: error.message})
    }

    const project = await Project.findById(projectId)

    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    req.project = project
    next()
  } catch (error) {
    res.status(500).json({error: 'Hubo un error'})
  }
}