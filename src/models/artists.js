import { randomUUID } from "node:crypto";
import { readJSON } from "../config/readJson.js";

const json = readJSON("../data/ChinookData.json");
const artists = json.Artist;

export class artistModel {
  static async getAll({}) {
    return artists;
  }
  static async getById({ id }) {
    const artist = artists.find((artist) => artist.ArtistId === Number(id));
    return artist;
  }
  static async create({ input }) {
    // Busca un artista con el mismo nombre
    const existingArtist = artists.find(
      (artist) => artist.Name.toLowerCase() === input.Name.toLowerCase()
    );

    if (existingArtist) {
      return;
    }

    // Encuentra el ID más alto actual en la lista de artistas
    const maxId = Math.max(...artists.map((artist) => artist.ArtistId));
    const newArtist = {
      ArtistId: maxId + 1,
      ...input,
    };

    artists.push(newArtist);

    return newArtist;
  }

  static async update({ id, input }) {
    // Busca un artista con el mismo nombre
    const existingArtist = artists.find(
      (artist) => artist.Name.toLowerCase() === input.Name.toLowerCase()
    );

    if (existingArtist) {
      return false;
    }

    const artistIndex = artists.findIndex(
      (artist) => artist.ArtistId === Number(id)
    );
    if (artistIndex === -1) return false;

    artists[artistIndex] = {
      ...artists[artistIndex],
      ...input,
    };

    return artists[artistIndex];
  }

  static async delete({ id }) {
    const artistIndex = artists.findIndex(
      (artist) => artist.ArtistId === Number(id)
    );
    if (artistIndex === -1) return false;

    artists.splice(artistIndex, 1)

    return true;
  }
}
