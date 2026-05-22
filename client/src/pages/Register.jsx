import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAuthSubmit } from '../hooks/useAuthSubmit';
import AuthBrand from '../components/AuthBrand';

const FEATURES = ['Free to register', 'Multiple chat rooms', 'Instant message delivery'];

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const { error, loading, handleSubmit } = useAuthSubmit(register, 'Registration failed');

  return (
    <div className="auth-page">
      <AuthBrand
        description="Join the community and start chatting in real-time across different channels."
        features={FEATURES}
      />
      <div className="auth-form-side">
        <form className="auth-card" onSubmit={(e) => handleSubmit(e, username, email, password)}>
          <h2>Create an account</h2>
          <p className="subtitle">Join us today — it only takes a minute.</p>
          {error && <p className="error-msg">{error}</p>}
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="cooluser" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Min. 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Continue'}
          </button>
          <p className="auth-link">Already have an account? <Link to="/login">Log In</Link></p>
        </form>
      </div>
    </div>
  );
}
