import Footer from '../Footer';
import Header from '../Header';
import NotFound from '../NotFound';
import MovieDetails from './components/MovieDetails';
import MoviesList from './components/MoviesList';
import styles from './MoviesPage.module.scss';
import { Routes, Route } from 'react-router-dom';

export const MoviesPage = () => {
  return (
    <div className={styles.content}>
      <Header />

      <main className={styles.mainContent}>
        <Routes>
          <Route path='/' element={<MoviesList />} />
          <Route path='/:movieId' element={<MovieDetails />} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
        <footer><Footer/></footer>
      </main>
    </div>
  );
};
