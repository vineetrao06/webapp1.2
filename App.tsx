import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import HowItWorksScreen from './screens/HowItWorksScreen';
import JoinAsArtistScreen from './screens/JoinAsArtistScreen';
import TopSongsScreen from './screens/TopSongsScreen';
import SongDetailsScreen from './screens/SongDetailsScreen';
import Profile from './screens/Profile';
import { Provider as PaperProvider } from 'react-native-paper';
import InfluencerSurveyScreen from './screens/InfluencerSurveyScreen';
import SongArtistSurveyScreen from './screens/SongArtistSurveyScreen';
import customTheme from './theme';

function App() {
  // Initialize state from local storage
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  // Monitor the state change for debugging purposes
  useEffect(() => {
    console.log("Authentication status:", isAuthenticated);
  }, [isAuthenticated]);

  // Login handler
  function handleLogin() {
    setIsAuthenticated(true);
    console.log("the user should now have acess to the homepage")
    localStorage.setItem('isAuthenticated', 'true');
  }

  // Logout handler
  function handleLogout() {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
  }

  return (
    <ScrollView>
      <PaperProvider theme={customTheme}>
        <Router>
          <SafeAreaView style={styles.safeArea}>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <View style={styles.contentContainer}>
              <Routes>
                <Route path="/" element={isAuthenticated ? <HomeScreen /> : <Navigate to="/signin" />} />
                <Route path="/signin" element={<SignInScreen onLogin={handleLogin} />} />
                <Route path="/top" element={<TopSongsScreen />} />
                <Route path="/songdetails/:id" element={<SongDetailsScreen />} />
                <Route path="/howitworks" element={<HowItWorksScreen />} />
                <Route path="/join" element={<JoinAsArtistScreen />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/signin" />} />
                <Route path="/influencer-survey" element={isAuthenticated ? <HomeScreen /> : <InfluencerSurveyScreen onLogin={handleLogin} />} />
                <Route path="/song-artist-survey" element={isAuthenticated ? <HomeScreen /> : <SongArtistSurveyScreen onLogin={handleLogin} />} />
              </Routes>
            </View>
          </SafeAreaView>
        </Router>
      </PaperProvider>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  safeArea: {
    justifyContent: 'flex-start', // Ensure content starts from the top
    padding: 0, // Remove any default padding
  },
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'stretch', // Ensure the container stretches to full width
    padding: 0, // Remove any default padding
  },
});

export default App;
