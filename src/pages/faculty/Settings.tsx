import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Lock, Settings as SettingsIcon, Bell, 
  Camera, Check, X, Shield, Eye, EyeOff, 
  Smartphone, Mail, Calendar, Layout, 
  Palette, Globe, Clock, ChevronDown, 
  Plus, AlertCircle, Trash2, Info, Monitor,
  Sun, Moon, MousePointer2
} from 'lucide-react';

// Types
type Tab = 'Profile' | 'Security' | 'Preferences' | 'Notifications';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Profile');
  const [isDirty, setIsDirty] = useState(false);
  const [toasts, setToasts] = useState<{ id: number, text: string, type: 'success' | 'error' }[]>([]);

  const addToast = (text: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold text-[#111827]">Settings</h1>
        <p className="text-sm text-[#6b7280]">Manage your profile, security and preferences</p>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 relative animate-fade-up">
        <div className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth">
          {(['Profile', 'Security', 'Preferences', 'Notifications'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative py-4 text-sm font-semibold transition-all duration-200 whitespace-nowrap
                ${activeTab === tab ? 'text-[#1a56db]' : 'text-gray-500 hover:text-[#1a56db]/80'}`}
            >
              <div className="flex items-center gap-2">
                {tab === 'Profile' && <User size={18} />}
                {tab === 'Security' && <Lock size={18} />}
                {tab === 'Preferences' && <SettingsIcon size={18} />}
                {tab === 'Notifications' && <Bell size={18} />}
                {tab}
                {tab === 'Profile' && isDirty && <div className="w-2 h-2 rounded-full bg-yellow-400 absolute -top-1 -right-2"></div>}
              </div>
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1a56db] rounded-t-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.2 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === 'Profile' && <ProfileTab onDirtyChange={setIsDirty} addToast={addToast} />}
            {activeTab === 'Security' && <SecurityTab addToast={addToast} />}
            {activeTab === 'Preferences' && <PreferencesTab addToast={addToast} />}
            {activeTab === 'Notifications' && <NotificationsTab addToast={addToast} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Unsaved Changes Bar */}
      <AnimatePresence>
        {isDirty && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] lg:w-[calc(100%-288px)] max-w-4xl bg-[#111827] text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between z-50 border border-white/10"
          >
            <div className="flex items-center gap-3 pl-2">
               <AlertCircle size={18} className="text-yellow-400" />
               <span className="text-sm font-semibold">You have unsaved changes in your profile</span>
            </div>
            <div className="flex items-center gap-3">
               <button 
                  onClick={() => window.location.reload()} // Quick dirty reset
                  className="px-4 py-2 hover:bg-white/10 rounded-xl text-xs font-bold transition-all"
               >
                 Discard
               </button>
               <button 
                  className="px-6 py-2 bg-[#1a56db] rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25"
               >
                 Save Changes
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Local Toasts */}
      <div className="fixed top-8 right-8 flex flex-col gap-3 z-[100]">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className={`p-4 rounded-xl shadow-xl border flex items-center gap-3 min-w-[300px]
                ${toast.type === 'success' ? 'bg-white border-[#10b981]/20 text-[#111827]' : 'bg-[#fef2f2] border-red-100 text-[#b91c1c]'}`}
            >
              {toast.type === 'success' ? <Check size={18} className="text-[#10b981]" /> : <AlertCircle size={18} />}
              <span className="text-sm font-semibold">{toast.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ━━━ TAB 1: PROFILE ━━━
const ProfileTab = ({ onDirtyChange, addToast }: { onDirtyChange: (d: boolean) => void, addToast: (s: string) => void }) => {
  const [formData, setFormData] = useState({
    name: 'Dr. Ramesh Kumar',
    empId: 'VU-FAC-0042',
    department: 'Computer Science',
    designation: 'Associate Professor',
    email: 'ramesh@viit.ac.in',
    phone: '+91 98765 43210',
    subjects: ['CS601', 'MA601', 'CS603'],
    officeHours: 'Mon-Fri, 10AM-12PM',
    officeLocation: 'Block A, Room 204'
  });
  const [initialData] = useState({ ...formData });
  const [avatar, setAvatar] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isChanged = JSON.stringify(formData) !== JSON.stringify(initialData);
    onDirtyChange(isChanged);
  }, [formData, initialData, onDirtyChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadstart = () => setUploadProgress(10);
      reader.onprogress = (ev) => {
        if (ev.lengthComputable) setUploadProgress(Math.round((ev.loaded / ev.total) * 100));
      };
      reader.onload = (ev) => {
        setAvatar(ev.target?.result as string);
        setUploadProgress(0);
        addToast("Profile photo updated ✅");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSavedSuccess(true);
      addToast("Profile updated successfully ✅");
      setTimeout(() => setSavedSuccess(false), 2000);
      onDirtyChange(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Avatar Section */}
      <div className="flex flex-col items-center">
        <div 
          className="relative group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-[80px] h-[80px] rounded-full bg-[#1a56db] flex items-center justify-center text-white text-[28px] font-bold overflow-hidden shadow-lg">
            {avatar ? <img src={avatar} className="w-full h-full object-cover" alt="Avatar" /> : 'RK'}
            {uploadProgress > 0 && (
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="38" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                <circle cx="40" cy="40" r="38" fill="none" stroke="white" strokeWidth="4" strokeDasharray={238.76} strokeDashoffset={238.76 * (1 - uploadProgress / 100)} className="transition-all duration-300" />
              </svg>
            )}
          </div>
          <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Camera className="text-white" size={20} />
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        </div>
        <div className="mt-3 text-center">
          <p className="text-base font-bold text-[#111827]">{formData.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{formData.empId}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-[#1a56db] text-[10px] font-bold rounded-full border border-blue-100 uppercase tracking-wider">
            {formData.department}
          </span>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white p-5 md:p-8 rounded-[12px] border border-gray-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">Full Name *</label>
            <input 
              className="w-full h-10 px-4 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:ring-2 focus:ring-[#1a56db] outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">Employee ID</label>
            <div className="relative">
              <input 
                readOnly
                className="w-full h-10 pl-10 pr-4 py-2 bg-gray-50 border border-[#e5e7eb] rounded-lg text-sm text-gray-400 outline-none cursor-not-allowed group"
                value={formData.empId}
              />
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
              <div className="absolute top-0 right-0 h-full flex items-center pr-3 group-hover:block hidden">
                <div className="bg-[#111827] text-white text-[10px] px-2 py-1 rounded shadow-lg">Employee ID cannot be changed</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">Department *</label>
            <select 
              className="w-full h-10 px-4 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:ring-2 focus:ring-[#1a56db] outline-none"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            >
              <option>Computer Science</option>
              <option>IT</option>
              <option>ECE</option>
              <option>Mechanical</option>
              <option>Civil</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">Designation *</label>
            <select 
              className="w-full h-10 px-4 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:ring-2 focus:ring-[#1a56db] outline-none"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            >
              <option>Assistant Professor</option>
              <option>Associate Professor</option>
              <option>Professor</option>
              <option>HOD</option>
              <option>Dean</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">Email Address *</label>
            <input 
              type="email"
              className="w-full h-10 px-4 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:ring-2 focus:ring-[#1a56db] outline-none"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">Phone Number *</label>
            <input 
              className="w-full h-10 px-4 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:ring-2 focus:ring-[#1a56db] outline-none"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="col-span-1 md:col-span-2 space-y-3">
            <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">Subjects Handling</label>
            <div className="flex flex-wrap gap-2 py-1">
              {formData.subjects.map(s => (
                <motion.div 
                  layout
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={s} 
                  className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg border border-blue-100 bg-blue-50/50 text-[#1a56db] text-xs font-bold shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-[#1a56db]"></span>
                  {s}
                  <button 
                    onClick={() => {
                        if (confirm(`Remove ${s}?`)) {
                            setFormData({ ...formData, subjects: formData.subjects.filter(x => x !== s) });
                        }
                    }}
                    className="p-0.5 hover:bg-blue-100 rounded-md transition-colors"
                  >
                    <X size={12} />
                  </button>
                </motion.div>
              ))}
              <button 
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e5e7eb] text-gray-500 rounded-lg text-xs font-bold hover:border-[#1a56db] hover:text-[#1a56db] transition-all"
              >
                <Plus size={14} /> Add Subject
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">Office Hours</label>
            <input 
              className="w-full h-10 px-4 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:ring-2 focus:ring-[#1a56db] outline-none"
              value={formData.officeHours}
              onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">Office Location</label>
            <input 
              className="w-full h-10 px-4 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:ring-2 focus:ring-[#1a56db] outline-none"
              value={formData.officeLocation}
              onChange={(e) => setFormData({ ...formData, officeLocation: e.target.value })}
            />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-50 flex justify-end">
          <button 
            disabled={saving}
            onClick={handleSave}
            className={`h-10 px-8 rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-lg
              ${savedSuccess ? 'bg-[#10b981] text-white shadow-green-500/20' : 'bg-[#1a56db] text-white shadow-blue-500/20 hover:bg-blue-600 active:translate-y-0.5'}`}
          >
            {saving ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Saving...</>
            ) : savedSuccess ? (
              <><Check size={18} /> Saved ✓</>
            ) : 'Save Profile Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ━━━ TAB 2: SECURITY ━━━
const SecurityTab = ({ addToast }: { addToast: (s: string) => void }) => {
  const [passForm, setPassForm] = useState({ current: '', new: '', confirm: '' });
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });
  const [updating, setUpdating] = useState(false);

  // Strength Check
  const getStrength = (p: string) => {
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[a-z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[!@#$%^&*]/.test(p)) score++;
    return score;
  };

  const strength = getStrength(passForm.new);
  const requirements = [
    { label: 'At least 8 characters', met: passForm.new.length >= 8 },
    { label: 'One uppercase letter (A-Z)', met: /[A-Z]/.test(passForm.new) },
    { label: 'One lowercase letter (a-z)', met: /[a-z]/.test(passForm.new) },
    { label: 'One number (0-9)', met: /[0-9]/.test(passForm.new) },
    { label: 'One special character (!@#$%)', met: /[!@#$%^&*]/.test(passForm.new) },
  ];

  const canUpdate = strength === 5 && passForm.new === passForm.confirm && passForm.current !== '';

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canUpdate) return;
    setUpdating(true);
    setTimeout(() => {
        setUpdating(false);
        setPassForm({ current: '', new: '', confirm: '' });
        addToast("Password updated successfully ✅");
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up">
      <div className="space-y-6">
        <form onSubmit={handleUpdate} className="bg-white p-8 rounded-[12px] border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-[#111827]">Change Password</h2>
          
          <div className="space-y-4">
            <div className="relative group">
              <label className="text-[11px] font-bold text-gray-400 absolute left-4 top-2 translate-y-0 group-focus-within:-translate-y-5 transition-all">Current Password</label>
              <input 
                type={showPass.current ? 'text' : 'password'}
                className="w-full h-11 px-4 pt-3 border border-[#e5e7eb] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1a56db]"
                value={passForm.current}
                onChange={(e) => setPassForm({ ...passForm, current: e.target.value })}
              />
              <button 
                type="button" 
                onClick={() => setShowPass({...showPass, current: !showPass.current})}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative group">
              <label className="text-[11px] font-bold text-gray-400 absolute left-4 top-2">New Password</label>
              <input 
                type={showPass.new ? 'text' : 'password'}
                className="w-full h-11 px-4 pt-3 border border-[#e5e7eb] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1a56db]"
                value={passForm.new}
                onChange={(e) => setPassForm({ ...passForm, new: e.target.value })}
              />
              <button 
                type="button" 
                onClick={() => setShowPass({...showPass, new: !showPass.new})}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Strength indicator */}
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full
                    ${strength <= 2 ? 'bg-red-500' : strength === 3 ? 'bg-orange-500' : strength === 4 ? 'bg-blue-500' : 'bg-green-500'}`}
                  style={{ width: `${strength * 20}%` }}
                />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-right">
                {strength === 0 ? '' : strength <= 2 ? 'Weak' : strength === 3 ? 'Fair' : strength === 4 ? 'Good' : 'Strong'}
              </p>
            </div>

            {/* Requirements */}
            <div className="space-y-2 py-2">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-center gap-2">
                  {req.met ? (
                    <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-[#10b981]"><Check size={14} strokeWidth={3} /></motion.div>
                  ) : (
                    <X size={14} className="text-gray-300" />
                  )}
                  <span className={`text-[11px] font-medium transition-colors ${req.met ? 'text-[#10b981]' : 'text-gray-400'}`}>{req.label}</span>
                </div>
              ))}
            </div>

            <div className="relative group">
              <label className="text-[11px] font-bold text-gray-400 absolute left-4 top-2">Confirm New Password</label>
              <input 
                type={showPass.confirm ? 'text' : 'password'}
                className="w-full h-11 px-4 pt-3 border border-[#e5e7eb] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1a56db]"
                value={passForm.confirm}
                onChange={(e) => setPassForm({ ...passForm, confirm: e.target.value })}
              />
              <button 
                type="button" 
                onClick={() => setShowPass({...showPass, confirm: !showPass.confirm})}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {passForm.confirm && (
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`text-[10px] font-bold flex items-center gap-1 ${passForm.new === passForm.confirm ? 'text-green-500' : 'text-red-500'}`}>
                {passForm.new === passForm.confirm ? <><Check size={10} strokeWidth={3} /> Passwords match</> : 'Passwords do not match'}
              </motion.p>
            )}
          </div>

          <button 
            type="submit"
            disabled={!canUpdate || updating}
            className="w-full h-11 bg-[#1a56db] text-white rounded-lg font-bold shadow-lg hover:bg-blue-600 active:translate-y-0.5 transition-all text-sm disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-2"
          >
            {updating ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Updating...</> : 'Update Password'}
          </button>
        </form>
      </div>

      <div className="space-y-8">
        {/* Login History */}
        <div className="bg-white p-8 rounded-[12px] border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-[#111827]">Login History</h2>
          
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#10b981]"><Monitor size={18} /></div>
                <div>
                   <p className="text-[13px] font-bold text-[#111827] flex items-center gap-2">🟢 Current Session</p>
                   <p className="text-[11px] text-[#6b7280] mt-1">Today at 9:32 AM — Chrome on Windows</p>
                   <p className="text-[10px] text-gray-400 mt-0.5">IP: 192.168.1.xx — Visakhapatnam, India</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-50 pt-4 space-y-4">
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Previous Sessions</p>
               {[1,2,3].map(i => (
                 <div key={i} className="flex items-center justify-between group">
                    <div className="text-[11px]">
                       <p className="font-bold text-[#374151]">{i} day ago at 4:15 PM</p>
                       <p className="text-gray-400 mt-0.5">Chrome on Windows · Pune, India</p>
                    </div>
                    <button className="p-1.5 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 rounded transition-all"><X size={14} /></button>
                 </div>
               ))}
            </div>

            <button className="w-full py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100">
               Sign out all other sessions
            </button>
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-[#eff6ff] p-6 rounded-2xl border border-blue-100 space-y-3">
          <div className="flex items-center gap-2 text-[#1a56db]">
             <Shield size={20} />
             <h3 className="font-bold text-sm">Security Tips</h3>
          </div>
          <ul className="space-y-2">
            {[
              'Use a strong unique password',
              'Never share your login credentials',
              'Log out from shared devices',
              'Report suspicious activity to admin'
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-blue-700/70 font-medium">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 shrink-0"></span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ━━━ TAB 3: PREFERENCES ━━━
const PreferencesTab = ({ addToast }: { addToast: (s: string) => void }) => {
  const [prefs, setPrefs] = useState({
    theme: 'Light' as 'Light' | 'Dark' | 'System',
    language: 'English',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24-hour',
    compactMode: false,
    animations: true,
    avatars: true,
    defaultSubject: 'CS601 — Machine Learning',
    entryView: 'Table',
    analyticsPeriod: 'This Month'
  });

  const handleSave = () => {
    addToast("Preferences saved ✅");
  };

  return (
    <div className="max-w-4xl bg-white rounded-[12px] border border-gray-100 shadow-sm overflow-hidden animate-fade-up">
      <div className="p-8 space-y-12">
        {/* Section: Default Settings */}
        <section className="space-y-6">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Default Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#111827]">Default Subject on Login</p>
                <p className="text-xs text-gray-400">When you log in, open this subject first</p>
              </div>
              <select 
                className="w-full h-11 px-4 border border-[#e5e7eb] rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-[#1a56db]"
                value={prefs.defaultSubject}
                onChange={(e) => setPrefs({ ...prefs, defaultSubject: e.target.value })}
              >
                <option>CS601 — Machine Learning</option>
                <option>MA601 — Mathematics</option>
                <option>CS603 — Software Testing</option>
                <option>Last visited</option>
              </select>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#111827]">Default Analytics Period</p>
                <p className="text-xs text-gray-400">Default time range for charts</p>
              </div>
              <div className="flex gap-4 p-1 bg-gray-50 border rounded-xl overflow-hidden">
                {['This Week', 'This Month', 'This Semester'].map(p => (
                  <button 
                    key={p}
                    onClick={() => setPrefs({ ...prefs, analyticsPeriod: p })}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all
                      ${prefs.analyticsPeriod === p ? 'bg-white text-[#1a56db] shadow-sm' : 'text-gray-400'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              <p className="text-sm font-bold text-[#111827]">Preferred Marks Entry View</p>
              <div className="grid grid-cols-2 gap-4">
                 <button 
                  onClick={() => setPrefs({ ...prefs, entryView: 'Table' })}
                  className={`p-5 rounded-xl border-2 transition-all flex flex-col gap-2 items-start text-left
                    ${prefs.entryView === 'Table' ? 'border-[#1a56db] bg-[#eff6ff]' : 'border-gray-100 hover:border-gray-200'}`}
                 >
                    <div className="flex items-center justify-between w-full">
                       <Layout size={20} className={prefs.entryView === 'Table' ? 'text-[#1a56db]' : 'text-gray-400'} />
                       {prefs.entryView === 'Table' && <div className="w-2 h-2 rounded-full bg-[#1a56db]"></div>}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-700">📋 Table View</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">List-style data entry</p>
                    </div>
                 </button>
                 <button 
                  onClick={() => setPrefs({ ...prefs, entryView: 'Grid' })}
                  className={`p-5 rounded-xl border-2 transition-all flex flex-col gap-2 items-start text-left
                    ${prefs.entryView === 'Grid' ? 'border-[#1a56db] bg-[#eff6ff]' : 'border-gray-100 hover:border-gray-200'}`}
                 >
                    <div className="flex items-center justify-between w-full">
                       <Layout size={20} className={prefs.entryView === 'Grid' ? 'text-rotate-90 text-[#1a56db]' : 'text-gray-400'} />
                       {prefs.entryView === 'Grid' && <div className="w-2 h-2 rounded-full bg-[#1a56db]"></div>}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-700">📊 Grid View</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Spreadsheet-style view</p>
                    </div>
                 </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Appearance */}
        <section className="space-y-6 pt-12 border-t border-gray-50">
           <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Appearance</h3>
           
           <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-bold text-[#111827]">Theme</p>
                <div className="grid grid-cols-3 gap-4">
                   {[
                     { id: 'Light', icon: <Sun size={18} />, label: 'Light' },
                     { id: 'Dark', icon: <Moon size={18} />, label: 'Dark' },
                     { id: 'System', icon: <Monitor size={18} />, label: 'System' }
                   ].map(t => (
                    <button 
                      key={t.id}
                      onClick={() => setPrefs({ ...prefs, theme: t.id as any })}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                        ${prefs.theme === t.id ? 'border-[#1a56db] bg-[#eff6ff]' : 'border-gray-50 hover:border-gray-200'}`}
                    >
                      <div className={prefs.theme === t.id ? 'text-[#1a56db]' : 'text-gray-400'}>{t.icon}</div>
                      <span className="text-xs font-bold text-gray-700">{t.label}</span>
                    </button>
                   ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <p className="text-sm font-bold text-[#111827]">Date Format</p>
                   <select 
                    className="w-full h-11 px-4 border border-[#e5e7eb] rounded-lg text-sm font-medium outline-none"
                    value={prefs.dateFormat}
                    onChange={(e) => setPrefs({ ...prefs, dateFormat: e.target.value })}
                   >
                     <option>DD/MM/YYYY</option>
                     <option>MM/DD/YYYY</option>
                     <option>YYYY-MM-DD</option>
                   </select>
                   <p className="text-[10px] italic text-[#1a56db] font-medium">Preview: {prefs.dateFormat === 'YYYY-MM-DD' ? '2026-03-09' : prefs.dateFormat === 'MM/DD/YYYY' ? '03/09/2026' : '09/03/2026'}</p>
                 </div>
                 <div className="space-y-3">
                   <p className="text-sm font-bold text-[#111827]">Time Format</p>
                   <div className="flex items-center gap-6 py-2">
                     <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                          ${prefs.timeFormat === '12-hour' ? 'border-[#1a56db]' : 'border-gray-200 group-hover:border-blue-400'}`}>
                           {prefs.timeFormat === '12-hour' && <div className="w-2.5 h-2.5 rounded-full bg-[#1a56db]"></div>}
                        </div>
                        <input type="radio" className="hidden" onClick={() => setPrefs({...prefs, timeFormat: '12-hour'})} />
                        <span className="text-sm text-gray-600 font-medium">12-hour (2:30 PM)</span>
                     </label>
                     <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                          ${prefs.timeFormat === '24-hour' ? 'border-[#1a56db]' : 'border-gray-200 group-hover:border-blue-400'}`}>
                           {prefs.timeFormat === '24-hour' && <div className="w-2.5 h-2.5 rounded-full bg-[#1a56db]"></div>}
                        </div>
                        <input type="radio" className="hidden" onClick={() => setPrefs({...prefs, timeFormat: '24-hour'})} />
                        <span className="text-sm text-gray-600 font-medium">24-hour (14:30)</span>
                     </label>
                   </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Section: Display */}
        <section className="space-y-6 pt-12 border-t border-gray-50">
           <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Display</h3>
           
           <div className="space-y-4">
              <ToggleRow 
                label="Compact Mode" 
                sub="Reduce spacing for more content on screen"
                active={prefs.compactMode}
                onToggle={() => setPrefs({ ...prefs, compactMode: !prefs.compactMode })}
              />
              <ToggleRow 
                label="Show Animations" 
                sub="Enable page transitions and micro-animations"
                active={prefs.animations}
                onToggle={() => setPrefs({ ...prefs, animations: !prefs.animations })}
              />
              <ToggleRow 
                label="Show Student Avatars" 
                sub="Show avatar initials in student tables"
                active={prefs.avatars}
                onToggle={() => setPrefs({ ...prefs, avatars: !prefs.avatars })}
              />
           </div>
        </section>

        <div className="pt-12 border-t border-gray-50 flex justify-end">
          <button 
            onClick={handleSave}
            className="h-11 px-8 bg-[#1a56db] text-white rounded-lg font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 active:translate-y-0.5 transition-all text-sm"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

// ━━━ TAB 4: NOTIFICATIONS ━━━
const NotificationsTab = ({ addToast }: { addToast: (s: string) => void }) => {
  const [masterSwitch, setMasterSwitch] = useState(true);
  const [expandThreshold, setExpandThreshold] = useState(false);
  const [notifs, setNotifs] = useState({
    belowThreshold: true,
    consecutiveLow: true,
    missedAssessment: true,
    weeklyDigest: false,
    pendingUpload: true,
    upcomingReminders: true,
    monthlySummary: false,
    weeklyReportAuto: false,
    hodDownload: true,
    inPortal: true,
    email: true,
    sms: false
  });

  const handleSave = () => {
    addToast("Notification settings saved ✅");
  };

  return (
    <div className="max-w-4xl space-y-6 animate-fade-up">
      {/* Master Toggle */}
      <div className="bg-[#eff6ff] border border-blue-100 p-6 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all
              ${masterSwitch ? 'bg-[#1a56db]' : 'bg-gray-300 shadow-none'}`}>
             <Bell size={24} />
           </div>
           <div>
              <p className="text-base font-bold text-[#111827]">🔔 All Notifications</p>
              <p className="text-xs text-blue-700/60 font-medium">Turn off to pause all notifications across the portal</p>
           </div>
        </div>
        <IOSSwitch active={masterSwitch} onChange={setMasterSwitch} />
      </div>

      <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-500
        ${!masterSwitch ? 'opacity-60 pointer-events-none grayscale' : ''}`}>
        
        <div className="p-8 space-y-12">
          {/* Academic Alerts */}
          <section className="space-y-6">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Academic Alerts</h3>
            <div className="space-y-6">
               <ToggleRow 
                  label="Student scores below threshold" 
                  sub="Alert when any student scores below your set limit"
                  active={notifs.belowThreshold}
                  onToggle={() => setNotifs({ ...notifs, belowThreshold: !notifs.belowThreshold })}
               />
               <ToggleRow 
                  label="3+ consecutive low scores" 
                  sub="Notify when a student has 3 or more low scores in a row"
                  active={notifs.consecutiveLow}
                  onToggle={() => setNotifs({ ...notifs, consecutiveLow: !notifs.consecutiveLow })}
               />
               <ToggleRow 
                  label="Missed assessments" 
                  sub="Alert when students miss a test or assignment"
                  active={notifs.missedAssessment}
                  onToggle={() => setNotifs({ ...notifs, missedAssessment: !notifs.missedAssessment })}
               />
               <ToggleRow 
                  label="Weekly at-risk summary" 
                  sub="Receive a weekly digest of at-risk students"
                  active={notifs.weeklyDigest}
                  onToggle={() => setNotifs({ ...notifs, weeklyDigest: !notifs.weeklyDigest })}
               />
            </div>
          </section>

          {/* Reminders */}
          <section className="space-y-6 pt-12 border-t border-gray-50">
             <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Reminders</h3>
             <div className="space-y-8">
                <div className="space-y-4">
                   <ToggleRow 
                      label="Pending marks upload" 
                      sub="Remind me when marks are not uploaded within 2 days"
                      active={notifs.pendingUpload}
                      onToggle={() => setNotifs({ ...notifs, pendingUpload: !notifs.pendingUpload })}
                   />
                   {notifs.pendingUpload && (
                     <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="pl-12 flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400">Remind after:</span>
                        <select className="bg-gray-50 border px-3 py-1.5 rounded-lg text-xs font-bold outline-none">
                           <option>1 day</option>
                           <option selected>2 days</option>
                           <option>3 days</option>
                        </select>
                     </motion.div>
                   )}
                </div>

                <div className="space-y-4">
                    <ToggleRow 
                      label="Upcoming assessment reminders" 
                      sub="Notify 1 day before each scheduled assessment"
                      active={notifs.upcomingReminders}
                      onToggle={() => setNotifs({ ...notifs, upcomingReminders: !notifs.upcomingReminders })}
                    />
                    {notifs.upcomingReminders && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="pl-12 flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400">Notify:</span>
                        <select className="bg-gray-50 border px-3 py-1.5 rounded-lg text-xs font-bold outline-none">
                           <option selected>1 day</option>
                           <option>2 days</option>
                        </select>
                        <span className="text-xs font-bold text-gray-400">before</span>
                      </motion.div>
                    )}
                </div>
             </div>
          </section>

          {/* Delivery Method */}
          <section className="space-y-6 pt-12 border-t border-gray-50">
             <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">How to receive notifications</h3>
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <div>
                      <p className="text-sm font-bold text-gray-400 select-none flex items-center gap-2">
                        <Check size={16} strokeWidth={3} className="text-gray-300" />
                        In-portal notifications
                      </p>
                      <p className="text-xs text-gray-300 mt-1 pl-6">Show notifications inside the portal (bell icon)</p>
                   </div>
                   <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-not-allowed">
                      <div className="absolute top-1 left-5 w-4 h-4 bg-gray-400 rounded-full"></div>
                   </div>
                </div>

                <div className="flex items-center justify-between">
                   <label className="flex items-start gap-4 cursor-pointer group">
                      <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all 
                        ${notifs.email ? 'bg-[#1a56db] border-[#1a56db]' : 'bg-white border-gray-200'}`}>
                         <Check size={14} className="text-white" strokeWidth={4} />
                      </div>
                      <input type="checkbox" className="hidden" onClick={() => setNotifs({...notifs, email: !notifs.email})} />
                      <div>
                         <p className="text-sm font-bold text-[#374151]">Email notifications</p>
                         <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                            Send to: ramesh@viit.ac.in
                            <button className="text-[#1a56db] hover:underline">Change email</button>
                         </p>
                      </div>
                   </label>
                </div>

                <div className="flex items-center justify-between">
                   <label className="flex items-start gap-4 cursor-pointer group">
                      <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all 
                        ${notifs.sms ? 'bg-[#1a56db] border-[#1a56db]' : 'bg-white border-gray-200'}`}>
                         {notifs.sms && <Check size={14} className="text-white" strokeWidth={4} />}
                      </div>
                      <input type="checkbox" className="hidden" onClick={() => setNotifs({...notifs, sms: !notifs.sms})} />
                      <div>
                         <p className="text-sm font-bold text-[#374151]">SMS notifications</p>
                         <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                            +91 98765 43210
                            <button className="text-[#1a56db] hover:underline">Add phone</button>
                         </p>
                      </div>
                   </label>
                </div>
             </div>
          </section>

          <div className="pt-12 border-t border-gray-50 flex justify-end">
            <button 
              onClick={handleSave}
              className="h-11 px-8 bg-[#1a56db] text-white rounded-lg font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 active:translate-y-0.5 transition-all text-sm"
            >
              Save Notification Settings
            </button>
          </div>
        </div>
      </div>

      {/* Threshold Collapsible */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <button 
          onClick={() => setExpandThreshold(!expandThreshold)}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-all font-bold text-[#111827]"
        >
           <span className="flex items-center gap-2">⚙️ Alert Threshold Settings</span>
           <motion.div animate={{ rotate: expandThreshold ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={20} />
           </motion.div>
        </button>
        <AnimatePresence>
          {expandThreshold && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden bg-gray-50/50"
            >
              <div className="p-8 space-y-8 max-w-2xl">
                 <ThresholdRow label="Flag student as At Risk if score below:" value={10} min={1} max={20} />
                 <ThresholdRow label="For how many consecutive tests:" value={2} min={1} max={5} />
                 <ThresholdRow label="Flag as Critical if assessments missed:" value={2} min={1} max={5} sub="this month" />
                 
                 <div className="pt-6">
                    <button 
                      onClick={() => {
                        setExpandThreshold(false);
                        addToast("Thresholds updated ✅");
                      }}
                      className="px-6 py-2 bg-[#111827] text-white rounded-lg font-bold text-xs hover:bg-gray-800 transition-all"
                    >
                      Save Thresholds
                    </button>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!masterSwitch && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center gap-3">
           <AlertCircle size={20} className="text-yellow-600" />
           <p className="text-sm font-bold text-yellow-700">All notifications paused. You won't receive any academic or system alerts.</p>
        </div>
      )}
    </div>
  );
};

// ━━━ HELPER COMPONENTS ━━━

const IOSSwitch = ({ active, onChange }: { active: boolean, onChange: (v: boolean) => void }) => (
  <button 
    onClick={() => onChange(!active)}
    className={`w-12 h-6.5 rounded-full relative border-2 transition-all duration-300
      ${active ? 'bg-[#1a56db] border-[#1a56db]' : 'bg-gray-200 border-gray-200'}`}
  >
    <motion.div 
      initial={false}
      animate={{ x: active ? 22 : 2 }}
      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  </button>
);

const ToggleRow = ({ label, sub, active, onToggle }: { label: string, sub: string, active: boolean, onToggle: () => void }) => (
  <div className="flex items-center justify-between group">
     <div>
       <p className="text-sm font-bold text-[#374151] group-hover:text-[#1a56db] transition-colors">{label}</p>
       <p className="text-xs text-gray-400 mt-1">{sub}</p>
     </div>
     <IOSSwitch active={active} onChange={onToggle} />
  </div>
);

const ThresholdRow = ({ label, value, min, max, sub }: { label: string, value: number, min: number, max: number, sub?: string }) => {
  const [val, setVal] = useState(value);
  return (
    <div className="flex items-center justify-between gap-8">
       <div className="flex-1">
          <p className="text-sm font-bold text-[#4b5563]">{label}</p>
          {sub && <p className="text-[11px] text-gray-400 mt-0.5 font-bold uppercase tracking-wider">{sub}</p>}
       </div>
       <div className="flex items-center gap-1 bg-white border rounded-xl overflow-hidden p-1 shadow-sm">
          <button onClick={() => setVal(Math.max(min, val - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg text-gray-400"><X size={14} className="rotate-45" /></button>
          <div className="w-10 text-center font-extrabold text-[#111827] text-sm">{val}</div>
          <button onClick={() => setVal(Math.min(max, val + 1))} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg text-gray-600"><Plus size={14} /></button>
       </div>
    </div>
  );
};

export default SettingsPage;
