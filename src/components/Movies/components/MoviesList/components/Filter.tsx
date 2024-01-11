import { ChangeEvent, FC, useEffect } from 'react';
import styles from './Filter.module.scss';
import { useDebounce } from '../../../../../hooks';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../../features/hooks';
import { fetchMovies } from '../../../../../features/movies/moviesSlice';

export const Filter:FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    search: '',
  });
  const dispatch = useAppDispatch();

  const search = searchParams.get('search');
  const page = searchParams.get('page');
  const debouncedSearch = useDebounce(search, 1000);
  
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => {
      prev.set('search', event.target.value);
      if (page !== '1') {
        prev.set('page', '1');
      }
      return prev;
    }, {replace: true});
  };

  const onClearBtnClick = () => {
    setSearchParams(prev => {
      prev.set('search', '');
      if (page !== '1') {
        prev.set('page', '1');
      }
      return prev;
    }, {replace: true});
  };
  
  useEffect(() => {
    dispatch(fetchMovies({search: debouncedSearch || '', page: page ? +page : 1}));
  },[debouncedSearch]);

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.inputContainer}>
        <input className={styles.searchInput} type="text" name='movieSearch' maxLength={40} placeholder='Enter the movie title' value={search || ''} onChange={handleSearchChange} />
        {search && search.length > 0 && (
          <button className={styles.clearBtn} onClick={onClearBtnClick}>&#10006;</button>
        )}
      </div>
    </div>
  );
};
