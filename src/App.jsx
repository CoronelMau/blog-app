import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import MainPage from './components/Main';
import UserRegistered from './components/UserRegistered';
import SearchProfiles from './components/SearchProfiles';

function App() {
  const isAuthenticated = () => {
    const jwt = localStorage.getItem('token');
    return !!jwt;
  };

  const ProtectedRoute = ({ children }) => {
    if (isAuthenticated()) return children;

    return <Navigate to="/" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/registered" element={<UserRegistered />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route path="/search" element={<SearchProfiles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
