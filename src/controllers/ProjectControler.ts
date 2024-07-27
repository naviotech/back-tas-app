import type { Request, Response } from 'express'
import Project from '../models/project'

export class ProjectController{

  static getAllProjects = async (req: Request, res: Response) =>{
    try {
      const projects = await Project.find({})
      res.json(projects)
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      res.status(500).json({ error: 'Error al obtener proyectos' });
    }
    
  }

  static createProject = async (req: Request, res: Response)=>{
    const project = new Project(req.body)
    try {
      await project.save()
      res.status(201).send('Proyecto creado')
    } catch (error) {
      console.error('Error al crear proyecto:', error);
      res.status(500).json({ error: 'Error al crear proyecto' });
    }
    
  }

  static getProjectById= async (req: Request, res: Response)=>{
    const {id} = req.params
    try {
      const project = await Project.findById(id).populate('tasks')
      if(!project){
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({error: error.message})
      }
      res.json(project)
    } catch (error) {
      console.error('Error al obtener proyecto:', error);
      res.status(500).json({ error: 'Error al obtener proyecto' });
    }
    
  }

  static updateProject = async (req: Request, res: Response)=>{
    const { id } = req.params
    try {
      const project = await Project.findByIdAndUpdate(id, req.body, { new: true })

      if(!project){
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({error: error.message})
      }

      await project.save()
      res.send('Proyecto Actualizado')

    } catch (error) {
      console.error('Error al actualizar proyecto:', error);
      res.status(500).json({ error: 'Error al actualizar proyecto' });
    }
    
  }

  static deleteProject = async (req: Request, res: Response)=>{
    const { id } = req.params
    try {
      const project = await Project.findById(id)

      if(!project){
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({error: error.message})
      }
      await project.deleteOne()
      res.send('Proyecto Eliminado')

    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
      res.status(500).json({ error: 'Error al eliminar proyecto' });
    }
    
  }
}