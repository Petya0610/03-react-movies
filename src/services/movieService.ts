import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

interface FetchMoviesResponse { 
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  if (!API_TOKEN) {
    throw new Error("TMDB API token is missing");
  }

  const config = {
    params: { query },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const response = await axios.get<FetchMoviesResponse>(API_URL, config);
  return response.data.results;
};
