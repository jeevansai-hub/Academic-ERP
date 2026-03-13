import React, { useState, useEffect, useRef } from 'react';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, Lock, Eye, EyeOff, LayoutDashboard, Bell, FileText, ArrowRight
} from 'lucide-react';

const CountUp = ({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * end));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [end, duration, isVisible]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const LoginLeftPanel = React.memo(() => {
  // Dynamic Statistics (Hardcoded for now)
  const stats = {
    totalStudents: 2400,
    totalBranches: 8,
    passRate: 94
  };

  return (
    <>
      {/* Top Logo Block */}
      <div className="flex flex-row items-center gap-[14px] mb-[56px] animate-fade-up animate-delay-100">
        <div className="w-[54px] h-[54px] rounded-[14px] bg-[#FFFFFF] shadow-[0_4px_16px_rgba(0,0,0,0.25)] flex-shrink-0 flex items-center justify-center overflow-hidden p-[2px]">
          <svg viewBox="0 0 200 200" width="46" height="46" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="circle-clip">
                <circle cx="100" cy="100" r="98"/>
              </clipPath>
            </defs>
            <circle cx="100" cy="100" r="100" fill="#FFFFFF"/>
            <g clipPath="url(#circle-clip)">
              {/* Purple Base */}
              <rect x="0" y="0" width="200" height="200" fill="#8A2287"/>
              <g transform="translate(100, 100)">
                {/* White cutouts for spoke margins */}
                <rect x="-18" y="-100" width="36" height="100" fill="#FFFFFF" transform="rotate(36)"/>
                <rect x="-18" y="-100" width="36" height="100" fill="#FFFFFF" transform="rotate(108)"/>
                <rect x="-18" y="-100" width="36" height="100" fill="#FFFFFF" transform="rotate(180)"/>
                <rect x="-18" y="-100" width="36" height="100" fill="#FFFFFF" transform="rotate(252)"/>
                <rect x="-18" y="-100" width="36" height="100" fill="#FFFFFF" transform="rotate(324)"/>
                {/* Blue Spokes */}
                <rect x="-13" y="-100" width="26" height="100" fill="#1B5EBF" transform="rotate(36)"/>
                <rect x="-13" y="-100" width="26" height="100" fill="#1B5EBF" transform="rotate(108)"/>
                <rect x="-13" y="-100" width="26" height="100" fill="#1B5EBF" transform="rotate(180)"/>
                <rect x="-13" y="-100" width="26" height="100" fill="#1B5EBF" transform="rotate(252)"/>
                <rect x="-13" y="-100" width="26" height="100" fill="#1B5EBF" transform="rotate(324)"/>
              </g>
            </g>
            {/* Center Rings */}
            <circle cx="100" cy="100" r="33" fill="#1B5EBF"/>
            <circle cx="100" cy="100" r="25" fill="#FFFFFF"/>
            {/* Cyan Star */}
            <polygon points="100,81.5 104,93.5 116.5,93.5 106.5,101 110.5,113 100,105.5 89.5,113 93.5,101 83.5,93.5 96,93.5" fill="#0BA9E6"/>
          </svg>
        </div>
        <div className="flex flex-col">
          <h1 className="font-body font-[800] text-[20px] text-[#EF3A3A] tracking-[0.01em] uppercase leading-[1]">VIGNAN'S</h1>
          <h2 className="font-body font-[600] text-[7px] text-[rgba(255,255,255,0.88)] tracking-[0.10em] uppercase mt-[4px] leading-[1.2]">INSTITUTE OF INFORMATION TECHNOLOGY</h2>
          <p className="font-body font-[400] text-[7px] text-[rgba(255,255,255,0.42)] tracking-[0.12em] mt-[3px]">Estd. 2002 · Visakhpatnam</p>
        </div>
      </div>

      {/* Center Hero Block */}
      <div className="flex flex-col flex-grow justify-center">
        <div className="inline-flex items-center gap-2 bg-white/8 border border-white/14 rounded-full py-1.5 px-3.5 mb-5 w-fit animate-fade-up animate-delay-200">
          <div className="w-1.5 h-1.5 rounded-full bg-[#5B9BFF]"></div>
          <span className="font-body font-medium text-[11px] tracking-[0.1em] uppercase text-white/65">Student Performance Portal 2024–25</span>
        </div>

        <h2 className="text-display text-white mb-6 animate-fade-up animate-delay-300">
          Where <em className="font-light italic text-[#7DB8FF]">data</em> meets academic excellence.
        </h2>

        <p className="text-body-lg text-white/55 max-w-[360px] mb-8 animate-fade-up animate-delay-400">
          Track marks, monitor CGPA, identify risks, and receive faculty feedback — all in one unified academic portal.
        </p>

        {/* Pillars */}
        <div className="flex flex-col gap-3.5 mt-8 animate-fade-up animate-delay-500">
          {[
            { icon: <LayoutDashboard size={18} />, title: "CGPA & Performance", sub: "Real-time grade tracking" },
            { icon: <Bell size={18} />, title: "Backlog Risk Alerts", sub: "Early warning system" },
            { icon: <FileText size={18} />, title: "Faculty Remarks", sub: "Personalised feedback" }
          ].map((pillar, idx) => (
            <div key={idx} className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/90">
                {pillar.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-body font-medium text-[13px] text-white/85">{pillar.title}</span>
                <span className="font-body font-light text-[11.5px] text-white/38">{pillar.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stats Block */}
      <div className="mt-auto pt-8 border-t border-white/10 animate-fade-up animate-delay-650">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col">
            <span className="text-stat-num">
              <CountUp end={stats.totalStudents} suffix="+" duration={1800} />
            </span>
            <span className="text-stat-label text-white/55">Students</span>
          </div>
          <div className="flex flex-col">
            <span className="text-stat-num">
              <CountUp end={stats.totalBranches} duration={900} />
            </span>
            <span className="text-stat-label text-white/55">Branches</span>
          </div>
          <div className="flex flex-col">
            <span className="text-stat-num">
              <CountUp end={stats.passRate} suffix="%" duration={1100} />
            </span>
            <span className="text-stat-label text-white/55">Pass Rate</span>
          </div>
        </div>
      </div>
    </>
  );
});

const LoginRightPanel = () => {
  const [role, setRole] = useState<'student' | 'faculty' | 'admin'>('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier) {
      setError('Identifier is required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    
    // Simulate auth flow
    setTimeout(async () => {
      try {
        await login(identifier, password, role);
        setLoading(false);
        setSuccess(true);
        
        // redirect after animation
        setTimeout(() => {
           navigate(`/${role}/dashboard`);
        }, 1800);
      } catch (err: any) {
        setLoading(false);
        setError(err.message || 'Failed to login. Please check your credentials.');
      }
    }, 1500);
  };

  return (
    <>
      {/* Success Overlay */}
      <div className={`absolute inset-0 z-20 bg-white flex flex-col items-center justify-center transition-opacity duration-400 ${success ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E6EF5] to-[#1354C8] shadow-[0_10px_32px_rgba(30,110,245,0.3)] flex items-center justify-center mb-6 animate-[popIn_0.5s_ease]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 className="font-display font-bold text-2xl text-blue-deep mb-2">Welcome back!</h2>
        <p className="font-body text-[14px] text-slate-cool">Loading your ECAP dashboard...</p>
      </div>

      <div className="flex flex-col w-full h-full relative z-10 bg-white">
        
        {/* Header Block */}
        <div className="flex flex-col items-start mb-6 animate-fade-up animate-delay-350">
          <div className="inline-flex items-center gap-1.5 bg-blue-pale border border-blue-accent/15 rounded-full py-1 px-3 mb-4 relative">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-[pulseGreen_1.5s_infinite]"></div>
            <span className="font-body font-medium text-[11px] text-blue-accent tracking-[0.08em] uppercase">Secure Login</span>
          </div>
          <h1 className="text-form-title mb-2 text-blue-deep font-display font-bold">
            Sign <em className="italic font-light text-blue-accent">in</em> to your portal
          </h1>
          <p className="font-body font-light text-[14px] leading-relaxed text-slate-cool">
            Use your Vignan's IIT credentials to access<br />your academic dashboard.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex flex-col mb-6">
          <span className="font-body font-medium text-[10px] tracking-[0.15em] uppercase text-slate-cool mb-2">SIGN IN AS</span>
          <div className="flex bg-bg-offwhite border border-border-bluegrey p-1 rounded-sm relative">
            {['student', 'faculty', 'admin'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r as any)}
                className={`flex-1 py-1.5 text-[13px] font-medium rounded-lg transition-colors capitalize z-10 ${role === r ? 'text-white' : 'text-slate-cool hover:text-charcoal'}`}
              >
                {r}
              </button>
            ))}
            {/* Active Pill Indicator */}
            <div 
              className="absolute top-1 bottom-1 w-[calc(33.333%-4px)] rounded-lg transition-all duration-250 ease-out"
              style={{
                backgroundColor: role === 'student' ? 'var(--role-student)' : role === 'faculty' ? 'var(--role-faculty)' : 'var(--role-admin)',
                transform: `translateX(${role === 'student' ? '0' : role === 'faculty' ? '100%' : '200%'})`,
                marginLeft: role === 'faculty' ? '4px' : role === 'admin' ? '8px' : '0'
              }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={`flex flex-col flex-1 animate-fade-up animate-delay-500 ${error ? 'animate-[shake_0.4s]' : ''}`}>
          
          {/* Ident field */}
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-label text-charcoal">
              {role === 'student' ? 'Roll Number / Email' : 'Email Address'}
            </label>
            <div className="relative group">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-cool group-focus-within:text-blue-accent transition-colors">
                <User size={18} />
              </div>
              <input
                type={role === 'student' ? 'text' : 'email'}
                value={identifier}
                onChange={(e) => { setIdentifier(e.target.value); setError(''); }}
                placeholder={role === 'student' ? 'VIIT2021CS001' : `your.name@vignaniit.edu.in`}
                className={`w-full h-[50px] pl-[42px] pr-4 bg-bg-offwhite border-[1.5px] rounded-sm font-body text-[14.5px] text-[#1A2840] placeholder-slate-cool transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-accent/10 focus:border-blue-accent ${error ? 'border-error ring-4 ring-error/10 bg-white' : 'border-border-bluegrey'}`}
              />
            </div>
          </div>

          {/* Pass field */}
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-label text-charcoal">Password</label>
            <div className="relative group">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-cool group-focus-within:text-blue-accent transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                className={`w-full h-[50px] px-[42px] bg-bg-offwhite border-[1.5px] rounded-sm font-body text-[14.5px] text-[#1A2840] placeholder-slate-cool transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-accent/10 focus:border-blue-accent ${error ? 'border-error ring-4 ring-error/10 bg-white' : 'border-border-bluegrey'}`}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-cool hover:text-charcoal"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && <span className="text-[11.5px] font-body text-error mt-1">{error}</span>}
          </div>

          <div className="flex items-center justify-between mb-5 animate-fade-up animate-delay-600">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative w-4.5 h-4.5 border-[1.5px] border-border-bluegrey rounded bg-bg-offwhite flex items-center justify-center transition-colors group-hover:border-blue-accent overflow-hidden">
                 <input type="checkbox" className="absolute opacity-0 inset-0 cursor-pointer peer" />
                 <div className="absolute inset-0 bg-blue-accent opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 </div>
              </div>
              <span className="font-body text-[13px] text-charcoal">Remember me</span>
            </label>
            <a href="#" className="font-body font-medium text-[13px] text-blue-accent hover:opacity-70 transition-opacity">Forgot password?</a>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={loading}
            className="group relative w-full h-[52px] rounded-sm bg-gradient-to-br from-[#1E6EF5] to-[#1354C8] text-white font-body font-semibold text-[15px] shadow-[0_6px_24px_rgba(30,110,245,0.35)] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(30,110,245,0.45)] active:translate-y-0 transition-all flex items-center justify-center gap-2 mb-5 overflow-hidden animate-fade-up animate-delay-700 disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none"
          >
            {/* Shimmer effect */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_0.55s_forwards]"></div>
            
            {loading ? (
              <>
                <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>
                Sign in to Portal
                <ArrowRight size={20} strokeWidth={2.5} />
              </>
            )}
          </button>

          {/* Social login block */}
          <div className="flex items-center gap-4 w-full mb-5 animate-fade-up animate-delay-800">
             <div className="flex-1 h-[1px] bg-border-bluegrey"></div>
             <span className="font-body text-[12px] text-slate-cool">or continue with</span>
             <div className="flex-1 h-[1px] bg-border-bluegrey"></div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-7 animate-fade-up animate-delay-900">
            <button type="button" className="h-[46px] border-[1.5px] border-border-bluegrey rounded-[10px] bg-white text-charcoal font-body font-medium text-[13.5px] flex items-center justify-center gap-2 hover:border-blue-accent hover:bg-blue-pale hover:shadow-sm transition-all">
              <svg width="17" height="17" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
               Google
            </button>
            <button type="button" className="h-[46px] border-[1.5px] border-border-bluegrey rounded-[10px] bg-white text-charcoal font-body font-medium text-[13.5px] flex items-center justify-center gap-2 hover:border-blue-accent hover:bg-blue-pale hover:shadow-sm transition-all">
              <svg width="17" height="17" viewBox="0 0 21 21"><path fill="#f25022" d="M1 1h9v9H1z"/><path fill="#00a4ef" d="M1 11h9v9H1z"/><path fill="#7fba00" d="M11 1h9v9h-9z"/><path fill="#ffb900" d="M11 11h9v9h-9z"/></svg>
               Microsoft
            </button>
          </div>

          <div className="text-center font-body text-[13px] text-slate-cool mt-auto animate-fade-up animate-delay-1000">
             New student? <a href="/register" className="text-blue-accent font-medium hover:opacity-70 transition-opacity">Create your account</a> · <a href="mailto:ecap-support@vignan.ac.in" className="text-blue-accent font-medium hover:opacity-70 transition-opacity">Help & Support</a>
          </div>

        </form>
      </div>
    </>
  );
};

export const LoginPage = () => {
  return (
    <AuthLayout leftPanelContent={<LoginLeftPanel />}>
      <LoginRightPanel />
    </AuthLayout>
  );
};
