import styles from './Header.module.scss';
import {Link} from 'react-router-dom';
import movieLogo from '../../assets/movie_logo.svg';

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <Link to='/'>
        <img src={movieLogo} alt="movie logo app" className={styles.logo} />
      </Link>
      <Link to='/'><h1 className={styles.appName}>Movie App</h1></Link>
    </header>
  );
};
