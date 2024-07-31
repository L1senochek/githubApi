import React from 'react';
import styles from './settings-theme.module.css';
import useTheme from '../../context/useTheme';

const SettingsTheme: React.FC = ({
  parentClass,
}: {
  parentClass?: string;
}): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`${styles['settings']}${parentClass ? ` ${parentClass}` : ''} ${theme === 'dark' ? styles.dark : styles.light}`}
    >
      <span className={styles['settings__item']}>light</span>
      <button
        role="switch"
        onClick={toggleTheme}
        className={styles['settings__btn']}
      >
        <div
          className={`${styles['settings__switcher']} ${
            theme === 'dark' ? styles.dark : styles.light
          }`}
        ></div>
      </button>
      <span className={styles['settings__item']}>dark</span>
    </div>
  );
};

export default SettingsTheme;
