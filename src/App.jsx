import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import store from './store/store';
import { selectTheme } from './store/themeSlice';
import NavBar from './components/NavBar.jsx';
import About from './screens/About.jsx';
import Projects from './screens/projects/Projects.jsx';
import Contact from './screens/Contact.jsx';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

function AppContent() {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    // Apply background to body
    if (theme.glassEffect) {
      document.body.style.background = theme.backgroundColor;
      document.body.style.backgroundSize = '400% 400%';
      document.body.style.animation = 'gradientShift 15s ease infinite';
    } else {
      document.body.style.background = theme.backgroundColor;
      document.body.style.animation = 'none';
    }
    document.body.style.minHeight = '100vh';
    document.body.style.transition = 'all 0.5s ease';
  }, [theme]);

  return (
    <div className="App">
      <NavBar />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
