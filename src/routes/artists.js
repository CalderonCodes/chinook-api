import { Router } from 'express'
import { artistController } from '../controllers/artists.js'


export const artistRouter = Router()

//Obtener todos los artistas
artistRouter.get('/', artistController.getAll)

//Obtener por id
artistRouter.get('/:id', artistController.getById)

//Agregar artista
artistRouter.post('/', artistController.create )

//Actualizar por id
artistRouter.put('/:id', artistController.update)

//Borrar por id
artistRouter.delete('/:id', artistController.delete)