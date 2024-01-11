import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../features/hooks';
import { fetchMovieById } from '../../../../features/movies/moviesSlice';
import styles from './MovieDetails.module.scss';
import { InfinitySpin } from 'react-loader-spinner';
import nothingFoundImg from '../../../../assets/nothing-found.svg';
import { useNavigate } from 'react-router-dom';

export const MovieDetails = () => {
  const { movieId } = useParams();
  const dispatch = useAppDispatch();
  const movieDetails = useAppSelector((state) => state.movies.selectedMovie);
  const movieError = useAppSelector((state) => state.movies.movieError);
  const loading = useAppSelector((state) => state.movies.loading);
  const navigate = useNavigate();

  const doesHaveValue = (value: string) => value !== 'N/A';

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieById(movieId));
    }
  }, [movieId]);

  const handleBackBtnClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.details}>

      <button onClick={handleBackBtnClick} className={styles.backBtn}>&lt; Back</button>

      {loading && <div className={styles.loaderContainer}>
        <InfinitySpin
          width="200"
          color="#495E57"
        />
      </div>}

      {!loading && !movieError && movieDetails && (
        <div className={styles.movieDetailsContainer}>
          <div className={styles.card}>
            <div className={styles.posterContainer}>
              <img className={styles.poster} src={movieDetails.Poster} alt="movie-poster" />
            </div>

            <div className={styles.movieInfo}>
              <h2 className={styles.name}>{movieDetails?.Title}</h2>

              <div className={styles.infoTable}>
                <p className={styles.itemName}>Year</p>
                <p className={styles.itemValue}>{movieDetails.Year}</p>

                {doesHaveValue(movieDetails.Genre) && (
                  <>
                    <p className={styles.itemName}>Genre</p>
                    <p className={styles.itemValue}>{movieDetails.Genre}</p>
                  </>
                )}
              
                {doesHaveValue(movieDetails.Actors) && (
                  <>
                    <p className={styles.itemName}>Actors</p>
                    <p className={styles.itemValue}>{movieDetails.Actors}</p>
                  </>
                )}

                {doesHaveValue(movieDetails.Director) && (
                  <>
                    <p className={styles.itemName}>Directors</p>
                    <p className={styles.itemValue}>{movieDetails.Director}</p>
                  </>
                )}
             
                {doesHaveValue(movieDetails.Awards) && (
                  <>
                    <p className={styles.itemName}>Awards</p>
                    <p className={styles.itemValue}>{movieDetails.Awards}</p>
                  </>
                )}

                {doesHaveValue(movieDetails.Country) && (
                  <>
                    <p className={styles.itemName}>Country</p>
                    <p className={styles.itemValue}>{movieDetails.Country}</p>
                  </>
                )}
          
                {doesHaveValue(movieDetails.Plot) && (
                  <>
                    <p className={styles.itemName}>Plot</p>
                    <p className={styles.itemValue}>{movieDetails.Plot}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
     
      
      {!loading && movieError && (
        <div className={styles.errorContainer}>
          <div className={styles.errorText}>{movieError}</div>
          <img className={styles.errorImage} src={nothingFoundImg} alt="nothing found" />
        </div>
      )}
    </div>
  );
};
