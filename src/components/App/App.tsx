import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import css from './App.module.css'
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["movies", searchQuery, currentPage],
    queryFn: () => fetchMovies(searchQuery, currentPage),
    enabled: !!searchQuery,
    
  });
  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  const handleSearch = async (newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
    setSelectedMovie(null);
  };

  const handleSelectMovie = (movie: Movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  useEffect(() => setSelectedMovie(null), [currentPage]);

   
  return (
    <div className={css.app} >
      <SearchBar onSubmit={handleSearch} />
      {totalPages > 1 && (
        <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
        forcePage={currentPage - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
      )}
      <Toaster position="top-right" reverseOrder={false} />

      {(isLoading || isFetching) && <Loader />}
      {isError && <ErrorMessage />}
      {(!isLoading || !isFetching) && movies.length > 0 && (
       <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      
      
    </div>
  );
}