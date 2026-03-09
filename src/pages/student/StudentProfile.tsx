import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Pencil } from 'lucide-react';
import { studentInfo } from '../../data/studentData';

const StudentProfile: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [showPw, setShowPw] = useState<boolean[]>([false, false, false]);
  const personalFields = [
    { l: 'Full Name', v: studentInfo.name }, { l: 'Email', v: studentInfo.email },
    { l: 'Phone', v: studentInfo.phone }, { l: 'Date of Birth', v: studentInfo.dob },
    { l: 'Gender', v: studentInfo.gender }, { l: 'Address', v: studentInfo.address },
  ];
  const academicFields = [
    { l: 'Roll Number', v: studentInfo.rollNo, mono: true }, { l: 'Department', v: studentInfo.department },
    { l: 'Current Semester', v: `${studentInfo.semester}` }, { l: 'Batch', v: studentInfo.batch, mono: true },
    { l: 'Academic Advisor', v: studentInfo.advisor }, { l: 'Enrollment Date', v: studentInfo.enrollmentDate, mono: true },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-title text-[32px]" style={{ color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>My Profile</h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>View and manage your personal and academic information</p>
      </div>
      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="rounded-xl p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderLeft: '3px solid var(--blue)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-[24px] font-semibold text-white" style={{ background: 'var(--blue)', border: '3px solid white', boxShadow: 'var(--shadow-sm)' }}>
              {studentInfo.initials}
              <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full pulse-dot" style={{ background: 'var(--green)', border: '2px solid white' }} />
            </div>
            <p className="text-center text-[11px] mt-2 cursor-pointer" style={{ color: 'var(--blue)' }}>Change Photo</p>
          </div>
          <div>
            <p className="text-[22px] font-semibold" style={{ color: 'var(--text-primary)' }}>{studentInfo.name}</p>
            <p className="font-mono text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>{studentInfo.rollNo}</p>
            <p className="text-[13px] mt-1" style={{ color: 'var(--text-secondary)' }}>{studentInfo.department} · Sem {studentInfo.semester}</p>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: 'var(--green)' }} />
              <span className="text-[12px]" style={{ color: 'var(--green)' }}>Active Student</span>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Personal Info */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
        className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="flex items-center justify-between mb-5">
          <span className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>Personal Information</span>
          <button onClick={() => setEditing(!editing)} className="h-[34px] px-3 rounded-md flex items-center gap-1.5 text-[12px] transition-all duration-150"
            style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <Pencil size={12} /> {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {personalFields.map((f, i) => (
            <div key={i}>
              <p className="text-[10px] font-medium tracking-[1.5px] uppercase mb-1" style={{ color: 'var(--text-label)' }}>{f.l}</p>
              {editing ? (
                <input defaultValue={f.v} className="w-full h-[38px] rounded-lg px-3 text-[14px] outline-none transition-all duration-200"
                  style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--border-focus)'; e.target.style.boxShadow = 'var(--shadow-focus)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'none'; }} />
              ) : (
                <p className="text-[14px]" style={{ color: 'var(--text-primary)' }}>{f.v}</p>
              )}
            </div>
          ))}
        </div>
        {editing && (
          <div className="flex gap-3 mt-5 justify-end">
            <button onClick={() => setEditing(false)} className="h-[38px] px-4 rounded-lg text-[13px] font-medium"
              style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>Cancel</button>
            <button onClick={() => setEditing(false)} className="h-[38px] px-4 rounded-lg text-[13px] font-semibold text-white"
              style={{ background: 'var(--blue)' }}>Save Changes</button>
          </div>
        )}
      </motion.div>
      {/* Academic Info */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}
        className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="flex items-center gap-2 mb-1"><span className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>Academic Information</span><Lock size={14} style={{ color: 'var(--text-muted)' }} /></div>
        <p className="text-[11px] mb-5" style={{ color: 'var(--text-muted)' }}>Managed by administration</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {academicFields.map((f, i) => (
            <div key={i}><p className="text-[10px] font-medium tracking-[1.5px] uppercase mb-1" style={{ color: 'var(--text-label)' }}>{f.l}</p><p className={`text-[14px] ${f.mono ? 'font-mono' : ''}`} style={{ color: 'var(--text-primary)' }}>{f.v}</p></div>
          ))}
          <div><p className="text-[10px] font-medium tracking-[1.5px] uppercase mb-1" style={{ color: 'var(--text-label)' }}>Student Status</p><span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>Active</span></div>
        </div>
      </motion.div>
      {/* Change Password */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}
        className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="flex items-center gap-2 mb-5"><Lock size={16} style={{ color: 'var(--text-secondary)' }} /><span className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>Change Password</span></div>
        <div className="flex flex-col gap-4 max-w-md">
          {['Current Password', 'New Password', 'Confirm Password'].map((label, i) => (
            <div key={i}>
              <p className="text-[10px] font-medium tracking-[1.5px] uppercase mb-1" style={{ color: 'var(--text-label)' }}>{label}</p>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input type={showPw[i] ? 'text' : 'password'} placeholder={`Enter ${label.toLowerCase()}`}
                  className="w-full h-[44px] rounded-lg pl-9 pr-10 text-[13px] outline-none transition-all duration-200"
                  style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--border-focus)'; e.target.style.boxShadow = 'var(--shadow-focus)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'none'; }} />
                <button onClick={() => { const n = [...showPw]; n[i] = !n[i]; setShowPw(n); }} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                  {showPw[i] ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          ))}
          <div className="flex gap-3 mt-2">
            <button className="h-[38px] px-4 rounded-lg text-[13px] font-medium" style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>Cancel</button>
            <button className="h-[38px] px-4 rounded-lg text-[13px] font-semibold text-white" style={{ background: 'var(--blue)' }}>Update Password</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentProfile;
