import React from 'react';
import styles from './searchresults.module.css';
import ISearchResultsProps from '../../model/SearchResults';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addItem,
  removeItem,
  selectSelectedItems,
} from '../../store/slices/selectedItemsSlice';

const SearchResults: React.FC<ISearchResultsProps> = ({
  searchResults,
  onItemClick,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(selectSelectedItems);

  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    if (isChecked) {
      dispatch(addItem(id));
    } else {
      dispatch(removeItem(id));
    }
  };

  const isItemSelected = (id: string) => selectedItems.includes(id);

  return (
    <div className={styles.searchresults}>
      {searchResults.length > 0 ? (
        <>
          {searchResults.map((result) => (
            <div key={result.id} className={styles.searchresults__card}>
              <div className={styles.searchresults__checkbox}>
                <input
                  className={styles.searchresults__input}
                  type="checkbox"
                  checked={isItemSelected(result.id)}
                  onChange={(e) =>
                    handleCheckboxChange(result.id, e.target.checked)
                  }
                />
              </div>
              <div
                className={styles.searchresults__wrapper}
                onClick={() => onItemClick(result.id)}
              >
                <div className={styles.searchresults__header}>
                  <h3 className={styles.searchresults__title}>
                    {result.login}
                  </h3>
                  {result.avatar_url && (
                    <img
                      className={styles.searchresults__img}
                      src={result.avatar_url}
                      alt={result.login}
                    />
                  )}
                </div>
                <p className={styles.searchresults__description}>
                  {result.html_url}
                </p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className={styles.searchresults__noresults}>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
