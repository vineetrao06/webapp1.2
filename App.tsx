import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import HowItWorksScreen from './screens/HowItWorksScreen';
import JoinAsArtistScreen from './screens/JoinAsArtistScreen';
import TopSongsScreen from './screens/TopSongsScreen';
import SongDetailsScreen from './screens/SongDetailsScreen';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
// import './global.css'; // Import the global CSS

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  function handleLogin() {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  }

  function handleLogout() {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  }

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <Router>
        <View style={styles.container}>
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={isAuthenticated ? <HomeScreen /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={<SignInScreen onLogin={handleLogin} />} />
            <Route path="/top" element={<TopSongsScreen />} />
            <Route path="/songdetails/:id" element={<SongDetailsScreen />} />
            <Route path="/howitworks" element={<HowItWorksScreen />} />
            <Route path="/join" element={<JoinAsArtistScreen />} />
          </Routes>
        </View>
      </Router>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
