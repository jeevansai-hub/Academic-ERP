import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Save, Camera, Pencil, Download, Circle, TrendingUp, Clock, AlertCircle,
  Mail, Phone, Linkedin, Github, Check, X, Calendar, Sun, Sunrise, Sunset, Moon,
  Bell, Eye, EyeOff, RotateCcw, Flag, Monitor, Smartphone, Tablet, FileText,
  Star, BookOpen, BarChart2, MessageSquare, Trophy
} from 'lucide-react';
import StudentLayout from '../../components/layout/StudentLayout';
import { PROFILE_DATA, ENROLLED_SUBJECTS, ACADEMIC_HISTORY, LOGIN_HISTORY, ACTIVITY_FEED } from './ProfileMockData';

// ═══════════════════════════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════════════════════════

const Badge = ({ children, color, outlined = false, className = '' }: any) => {
  const styles: any = {
    blue: outlined ? 'border-[#1A56DB] text-[#1A56DB] bg-[#1A56DB]/10' : 'bg-[#1A56DB] text-white',
    red: outlined ? 'border-[#EF4444] text-[#EF4444] bg-[#EF4444]/10' : 'bg-[#EF4444] text-white',
    amber: outlined ? 'border-[#F59E0B] text-[#F59E0B] bg-[#F59E0B]/10' : 'bg-[#F59E0B] text-white',
    green: outlined ? 'border-[#10B981] text-[#10B981] bg-[#10B981]/10' : 'bg-[#10B981] text-white',
    violet: outlined ? 'border-[#7C3AED] text-[#7C3AED] bg-[#7C3AED]/10' : 'bg-[#7C3AED] text-white',
    teal: outlined ? 'border-[#0EA5E9] text-[#0EA5E9] bg-[#0EA5E9]/10' : 'bg-[#0EA5E9] text-white',
    gray: outlined ? 'border-[#9CA3AF] text-[#6B7280] bg-[#F3F4F6]' : 'bg-[#E5E7EB] text-[#374151]'
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${outlined ? 'border' : ''} ${styles[color]} ${className}`}>
      {children}
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════
// LEFT PANEL CARDS
// ═══════════════════════════════════════════════════════════════

const ProfileCard = ({ setTab }: any) => {
    const [photoHover, setPhotoHover] = useState(false);
    return (
        <motion.div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-sm text-center flex items-center flex-col relative w-full">
            <div 
                className="w-[88px] h-[88px] rounded-full bg-[#1A56DB] flex items-center justify-center relative overflow-hidden cursor-pointer"
                onMouseEnter={() => setPhotoHover(true)} onMouseLeave={() => setPhotoHover(false)}
            >
                <span className="text-[28px] font-outfit font-bold text-white">AK</span>
                <AnimatePresence>
                    {photoHover && (
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center">
                            <Camera size={20} className="text-white mb-1" />
                            <span className="text-[11px] font-outfit text-white">Change</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="absolute top-[80px] right-[unset] ml-[60px] w-3.5 h-3.5 bg-[#10B981] border-2 border-white rounded-full z-10" />
            
            <h2 className="text-[18px] font-outfit font-bold text-[#111827] mt-[14px]">{PROFILE_DATA.personalInfo.fullName}</h2>
            <p className="text-[12px] font-mono text-[#9CA3AF] mt-[2px]">{PROFILE_DATA.systemInfo.rollNumber}</p>
            <div className="flex flex-col items-center gap-1 mt-1.5">
                <Badge color="blue">Computer Science & Engineering</Badge>
                <Badge color="gray">2022–2026</Badge>
                <span className="px-2 py-0.5 mt-1 rounded border border-[#6B7280] text-[10px] font-outfit font-medium text-[#374151]">Semester 6 · Week 11 of 18</span>
            </div>

            <div className="w-full flex gap-2 mt-4 pt-4 border-t border-[#F3F4F6]">
                <button onClick={() => setTab('profile')} className="flex-1 h-9 flex items-center justify-center gap-1.5 border border-[#E5E7EB] rounded-lg text-[12px] font-outfit font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors"><Pencil size={13}/> Edit</button>
                <button className="flex-1 h-9 flex items-center justify-center gap-1.5 border border-[#E5E7EB] rounded-lg text-[12px] font-outfit font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors"><Download size={13}/> Export</button>
            </div>
        </motion.div>
    );
};

const QuickStatsCard = () => (
    <motion.div className="bg-white border border-[#E5E7EB] rounded-[14px] p-4 px-5 shadow-sm w-full">
        <h3 className="text-[12px] font-outfit font-bold uppercase tracking-wider text-[#9CA3AF] mb-3">Academic snapshot</h3>
        <div className="flex justify-between items-center h-9 border-b border-[#F3F4F6] hover:bg-[#F9FAFB] cursor-pointer px-1 -mx-1 transition-colors">
            <span className="text-[12px] font-outfit font-medium text-[#374151]">Current CGPA</span>
            <span className="text-[14px] font-mono font-bold text-[#1A56DB]">{PROFILE_DATA.academicStats.cgpa}</span>
        </div>
        <div className="flex justify-between items-center h-9 border-b border-[#F3F4F6] hover:bg-[#F9FAFB] cursor-pointer px-1 -mx-1 transition-colors">
            <span className="text-[12px] font-outfit font-medium text-[#374151]">Dept Rank</span>
            <span className="text-[14px] font-mono font-bold text-[#111827]">{PROFILE_DATA.academicStats.rank}</span>
        </div>
        <div className="flex justify-between items-center h-9 border-b border-[#F3F4F6] hover:bg-[#F9FAFB] cursor-pointer px-1 -mx-1 transition-colors">
            <span className="text-[12px] font-outfit font-medium text-[#374151]">Credits earned</span>
            <span className="text-[14px] font-mono font-bold text-[#111827]">{PROFILE_DATA.academicStats.credits}</span>
        </div>
        <div className="flex justify-between items-center h-9 hover:bg-[#F9FAFB] cursor-pointer px-1 -mx-1 transition-colors">
            <span className="text-[12px] font-outfit font-medium text-[#374151]">Attendance</span>
            <span className="text-[14px] font-mono font-bold text-[#F59E0B]">{PROFILE_DATA.academicStats.attendance}%</span>
        </div>
    </motion.div>
);

const CompletionCard = () => {
    return (
        <motion.div className="bg-white border border-[#E5E7EB] rounded-[14px] p-4 px-5 shadow-sm w-full">
            <h3 className="text-[12px] font-outfit font-bold uppercase text-[#9CA3AF] mb-2.5">Profile completion</h3>
            <div className="flex flex-col items-center">
                <div className="relative w-[72px] h-[72px] flex items-center justify-center my-2">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="36" cy="36" r="30" stroke="#F3F4F6" strokeWidth="6" fill="transparent" />
                        <motion.circle cx="36" cy="36" r="30" stroke="#1A56DB" strokeWidth="6" fill="transparent" strokeDasharray="188.5" initial={{strokeDashoffset:188.5}} animate={{strokeDashoffset: 188.5 * (1 - 0.78)}} transition={{duration:0.7, ease:"easeOut"}} />
                    </svg>
                    <span className="absolute text-[16px] font-mono font-bold text-[#111827]">78%</span>
                </div>
                <div className="w-full mt-3 space-y-1.5">
                    <div className="flex gap-2 items-center cursor-pointer hover:bg-[#F9FAFB] p-1 rounded transition-colors"><Circle size={10} className="text-[#D1D5DB] shrink-0"/><span className="text-[11px] font-outfit text-[#6B7280]">Add profile photo</span></div>
                    <div className="flex gap-2 items-center cursor-pointer hover:bg-[#F9FAFB] p-1 rounded transition-colors"><Circle size={10} className="text-[#D1D5DB] shrink-0"/><span className="text-[11px] font-outfit text-[#6B7280]">Verify email address</span></div>
                    <div className="flex gap-2 items-center cursor-pointer hover:bg-[#F9FAFB] p-1 rounded transition-colors"><Circle size={10} className="text-[#D1D5DB] shrink-0"/><span className="text-[11px] font-outfit text-[#6B7280]">Set study preferences</span></div>
                </div>
                <a href="#" className="text-[11px] font-outfit font-medium text-[#1A56DB] hover:underline mt-3 w-full text-left">Complete profile →</a>
            </div>
        </motion.div>
    );
};

const InsightsCard = () => (
    <motion.div className="bg-white border border-[#E5E7EB] rounded-[14px] p-4 px-5 shadow-sm w-full">
        <h3 className="text-[12px] font-outfit font-bold uppercase text-[#9CA3AF] mb-3">Profile insights</h3>
        <div className="flex gap-2 py-2 border-b border-[#F3F4F6]"><TrendingUp size={14} className="text-[#10B981] shrink-0 mt-0.5"/><span className="text-[11px] font-outfit text-[#374151] leading-[1.5]">EC601 is your strongest subject this semester</span></div>
        <div className="flex gap-2 py-2 border-b border-[#F3F4F6]"><Clock size={14} className="text-[#7C3AED] shrink-0 mt-0.5"/><span className="text-[11px] font-outfit text-[#374151] leading-[1.5]">Your most active time is evenings (7–10 PM)</span></div>
        <div className="flex gap-2 py-2 border-b border-[#F3F4F6]"><AlertCircle size={14} className="text-[#F59E0B] shrink-0 mt-0.5"/><span className="text-[11px] font-outfit text-[#374151] leading-[1.5]">CS603 needs your attention — Watch status</span></div>
        <a href="#" className="text-[11px] font-outfit font-medium text-[#1A56DB] hover:underline mt-3 block w-full text-left">View full analysis →</a>
    </motion.div>
);

// ═══════════════════════════════════════════════════════════════
// TAB CONTENTS
// ═══════════════════════════════════════════════════════════════

const ProfileTab = ({ unsavedDataCallback }: any) => {
    const [editMode, setEditMode] = useState(false);
    return (
        <div className="animate-fade-in">
            {/* Personal Info */}
            <div className="mb-5 flex justify-between items-end">
                <h3 className="text-[13px] font-outfit font-bold text-[#374151]">Personal information</h3>
                <span onClick={() => setEditMode(!editMode)} className="text-[12px] font-outfit text-[#1A56DB] cursor-pointer hover:underline">{editMode ? 'Cancel' : 'Edit'}</span>
            </div>
            
            <div className="space-y-0 text-[13px] font-outfit">
                {[['Full name', PROFILE_DATA.personalInfo.fullName], 
                  ['Date of birth', PROFILE_DATA.personalInfo.dob],
                  ['Gender', PROFILE_DATA.personalInfo.gender],
                  ['Blood group', PROFILE_DATA.personalInfo.bloodGroup],
                  ['Guardian name', PROFILE_DATA.personalInfo.guardianName],
                  ['Guardian phone', PROFILE_DATA.personalInfo.guardianPhone],
                ].map(([label, val]) => (
                    <div key={label} className="flex flex-col md:flex-row md:items-center min-h-[44px] border-b border-[#F3F4F6] py-2 md:py-0">
                        <span className="w-[120px] text-[#9CA3AF] text-[12px] mb-1 md:mb-0 shrink-0">{label}</span>
                        {editMode ? <input onChange={() => unsavedDataCallback(true)} type="text" defaultValue={val as string} className="flex-1 h-10 w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/10 outline-none transition-all" /> : <span className="font-medium text-[#111827]">{val}</span>}
                    </div>
                ))}
                <div className="flex flex-col md:flex-row md:items-center min-h-[44px] py-3">
                    <span className="w-[120px] text-[#9CA3AF] text-[12px] shrink-0 mb-1 md:mb-0">Aadhaar (masked)</span>
                    <div className="flex flex-col">
                        <span className="font-medium text-[#111827]">{PROFILE_DATA.personalInfo.aadhaar}</span>
                        <span className="text-[10px] text-[#9CA3AF] mt-0.5">Update via admin office</span>
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-[#F3F4F6] my-6" />

            <div className="mb-5 flex justify-between items-end">
                <h3 className="text-[13px] font-outfit font-bold text-[#374151]">Contact & account information</h3>
                <span className="text-[12px] font-outfit text-[#1A56DB] cursor-pointer hover:underline">Edit</span>
            </div>
            <div className="space-y-0 text-[13px] font-outfit">
                <div className="flex flex-col md:flex-row md:items-center min-h-[44px] border-b border-[#F3F4F6] py-2 md:py-0">
                    <span className="w-[120px] text-[#9CA3AF] text-[12px] shrink-0">Personal email</span>
                    <div className="flex items-center gap-2"><Mail size={13} className="text-[#9CA3AF]"/><span className="font-medium text-[#111827]">{PROFILE_DATA.contactInfo.personalEmail}</span><Badge color="amber" className="ml-2">Unverified</Badge> <span className="text-[11px] text-[#1A56DB] cursor-pointer hover:underline">Verify now →</span></div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center min-h-[44px] border-b border-[#F3F4F6] py-2 md:py-0 bg-[#F9FAFB]/50">
                    <span className="w-[120px] text-[#9CA3AF] text-[12px] shrink-0">College email</span>
                    <div className="flex flex-col justify-center">
                        <span className="font-medium text-[#111827] flex items-center gap-2">{PROFILE_DATA.contactInfo.collegeEmail} <AlertCircle size={11} className="text-[#9CA3AF]"/></span>
                        <span className="text-[10px] text-[#9CA3AF] mt-0.5">Primary email for official communications</span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center min-h-[44px] border-b border-[#F3F4F6] py-2 md:py-0">
                    <span className="w-[120px] text-[#9CA3AF] text-[12px] shrink-0">Phone</span>
                    <div className="flex items-center gap-2"><Phone size={13} className="text-[#9CA3AF]"/><span className="font-medium text-[#111827]">{PROFILE_DATA.contactInfo.phone}</span><Badge color="green" className="ml-2">Verified</Badge></div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center min-h-[44px] py-2 md:py-0">
                    <span className="w-[120px] text-[#9CA3AF] text-[12px] shrink-0">LinkedIn</span>
                    <div className="flex items-center gap-2"><Linkedin size={13} className="text-[#9CA3AF]"/><span className="font-medium text-[#1A56DB] cursor-pointer hover:underline">{PROFILE_DATA.contactInfo.linkedin}</span></div>
                </div>
            </div>

            <div className="w-full h-px bg-[#F3F4F6] my-6" />

            <h3 className="text-[13px] font-outfit font-bold text-[#374151]">Academic resume export</h3>
            <p className="text-[12px] font-outfit text-[#6B7280] mt-1 mb-4">Generate a professional academic summary suitable for internship applications</p>
            
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col md:flex-row items-center md:items-start gap-5">
                <div className="w-[100px] h-[140px] bg-[#F9FAFB] shadow-md border border-[#E5E7EB] shrink-0 rounded flex flex-col items-center justify-start py-3 px-2">
                    <div className="w-10 h-10 rounded-full bg-[#E5E7EB] mb-2"/>
                    <div className="w-full h-1.5 bg-[#D1D5DB] mb-1"/><div className="w-2/3 h-1.5 bg-[#E5E7EB] mb-3"/>
                    <div className="w-full h-1 bg-[#E5E7EB] mb-1"/><div className="w-full h-1 bg-[#E5E7EB] mb-1"/>
                </div>
                <div className="flex-1 w-full">
                    <h4 className="text-[14px] font-outfit font-bold text-[#111827]">Academic Summary</h4>
                    <p className="text-[12px] font-outfit text-[#6B7280]">Auto-generated from your portal data</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 mt-3">
                        {['Student profile and contact information', 'CGPA and semester-wise SGPA', 'Department rank and academic standing', 'Subjects and credit distribution', 'Achievements and badges', 'Skills and technology exposure from curriculum'].map(item => (
                            <div key={item} className="flex items-center gap-2"><Check size={11} className="text-[#10B981]"/><span className="text-[12px] font-outfit text-[#374151]">{item}</span></div>
                        ))}
                    </div>
                    
                    <div className="flex gap-4 mt-4 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="accent-[#1A56DB]" /><span className="text-[12px] font-outfit text-[#374151]">Include photo</span></label>
                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-[#1A56DB]" /><span className="text-[12px] font-outfit text-[#374151]">Include contact details</span></label>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button className="h-9 px-4 bg-[#1A56DB] hover:bg-[#1648C0] text-white rounded-lg text-[12px] font-outfit font-medium flex items-center justify-center gap-2 transition-colors"><FileText size={14}/> Generate Academic Resume</button>
                        <div className="flex items-center gap-2 bg-[#F9FAFB] p-1 rounded border border-[#E5E7EB]">
                            <span className="px-3 md:px-4 py-1.5 bg-white shadow-sm border border-[#E5E7EB] rounded text-[11px] font-outfit font-medium cursor-pointer">PDF</span>
                            <span className="px-3 md:px-4 py-1.5 rounded text-[11px] font-outfit font-medium text-[#6B7280] hover:text-[#374151] cursor-pointer">DOCX</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ToggleRow = ({ label, desc, defaultOn = false, locked = false }: any) => {
    const [isOn, setIsOn] = useState(defaultOn);
    return (
        <div className="flex justify-between items-center py-2.5 border-b border-[#F3F4F6] last:border-0 hover:bg-[#F9FAFB] px-1 -mx-1 transition-colors">
            <div>
                <p className="text-[13px] font-outfit font-medium text-[#374151]">{label}</p>
                <p className="text-[11px] font-outfit text-[#9CA3AF] mt-0.5">{desc}</p>
            </div>
            {locked ? (
                <div className="w-[36px] h-[20px] bg-[#F3F4F6] rounded-full flex justify-end p-0.5 items-center">
                    <div className="w-3 h-3 bg-[#E5E7EB] rounded-full mr-1"/>
                </div>
            ) : (
                <div onClick={() => setIsOn(!isOn)} className={`w-[36px] h-[20px] rounded-full p-0.5 cursor-pointer transition-colors duration-200 flex ${isOn ? 'bg-[#1A56DB] justify-end' : 'bg-[#E5E7EB] justify-start'}`}>
                    <motion.div layout className="w-[16px] h-[16px] bg-white rounded-full shadow-sm" />
                </div>
            )}
        </div>
    );
};

const PreferencesTab = () => {
    const [theme, setTheme] = useState('Light');
    const [time, setTime] = useState('Evening (5–8 PM)');
    
    return (
        <div className="animate-fade-in">
            <h3 className="text-[13px] font-outfit font-bold text-[#374151]">Dashboard preferences</h3>
            <p className="text-[12px] font-outfit text-[#6B7280] mt-0.5 mb-4">Customize what you see on your dashboard</p>

            <label className="block text-[12px] font-outfit font-medium text-[#374151] mb-2 mt-4">Default page when I open the portal</label>
            <div className="flex flex-wrap gap-2">
                {['Dashboard', 'Marks Overview', 'Exam Hub', 'CGPA Progress'].map(t => (
                    <button key={t} className={`h-8 px-4 rounded-lg border text-[12px] font-outfit font-medium transition-colors ${t === 'Dashboard' ? 'bg-[#1A56DB] text-white border-[#1A56DB]' : 'bg-white border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB]'}`}>{t}</button>
                ))}
            </div>

            <h4 className="text-[12px] font-outfit font-bold uppercase tracking-wider text-[#9CA3AF] mt-6 mb-2">Show / hide dashboard widgets</h4>
            <div className="space-y-0 relative">
                <ToggleRow label="Hero CGPA Banner" desc="Large CGPA display at top of dashboard" defaultOn={true}/>
                <ToggleRow label="Quick Action Buttons" desc="4 shortcut buttons below hero" defaultOn={true}/>
                <ToggleRow label="Stat Cards Row" desc="3 summary cards (Attendance, Next Exam, Alerts)" defaultOn={true}/>
                <ToggleRow label="At-Risk Warning Band" desc="Appears when subjects are at risk" locked={true} />
                <ToggleRow label="Exam Calendar" desc="Upcoming exams card" defaultOn={true}/>
            </div>

            <h4 className="text-[12px] font-outfit font-bold uppercase tracking-wider text-[#9CA3AF] mt-6 mb-2 mt-10">Display format</h4>
            <div className="flex gap-6 mb-6">
                <div>
                    <label className="block text-[12px] font-outfit font-medium text-[#9CA3AF] mb-1.5">Date format</label>
                    <select className="h-9 w-[180px] bg-white border border-[#E5E7EB] rounded-lg text-[12px] font-outfit px-2 outline-none"><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option></select>
                </div>
                <div>
                    <label className="block text-[12px] font-outfit font-medium text-[#9CA3AF] mb-1.5">Theme</label>
                    <div className="flex gap-2">
                        {['Light', 'Dark', 'System'].map(t => (
                            <div key={t} onClick={() => setTheme(t)} className={`w-[80px] h-[56px] rounded-lg border ${theme === t ? 'border-[#1A56DB] bg-blue-50/10' : 'border-[#E5E7EB] hover:bg-gray-50'} cursor-pointer flex flex-col items-center justify-center transition-all active:scale-95`}>
                                <div className={`w-10 h-6 rounded flex overflow-hidden border border-black/10 shadow-sm ${t === 'Dark' ? 'bg-gray-800' : 'bg-white'}`}>
                                    {t === 'System' && <div className="w-1/2 h-full bg-gray-800" />}
                                </div>
                                <span className={`text-[10px] font-outfit font-medium mt-1 ${theme === t ? 'text-[#1A56DB]' : 'text-[#6B7280]'}`}>{t}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-[#F3F4F6] my-6" />
            <h3 className="text-[13px] font-outfit font-bold text-[#374151]">Study preferences</h3>
            <p className="text-[12px] font-outfit text-[#6B7280] mt-0.5 mb-4">These preferences personalize recommendations across the portal</p>
            
            <label className="block text-[12px] font-outfit font-medium text-[#374151] mb-2 mt-4">When do you prefer to study?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[500px]">
                {[ {l: 'Morning (6–10 AM)', i: Sunrise, c: '#F59E0B'}, {l: 'Afternoon (12–4 PM)', i: Sun, c: '#F59E0B'}, {l: 'Evening (5–8 PM)', i: Sunset, c: '#7C3AED'}, {l: 'Night (9 PM–12 AM)', i: Moon, c: '#1A56DB'} ].map(t => (
                    <div key={t.l} onClick={() => setTime(t.l)} className={`h-14 rounded-xl border flex items-center px-4 gap-3 cursor-pointer transition-colors ${time === t.l ? 'border-[#1A56DB] bg-[#1A56DB]/5' : 'border-[#E5E7EB] hover:bg-[#F9FAFB]'}`}>
                        <t.i size={16} color={t.c} />
                        <span className="text-[13px] font-outfit font-medium text-[#111827]">{t.l}</span>
                    </div>
                ))}
            </div>

            <label className="block text-[12px] font-outfit font-medium text-[#374151] mb-1.5 mt-6">Subjects I want to focus on</label>
            <p className="text-[11px] text-[#9CA3AF] mb-2 -mt-1">Your study plan and recommendations are prioritized for these</p>
            <div className="w-full min-h-[48px] bg-white border border-[#E5E7EB] rounded-[10px] p-2 flex flex-wrap gap-2 items-center">
                <span className="px-2.5 py-1 text-[11px] font-mono border border-blue-200 bg-blue-50 text-[#1A56DB] flex items-center gap-1.5 rounded-full cursor-pointer hover:bg-blue-100">CS603 <X size={10}/></span>
                <span className="px-2.5 py-1 text-[11px] font-mono border border-amber-200 bg-amber-50 text-[#F59E0B] flex items-center gap-1.5 rounded-full cursor-pointer hover:bg-amber-100">MA601 <X size={10}/></span>
                <input type="text" placeholder="Add subject..." className="flex-1 bg-transparent outline-none text-[12px] font-outfit min-w-[120px] px-2" />
            </div>

            <div className="mt-8 flex items-center gap-6">
                 <div>
                    <label className="block text-[12px] font-outfit font-medium text-[#374151] mb-2">Reduce animations</label>
                    <div className={`w-[36px] h-[20px] rounded-full p-0.5 cursor-pointer flex bg-[#E5E7EB] justify-start`}>
                        <div className="w-[16px] h-[16px] bg-white rounded-full shadow-sm" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[12px] font-outfit font-medium text-[#374151] mb-2">High contrast</label>
                    <div className={`w-[36px] h-[20px] rounded-full p-0.5 cursor-pointer flex bg-[#E5E7EB] justify-start`}>
                        <div className="w-[16px] h-[16px] bg-white rounded-full shadow-sm" />
                    </div>
                 </div>
            </div>
        </div>
    );
};

const AcademicDetailsTab = () => (
    <div className="animate-fade-in">
        <h3 className="text-[13px] font-outfit font-bold text-[#374151]">Current semester enrollment</h3>
        <p className="text-[12px] font-outfit text-[#6B7280] mt-0.5 mb-4 flex justify-between">
            <span>Semester 6 · 2022–2026 Batch · CSE Department</span>
            <span className="text-[11px] italic text-[#9CA3AF]">Auto-fetched from Curriculum module</span>
        </p>

        <div className="w-full bg-white border border-[#E5E7EB] rounded-xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-[#F9FAFB] border-b border-[#F3F4F6]">
                        <tr>
                            <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF]">Subject code</th>
                            <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF]">Subject name</th>
                            <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF]">Type</th>
                            <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF]">Credits</th>
                            <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF]">Faculty</th>
                            <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF]">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ENROLLED_SUBJECTS.map((sub: any, i) => (
                            <tr key={i} className="border-b border-[#F3F4F6] last:border-0 hover:bg-[#F9FAFB] transition-colors cursor-pointer group">
                                <td className="py-3 px-4 text-[12px] font-mono text-[#374151] group-hover:text-[#1A56DB]">{sub.code}</td>
                                <td className="py-3 px-4 text-[13px] font-outfit font-medium text-[#111827]">{sub.name}</td>
                                <td className="py-3 px-4"><Badge color={sub.color} outlined>{sub.type}</Badge></td>
                                <td className="py-3 px-4 text-[12px] font-mono text-[#6B7280]">{sub.credits}</td>
                                <td className="py-3 px-4 text-[12px] font-outfit text-[#6B7280]">{sub.faculty}</td>
                                <td className="py-3 px-4"><Badge color={sub.status === 'Enrolled' ? 'green' : 'red'}>{sub.status}</Badge></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-[#F9FAFB] border-t-2 border-[#F3F4F6] px-4 py-2.5 text-[12px] font-mono text-[#374151]">
                Total enrolled: 8 subjects · 22 credits this semester · 130 credits cumulative
            </div>
        </div>

        <div className="w-full h-px bg-[#F3F4F6] my-6" />

        <h3 className="text-[13px] font-outfit font-bold text-[#374151] mb-4">Semester-wise academic history</h3>
        <div className="w-full bg-white border border-[#E5E7EB] rounded-xl overflow-hidden mb-6">
            <table className="w-full text-left">
                <thead className="bg-[#F9FAFB] border-b border-[#F3F4F6]">
                    <tr>
                        <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF]">Semester</th>
                        <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF]">Year</th>
                        <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] text-center">Subjects</th>
                        <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] text-center">Credits</th>
                        <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] text-center">SGPA</th>
                        <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] text-center">Rank</th>
                        <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF]">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {ACADEMIC_HISTORY.map((hist: any, i) => (
                        <tr key={hist.sem} className={`border-b border-[#F3F4F6] last:border-0 hover:bg-[#F9FAFB] transition-colors cursor-pointer ${hist.best ? 'bg-[#F59E0B]/5' : ''}`}>
                            <td className="py-3 px-4 text-[13px] font-outfit font-medium text-[#111827]">{hist.sem}</td>
                            <td className="py-3 px-4 text-[12px] font-mono text-[#6B7280]">{hist.year}</td>
                            <td className="py-3 px-4 text-[12px] font-mono text-[#374151] text-center">{hist.subjects}</td>
                            <td className="py-3 px-4 text-[12px] font-mono text-[#374151] text-center">{hist.credits}</td>
                            <td className="py-3 px-4 text-[13px] font-mono font-bold text-[#111827] text-center flex items-center justify-center gap-1 min-w-[60px]">{hist.sgpa} {hist.best && <Star size={12} className="text-[#F59E0B]" fill="#F59E0B"/>}</td>
                            <td className="py-3 px-4 text-[12px] font-mono text-[#374151] text-center">{hist.rank}</td>
                            <td className="py-3 px-4"><Badge color={hist.status === 'Completed' ? 'green' : 'blue'}>{hist.status}</Badge></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="w-full h-px bg-[#F3F4F6] my-6" />

        <div className="flex justify-between items-center mb-4">
            <h3 className="text-[13px] font-outfit font-bold text-[#374151]">Electives & additional courses</h3>
            <span className="text-[12px] font-outfit text-[#1A56DB] cursor-pointer hover:underline">Add elective</span>
        </div>
        <div className="w-full bg-[#F9FAFB] border border-dashed border-[#D1D5DB] rounded-xl flex flex-col items-center justify-center py-8 text-center px-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] mb-3"><BookOpen size={20}/></div>
            <p className="text-[13px] font-outfit text-[#374151]">No electives added. Track MOOCs, online certifications, and college electives here.</p>
            <button className="mt-4 px-4 h-8 bg-white border border-[#E5E7EB] rounded-lg text-[12px] font-outfit font-medium text-[#374151] hover:bg-[#F3F4F6] transition-colors">Add course</button>
        </div>

        <div className="w-full h-px bg-[#F3F4F6] my-6" />
        
        <h3 className="text-[13px] font-outfit font-bold text-[#374151] mb-4">Section & faculty information</h3>
        <div className="space-y-0 text-[13px] font-outfit">
            <div className="flex min-h-[44px] border-b border-[#F3F4F6] items-center"><span className="w-[140px] text-[#9CA3AF] text-[12px]">Section</span><span className="font-medium text-[#111827]">A</span></div>
            <div className="flex min-h-[44px] border-b border-[#F3F4F6] items-center"><span className="w-[140px] text-[#9CA3AF] text-[12px]">Class advisor</span><span className="font-medium text-[#111827]">Dr. Ramesh Kumar</span></div>
            <div className="flex min-h-[44px] border-b border-[#F3F4F6] items-center"><span className="w-[140px] text-[#9CA3AF] text-[12px]">HOD</span><span className="font-medium text-[#111827]">Dr. Vijay Sharma</span></div>
            <div className="flex min-h-[44px] border-b border-[#F3F4F6] items-center"><span className="w-[140px] text-[#9CA3AF] text-[12px]">Academic year</span><span className="font-medium text-[#111827]">2025–2026</span></div>
            <div className="flex min-h-[44px] items-center"><span className="w-[140px] text-[#9CA3AF] text-[12px]">Examination centre</span><span className="font-medium text-[#111827]">VIIT Main Campus</span></div>
        </div>
    </div>
);

