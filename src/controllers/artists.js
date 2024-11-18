import { artistModel } from "../models/artists.js"
import { validateArtist } from "../schemas/artist.js"


export class artistController {
  static async getAll (req, res) {
    const artists = await artistModel.getAll({  })
    res.json(artists)
  }

  static async getById (req, res) {
    const { id } = req.params
    const artist = await artistModel.getById({ id })
    if (artist) return res.json(artist)
    res.status(404).json({ message: 'Artist not found' })
  }

  static async create (req, res) {
    const result = validateArtist(req.body)
    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newArtist = await artistModel.create({ input: result.data })
    if (!newArtist) {
        // 422 Unprocessable Entity
          return res.status(400).json({ error: "El artista ya existe" })
    }
    res.status(201).json(newArtist)
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validateArtist(req.body)
    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newArtist = await artistModel.update({id, input: result.data })
    if (!newArtist) {
          return res.status(400).json({ error: "Artist not found" })
    }
    res.status(201).json(newArtist)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await artistModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Artist not found' })
    }

    return res.json({ message: 'Artist deleted' })
  }
}