import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type Props = {
  onPageChange: (value: number) => void;
  totalItemsAmount: number;
  currentPage: number;
}

const itemsPerPage = 10; // number of items that omdbAPI returns

export const Pagination: FC<Props> = ({ onPageChange, totalItemsAmount, currentPage }) => {
  const pageCount = Math.ceil(totalItemsAmount / itemsPerPage);

  return (
    <>
      {pageCount !== 0 && (
        <ReactPaginate
          containerClassName={styles.pagination}
          pageClassName={styles.pageItem}
          activeClassName={styles.active}
          pageRangeDisplayed={5}
          onPageChange={(event) => onPageChange(event.selected)}
          pageCount={pageCount > 100 ? 100 : pageCount} // the valid options for omdbAPI is 1-100 pages
          forcePage={currentPage}
          breakLabel="..."
          previousLabel={
            <div className={`${styles.nextPrevBtn} ${currentPage === 0 ? styles.disabled : ''}`}>&lt;</div>
          }
          nextLabel={
            <div  className={`${styles.nextPrevBtn} ${currentPage === pageCount - 1 ? styles.disabled : ''}`}>&gt;</div>
          }
        />
      )}
    </>
  );
};
