import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectTheme } from './store/themeSlice';

function AppWrapper({ children }) {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    // Apply background to body
    if (theme.glassEffect) {
      document.body.style.background = theme.backgroundColor;
      document.body.style.minHeight = '100vh';
    } else {
      document.body.style.background = theme.backgroundColor;
    }
  }, [theme]);

  return <div className="app-wrapper">{children}</div>;
}

export default AppWrapper;
