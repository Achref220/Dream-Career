import { 
  BrowserRouter
  ,Navigate
  ,Routes
  ,Route
} from 'react-router-dom'

import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import ProfilePage from './pages/profilePage'
import DirectMessagePage from './pages/DirectMessagePage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/fonts/fonts.css';




import { useMemo } from 'react'
import { useSelector } from 'react-redux';


import {CssBaseline, ThemeProvider} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./utils/theme";

import { setLogout } from './state'
import './index.css';
import useTokenExpiration from './utils/checkToken'
import Settings from './pages/Settings/Settings'
import Leaderboard from './pages/Leaderboard/index'
import Calendar from './components/Calendar'
import Landingpage from './components/LandingPage/Landingpage'
import VerifyEmail from './pages/VerifyEmail'
import Review from './pages/Review'


const App = () => { 
  //Check if a user is loggedIn
  const isLoggedIn = useTokenExpiration();

  if(!isLoggedIn){
    setLogout(); //To clear all tokens if they have expired
  }

  //To get the current mode from the redux store
  const mode = useSelector((state ) =>  state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <main>
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <Routes>
        <Route path="/" element={!isLoggedIn ? <Landingpage /> : <HomePage />} />
        
        <Route path="/">
          <Route path="login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="register" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="verify-email" element={!isLoggedIn ? <VerifyEmail /> : <Navigate to="/" />} />
        </Route>

        {/* Private Routes */}
        <Route path="/direct">
          <Route path="inbox" element={isLoggedIn ? <DirectMessagePage /> : <Navigate to="/login" />} />
          <Route path="new" element={isLoggedIn ? <DirectMessagePage isModal={true} /> : <Navigate to="/login" />} />
        </Route>

        <Route path="/profilePage">
          <Route path=":username" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
        </Route>

        <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />

        <Route path="/review/:postId" element={isLoggedIn ? <Review /> : <Navigate to="/login" />} />

        <Route path="/leaderboard" element={isLoggedIn ? <Leaderboard /> : <Navigate to="/login" />} />

        <Route path="/calendar" element={isLoggedIn ? <Calendar /> : <Navigate to="/login" />} />

        {/* Catch-all for non-matching routes */}
        <Route path="*" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
  </BrowserRouter>
</main>


  )
}

export default App