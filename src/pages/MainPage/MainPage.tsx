import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useSearchQuery from '../../hooks/useSearchQuery';
import { IAppProps } from '../../model/App';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import Pagination from '../../components/Pagination/Pagination';
import Limit from '../../components/Limit/Limit';
import styles from './main-page.module.css';
import CardModal from '../../components/CardModal/CardModal';
import IconGitHubLogo from '../../components/Icons/iconGitHub/iconGitHub';
import Settings from '../../components/Settings/Settings';
import { useFetchUsersQuery } from '../../api/api';
import { SerializedError } from '@reduxjs/toolkit';
import useTheme from '../../context/useTheme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  clearItems,
  selectSelectedItems,
} from '../../store/slices/selectedItemsSlice';

const MainPage: React.FC<IAppProps> = (): JSX.Element => {
  const [throwError, setThrowError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useSearchQuery('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentPage = parseInt(localStorage.getItem('currentPage') || '1', 10);
  const limit = parseInt(localStorage.getItem('limit') || '10', 10);
  const query = localStorage.getItem('searchTerm') || '';

  const { data, error, isLoading } = useFetchUsersQuery({
    query,
    page: currentPage,
    perPage: limit,
  });

  const selectedItems = useAppSelector(selectSelectedItems);

  useEffect((): void => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
    localStorage.setItem('currentPage', currentPage.toString());
    localStorage.setItem('limit', limit.toString());
  }, [setSearchTerm, currentPage, limit]);

  const handleSearchInputChange = (value: string): void => {
    setSearchTerm(value);
  };

  const handleLimitChange = (newLimit: number): void => {
    searchParams.set('limit', newLimit.toString());
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    localStorage.setItem('limit', newLimit.toString());
  };

  const handleSearchSubmit = (): void => {
    searchParams.set('query', searchTerm);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePageChange = (newPage: number): void => {
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
    localStorage.setItem('currentPage', newPage.toString());
  };

  const handleItemClick = (itemId: string): void => {
    setSelectedItemId(itemId);
    setIsModalOpen(true);
    navigate(`/main/user/${itemId}`);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const handleThrowError = (): void => setThrowError(true);

  const handleUnselectAll = () => dispatch(clearItems());

  const handleDownload = () => {
    const selectedData = (data?.items || []).filter((item) =>
      selectedItems.includes(item.id)
    );

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['id,login,html_url']
        .concat(
          selectedData.map(
            (item) => `${item.id},${item.login},${item.html_url}`
          )
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedItems.length}_users.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (throwError) {
    throw new Error('Test error');
  }

  return (
    <>
      <header className={styles['top-section']}>
        <div className={styles.logo}>
          <Link
            to={'/'}
            className={`${styles.logo__wrapper} ${theme === 'dark' ? styles.dark : styles.light}`}
          >
            <IconGitHubLogo />
            <h1 className={styles.logo__title}>GitHub API</h1>
          </Link>
          <SearchBar
            searchTerm={searchTerm}
            onInputChange={handleSearchInputChange}
            onSearchSubmit={handleSearchSubmit}
          />
        </div>
        <button onClick={handleThrowError}>Throw Error</button>
      </header>
      <main className={styles['middle-section']}>
        <div className={styles.settings__wrapper}>
          <Limit limit={limit} onLimitChange={handleLimitChange} />
          <Settings />
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div> Error fetching data: {(error as SerializedError).message}</div>
        ) : (
          <SearchResults
            searchResults={data?.items || []}
            onItemClick={handleItemClick}
          />
        )}
        <Pagination
          totalItems={data?.total_count || 0}
          limit={limit}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        {isModalOpen && selectedItemId && (
          <CardModal userId={selectedItemId} onClose={handleCloseModal} />
        )}
        {selectedItems.length > 0 && (
          <div
            className={`${styles.flyout} ${theme === 'dark' ? styles.dark : styles.light}`}
          >
            <p>{selectedItems.length} items selected</p>
            <div className={styles.flyout__buttons}>
              <button onClick={handleUnselectAll}>Unselect all</button>
              <button onClick={handleDownload}>Download</button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default MainPage;
