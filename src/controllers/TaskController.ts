import type { Request, Response } from 'express'
import Project from '../models/project'
import Task, { taskStatus } from '../models/task'

export class TaskController {
  static createTask = async (req: Request, res: Response)=>{
   
    try {
      const task = new Task(req.body)
      task.project = req.project.id
      req.project.tasks.push(task.id)
      
      await Promise.allSettled([task.save(), req.project.save()])

      res.send('Tarea creada')
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      res.status(500).json({ error: 'Error al crear la tarea' });
    }
  }

  static getTaskProject = async (req: Request, res: Response)=>{
   
    try {
      const task = await Task.find({project: req.project.id}).populate('project')
      res.json(task)
    } catch (error) {
      console.error('Error al buscar la tarea:', error);
      res.status(500).json({ error: 'Error al buscar la tarea' });
    }
  }

  static getTaskById = async (req: Request, res: Response)=>{
   
    try {
      const { taskId } = req.params
      const task = await Task.findById(taskId)

      if(!task){
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({error: error.message})
      }
      if(task.project.toString() !== req.project.id){
        const error = new Error('No válido')
        return res.status(400).json({error: error.message})
      }
      res.json(task)
    } catch (error) {
      console.error('Error al buscar la tarea:', error);
      res.status(500).json({ error: 'Error al buscar la tarea' });
    }
  }

  static updateTask = async (req: Request, res: Response)=>{
   
    try {
      const { taskId } = req.params
      const task = await Task.findById(taskId)

      if(!task){
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({error: error.message})
      }
      if(task.project.toString() !== req.project.id){
        const error = new Error('No válido')
        return res.status(400).json({error: error.message})
      }
      task.name = req.body.name
      task.description = req.body.description
      await task.save()
      res.send("Tarea Actualizada")
      
      
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      res.status(500).json({ error: error.message });
    }
  }

  static deleteTask = async (req: Request, res: Response)=>{
   
    try {
      const { taskId } = req.params
      const task = await Task.findById(taskId)

      if(!task){
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({error: error.message})
      }
      if(task.project.toString() !== req.project.id){
        const error = new Error('No válido')
        return res.status(400).json({error: error.message})
      }
      
      req.project.tasks = req.project.tasks.filter(task => task.toString() !== taskId)
      
      await Promise.allSettled([req.project.save(), task.deleteOne()])
      res.send("Tarea Eliminada")
      
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
  }

  static updateTaskStatus = async (req: Request, res: Response)=>{
   
    try {
      const { taskId } = req.params;
      const { status } = req.body;

      if (!Object.values(taskStatus).includes(status)) {
        return res.status(400).json({ error: 'Estado no válido' });
      }

      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }

      if (!req.project) {
        return res.status(400).json({ error: 'Proyecto no definido en la solicitud' });
      }

      if (task.project.toString() !== req.project.id) {
        return res.status(403).json({ error: 'No autorizado' });
      }

      task.status = status;

      await task.save();
      res.json({ message: 'Estado actualizado', task });

    } catch (error) {
      console.error('Error al actualizar el estado de la tarea:', error);
      res.status(500).json({ error: 'Error al actualizar el estado de la tarea' });
    }
  }
}