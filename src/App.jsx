/* eslint-disable react/prop-types */
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import MainPage from './components/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
