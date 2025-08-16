import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

interface FetchMoviesResponse { 
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string, page: number): Promise<FetchMoviesResponse> => {
 if (!API_TOKEN) throw new Error("TMDB API token is missing");
  const response = await axios.get<FetchMoviesResponse>(API_URL, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      accept: "application/json",
    },
  });
  
  return response.data;
};
