import IErrorBoundaryFallbackProps from '../../model/ErrorBoundaryFallback';
import styles from './errorboundary.module.css';

const ErrorBoundaryFallback: React.FC<IErrorBoundaryFallbackProps> = ({
  onReloadClick,
}) => {
  return (
    <div className={styles.error}>
      <h2 className={styles.error__title}>Something went wrong...</h2>
      <button className={styles.error__btn} onClick={onReloadClick}>
        Reload
      </button>
    </div>
  );
};

export default ErrorBoundaryFallback;
