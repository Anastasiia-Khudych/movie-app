import { FC } from 'react';
import { Movie } from '../../../../../types';
import styles from './MovieCard.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  movie: Movie;
}

export const MovieCard: FC<Props> = ({ movie }) => {
  return (
    <Link to={`/${movie.imdbID}`}>
      <div className={styles.movieCardContainer} >
        <div className={styles.posterContainer}>
          <img className={styles.poster} src={movie.Poster} alt="movie-poster" />
        </div>
        <h3 className={styles.title}>{movie.Title}</h3>
        <p className={styles.year}>{movie.Year} year</p>
      </div>
    </Link>
  );
};
