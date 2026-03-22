import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarDays, CalendarCheck, List, Download, 
  ChevronLeft, ChevronRight, Clock, MapPin, 
  Hourglass, User, CalendarPlus, Bell, CheckCircle, 
  AlertTriangle, AlertOctagon, Info, Star, Target, 
  Users, CheckSquare, Timer, Search, Filter,
  Building2, CalendarX, AlertCircle, RefreshCw
} from 'lucide-react';
import StudentLayout from '../../components/layout/StudentLayout';

// ═══════════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════════

const EXAM_DATA = {
    rollNumber: "21L31A0503",
    nextExam: {
        id: "ex1",
        code: "CS603",
        name: "Database Management Systems",
        type: "Internal Assessment 2",
        datetime: "2026-03-24T10:00:00",
        venue: "Hall B, Room 201",
        seat: "Bench 12, Row C",
        marks: 20
    },
    exams: [
        { id: "ex1", sub: "CS603", type: "Internal Assessment", date: "24 Mar 2026", time: "10:00 AM", duration: "60 min", venue: "Hall B, Room 201", seat: "Bench 12, Row C", marks: 20, topics: ["Indexing", "Transactions", "Normalization"] },
        { id: "ex2", sub: "MA601", type: "Assignment", date: "28 Mar 2026", time: "11:59 PM", duration: "—", venue: "Online Portal", seat: "—", marks: 10, topics: ["Partial Differential Equations"] },
        { id: "ex3", sub: "CS602", type: "Lab Assessment", date: "02 Apr 2026", time: "02:00 PM", duration: "90 min", venue: "Lab 3, Block C", seat: "Bench 6", marks: 25, topics: ["Process Scheduling", "Deadlocks"] },
        { id: "ex4", sub: "EC601", type: "Mid-semester", date: "10 Apr 2026", time: "09:00 AM", duration: "90 min", venue: "Hall A, Room 104", seat: "Row B, Bench 4", marks: 30, topics: ["Logic Gates", "K-Maps"] },
        { id: "ex5", sub: "CS603", type: "Supplementary", date: "22 Apr 2026", time: "09:00 AM", duration: "180 min", venue: "TBA", seat: "—", marks: 60 },
        { id: "ex6", sub: "All", type: "Final Exam", date: "05 May 2026", time: "TBA", duration: "180 min", venue: "TBA", seat: "—", marks: 60 }
    ],
    seatingRanges: [
        { range: "21L31A0501–21L31A0520", dept: "CSE Section A", block: "Block A", room: "Room 101", floor: "Ground", capacity: 20 },
        { range: "21L31A0521–21L31A0540", dept: "CSE Section A", block: "Block A", room: "Room 102", floor: "Ground", capacity: 20 }
    ]
};

// ═══════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════

