import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

interface fetchMoviesResponse {
  results: Movie[];
}

export const fetchMovie = async (query: string): Promise<Movie[]> => {
  const config = {
    params: { query },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };
  const response = await axios.get<fetchMoviesResponse>(API_URL, config)
  return response.data.results
}
