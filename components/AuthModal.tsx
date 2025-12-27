
import React, { useState } from 'react';
import { Mail, Lock, UserPlus, LogIn, X, Cpu } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const timestamp = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    let loggedInUser = null;

    if (!isLogin) {
      // Register logic
      const existingUsers = JSON.parse(localStorage.getItem('ai_connect_users') || '[]');
      loggedInUser = { email, timestamp, lastLogin: timestamp };
      
      if (!existingUsers.find((u: any) => u.email === email)) {
        localStorage.setItem('ai_connect_users', JSON.stringify([...existingUsers, loggedInUser]));
      }
      localStorage.setItem('ai_connect_session', JSON.stringify(loggedInUser));
    } else {
      // Login logic
      const existingUsers = JSON.parse(localStorage.getItem('ai_connect_users') || '[]');
      const user = existingUsers.find((u: any) => u.email === email);
      if (user) {
        loggedInUser = user;
        localStorage.setItem('ai_connect_session', JSON.stringify(user));
      } else {
        alert('User not found. Please register first.');
        return;
      }
    }
    
    onAuthSuccess(loggedInUser);
    handleClose();
  };

  return (
    <div className={`fixed inset-0 z-[150] flex items-center justify-center p-4 transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={handleClose} />
      
      <div className={`relative w-full max-w-md glass rounded-[2.5rem] border-white/10 overflow-hidden shadow-2xl transition-transform duration-300 ${isExiting ? 'scale-95' : 'scale-100'}`}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg">
                <Cpu size={18} className="text-white" />
              </div>
              <span className="font-sora font-bold text-lg">AI Connect <span className="text-cyan-400">Portal</span></span>
            </div>
            <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full text-neutral-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <h2 className="font-sora text-2xl font-bold mb-2">
            {isLogin ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p className="text-neutral-500 text-sm mb-8">
            {isLogin ? 'Log in to access your automation dashboard.' : 'Create an account to build your first AI strategy.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              <input 
                type="email" 
                placeholder="Business Email" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-cyan-400/50 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              <input 
                type="password" 
                placeholder="Password" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-cyan-400/50 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full py-4 bg-cyan-400 text-black font-bold rounded-2xl hover:bg-white transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
              {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
              {isLogin ? 'Login Now' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-neutral-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-cyan-400 font-bold hover:underline"
            >
              {isLogin ? 'Register Here' : 'Login Here'}
            </button>
          </div>
        </div>

        <div className="bg-white/5 p-4 text-center text-[10px] text-neutral-600 uppercase tracking-widest border-t border-white/5">
          Secure AI Authentication Protocol
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
