import z from 'zod'

const artistSchema = z.object({
  Name: z.string({
    invalid_type_error: "Artist name must be a string",
    required_error: "Artist title is required.",
  })
});

export function validateArtist(input) {
  return artistSchema.safeParse(input);
}

export function validatePartialArtist(input) {
  return artistSchema.partial().safeParse(input);
}


