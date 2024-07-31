import React, { useState } from 'react';
import styles from './settings.module.css';
import IconSettings from '../Icons/IconSettings/IconSettings';
import SettingsTheme from '../SettingsTheme/SettingsTheme';
import ISettings from '../../model/Settings';
import useTheme from '../../context/useTheme';

const Settings: React.FC<ISettings> = ({ parentClass }): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { theme } = useTheme();

  return (
    <div
      className={`${styles['settings']}${theme === 'dark' ? ` ${styles.dark}` : ` ${styles.light}`}${parentClass ? ` ${parentClass}` : ''}`}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <div
        className={`${styles['settings__btn']}${
          isMenuOpen ? ` ${styles['open']}` : ''
        }`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onMouseEnter={() => setIsMenuOpen(true)}
      >
        <IconSettings />
      </div>
      <div
        className={`${styles['settings__menu']}${
          isMenuOpen ? ` ${styles['open']}` : ''
        }`}
      >
        <SettingsTheme />
      </div>
    </div>
  );
};

export default Settings;
