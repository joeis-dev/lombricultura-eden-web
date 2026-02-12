import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', label: 'Light', colors: 'bg-white border-gray-200' },
    { value: 'dark', label: 'Dark', colors: 'bg-gray-800 border-gray-600' },
    { value: 'dark-green', label: 'Dark Green', colors: 'bg-green-800 border-green-600' },
  ] as const;

  return (
    <div className="theme-switcher">
      <span className="text-sm font-medium text-muted">Theme:</span>
      <div className="flex gap-2">
        {themes.map(({ value, label, colors }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`
              px-3 py-2 rounded-md border-2 text-xs font-medium transition-all
              hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background
              ${theme === value 
                ? `${colors} ring-opacity-50` 
                : 'bg-surface border-border hover:border-secondary text-text-secondary'
              }
            `}
            title={`Switch to ${label} theme`}
            aria-label={`Current theme: ${label}. Click to switch theme`}
          >
            <div className="flex items-center gap-2">
              <div 
                className={`w-4 h-4 rounded-full border ${
                  value === 'light' ? 'bg-white border-gray-300' :
                  value === 'dark' ? 'bg-gray-900 border-gray-600' :
                  'bg-green-900 border-green-700'
                }`}
              />
              <span>{label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;