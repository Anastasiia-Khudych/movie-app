import notFoundImage from '../../assets/404_page.png';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <img src={notFoundImage} alt="page not found" />
    </div>
  );
};