const NotificationsTab = () => (
    <div className="animate-fade-in">
        <h3 className="text-[13px] font-outfit font-bold text-[#374151] mb-4">How you receive notifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex flex-col relative h-[140px]">
                <div className="absolute top-4 right-4"><ToggleRow defaultOn={true}/></div>
                <div className="w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0EA5E9] flex items-center justify-center mb-3"><Bell size={14}/></div>
                <h4 className="text-[13px] font-outfit font-bold text-[#374151] leading-tight">Browser notifications</h4>
                <p className="text-[11px] font-outfit text-[#6B7280] mt-1 flex-1">Push notifications in your browser even when the tab is in background.</p>
                <div className="mt-2"><Badge color="green">Active</Badge></div>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex flex-col relative h-[140px]">
                <div className="absolute top-4 right-4"><ToggleRow defaultOn={true}/></div>
                <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#10B981] flex items-center justify-center mb-3"><Mail size={14}/></div>
                <h4 className="text-[13px] font-outfit font-bold text-[#374151] leading-tight">Email notifications</h4>
                <p className="text-[11px] font-outfit text-[#6B7280] mt-1 flex-1 truncate">Digest emails sent to aditya.kumar...</p>
                <div className="mt-2"><Badge color="green">Active</Badge></div>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex flex-col relative h-[140px]">
                <div className="absolute top-4 right-4"><ToggleRow locked={true}/></div>
                <div className="w-8 h-8 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center mb-3"><Bell size={14}/></div>
                <h4 className="text-[13px] font-outfit font-bold text-[#374151] leading-tight">In-app alerts</h4>
                <p className="text-[11px] font-outfit text-[#6B7280] mt-1 flex-1">Red bell badge in top bar when new alerts arrive.</p>
                <div className="mt-2"><Badge color="violet">Active</Badge></div>
            </div>
        </div>

        <h4 className="text-[12px] font-outfit font-bold uppercase tracking-wider text-[#9CA3AF] mb-3">What you get notified about</h4>
        <div className="w-full bg-white border border-[#E5E7EB] rounded-xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-[#F9FAFB] border-b border-[#F3F4F6]">
                        <tr>
                            <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF]">Notification type</th>
                            <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] w-[80px] text-center">Browser</th>
                            <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] w-[80px] text-center">Email</th>
                            <th className="py-2.5 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] w-[80px] text-center">In-app</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-[#F9FAFB]"><td colSpan={4} className="py-1 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF]">Academic alerts</td></tr>
                        {[
                            {l: 'New marks uploaded', b: true, e: false, i: true},
                            {l: 'Mid-semester results available', b: true, e: true, i: true},
                            {l: 'At-risk subject warning', b: true, e: true, i: true, ilock: true},
                            {l: 'Weekly test results', b: true, e: false, i: true}
                        ].map((r, i) => (
                            <tr key={i} className="border-b border-[#F3F4F6]">
                                <td className="py-3 px-4 text-[13px] font-outfit font-medium text-[#374151]">{r.l}</td>
                                <td className="py-3 px-4 text-center"><div className="flex justify-center"><ToggleRow defaultOn={r.b} /></div></td>
                                <td className="py-3 px-4 text-center"><div className="flex justify-center"><ToggleRow defaultOn={r.e} /></div></td>
                                <td className="py-3 px-4 text-center"><div className="flex justify-center"><ToggleRow defaultOn={r.i} locked={r.ilock} /></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <h3 className="text-[13px] font-outfit font-bold text-[#374151]">Quiet hours</h3>
        <p className="text-[11px] font-outfit text-[#9CA3AF] mt-0.5 mb-4">No notifications during these hours</p>
        <div className="flex gap-4">
            <div className="flex flex-col"><label className="text-[12px] text-[#374151] font-medium mb-1">From</label><input type="time" defaultValue="23:00" className="h-[36px] bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-mono px-3"/></div>
            <div className="flex flex-col"><label className="text-[12px] text-[#374151] font-medium mb-1">Until</label><input type="time" defaultValue="07:00" className="h-[36px] bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-mono px-3"/></div>
        </div>
    </div>
);

const PrivacySecurityTab = () => (
    <div className="animate-fade-in">
        <h3 className="text-[13px] font-outfit font-bold text-[#374151] mb-4">Password & authentication</h3>
        <div className="max-w-[400px] mb-6 space-y-3">
            <div className="relative"><input type="password" placeholder="Current password" className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] px-3 text-[13px] outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/10"/><Eye size={16} className="absolute right-3 top-3.5 text-[#9CA3AF] cursor-pointer"/></div>
            <div className="relative"><input type="password" placeholder="New password" className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] px-3 text-[13px] outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/10"/><Eye size={16} className="absolute right-3 top-3.5 text-[#9CA3AF] cursor-pointer"/></div>
            <div className="flex gap-1 py-1">
                <div className="h-1.5 flex-1 bg-[#10B981] rounded-full"/><div className="h-1.5 flex-1 bg-[#10B981] rounded-full"/><div className="h-1.5 flex-1 bg-[#10B981] rounded-full"/><div className="h-1.5 flex-1 bg-[#E5E7EB] rounded-full"/>
            </div>
            <p className="text-[11px] font-outfit font-medium text-[#10B981]">Good - Add a symbol to make it stronger</p>
            <div className="grid grid-cols-2 gap-y-1 mt-2 mb-4 text-[12px] text-[#374151] font-outfit">
                <div className="flex gap-2 items-center"><Check size={12} className="text-[#10B981]"/> At least 8 characters</div>
                <div className="flex gap-2 items-center"><Check size={12} className="text-[#10B981]"/> One uppercase letter</div>
                <div className="flex gap-2 items-center"><Check size={12} className="text-[#10B981]"/> One number</div>
                <div className="flex gap-2 items-center"><X size={12} className="text-[#D1D5DB]"/> One special character</div>
            </div>
            <div className="relative"><input type="password" placeholder="Confirm new password" className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] px-3 text-[13px] outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/10"/><Eye size={16} className="absolute right-3 top-3.5 text-[#9CA3AF] cursor-pointer"/></div>
            <button className="w-full h-10 bg-[#E5E7EB] text-[#9CA3AF] font-medium font-outfit text-[13px] rounded-[10px] mt-2 cursor-not-allowed">Update password</button>
        </div>

        <div className="w-full h-px bg-[#F3F4F6] my-6" />

        <h3 className="text-[13px] font-outfit font-bold text-[#374151]">Two-factor authentication</h3>
        <p className="text-[12px] font-outfit text-[#6B7280] mt-0.5 mb-4">Extra layer of security for your account</p>
        <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-[12px] font-outfit font-medium text-[#92400E]">2FA is not enabled. Your account is protected by password only.</p>
            <button className="px-4 h-8 bg-transparent border border-[#F59E0B] text-[#D97706] text-[12px] font-outfit font-medium rounded-lg hover:bg-[#F59E0B]/5 transition-colors">Enable 2FA</button>
        </div>

        <div className="w-full h-px bg-[#F3F4F6] my-6" />

        <h3 className="text-[13px] font-outfit font-bold text-[#374151]">Data visibility</h3>
        <p className="text-[12px] font-outfit text-[#6B7280] mt-0.5 mb-4">Control who can see your academic data</p>
        <div className="space-y-0 relative">
            <ToggleRow label="Show marks to faculty" desc="Faculty can see your detailed marks when discussing performance." defaultOn={true}/>
            <ToggleRow label="Show CGPA to peers" desc="Your CGPA visible to classmates in group analytics." defaultOn={false}/>
            <ToggleRow label="Anonymous feedback submission" desc="Your exam feedback is submitted without your name." defaultOn={true}/>
            <ToggleRow label="Participation in class analytics" desc="Your data contributes to anonymous class averages." defaultOn={true}/>
            <ToggleRow label="Allow advisor to view activity" desc="Your academic advisor can see your portal usage and progress." defaultOn={true}/>
        </div>

        <div className="w-full h-px bg-[#F3F4F6] my-6" />

        <h3 className="text-[13px] font-outfit font-bold text-[#374151]">Active sessions</h3>
        <p className="text-[12px] font-outfit text-[#6B7280] mt-0.5 mb-4">Devices currently logged into your account</p>
        
        <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-4 p-3 border border-[#10B981] bg-[#10B981]/5 rounded-[10px]">
                <div className="w-8 h-8 rounded bg-[#F9FAFB] flex items-center justify-center text-[#6B7280]"><Monitor size={16}/></div>
                <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-outfit font-medium text-[#111827]">Chrome on Windows</p>
                    <p className="text-[11px] font-mono text-[#9CA3AF] mt-0.5">Vijayawada, India · 182.68.xx.xx</p>
                </div>
                <div className="text-right">
                    <Badge color="green">Current session</Badge>
                </div>
            </div>
            <div className="flex items-center gap-4 p-3 border border-[#E5E7EB] bg-white rounded-[10px]">
                <div className="w-8 h-8 rounded bg-[#F9FAFB] flex items-center justify-center text-[#6B7280]"><Smartphone size={16}/></div>
                <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-outfit font-medium text-[#111827]">Chrome on Android</p>
                    <p className="text-[11px] font-mono text-[#9CA3AF] mt-0.5">Vijayawada, India · Last active: 2 hours ago</p>
                </div>
                <div className="text-right">
                    <span className="text-[11px] text-[#EF4444] hover:underline cursor-pointer font-medium">Revoke</span>
                </div>
            </div>
        </div>
        <button className="w-full h-9 border border-[#EF4444] text-[#EF4444] rounded-[10px] text-[13px] font-outfit font-medium hover:bg-[#EF4444]/5 transition-colors">Revoke all other sessions</button>

        <div className="w-full h-px bg-[#F3F4F6] my-6" />
        <h3 className="text-[13px] font-outfit font-bold text-[#374151] mb-4">Account management</h3>
        <div className="space-y-3">
            <button className="w-full h-10 border border-[#E5E7EB] rounded-[10px] bg-white text-[13px] font-outfit font-medium text-[#374151] flex items-center justify-center gap-2 hover:bg-[#F9FAFB] transition-colors"><Download size={14}/> Export all my data (JSON)</button>
            <button className="w-full h-10 border border-[#EF4444] rounded-[10px] bg-white text-[13px] font-outfit font-medium text-[#EF4444] flex items-center justify-center gap-2 hover:bg-[#EF4444]/5 transition-colors"><RotateCcw size={14}/> Clear all preferences</button>
            <button className="w-full h-10 border border-[#E5E7EB] rounded-[10px] bg-white text-[13px] font-outfit font-medium text-[#374151] flex items-center justify-center gap-2 hover:bg-[#F9FAFB] transition-colors"><Flag size={14}/> Report a portal issue</button>
        </div>
    </div>
);

const IntegrationsTab = () => (
    <div className="animate-fade-in">
        <h3 className="text-[13px] font-outfit font-bold text-[#374151] mb-4">Google Calendar</h3>
        <div className="bg-white border border-[#E5E7EB] rounded-[14px] p-5 flex flex-col md:flex-row items-center gap-5 mb-6">
            <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-lg border border-gray-100 shrink-0 select-none">
                <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-2.5 h-2.5 bg-[#4285F4] rounded-sm"></div><div className="w-2.5 h-2.5 bg-[#EA4335] rounded-sm"></div>
                    <div className="w-2.5 h-2.5 bg-[#FBBC05] rounded-sm"></div><div className="w-2.5 h-2.5 bg-[#34A853] rounded-sm"></div>
                </div>
            </div>
            <div className="flex-1 text-center md:text-left">
                <h4 className="text-[14px] font-outfit font-bold text-[#111827]">Google Calendar</h4>
                <p className="text-[12px] font-outfit text-[#6B7280] mt-1">Sync your exam schedule, assignment deadlines, and result dates directly to Google Calendar.</p>
            </div>
            <button className="h-9 px-4 border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] rounded-lg text-[12px] font-outfit font-medium text-[#374151] flex items-center justify-center gap-2 whitespace-nowrap"><Calendar size={14}/> Connect Google Calendar</button>
        </div>

        <div className="w-full h-px bg-[#F3F4F6] my-6" />

        <h3 className="text-[13px] font-outfit font-bold text-[#374151] mb-4">Study schedule export</h3>
        <div className="flex flex-wrap gap-3 mb-6">
            <button className="h-9 px-4 border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] rounded-lg text-[12px] font-outfit font-medium text-[#374151] flex justify-center gap-2"><Calendar size={14}/> Export as .ICS</button>
            <button className="h-9 px-4 border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] rounded-lg text-[12px] font-outfit font-medium text-[#374151] flex justify-center gap-2"><FileText size={14}/> Export as PDF</button>
            <button className="h-9 px-4 border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] rounded-lg text-[12px] font-outfit font-medium text-[#374151] flex justify-center gap-2"><Download size={14}/> Export as image</button>
        </div>

        <div className="w-full h-px bg-[#F3F4F6] my-6" />

        <h3 className="text-[13px] font-outfit font-bold text-[#374151] mb-4">Academic data export</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {[
                { n: 'Marks history', d: 'All semesters', f: 'PDF/CSV', i: TrendingUp, c: '#1A56DB', bg: '#EFF6FF' },
                { n: 'Attendance records', d: 'All semesters', f: 'PDF/CSV', i: Clock, c: '#10B981', bg: '#ECFDF5' },
                { n: 'CGPA history', d: 'All semesters', f: 'PDF', i: BarChart2, c: '#F59E0B', bg: '#FFFBEB' },
                { n: 'Feedback history', d: 'All submitted feedback', f: 'JSON', i: MessageSquare, c: '#7C3AED', bg: '#F5F3FF' },
                { n: 'Achievements list', d: 'All time', f: 'PDF', i: Trophy, c: '#0EA5E9', bg: '#F0F9FF' },
                { n: 'Complete academic profile', d: 'ZIP containing all data', f: 'ZIP', i: Download, c: '#6B7280', bg: '#F3F4F6' }
            ].map(o => (
                <div key={o.n} className="bg-white border border-[#E5E7EB] rounded-[10px] p-3.5 hover:-translate-y-[2px] hover:shadow-sm transition-all flex flex-col">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mb-3" style={{backgroundColor: o.bg, color: o.c}}><o.i size={16}/></div>
                    <h4 className="text-[13px] font-outfit font-bold text-[#111827]">{o.n}</h4>
                    <p className="text-[11px] font-outfit text-[#6B7280] min-h-[16px] mb-2">{o.d}</p>
                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-[10px] font-mono font-bold bg-[#F3F4F6] px-1.5 py-0.5 rounded text-[#6B7280]">{o.f}</span>
                        <button className="h-6 px-3 border border-[#E5E7EB] rounded text-[11px] font-outfit font-medium hover:bg-[#F9FAFB] cursor-pointer">Export</button>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="flex justify-between items-center mb-4"><h3 className="text-[13px] font-outfit font-bold text-[#374151]">Connected applications</h3><span className="text-[12px] italic text-[#9CA3AF]">Coming soon</span></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 opacity-60">
            {['NPTEL Course Tracker', 'Coursera Completion Sync', 'GitHub Activity Import', 'LinkedIn Learning'].map(t => (
                <div key={t} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] p-4 flex flex-col items-center justify-center gap-2 cursor-pointer grayscale group">
                    <span className="px-2 py-0.5 bg-[#E5E7EB] text-[#6B7280] rounded text-[10px] font-bold uppercase tracking-wide">Coming soon</span>
                    <p className="text-[13px] font-outfit font-medium text-[#374151] mt-1">{t}</p>
                    <span className="text-[11px] text-[#1A56DB] group-hover:underline">Notify me when available</span>
                </div>
            ))}
        </div>
    </div>
);

const ActivityHistoryTab = () => (
    <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-[13px] font-outfit font-bold text-[#374151]">Login history <span className="font-normal text-[#6B7280] ml-1">Last 30 days</span></h3>
            <select className="text-[11px] font-outfit bg-transparent text-[#6B7280] focus:outline-none"><option>Last 30 days</option><option>Last 7 days</option><option>All time</option></select>
        </div>
        <div className="space-y-4 mb-8">
            {LOGIN_HISTORY.map((log: any, i) => (
                <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0">
                        <div className={`w-3 h-3 rounded-full mt-1.5 z-10 ${log.status === 'Success' ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`}/>
                        {i !== LOGIN_HISTORY.length - 1 && <div className="w-[1.5px] h-full bg-[#E5E7EB] -mt-1"/>}
                    </div>
                    <div className="flex-1 bg-white border border-[#E5E7EB] rounded-[10px] p-2.5 px-4 flex justify-between items-center mb-1">
                        <div className="flex items-center gap-3">
                            <span className="text-[#9CA3AF] shrink-0">{log.type === 'desktop' ? <Monitor size={14}/> : <Smartphone size={14}/>}</span>
                            <div>
                                <p className="text-[12px] font-outfit font-medium text-[#374151]">{log.device} · {log.location}</p>
                                <div className="sm:hidden text-[11px] font-mono text-[#9CA3AF] mt-0.5">{log.date}</div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
                            <span className="text-[11px] font-mono text-[#9CA3AF] hidden sm:block">{log.date}</span>
                            <Badge color={log.status === 'Success' ? 'green' : 'red'}>{log.status}</Badge>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="w-full h-px bg-[#F3F4F6] my-6" />

        <h3 className="text-[13px] font-outfit font-bold text-[#374151] mb-2">Recent portal activity <span className="font-normal text-[#6B7280] ml-1">What you've done in the last 14 days</span></h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 mt-4">
            {[{n: 'Total sessions (14 days)', v: '12'}, {n: 'Most visited page', v: 'Marks Overview', vColor: 'text-[#1A56DB]', font: 'font-outfit text-[12px] font-medium'}, {n: 'Documents downloaded', v: '4'}, {n: 'Feedback submitted', v: '3'}].map((m: any, i) => (
                <div key={i} className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-lg p-3 px-4">
                    <p className="text-[11px] font-outfit text-[#6B7280] mb-0.5">{m.n}</p>
                    <p className={`${m.font || 'font-mono text-[16px] font-bold'} ${m.vColor || 'text-[#111827]'}`}>{m.v}</p>
                </div>
            ))}
        </div>

        <div className="space-y-4 mb-4">
            {ACTIVITY_FEED.map((act: any, i) => (
                <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0">
                        <div className={`w-2.5 h-2.5 rounded-full mt-2 z-10 bg-${act.color}-500 shadow-[0_0_0_2px_#fff]`}/>
                        {i !== ACTIVITY_FEED.length - 1 && <div className="w-[1.5px] h-full bg-[#E5E7EB] mt-0.5"/>}
                    </div>
                    <div className="flex-1 hover:bg-[#F9FAFB] rounded-lg p-2 -ml-2 transition-colors cursor-pointer flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <p className="text-[12px] font-outfit text-[#374151] mb-0.5 sm:mb-0 max-w-[90%]">{act.desc}</p>
                        <p className="text-[11px] font-mono text-[#9CA3AF] shrink-0">{act.date}</p>
                    </div>
                </div>
            ))}
        </div>
        <button className="h-9 px-4 border border-[#E5E7EB] bg-white rounded-lg text-[12px] font-outfit font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors mt-2">Load more activity</button>

        <div className="w-full h-px bg-[#F3F4F6] mt-8 mb-6" />

        <div className="flex justify-between items-center mb-4"><h3 className="text-[13px] font-outfit font-bold text-[#374151]">Your data</h3><span className="text-[12px] font-outfit font-medium text-[#EF4444] cursor-pointer hover:underline">Clear activity history</span></div>
        <p className="text-[12px] font-outfit text-[#6B7280] mb-2">Your portal data</p>
        <div className="w-full h-2 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] overflow-hidden mb-2"><div className="h-full bg-[#1A56DB] w-[15%]" /></div>
        <p className="text-[11px] font-mono text-[#9CA3AF]">Activity logs: 24 KB · Preferences: 4 KB · Downloads cache: 0 KB · Total: 28 KB</p>
    </div>
);

// Main Page Component
const ProfileSettings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [unsavedData, setUnsavedData] = useState(false);

    return (
        <StudentLayout activePage="profile" onNavigate={(id: string) => window.location.href = `/student/${id}`}>
            <motion.div 
                className="w-full max-w-[1400px] mx-auto px-5 md:px-[28px] pt-[24px] pb-[64px]"
                initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
                {/* Header */}
                <motion.div initial={{opacity:0, y:16}} animate={{opacity:1, y:0}} className="pb-5 border-b border-[#F3F4F6] flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-[24px] font-fraunces italic font-light text-[#111827]">Profile & Settings</h1>
                        <p className="text-[13px] font-outfit text-[#6B7280] mt-1">Manage your identity, preferences, and system settings</p>
                        <p className="text-[11px] font-outfit text-[#9CA3AF] mt-1">Changes are saved automatically · Last saved: 2 hours ago</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <AnimatePresence>
                            {unsavedData && (
                                <motion.div initial={{opacity:0, y:-4}} animate={{opacity:1, y:0}} exit={{opacity:0, scale:0.95}} className="flex items-center gap-1.5 md:mr-2">
                                    <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                                    <span className="text-[11px] font-outfit font-medium text-[#F59E0B] whitespace-nowrap hidden sm:block">Unsaved changes</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <button onClick={() => setUnsavedData(false)} disabled={!unsavedData} className={`h-10 px-4 flex items-center justify-center gap-2 rounded-[10px] text-[13px] font-outfit font-medium transition-colors ${unsavedData ? 'bg-[#1A56DB] hover:bg-[#1648C0] text-white active:scale-97' : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'}`}>
                            {unsavedData ? <Save size={16}/> : <Check size={16}/>} Save changes
                        </button>
                    </div>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-6 mt-6 pb-20 relative">
                    {/* Left Sticky Panel */}
                    <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4 lg:sticky lg:top-[80px] self-start z-10">
                        <ProfileCard setTab={setActiveTab} />
                        <QuickStatsCard />
                        <CompletionCard />
                        <InsightsCard />
                    </div>

                    {/* Right Scrollable Content */}
                    <motion.div initial={{opacity:0, y:16}} animate={{opacity:1, y:0}} className="flex-1 min-w-0 bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm overflow-hidden h-fit">
                        <div className="h-12 bg-[#F9FAFB] border-b border-[#F3F4F6] px-2 md:px-6 flex overflow-x-auto custom-scrollbar gap-1 md:gap-4 relative">
                            {['Profile', 'Academic Details', 'Preferences', 'Notifications', 'Privacy & Security', 'Integrations', 'Activity & History'].map((tabText) => {
                                const tVal = tabText.toLowerCase().replace(' & ', '-').replace(' ', '-');
                                const isActive = activeTab === tVal;
                                return (
                                    <button 
                                        key={tVal} onClick={() => setActiveTab(tVal)}
                                        className={`h-full flex items-center justify-center px-2 text-[12px] md:text-[13px] font-outfit font-medium relative whitespace-nowrap transition-colors ${isActive ? 'text-[#1A56DB]' : 'text-[#6B7280] hover:text-[#374151]'}`}
                                    >
                                        {tabText} 
                                        {isActive && <motion.div layoutId="tabIndProf" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1A56DB] rounded-t-sm" />}
                                    </button>
                                );
                            })}
                        </div>
                        
                        <div className="p-4 md:p-6 md:px-[28px]">
                            {activeTab === 'profile' && <ProfileTab unsavedDataCallback={setUnsavedData}/>}
                            {activeTab === 'academic-details' && <AcademicDetailsTab />}
                            {activeTab === 'preferences' && <PreferencesTab />}
                            {activeTab === 'notifications' && <NotificationsTab />}
                            {activeTab === 'privacy-security' && <PrivacySecurityTab />}
                            {activeTab === 'integrations' && <IntegrationsTab />}
                            {activeTab === 'activity-history' && <ActivityHistoryTab />}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </StudentLayout>
    );
};

export default ProfileSettings;
