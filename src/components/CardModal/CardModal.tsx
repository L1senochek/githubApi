import React from 'react';
import styles from './card-modal.module.css';
import { useNavigate } from 'react-router';
import { useFetchUserDetailsQuery } from '../../api/api';
import useTheme from '../../context/useTheme';

interface ICardModalProps {
  userId?: string;
  onClose?: () => void;
}

const CardModal: React.FC<ICardModalProps> = ({
  userId,
  onClose,
}): JSX.Element | null => {
  const {
    data: userDetails,
    error,
    isLoading,
  } = useFetchUserDetailsQuery(userId!);

  const { theme } = useTheme();

  const navigate = useNavigate();

  const handleClose = (): void => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    const savedPage = localStorage.getItem('currentPage') || '1';
    const savedLimit = localStorage.getItem('limit') || '10';
    onClose!();
    navigate(
      `/main?page=${savedPage}&limit=${savedLimit}&query=${savedSearchTerm}`
    );
  };

  if (!userId) {
    return null;
  }

  return (
    <div
      className={`${styles.userdetails} ${userId ? '' : styles.hidden}${theme === 'dark' ? styles.dark : styles.light}`}
    >
      <button className={styles.closebtn} onClick={handleClose}>
        Close
      </button>
      {error ? (
        <div>Error fetching user details</div>
      ) : isLoading ? (
        <div>Loading details...</div>
      ) : !userDetails ? (
        <div>User details not found</div>
      ) : (
        <>
          <h2 className={styles.userdetails__header}>{userDetails.login}</h2>
          <img
            className={styles.avatar}
            src={userDetails.avatar_url}
            alt={userDetails.login}
          />
          <p>
            <span className={styles.userdetails__highlight}>Followers:</span>
            <span>{userDetails.followers}</span>
          </p>
          <p>
            <span className={styles.userdetails__highlight}>Following:</span>
            <span>{userDetails.following}</span>
          </p>
          <p>
            <span className={styles.userdetails__highlight}>Public Repos:</span>
            <span>{userDetails.public_repos}</span>
          </p>
          <a
            href={userDetails.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </>
      )}
    </div>
  );
};

export default CardModal;
