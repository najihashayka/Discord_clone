import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Loading from './components/Loading';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import './App.css';

function AuthRoute({ children, guestOnly }) {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (guestOnly) return user ? <Navigate to="/chat" /> : children;
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<AuthRoute guestOnly><Login /></AuthRoute>} />
            <Route path="/register" element={<AuthRoute guestOnly><Register /></AuthRoute>} />
            <Route path="/chat" element={<AuthRoute><Chat /></AuthRoute>} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}
