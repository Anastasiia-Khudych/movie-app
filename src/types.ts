export type Movie = {
  Poster: string,
  Title: string,
  Year: string,
  imdbID: string,
}

export type MovieDetails = Movie & {
  Genre: string,
  Director: string,
  Actors: string,
  Plot: string,
  Awards: string,
  Country: string,
}