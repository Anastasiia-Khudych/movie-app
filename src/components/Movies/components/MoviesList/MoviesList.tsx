import { Filter } from './components/Filter';
import styles from './MoviesList.module.scss';
import {fetchMovies } from '../../../../features/movies/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../../../features/hooks';
import { MovieCard } from './components/MovieCard';
import {InfinitySpin} from 'react-loader-spinner';
import nothingFoundImg from '../../../../assets/nothing-found.svg';
import Pagination from '../Pagination';
import { useSearchParams } from 'react-router-dom';

export const MoviesList = () => {
  const movies = useAppSelector(state => state.movies.movies);
  const loading = useAppSelector(state => state.movies.loading);
  const error = useAppSelector((state) => state.movies.moviesError);
  const totalMoviesAmount = useAppSelector((state) => state.movies.totalMoviesAmount);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
  });
  const search = searchParams.get('search');
  const page = searchParams.get('page');

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      prev.set('page', String(newPage + 1));
      return prev;
    }, { replace: true });
    dispatch(fetchMovies({search: search || '', page: newPage + 1}));
  };

  return (
    <div className={styles.moviesListContainer}>
      <Filter/>

      {loading && <div className={styles.loaderContainer}>
        <InfinitySpin
          width="200"
          color="#495E57"
        />
      </div>}


      {!loading && movies?.length > 0 && (
        <div className={styles.movies}>
          {
            movies.map((movie) => (
              <MovieCard movie={movie} key={movie.imdbID}/>
            ))
          }
        </div>
      )}

      {!loading && error && (
        <div className={styles.errorContainer}>
          <div className={styles.errorText}>{error}</div>
          <img className={styles.errorImage} src={nothingFoundImg} alt="nothing found" />
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className={styles.paginationContainer}>
          <Pagination totalItemsAmount={totalMoviesAmount} onPageChange={handlePageChange} currentPage={page ? +page - 1 : 1}/>
        </div>
      )}
    </div>
  );
};