const Badge = ({ type, filled }: { type: string, filled?: boolean }) => {
    const systems: Record<string, { color: string, label: string }> = {
        'Weekly Test': { color: 'blue', label: 'Weekly Test' },
        'Mid-semester': { color: 'violet', label: 'Mid-semester' },
        'Lab Assessment': { color: 'teal', label: 'Lab Assessment' },
        'Assignment': { color: 'amber', label: 'Assignment' },
        'Internal Assessment': { color: 'blue', label: 'Internal Assessment' },
        'Internal Assessment 2': { color: 'blue', label: 'Internal Assessment 2' },
        'Final Exam': { color: 'red', label: 'Final Exam' },
        'Supplementary': { color: 'indigo', label: 'Supplementary' },
        'Result': { color: 'green', label: 'Result' }
    };
    const details = systems[type] || { color: 'gray', label: type };
    const styles: Record<string, string> = {
        blue: filled ? 'bg-[#1A56DB] text-white' : 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
        violet: filled ? 'bg-[#7C3AED] text-white' : 'bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE]',
        teal: filled ? 'bg-[#0EA5E9] text-white' : 'bg-[#F0FDFA] text-[#0D9488] border-[#99F6E4]',
        amber: filled ? 'bg-[#F59E0B] text-white' : 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]',
        red: filled ? 'bg-[#EF4444] text-white border-[#EF4444]' : 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]',
        green: filled ? 'bg-[#10B981] text-white' : 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
        indigo: filled ? 'bg-[#6366F1] text-white' : 'bg-[#EEF2FF] text-[#3730A3] border-[#C7D2FE]',
        gray: 'bg-[#F9FAFB] text-[#6B7280] border-[#E5E7EB]'
    };
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[details.color] || styles.gray} font-outfit uppercase tracking-wider`}>
            {details.label}
        </span>
    );
};

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

const ExamHub = () => {
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0 });

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const target = new Date(EXAM_DATA.nextExam.datetime);
            const diff = target.getTime() - now.getTime();
            if (diff > 0) {
                setCountdown({
                    d: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    h: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    m: Math.floor((diff / (1000 * 60)) % 60)
                });
            }
        };
        updateCountdown();
        const timer = setInterval(updateCountdown, 60000); // Update every minute for performance
        return () => clearInterval(timer);
    }, []);

    const dayExams = useMemo(() => 
        selectedDate ? EXAM_DATA.exams.filter(e => e.date === selectedDate) : [],
    [selectedDate]);

    return (
        <StudentLayout activePage="exams" onNavigate={() => {}}>
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="max-w-[1400px] mx-auto px-4 sm:px-7 pb-20 space-y-6"
            >
                {/* PAGE HEADER */}
                <header className="flex justify-between items-end pb-5 border-b border-[#F3F4F6]">
                    <div>
                        <h1 className="text-[24px] font-fraunces font-light italic text-[#111827]">Exam Hub</h1>
                        <p className="mt-1 text-[13px] font-outfit text-[#6B7280]">Your complete exam management center · Semester 6</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex bg-white border border-[#E5E7EB] p-1 rounded-lg">
                            <button 
                                onClick={() => setViewMode('calendar')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'calendar' ? 'bg-[#1A56DB] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#374151]'}`}
                            >
                                <CalendarDays size={18} />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-[#1A56DB] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#374151]'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                        <button className="h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium font-outfit text-[#374151] flex items-center gap-2 hover:bg-[#F9FAFB] active:scale-95 transition-all">
                            <Download size={16} /> Export Timetable
                        </button>
                    </div>
                </header>

                <ExamHero countdown={countdown} nextExam={EXAM_DATA.nextExam} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <StatCard label="UPCOMING EXAMS" value="6" sub="Next 30 days · Sem 6" color="#1A56DB" icon={CalendarCheck} trend="Next in 3 days" />
                    <StatCard label="NEAREST GAP" value="3" unit="days" sub="CS603 to MA601" color="#F59E0B" icon={Timer} trend="Tight schedule" />
                    <StatCard label="ROOM ASSIGNMENTS" value="4" sub="Confirmed seats" color="#0EA5E9" icon={MapPin} trend="All confirmed" />
                    <StatCard label="PREPARATION STATUS" value="2/6" sub="Subjects prepared" color="#7C3AED" icon={CheckSquare} trend="Update status" />
                </div>

                <ClashAlert />

                {viewMode === 'calendar' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
                        <div className="lg:col-span-6">
                            <InteractiveCalendar onDateSelect={setSelectedDate} exams={EXAM_DATA.exams} selected={selectedDate} />
                        </div>
                        <div className="lg:col-span-4 lg:sticky lg:top-6">
                            <ExamDetailPanel selectedDate={selectedDate} dayExams={dayExams} nextExam={EXAM_DATA.exams[0]} />
                        </div>
                    </div>
                ) : (
                    <div className="py-4">
                         <ExamListTable exams={EXAM_DATA.exams} />
                    </div>
                )}

                <SeatingSection ranges={EXAM_DATA.seatingRanges} />

                <PreparationTracker exams={EXAM_DATA.exams} />

                <SmartInsights />
            </motion.div>
        </StudentLayout>
    );
};

// ═══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

