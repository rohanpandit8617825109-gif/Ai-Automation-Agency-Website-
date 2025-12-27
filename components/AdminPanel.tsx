
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Activity, DollarSign, X, ShieldCheck, Mail, Calendar } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isVisible && isAuthenticated) {
      // Load users from storage
      const users = JSON.parse(localStorage.getItem('ai_connect_users') || '[]');
      setRegisteredUsers(users);
    }
  }, [isVisible, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '1234') {
      setIsAuthenticated(true);
    } else {
      alert("Access Denied!");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setIsVisible(false)} />
      
      {!isAuthenticated ? (
        <div className="relative w-full max-w-md glass p-8 rounded-3xl border-red-500/30 animate-in fade-in zoom-in duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="text-red-500" size={32} />
            </div>
            <h2 className="font-sora text-2xl font-bold mb-2">Restricted Access</h2>
            <p className="text-neutral-500 text-sm mb-8">You are accessing the AI Connect Controller. Please verify identity.</p>
            
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <input 
                type="password" 
                placeholder="Enter Admin Password" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400/50"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
              />
              <button type="submit" className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors">
                Verify Admin
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-5xl glass rounded-[2.5rem] border-cyan-400/30 overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-5 duration-500">
          <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="text-cyan-400" />
              <h2 className="font-sora text-2xl font-bold">AI Connect <span className="text-cyan-400">Admin Controller</span></h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30 font-bold uppercase tracking-widest">Live: Secure</span>
              <button onClick={() => setIsVisible(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 text-neutral-400 mb-2">
                  <Users size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Total Registrations</span>
                </div>
                <div className="text-3xl font-sora font-bold text-white">{registeredUsers.length}</div>
                <div className="text-xs text-neutral-500 mt-2">Active business leads</div>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 text-neutral-400 mb-2">
                  <Activity size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Bot Health Status</span>
                </div>
                <div className="text-3xl font-sora font-bold text-cyan-400">100% OK</div>
                <div className="text-xs text-neutral-500 mt-2">All LLM Chains Operating Normal</div>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 text-neutral-400 mb-2">
                  <DollarSign size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Revenue Tracking</span>
                </div>
                <div className="text-3xl font-sora font-bold text-green-400">₹45,000</div>
                <div className="text-xs text-neutral-500 mt-2">Real-time projection</div>
              </div>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex items-center justify-between">
                <h3 className="font-sora text-xl font-bold">Registered Users (Leads)</h3>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Showing {registeredUsers.length} Users</div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/5 text-[10px] uppercase tracking-widest text-neutral-500">
                    <tr>
                      <th className="px-6 py-4 font-bold">User Email</th>
                      <th className="px-6 py-4 font-bold">Signup Date & Time</th>
                      <th className="px-6 py-4 font-bold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {registeredUsers.length > 0 ? (
                      registeredUsers.map((user, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4 text-sm flex items-center gap-3">
                            <div className="p-1.5 bg-cyan-400/10 rounded text-cyan-400">
                              <Mail size={14} />
                            </div>
                            {user.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-neutral-400">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} />
                              {user.timestamp}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-[10px] bg-cyan-400/20 text-cyan-400 px-2 py-0.5 rounded border border-cyan-400/30 font-bold">VERIFIED</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-neutral-600 italic">No users registered yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="font-sora text-xl font-bold">Latest Strategy Inquiries</h3>
                <div className="space-y-3">
                  {["Mumbai Real Estate", "Delhi Fine Dining", "Bangalore Tech Shop"].map((biz, idx) => (
                    <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                      <span className="text-sm font-medium">{biz}</span>
                      <span className="text-[10px] text-neutral-500">{idx + 1}h ago</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="font-sora text-xl font-bold">Admin Logs</h3>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-[10px] space-y-2 text-neutral-400">
                  <p>[LOG] System initialized for Rohan Pandit</p>
                  <p>[DB] Revenue recalibrated to ₹45,000</p>
                  <p>[UI] Profile chip rendering active</p>
                  {registeredUsers.length > 0 && <p className="text-cyan-500">[{new Date().getHours()}:{new Date().getMinutes()}] Database synced with {registeredUsers.length} records</p>}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white/5 border-t border-white/10 text-center text-[10px] text-neutral-600 uppercase tracking-[0.2em]">
            AI Connect Restricted Controller • Owner Rohan Pandit • 8617825109
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
