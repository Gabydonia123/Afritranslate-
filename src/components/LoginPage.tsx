import React, { useState } from 'react';
import {
  Globe2,
  Lock,
  Mail,
  User as UserIcon,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Mic,
  FileAudio,
  Languages,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login, register } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      if (isSignUp) {
        await register(email, password, name, rememberMe);
      } else {
        await login(email, password, rememberMe);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setIsSignUp(false);
    setEmail('user@africanlanguages.org');
    setPassword('password123');
    setError(null);
    setSuccessMessage('Demo credentials filled. Click "Sign In" below to enter.');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Decorative Ambient Radial Lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Header Logo */}
      <header className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pb-6 border-b border-stone-800/60">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-950/50 border border-amber-400/20">
            <Globe2 className="w-5 h-5 text-stone-950" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-stone-100 block">
              Indigenous Language Translator
            </span>
            <span className="text-xs text-stone-400 font-medium">
              African Multilingual Translation Portal
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-xs font-medium text-stone-400 bg-stone-900/80 px-3 py-1.5 rounded-full border border-stone-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Universal Persistent Access</span>
        </div>
      </header>

      {/* Center Auth Card */}
      <main className="relative z-10 my-auto py-8 max-w-md w-full mx-auto">
        <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          {/* Card Title & Description */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authentication Gate</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-100">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-400">
              {isSignUp
                ? 'Register your email & password to translate from any device anywhere'
                : 'Sign in with your stored email & password to access the portal'}
            </p>
          </div>

          {/* Toggle Tab: Sign In vs Create Account */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-stone-950 rounded-2xl border border-stone-800 mb-6">
            <button
              id="tab-sign-in"
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-semibold rounded-xl transition ${
                !isSignUp
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              Sign In
            </button>
            <button
              id="tab-create-account"
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-semibold rounded-xl transition ${
                isSignUp
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-xs text-rose-300 flex items-start space-x-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Success / Demo Banner */}
          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-300 flex items-start space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5" htmlFor="full-name">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    id="full-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Amara Okafor"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 placeholder-stone-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5" htmlFor="login-email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 placeholder-stone-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5" htmlFor="login-password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 placeholder-stone-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                Must be at least 6 characters. Stored securely with PBKDF2 hashing.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-700 bg-stone-950 text-amber-500 focus:ring-amber-500"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={handleFillDemo}
                className="text-amber-400 hover:text-amber-300 underline font-medium"
              >
                Use Demo Account
              </button>
            </div>

            <button
              id="auth-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 shadow-md shadow-amber-950/40 disabled:opacity-50 transition flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                </>
              ) : (
                <>
                  <span>{isSignUp ? 'Create Permanent Account' : 'Sign In to Translator'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Account Quick-Fill Card */}
          <div className="mt-6 pt-5 border-t border-stone-800/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Quick Test Credentials
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center space-x-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Auto-fill</span>
              </button>
            </div>
            <div className="mt-2 p-2.5 bg-stone-950 rounded-xl border border-stone-800 text-xs font-mono text-stone-400 flex flex-col space-y-1">
              <div>
                <span className="text-stone-500">Email: </span>
                <span className="text-stone-300">user@africanlanguages.org</span>
              </div>
              <div>
                <span className="text-stone-500">Password: </span>
                <span className="text-stone-300">password123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Pill Highlights */}
        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex flex-col items-center space-y-1">
            <Languages className="w-4 h-4 text-amber-400" />
            <span className="text-[11px] font-medium text-stone-300">Tone-Accurate</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex flex-col items-center space-y-1">
            <Mic className="w-4 h-4 text-orange-400" />
            <span className="text-[11px] font-medium text-stone-300">Voice to Text</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex flex-col items-center space-y-1">
            <FileAudio className="w-4 h-4 text-amber-400" />
            <span className="text-[11px] font-medium text-stone-300">Audio Translation</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full text-center text-xs text-stone-500 pt-6 border-t border-stone-800/60">
        <p>
          Preserving and empowering 24+ African Indigenous Languages with modern computational linguistics and phonetic accuracy.
        </p>
      </footer>
    </div>
  );
};