const ExamHero = ({ countdown, nextExam }: any) => (
    <div className="relative h-[180px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#0C2461] to-[#1A56DB] p-8 flex items-center shadow-lg border border-white/5">
        <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full bg-white/[0.04] pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[50px] w-[200px] h-[200px] rounded-full bg-white/[0.03] pointer-events-none" />
        
        <div className="flex-1 z-10">
            <p className="text-[10px] font-bold text-white/50 tracking-widest uppercase font-outfit mb-2">NEXT EXAM</p>
            <h2 className="text-[22px] font-bold text-white font-outfit">{nextExam?.code} — {nextExam?.name}</h2>
            <p className="text-[13px] text-white/70 font-outfit mt-1.5">{nextExam?.type} · Monday, 24 Mar · 10:00 AM · {nextExam?.venue}</p>
            <div className="mt-4">
                <span className="px-4 py-1.5 bg-red-500/20 border border-red-500/30 rounded-full text-white text-[11px] font-bold font-outfit uppercase tracking-wider">
                    ⚠ Exam in {countdown.d} days — Final preparation
                </span>
            </div>
        </div>

        <div className="flex items-center gap-8 px-10 border-l border-white/10 z-10 hidden sm:flex">
            <CountdownUnit val={countdown.d} label="days" />
            <CountdownUnit val={countdown.h} label="hours" />
            <CountdownUnit val={countdown.m} label="minutes" />
        </div>

        <div className="flex flex-col gap-2 ml-10 z-10 hidden lg:flex">
            <SummaryChip label="6 exams" active />
            <SummaryChip label="Hall B · R201" />
            <SummaryChip label="No clashes" color="green" />
        </div>
    </div>
);

const CountdownUnit = ({ val, label }: any) => (
    <div className="flex flex-col items-center">
        <span className="text-[42px] font-mono font-light text-white leading-none">{val}</span>
        <span className="text-[10px] text-white/40 font-outfit uppercase font-bold mt-1 tracking-widest">{label}</span>
    </div>
);

const SummaryChip = ({ label, active, color }: any) => (
    <div className={`px-4 py-1.5 rounded-full text-[11px] font-bold font-outfit whitespace-nowrap border transition-all
        ${color === 'green' ? 'bg-emerald-500/20 text-emerald-100 border-emerald-500/30' : 
          active ? 'bg-white/20 text-white border-white/30 shadow-sm' : 'bg-white/5 text-white/50 border-white/5'}
    `}>
        {label}
    </div>
);

