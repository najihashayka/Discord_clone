import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAuthSubmit } from '../hooks/useAuthSubmit';
import AuthBrand from '../components/AuthBrand';

const FEATURES = ['Create account & log in', 'Join multiple channels', 'Send & receive live messages'];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { error, loading, handleSubmit } = useAuthSubmit(login, 'Login failed');

  return (
    <div className="auth-page">
      <AuthBrand
        description="Real-time messaging app. Chat with friends across multiple channels instantly."
        features={FEATURES}
      />
      <div className="auth-form-side">
        <form className="auth-card" onSubmit={(e) => handleSubmit(e, email, password)}>
          <h2>Welcome back!</h2>
          <p className="subtitle">We&apos;re so excited to see you again!</p>
          {error && <p className="error-msg">{error}</p>}
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          <p className="auth-link">Need an account? <Link to="/register">Register</Link></p>
        </form>
      </div>
    </div>
  );
}