const StatCard = ({ label, value, unit, sub, color, icon: Icon, trend }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all" style={{ borderLeft: `3px solid ${color}` }}>
        <div className="w-10 h-10 mb-4 rounded-xl flex items-center justify-center bg-[#F3F4F6] text-[#6B7280]">
            <Icon size={20} style={{ color }} />
        </div>
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider font-outfit">{label}</p>
        <div className="flex items-baseline gap-1 mt-1">
            <span className="text-[32px] font-mono font-bold text-[#111827]">{value}</span>
            {unit && <span className="text-[14px] font-outfit text-[#6B7280]">{unit}</span>}
        </div>
        <p className="text-[12px] text-[#6B7280] font-outfit mt-1">{sub}</p>
        <div className="mt-4">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border font-outfit uppercase tracking-wider
                ${trend === 'Tight schedule' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-green-50 text-green-700 border-green-200'}
            `}>
                {trend}
            </span>
        </div>
    </div>
);

const ClashAlert = () => (
    <div className="bg-white border border-rose-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-sm">
        <div className="flex items-center gap-3">
            <AlertOctagon size={20} className="text-rose-500 flex-shrink-0" />
            <p className="text-[13px] font-medium text-rose-900 font-outfit">
                Gap warning: Only 1 day between MA601 (28 Mar) and CS602 (29 Mar).
            </p>
        </div>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-rose-50 text-rose-700 text-[10px] font-bold rounded-lg border border-rose-100">MA601 · 28 Mar</span>
            <span className="px-3 py-1 bg-rose-50 text-rose-700 text-[10px] font-bold rounded-lg border border-rose-100">CS602 · 29 Mar</span>
        </div>
    </div>
);

const InteractiveCalendar = ({ onDateSelect, exams, selected }: any) => {
    const dates = useMemo(() => Array.from({ length: 35 }, (_, i) => i + 1), []);
    return (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm min-h-[500px]">
            <div className="flex justify-between items-center px-2 mb-6">
                <div className="flex items-center gap-2">
                    <CalendarDays size={18} className="text-[#1A56DB]" />
                    <h3 className="text-[16px] font-bold text-[#111827] font-outfit">March 2026</h3>
                </div>
                <div className="flex gap-2">
                    <button className="p-1.5 hover:bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]"><ChevronLeft size={18} /></button>
                    <button className="p-1.5 hover:bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]"><ChevronRight size={18} /></button>
                </div>
            </div>
            <div className="grid grid-cols-7 border-t border-[#F3F4F6]">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                    <div key={d} className="py-3 text-center text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">{d}</div>
                ))}
                {dates.map((d) => {
                    const day = ((d - 1) % 31) + 1;
                    const dateStr = `${day} Mar 2026`;
                    const dayExams = exams.filter((e: any) => e.date === dateStr);
                    const isToday = day === 21;
                    const isSelected = selected === dateStr;
                    
                    return (
                        <div 
                            key={d} onClick={() => onDateSelect(dateStr)}
                            className={`min-h-[85px] border-r border-b border-[#F3F4F6] p-4 flex flex-col justify-between hover:bg-[#F9FAFB] cursor-pointer group transition-all relative
                                ${isSelected ? 'bg-blue-50/40' : ''}`}
                        >
                            <span className={`text-[13px] font-mono font-bold w-7 h-7 flex items-center justify-center rounded-full transition-all
                                ${isToday ? 'bg-[#1A56DB] text-white shadow-md' : isSelected ? 'bg-blue-200 text-[#1A56DB]' : 'text-[#374151] group-hover:bg-[#E0EAFF] group-hover:text-[#1A56DB]'}
                            `}>{day}</span>
                            <div className="flex gap-1.5 mt-2 overflow-hidden">
                                {dayExams.map((e: any) => (
                                    <div key={e.id} className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${e.type === 'Internal Assessment' ? 'bg-[#1A56DB]' : e.type === 'Assignment' ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'}`} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ExamDetailPanel = ({ selectedDate, dayExams, nextExam }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm min-h-[500px]">
        {!selectedDate ? (
            <div className="space-y-6">
                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest px-2">Next upcoming exam</p>
                <DetailCard exam={nextExam} days={3} />
            </div>
        ) : dayExams.length > 0 ? (
            <div className="space-y-5">
                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest px-2">{selectedDate}</p>
                {dayExams.map((e: any) => <DetailCard key={e.id} exam={e} />)}
            </div>
        ) : (
            <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                <CalendarX size={32} className="text-[#D1D5DB]" />
                <p className="text-[13px] text-[#9CA3AF] font-outfit">No assessments scheduled on this date</p>
            </div>
        )}
    </div>
);

const DetailCard = ({ exam, days }: any) => (
    <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
            <Badge type={exam.type} filled={exam.type === 'Final Exam'} />
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg border ${days && days <= 3 ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-100 text-gray-500 border-gray-100'}`}>
               {days ? `in ${days} days` : 'Confirmed'}
            </span>
        </div>
        <div>
            <span className="text-[12px] font-mono text-[#9CA3AF] font-bold uppercase">{exam.sub}</span>
            <h4 className="text-[16px] font-bold text-[#111827] font-outfit mt-0.5 line-clamp-1">{exam.name || exam.topics?.[0]}</h4>
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <DetailRow icon={CalendarDays} label="Date" val={exam.date} />
            <DetailRow icon={Clock} label="Time" val={exam.time} />
            <DetailRow icon={Hourglass} label="Duration" val={exam.duration} />
            <DetailRow icon={MapPin} label="Venue" val={exam.venue} />
        </div>
        <div className="bg-[#1A56DB]/[0.05] border-l-4 border-[#1A56DB] p-4 rounded-r-xl">
             <div className="flex items-center gap-2 text-[10px] font-bold text-[#1A56DB] uppercase">
                <User size={12} />
                <span>Assigned seat</span>
             </div>
             <p className="text-[14px] font-mono font-bold text-[#111827] mt-1">{exam.seat}</p>
        </div>
        <div className="flex gap-2 pt-2">
            <button className="flex-1 h-9 rounded-lg border border-[#E5E7EB] text-[11px] font-bold text-[#374151] flex items-center justify-center gap-1.5 hover:bg-white hover:shadow-sm active:scale-95 transition-all outline-none">
                <CalendarPlus size={14} /> Add to Cal
            </button>
            <button className="flex-1 h-9 rounded-lg border border-[#E5E7EB] text-[11px] font-bold text-[#374151] flex items-center justify-center gap-1.5 hover:bg-white hover:shadow-sm active:scale-95 transition-all outline-none">
                <CheckCircle size={14} /> Exam Ready
            </button>
        </div>
    </div>
);

const DetailRow = ({ icon: Icon, label, val }: any) => (
    <div className="flex flex-col">
        <div className="flex items-center gap-1.5 text-[10px] text-[#9CA3AF] uppercase font-bold mb-1">
            <Icon size={12} /> <span>{label}</span>
        </div>
        <span className="text-[11px] font-mono font-bold text-[#374151] line-clamp-1">{val || 'TBA'}</span>
    </div>
);

const ExamListTable = ({ exams }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-bold text-[#111827] font-outfit">
                <List size={18} className="text-[#1A56DB]" />
                <span>Complete schedule</span>
            </div>
            <div className="flex gap-2">
                <select className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-[12px] font-medium outline-none cursor-pointer">
                    <option>Filter: Next 30 days</option>
                    <option>Filter: Semester 6</option>
                </select>
                <button className="p-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-all"><Filter size={16} className="text-[#6B7280]" /></button>
            </div>
        </div>
        <div className="overflow-x-auto overflow-y-hidden">
            <table className="w-full text-left">
                <thead className="bg-[#F9FAFB] text-[10px] font-bold text-[#9CA3AF] uppercase border-b border-[#F3F4F6]">
                    <tr>
                        <th className="px-6 py-4">Subject</th>
                        <th className="px-6 py-4">Assessment Type</th>
                        <th className="px-6 py-4 text-right">Schedule</th>
                        <th className="px-6 py-4">Venue</th>
                        <th className="px-6 py-4">Room/Seat</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                    {exams.map((e: any) => (
                        <tr key={e.id} className="hover:bg-[#F9FAFB] group transition-colors h-[64px]">
                            <td className="px-6">
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-mono text-[#9CA3AF] font-bold">{e.sub}</span>
                                    <span className="text-[13px] font-medium text-[#111827] font-outfit line-clamp-1">Assessment Unit</span>
                                </div>
                            </td>
                            <td className="px-6"><Badge type={e.type} /></td>
                            <td className="px-6 text-right">
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-mono font-bold text-[#374151]">{e.date}</span>
                                    <span className="text-[11px] font-mono text-[#9CA3AF]">{e.time}</span>
                                </div>
                            </td>
                            <td className="px-6 text-[12px] font-mono font-bold text-[#6B7280]">{e.venue}</td>
                            <td className="px-6 text-[12px] font-mono font-bold text-[#1A56DB]">{e.seat}</td>
                            <td className="px-6">
                                <div className="flex justify-end gap-2">
                                    <button className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-[#1A56DB] hover:bg-blue-50 transition-all shadow-xs"><Bell size={16} /></button>
                                    <button className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all shadow-xs"><CheckCircle size={16} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const SeatingSection = ({ ranges }: any) => (
    <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <header className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-bold text-[#111827] font-outfit">
                <Building2 size={18} className="text-[#1A56DB]" />
                <span>Room assignments by range</span>
            </div>
        </header>
        <div className="p-6 space-y-6">
            <div className="bg-blue-50/50 p-4 rounded-xl flex items-center gap-3 border border-blue-100/50">
                <Info size={18} className="text-[#1A56DB] flex-shrink-0" />
                <p className="text-[13px] text-[#1D4ED8] font-outfit">Your roll number 21L31A0503 falls in the first range below. Report to Block A, Room 101.</p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-[#F3F4F6]">
                <table className="w-full text-left">
                    <thead className="bg-[#F9FAFB] text-[10px] font-bold text-[#9CA3AF] uppercase border-b border-[#F3F4F6]">
                        <tr>
                            <th className="px-6 py-4">Roll Number Range</th>
                            <th className="px-6 py-4">Block</th>
                            <th className="px-6 py-4 text-center">Room</th>
                            <th className="px-6 py-4">Floor</th>
                            <th className="px-6 py-4 text-center">Capacity</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F4F6]">
                        {ranges.map((r: any, i: number) => (
                            <tr key={i} className={`h-12 ${i === 0 ? 'bg-blue-50/70' : ''}`}>
                                <td className="px-6 text-[13px] font-mono font-bold text-[#374151]">{r.range}</td>
                                <td className="px-6 text-[12px] font-outfit text-[#6B7280]">{r.block}</td>
                                <td className="px-6 text-center text-[14px] font-mono font-bold text-[#1A56DB]">{r.room}</td>
                                <td className="px-6 text-[12px] font-outfit text-[#6B7280]">{r.floor}</td>
                                <td className="px-6 text-center text-[12px] font-mono text-[#9CA3AF]">{r.capacity}</td>
                                <td className="px-6 text-right">
                                    {i === 0 && <span className="bg-[#1A56DB] text-white text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-tighter">Your Hub</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </section>
);

const PreparationTracker = ({ exams }: any) => (
    <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <header className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-bold text-[#111827] font-outfit">
                <CheckSquare size={18} className="text-[#10B981]" />
                <span>Revision checklist</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-[11px] font-black text-[#9CA3AF] tracking-widest uppercase">33% PREPARED</span>
                <div className="w-24 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[33%]" />
                </div>
            </div>
        </header>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.slice(0, 3).map((e: any, i: number) => (
                <PrepCard key={e.id} exam={e} ready={i === 0} />
            ))}
        </div>
    </section>
);

const PrepCard = ({ exam, ready }: any) => (
    <div className={`bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-4 border-l-4 ${ready ? 'border-emerald-500' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
        <div className="flex justify-between items-center">
            <Badge type={exam.type} />
            <span className="text-[10px] font-mono font-black text-[#EF4444] uppercase tracking-tighter bg-red-50 px-1.5 rounded">3 DAYS LEFT</span>
        </div>
        <div>
            <span className="text-[11px] font-mono text-[#9CA3AF] font-bold">{exam.sub}</span>
            <h4 className="text-[15px] font-bold text-[#111827] mt-0.5 truncate font-outfit">{exam.topics?.[0] || 'Unit Revision'}</h4>
        </div>
        <div className="space-y-3">
            <CheckboxItem label="Syllabus coverage check" checked={ready} />
            <CheckboxItem label="Sample problems reviewed" checked={ready} />
            <CheckboxItem label="Previous papers solved" checked={false} />
            <CheckboxItem label="Topic summaries ready" checked={false} />
        </div>
        <div className="pt-4 border-t border-[#F3F4F6]">
            <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-[#9CA3AF] font-black tracking-widest">2 / 4 COMPLETED</span>
                <span className="text-[10px] text-emerald-600 font-bold">50%</span>
            </div>
            <div className="h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: '50%' }} />
            </div>
        </div>
    </div>
);

const CheckboxItem = ({ label, checked }: any) => (
    <div className="flex items-center gap-3 cursor-pointer group">
        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all flex-shrink-0
            ${checked ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-white border-gray-300 group-hover:border-blue-500'}
        `}>
            {checked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
        <span className={`text-[12px] font-outfit tracking-tight transition-all ${checked ? 'text-gray-400 line-through' : 'text-gray-600'}`}>{label}</span>
    </div>
);

const SmartInsights = () => (
    <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden pb-4">
        <header className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-bold text-[#111827] font-outfit">
                <Star size={16} className="text-[#F59E0B]" />
                <span>AI Preparation Analyst</span>
            </div>
        </header>
        <div className="p-6 overflow-x-auto custom-scrollbar flex gap-5">
            <InsightCard type="alert" title="Priority Focus: CS603" body="IA-2 is 3 days away. Your current internal marks (54/75) need reinforcement for A grade." color="red" />
            <InsightCard type="trend" title="Cluster warning" body="Only 1 day between IA-2 and Lab Assessment. Plan dual-subject revision blocks for today." color="amber" />
            <InsightCard type="target" title="High Weightage: Maths" body="Next assignment covers 15% of internals. Scoring well here is critical for your SGPA goals." color="blue" />
        </div>
    </section>
);

const InsightCard = ({ type, title, body, color }: any) => (
    <div className="min-w-[280px] bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs hover:shadow-lg transition-all flex flex-col" 
         style={{ borderLeft: `4px solid ${color === 'red' ? '#EF4444' : color === 'amber' ? '#F59E0B' : '#1A56DB'}` }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#F9FAFB] mb-4 shadow-xs">
            {type === 'alert' ? <AlertTriangle size={20} className="text-red-500" /> : type === 'trend' ? <Timer size={20} className="text-amber-500" /> : <Target size={20} className="text-blue-500" />}
        </div>
        <h4 className="text-[14px] font-bold text-[#111827] font-outfit mb-2">{title}</h4>
        <p className="text-[12px] text-[#6B7280] font-outfit leading-relaxed flex-1">{body}</p>
        <button className="mt-4 text-[12px] font-bold text-[#1A56DB] hover:underline text-left">View full report →</button>
    </div>
);

export default ExamHub;
