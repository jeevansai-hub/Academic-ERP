import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Download, ChevronDown, LayoutGrid, List,
  BookOpen, User, FlaskConical, Wrench, X, 
  Map, Lightbulb, Check, AlertTriangle, Calendar,
  CheckCircle, Target, FileText, File, ScrollText, Youtube,
  Link as LinkIcon, Plus, Clock, ChevronRight
} from 'lucide-react';
import StudentLayout from '../../components/layout/StudentLayout';
import { SUBJECT_MOCK_DATA } from './CurriculumMockData';

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

const CustomCheckbox = ({ checked, onChange }: any) => (
  <button 
    onClick={onChange}
    className={`w-[18px] h-[18px] flex items-center justify-center rounded-[4px] transition-all duration-150 ${checked ? 'bg-[#1A56DB] border-[#1A56DB]' : 'bg-white border-[#E5E7EB] border'} cursor-pointer`}
    aria-label={checked ? "Mark as not covered" : "Mark as covered"}
    role="checkbox"
    aria-checked={checked}
  >
    <motion.div initial={false} animate={{ scale: checked ? 1 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      {checked && <Check size={11} className="text-white" strokeWidth={3} />}
    </motion.div>
  </button>
);

const SectionA_SelectionPanel = () => {
    return (
        <motion.div variants={itemVariants} className="w-full mt-6 bg-white border border-[#E5E7EB] rounded-[14px] shadow-sm p-5 md:px-6">
            <div className="flex flex-row items-center gap-5 flex-wrap">
                <span className="text-[13px] font-medium font-outfit text-[#374151] shrink-0">Viewing curriculum for:</span>
                
                <div className="relative">
                    <select className="appearance-none w-[180px] h-10 bg-white border border-[#E5E7EB] rounded-[10px] px-3.5 pr-8 text-[13px] font-medium font-outfit text-[#374151] outline-none focus:border-[#1A56DB] focus:ring-3 focus:ring-[#1A56DB]/10 transition-shadow">
                        <option>CSE</option>
                        <option>IT</option>
                        <option>ECE</option>
                    </select>
                    <ChevronDown size={14} className="text-[#9CA3AF] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative">
                    <select className="appearance-none w-[160px] h-10 bg-white border border-[#E5E7EB] rounded-[10px] px-3.5 pr-8 text-[13px] font-medium font-outfit text-[#374151] outline-none focus:border-[#1A56DB] focus:ring-3 focus:ring-[#1A56DB]/10 transition-shadow">
                        <option>2022–2026</option>
                        <option>2021–2025</option>
                    </select>
                    <ChevronDown size={14} className="text-[#9CA3AF] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative">
                    <select className="appearance-none w-[200px] h-10 bg-white border border-[#E5E7EB] rounded-[10px] px-3.5 pr-8 text-[13px] font-medium font-outfit text-[#374151] outline-none focus:border-[#1A56DB] focus:ring-3 focus:ring-[#1A56DB]/10 transition-shadow">
                        <option>Semester 6 (Current)</option>
                        <option>Semester 5</option>
                    </select>
                    <ChevronDown size={14} className="text-[#9CA3AF] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="ml-auto flex items-center bg-[#F9FAFB] border border-[#E5E7EB] p-1 rounded-lg">
                    <button className="w-8 h-8 rounded-md bg-[#1A56DB] text-white flex items-center justify-center shadow-sm">
                        <LayoutGrid size={16} />
                    </button>
                    <button className="w-8 h-8 rounded-md bg-transparent text-[#6B7280] hover:text-[#374151] flex items-center justify-center transition-colors">
                        <List size={16} />
                    </button>
                </div>
            </div>

            <div className="mt-3 bg-[#1A56DB]/5 border border-[#1A56DB]/10 rounded-lg py-2 px-3.5 inline-block">
                <p className="text-[12px] font-outfit text-[#374151]">
                    CSE Department · 2022–2026 Batch · Semester 6 · <span className="font-semibold">4 theory subjects · 4 lab subjects · 22 credits</span>
                </p>
            </div>
        </motion.div>
    );
};

const SubjectCard = ({ subject, isSelected, onClick }: any) => {
    const isLab = subject.type === 'lab';
    return (
        <motion.div 
            variants={itemVariants}
            onClick={onClick}
            role="button"
            aria-selected={isSelected}
            className={`
                relative flex flex-col h-full bg-white border rounded-[14px] p-4.5 cursor-pointer shadow-sm hover:-translate-y-[3px] transition-all duration-200
                ${isSelected ? 'border-[#1A56DB] border-2 bg-[#1A56DB]/5 shadow-md' : 'border-[#E5E7EB] hover:shadow-md hover:border-[#D1D5DB]'}
            `}
        >
            <div className="flex justify-between items-start mb-2">
                {isLab ? <Badge color="teal" outlined>Lab</Badge> : <Badge color="blue" outlined>Theory</Badge>}
                <span className="text-[11px] font-mono font-bold text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded uppercase tracking-wider shrink-0">{subject.credits} Credits</span>
            </div>

            <p className="text-[12px] font-mono text-[#9CA3AF] mt-2">{subject.code}</p>
            <h3 className="text-[15px] font-outfit font-bold text-[#111827] mt-0.5 leading-tight flex-1">{subject.name}</h3>
            
            <div className="flex items-center gap-1.5 mt-2 text-[#9CA3AF]">
                <User size={12} className="shrink-0" />
                <span className="text-[12px] font-outfit text-[#6B7280] truncate">{subject.faculty}</span>
            </div>

            <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#F3F4F6]">
                <div className="flex items-center gap-3">
                    {isLab ? (
                        <div className="flex items-center gap-1 text-[#9CA3AF]">
                            <FlaskConical size={12} className="shrink-0" />
                            <span className="text-[11px] font-mono text-[#6B7280]">{subject.experimentsCount} exp.</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 text-[#9CA3AF]">
                            <BookOpen size={12} className="shrink-0" />
                            <span className="text-[11px] font-mono text-[#6B7280]">{subject.units} units</span>
                        </div>
                    )}
                </div>
                <Badge color={subject.performance.color}>{subject.performance.score}% {isLab ? 'Lab' : 'Internal'}</Badge>
            </div>

            {!isLab && (
                <div className="mt-3">
                    <div className="flex justify-between mb-1.5">
                        <span className="text-[10px] font-mono text-[#9CA3AF]">Progress</span>
                        <span className="text-[10px] font-mono font-bold text-[#1A56DB]">8/24</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }} animate={{ width: '33%' }} 
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="h-full bg-[#1A56DB]"
                        />
                    </div>
                </div>
            )}
            {isLab && subject.tools && (
                <div className="mt-3 flex items-center gap-1.5 text-[#9CA3AF]">
                    <Wrench size={12} className="shrink-0" />
                    <span className="text-[11px] font-mono text-[#6B7280] truncate">{subject.tools.join(', ')}</span>
                </div>
            )}
        </motion.div>
    );
};

const SyllabusTab = ({ subject }: any) => {
    const [selectedUnit, setSelectedUnit] = useState(1);
    const [checkedTopics, setCheckedTopics] = useState<Record<string, boolean>>({
        "CS603_U3_T0": true,
        "CS603_U3_T1": true,
    }); // Mock initial checked state

    const handleCheck = (topicId: string) => {
        setCheckedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
    };

    const colors = ['blue', 'violet', 'teal', 'amber', 'green', 'red'];

    return (
        <div className="flex flex-col md:flex-row min-h-[500px]">
            {/* Left Nav */}
            <div className="w-full md:w-[35%] border-r border-[#F3F4F6] pr-0 md:pr-4">
                <h4 className="text-[12px] font-outfit font-bold uppercase text-[#9CA3AF] tracking-wider mb-3 px-4 md:px-0">Course units</h4>
                <div className="space-y-0.5">
                    {subject.unitData?.map((u: any, idx: number) => {
                        const isActive = selectedUnit === u.unitNumber;
                        const c = colors[idx % colors.length];
                        return (
                            <div 
                                key={u.unitNumber} 
                                onClick={() => setSelectedUnit(u.unitNumber)}
                                className={`flex items-center px-4 h-11 cursor-pointer transition-colors ${isActive ? 'bg-[#F9FAFB] border-l-3 border-[#1A56DB] rounded-r-lg' : 'hover:bg-[#F9FAFB] border-b border-[#F3F4F6] last:border-0'}`}
                            >
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center bg-${c}-100 text-${c}-600 text-[11px] font-mono font-bold mr-3 shrink-0`}>
                                    U{u.unitNumber}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-outfit font-medium text-[#374151] truncate">{u.name}</p>
                                    <p className="text-[11px] font-mono text-[#9CA3AF]">{u.topics.length} topics</p>
                                </div>
                                {idx === 0 && <span className="text-[11px] font-mono text-[#10B981] ml-2 shrink-0">✓</span>}
                                {idx === 1 && <span className="text-[11px] font-mono text-[#10B981] ml-2 shrink-0">2/5</span>}
                            </div>
                        );
                    })}
                </div>
                <div className="mt-6 px-4 md:px-0">
                    <p className="text-[11px] font-outfit text-[#9CA3AF] mb-1.5">8 of 24 topics marked complete</p>
                    <div className="w-full h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1A56DB] w-1/3" />
                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div className="w-full md:w-[65%] pl-0 md:pl-6 pt-6 md:pt-0">
                {subject.unitData?.filter((u:any) => u.unitNumber === selectedUnit).map((unit: any) => {
                    const c = colors[(unit.unitNumber-1) % colors.length];
                    return (
                        <motion.div key={unit.unitNumber} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-${c}-100 text-${c}-700 text-[14px] font-mono font-bold`}>
                                        U{unit.unitNumber}
                                    </div>
                                    <h3 className="text-[18px] font-outfit font-bold text-[#111827]">{unit.name}</h3>
                                </div>
                                <Badge color="amber">{unit.weightage}% weightage</Badge>
                            </div>
                            <p className="text-[13px] font-outfit text-[#6B7280] leading-[1.7] mt-2">
                                Covers the fundamental concepts of {unit.name.toLowerCase()} including key mechanisms and their applications in modern systems.
                            </p>

                            <h4 className="text-[12px] font-outfit font-bold uppercase text-[#9CA3AF] tracking-wider mt-6 mb-2.5">Topics in this unit</h4>
                            
                            <div className="border border-[#F3F4F6] rounded-xl overflow-hidden bg-white">
                                {unit.topics.map((t: any, idx: number) => {
                                    const tId = `${subject.code}_U${unit.unitNumber}_T${idx}`;
                                    const isChecked = checkedTopics[tId] || false;
                                    return (
                                        <div key={idx} className="flex items-center justify-between p-3 border-b border-[#F3F4F6] last:border-0 hover:bg-[#F9FAFB] transition-colors min-h-[44px]">
                                            <div className="flex items-center gap-2.5">
                                                <CustomCheckbox checked={isChecked} onChange={() => handleCheck(tId)} />
                                                <span className="text-[13px] font-outfit font-medium text-[#111827]">{t.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {t.hasVideo && <Youtube size={14} className="text-[#9CA3AF] cursor-pointer hover:text-[#EF4444] transition-colors" />}
                                                {t.examFreq !== 'none' && (
                                                    <Badge color={t.examFreq}>In {t.examFreq === 'red' ? '5+' : '3'} exams</Badge>
                                                )}
                                                {t.performance !== 'none' && (
                                                    <Badge color={t.performance === 'Weak' ? 'red' : t.performance === 'Strong' ? 'green' : 'amber'}>{t.performance}</Badge>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="mt-4">
                                <button className="text-[12px] font-outfit font-medium text-[#1A56DB] hover:underline flex items-center gap-1 group">
                                    2 questions from this unit in 2024 exams <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    );
};

const animationVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }
};

const SectionD_SearchFilters = () => (
    <motion.div variants={itemVariants} className="w-full mt-6 bg-white border border-[#E5E7EB] rounded-[14px] p-4 px-6 flex flex-wrap items-center gap-3">
        <div className="relative w-full md:w-[320px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input 
                type="text" 
                placeholder="Search within curriculum..." 
                className="w-full h-10 pl-10 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] text-[13px] font-outfit outline-none focus:border-[#1A56DB] focus:ring-3 focus:ring-[#1A56DB]/10 transition-all"
            />
        </div>
        <select className="h-10 px-3.5 border border-[#E5E7EB] rounded-[10px] text-[13px] font-outfit text-[#374151] outline-none">
            <option>All subjects</option>
            <option>CS603</option>
            <option>CS602</option>
        </select>
        
        <div className="hidden md:flex items-center gap-2">
            <div className="h-4 w-[1px] bg-[#E5E7EB] mx-1" />
            <span className="px-3 py-1.5 rounded-full text-[12px] font-medium font-outfit bg-[#F3F4F6] text-[#374151] cursor-pointer hover:bg-[#E5E7EB]">All</span>
            <span className="px-3 py-1.5 rounded-full text-[12px] font-medium font-outfit bg-transparent text-[#6B7280] cursor-pointer hover:bg-[#F3F4F6] transition-colors border border-transparent">Covered <Check size={10} className="inline ml-0.5"/></span>
            <span className="px-3 py-1.5 rounded-full text-[12px] font-medium font-outfit bg-transparent text-[#6B7280] cursor-pointer hover:bg-[#F3F4F6] transition-colors border border-transparent">Not covered</span>
            <span className="px-3 py-1.5 rounded-full text-[12px] font-medium font-outfit bg-transparent text-[#6B7280] cursor-pointer hover:bg-[#F3F4F6] transition-colors border border-transparent">Weak topics</span>
        </div>

        <div className="ml-auto flex items-center gap-4">
            <span className="text-[12px] text-[#6B7280] cursor-pointer hover:text-[#374151] hover:underline hidden md:block">Clear filters</span>
            <span className="text-[12px] font-outfit text-[#9CA3AF]">Showing 24 topics</span>
        </div>
    </motion.div>
);

const SectionE_ProgressMapping = () => (
    <motion.div variants={itemVariants} className="w-full mt-8 bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Map size={16} className="text-[#6B7280]" />
                <h3 className="text-[14px] font-outfit font-bold text-[#111827]">Syllabus progress map</h3>
            </div>
            <span className="text-[11px] font-outfit italic text-[#9CA3AF]">Semester 6 · Tap a subject to update</span>
        </div>
        <div className="p-0">
            {SUBJECT_MOCK_DATA.filter(s => s.type === 'theory').map((s, i) => (
                <div key={s.id} className="h-[56px] px-6 border-b border-[#F3F4F6] flex items-center cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                    <div className="w-[180px] shrink-0">
                        <p className="text-[11px] font-mono text-[#9CA3AF] leading-none mb-1">{s.code}</p>
                        <p className="text-[13px] font-outfit font-medium text-[#111827] truncate pr-4">{s.name}</p>
                    </div>
                    <div className="flex-1 px-4">
                        <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden w-full max-w-[400px]">
                            <motion.div initial={{ width: 0 }} animate={{ width: i===0 ? '33%' : i===1 ? '50%' : '0%' }} transition={{ duration: 0.65, ease: "easeOut" }} className="h-full bg-[#1A56DB]" />
                        </div>
                    </div>
                    <div className="w-[100px] shrink-0 text-right pr-4">
                        <p className="text-[12px] font-mono font-bold text-[#111827] leading-none mb-1">{i===0 ? '8' : i===1 ? '14' : '0'}/{s.topicsCount}</p>
                        <p className="text-[11px] font-mono text-[#9CA3AF] leading-none">{i===0 ? '33%' : i===1 ? '50%' : '0%'}</p>
                    </div>
                    <div className="w-[100px] shrink-0 text-right">
                        <Badge color={i===0 ? 'amber' : i===1 ? 'blue' : 'gray'}>{i===0 ? 'Behind' : i===1 ? 'Ahead' : 'No progress'}</Badge>
                    </div>
                </div>
            ))}
            <div className="h-[56px] px-6 bg-[#F9FAFB] border-t-2 border-[#F3F4F6] flex items-center">
                <div className="w-[180px] shrink-0">
                    <p className="text-[13px] font-outfit font-bold text-[#111827]">Semester 6 total</p>
                </div>
                <div className="flex-1 px-4">
                    <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden w-full max-w-[400px]">
                        <motion.div initial={{ width: 0 }} animate={{ width: '22%' }} transition={{ duration: 0.8 }} className="h-full bg-[#1A56DB]" />
                    </div>
                </div>
                <div className="w-[100px] shrink-0 text-right pr-4">
                    <p className="text-[12px] font-mono font-bold text-[#111827] leading-none mb-1">22/100</p>
                </div>
                <div className="w-[100px] shrink-0 text-right">
                    <p className="text-[11px] font-mono font-bold text-[#111827]">22% overall</p>
                </div>
            </div>
            <div className="m-4 mt-2 bg-[#1A56DB]/5 border-l-3 border-[#1A56DB] rounded-tr-lg rounded-br-lg rounded-bl-lg p-3 px-4">
                <p className="text-[13px] font-outfit font-medium text-[#374151] leading-[1.6]">
                    At your current pace, you will cover all syllabus topics in <span className="font-bold">14 weeks</span>. End Semester exams are in <span className="font-bold">6 weeks</span>. Recommended: cover 3–4 topics per day to stay on track.
                </p>
            </div>
        </div>
    </motion.div>
);

const SectionF_InsightsStrip = () => (
    <motion.div variants={itemVariants} className="w-full mt-6 bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm overflow-hidden mb-16">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Lightbulb size={16} className="text-[#F59E0B]" />
                <h3 className="text-[14px] font-outfit font-bold text-[#111827]">Curriculum intelligence</h3>
            </div>
            <span className="text-[11px] font-outfit italic text-[#9CA3AF] hidden sm:block">Connected to your marks, exams, and progress data</span>
        </div>
        <div className="p-6 overflow-x-auto flex gap-5 pb-8 custom-scrollbar">
            <div className="min-w-[280px] w-[280px] p-5 rounded-[14px] border-3 border-[#EF4444] shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#EF4444]/10 text-[#EF4444] flex items-center justify-center shrink-0"><AlertTriangle size={14}/></div>
                    <h4 className="text-[13px] font-outfit font-bold text-[#111827] leading-tight">3NF not covered — in exam in 3 days</h4>
                </div>
                <p className="text-[12px] font-outfit text-[#6B7280] leading-[1.6] flex-1">
                    3NF (Normalization, CS603 Unit 3) has appeared in 5+ previous exams and is not yet marked as covered. CS603 Internal Assessment 2 is in 3 days. This is the highest priority topic.
                </p>
                <button className="mt-4 text-[12px] font-outfit font-bold text-[#EF4444] hover:underline text-left">Mark as study target →</button>
            </div>

            <div className="min-w-[280px] w-[280px] p-5 rounded-[14px] border border-[#1A56DB] shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#1A56DB]/10 text-[#1A56DB] flex items-center justify-center shrink-0"><Calendar size={14}/></div>
                    <h4 className="text-[13px] font-outfit font-bold text-[#111827] leading-tight">CS603 Internal 2 topics identified</h4>
                </div>
                <p className="text-[12px] font-outfit text-[#6B7280] leading-[1.6] flex-1">
                    Based on the exam syllabus entered by faculty, Units 3 and 4 are covered in this exam. You have completed 2/12 topics from these units. Estimated preparation needed: 4 hours.
                </p>
                <button className="mt-4 text-[12px] font-outfit font-bold text-[#1A56DB] hover:underline text-left">View exam topics →</button>
            </div>

            <div className="min-w-[280px] w-[280px] p-5 rounded-[14px] border border-[#0EA5E9] shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#0EA5E9]/10 text-[#0EA5E9] flex items-center justify-center shrink-0"><FlaskConical size={14}/></div>
                    <h4 className="text-[13px] font-outfit font-bold text-[#111827] leading-tight">3 lab experiments pending this week</h4>
                </div>
                <p className="text-[12px] font-outfit text-[#6B7280] leading-[1.6] flex-1">
                    CS603L experiments 4 and 5 (Subqueries, Normalization) and CS602L experiment 6 (Process Scheduling) are pending. Complete these before lab assessment.
                </p>
                <button className="mt-4 text-[12px] font-outfit font-bold text-[#0EA5E9] hover:underline text-left">View lab schedule →</button>
            </div>
            
            <div className="min-w-[280px] w-[280px] p-5 rounded-[14px] border border-[#F59E0B] shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center shrink-0"><BookOpen size={14}/></div>
                    <h4 className="text-[13px] font-outfit font-bold text-[#111827] leading-tight">Recommended resource for weak topic</h4>
                </div>
                <p className="text-[12px] font-outfit text-[#6B7280] leading-[1.6] flex-1">
                    3NF (your identified weak topic) has a matching video resource available: 'Normalization — Gate Smashers'. This 25-minute video covers all 3NF exam scenarios.
                </p>
                <button className="mt-4 text-[12px] font-outfit font-bold text-[#F59E0B] hover:underline text-left">View resource →</button>
            </div>
        </div>
    </motion.div>
);

// Main Page Component
const Curriculum = () => {
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('syllabus');

    const handleSubjectClick = (id: string) => {
        if (selectedSubject === id) {
            setSelectedSubject(null);
        } else {
            setSelectedSubject(id);
            setActiveTab(SUBJECT_MOCK_DATA.find(s => s.id === id)?.type === 'lab' ? 'experiments' : 'syllabus');
            // Mock smooth scroll
            setTimeout(() => {
                window.scrollTo({ top: 400, behavior: 'smooth' });
            }, 350);
        }
    };

    const selSubData = SUBJECT_MOCK_DATA.find(s => s.id === selectedSubject);

    // Filter data for display
    const theorySubjects = SUBJECT_MOCK_DATA.filter(s => s.type === 'theory');
    const labSubjects = SUBJECT_MOCK_DATA.filter(s => s.type === 'lab');

    return (
        <StudentLayout>
            <motion.div 
                className="w-full max-w-[1400px] mx-auto px-[28px] pt-[24px] pb-[64px]"
                initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="pb-5 border-b border-[#F3F4F6] flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-[24px] font-fraunces italic font-light text-[#111827]">Curriculum & Syllabus</h1>
                        <p className="text-[13px] font-outfit text-[#6B7280] mt-1">Department-wise structured curriculum · Topic-level breakdown · Exam preparation guide</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative w-full md:w-[280px] group">
                            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#1A56DB] transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search topics, subjects, experiments..." 
                                className="w-full h-10 pl-10 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] text-[13px] font-outfit outline-none focus:border-[#1A56DB] focus:ring-3 focus:ring-[#1A56DB]/12 transition-all md:focus:w-[360px]"
                            />
                        </div>
                        <button className="h-10 px-4 flex items-center gap-2 border border-[#E5E7EB] rounded-[10px] text-[13px] font-outfit font-medium text-[#374151] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all bg-white shrink-0">
                            <Download size={16} /> Export PDF
                        </button>
                    </div>
                </motion.div>

                {/* Section A */}
                <SectionA_SelectionPanel />

                {/* Section B: Curriculum Overview */}
                <motion.div variants={itemVariants} className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-[14px] font-outfit font-semibold text-[#111827]">Semester 6 subjects</h2>
                            <p className="text-[12px] font-outfit text-[#6B7280]">8 subjects · 22 credits total · Theory + Lab</p>
                        </div>
                        <div className="flex bg-[#F3F4F6] p-1 rounded-lg">
                            <button className="px-3 py-1.5 rounded-md text-[12px] font-outfit font-medium bg-white text-[#111827] shadow-sm">All subjects</button>
                            <button className="px-3 py-1.5 rounded-md text-[12px] font-outfit font-medium text-[#6B7280] hover:text-[#374151]">Theory only</button>
                            <button className="px-3 py-1.5 rounded-md text-[12px] font-outfit font-medium text-[#6B7280] hover:text-[#374151]">Lab only</button>
                        </div>
                    </div>

                    <div className="mb-3 flex items-center">
                        <h3 className="text-[10px] font-outfit font-semibold uppercase tracking-[0.1em] text-[#9CA3AF]">THEORY SUBJECTS</h3>
                        <div className="h-[1px] bg-[#F3F4F6] flex-1 ml-4" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {theorySubjects.map((s, i) => (
                            <SubjectCard key={s.id} subject={s} isSelected={selectedSubject === s.id} onClick={() => handleSubjectClick(s.id)} />
                        ))}
                    </div>

                    <div className="mt-6 mb-3 flex items-center">
                        <h3 className="text-[10px] font-outfit font-semibold uppercase tracking-[0.1em] text-[#9CA3AF]">LAB SUBJECTS</h3>
                        <div className="h-[1px] bg-[#F3F4F6] flex-1 ml-4" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {labSubjects.map((s, i) => (
                            <SubjectCard key={s.id} subject={s} isSelected={selectedSubject === s.id} onClick={() => handleSubjectClick(s.id)} />
                        ))}
                    </div>
                </motion.div>

                {/* Section C: Subject Deep View */}
                <AnimatePresence>
                    {selectedSubject && selSubData && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }} 
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="w-full bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm mt-4 overflow-hidden origin-top"
                        >
                            <div className="px-7 py-5 border-b border-[#F3F4F6] flex justify-between items-start">
                                <div>
                                    <p className="text-[12px] font-mono text-[#9CA3AF] mb-1">{selSubData.code}</p>
                                    <h2 className="text-[20px] font-outfit font-semibold text-[#111827] leading-tight">{selSubData.name}</h2>
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex items-center gap-1.5 text-[#6B7280]"><User size={13}/><span className="text-[13px] font-outfit">{selSubData.faculty}</span></div>
                                        <div className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
                                        <span className="text-[12px] font-mono text-[#7C3AED] font-bold">{selSubData.credits} Credits</span>
                                        <div className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
                                        <Badge color={selSubData.type === 'lab' ? 'teal' : 'blue'} outlined>{selSubData.type}</Badge>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[12px] font-outfit font-medium text-[#1A56DB] cursor-pointer hover:underline">View all subjects</span>
                                    <button onClick={() => setSelectedSubject(null)} className="w-10 h-10 rounded-lg flex items-center justify-center text-[#9CA3AF] hover:bg-[#F9FAFB] hover:text-[#374151] transition-colors"><X size={18}/></button>
                                </div>
                            </div>

                            <div className="h-11 bg-[#F9FAFB] border-b border-[#F3F4F6] px-7 flex items-center gap-6 relative">
                                {selSubData.type === 'theory' ? (
                                    ['Syllabus', 'Weightage', 'Important Topics', 'Resources', 'My Progress'].map((tab) => (
                                        <button 
                                            key={tab} onClick={() => setActiveTab(tab.toLowerCase())}
                                            className={`h-full text-[13px] font-outfit font-medium relative ${activeTab === tab.toLowerCase() ? 'text-[#1A56DB]' : 'text-[#6B7280] hover:text-[#374151]'}`}
                                        >
                                            {tab}
                                            {activeTab === tab.toLowerCase() && <motion.div layoutId="subTabIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1A56DB] rounded-t-sm" />}
                                        </button>
                                    ))
                                ) : (
                                    ['Experiments', 'Lab Objectives', 'Weightage', 'Resources', 'My Progress'].map((tab) => (
                                        <button 
                                            key={tab} onClick={() => setActiveTab(tab.toLowerCase())}
                                            className={`h-full text-[13px] font-outfit font-medium relative ${activeTab === tab.toLowerCase() ? 'text-[#0EA5E9]' : 'text-[#6B7280] hover:text-[#374151]'}`}
                                        >
                                            {tab}
                                            {activeTab === tab.toLowerCase() && <motion.div layoutId="subTabIndicatorLab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0EA5E9] rounded-t-sm" />}
                                        </button>
                                    ))
                                )}
                            </div>

                            <div className="p-7">
                                {activeTab === 'syllabus' && selSubData.type === 'theory' && <SyllabusTab subject={selSubData} />}
                                {activeTab === 'weightage' && (
                                    <div>
                                        <h3 className="text-[13px] font-outfit font-semibold text-[#374151] mb-4">Exam weightage distribution</h3>
                                        <div className="w-full h-10 rounded-[10px] bg-[#F3F4F6] flex overflow-hidden mb-3 gap-[2px]">
                                            <motion.div initial={{width:0}} animate={{width:'15%'}} transition={{duration:0.5}} className="bg-[#1A56DB] h-full" />
                                            <motion.div initial={{width:0}} animate={{width:'20%'}} transition={{duration:0.5, delay:0.1}} className="bg-[#7C3AED] h-full" />
                                            <motion.div initial={{width:0}} animate={{width:'30%'}} transition={{duration:0.5, delay:0.2}} className="bg-[#0EA5E9] h-full" />
                                            <motion.div initial={{width:0}} animate={{width:'20%'}} transition={{duration:0.5, delay:0.3}} className="bg-[#F59E0B] h-full" />
                                            <motion.div initial={{width:0}} animate={{width:'15%'}} transition={{duration:0.5, delay:0.4}} className="bg-[#10B981] h-full" />
                                        </div>
                                        <div className="flex justify-evenly">
                                            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#1A56DB]"/> <span className="text-[11px] font-mono text-[#6B7280]">U1 15%</span></div>
                                            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]"/> <span className="text-[11px] font-mono text-[#6B7280]">U2 20%</span></div>
                                            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9]"/> <span className="text-[11px] font-mono text-[#6B7280]">U3 30%</span></div>
                                            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"/> <span className="text-[11px] font-mono text-[#6B7280]">U4 20%</span></div>
                                            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"/> <span className="text-[11px] font-mono text-[#6B7280]">U5 15%</span></div>
                                        </div>
                                        <div className="mt-8 bg-red-50/50 border-l-3 border-[#EF4444] rounded-r-lg p-3 px-4">
                                            <p className="text-[13px] font-outfit font-medium text-[#991B1B]">Priority: Unit 3 (Normalization) carries 30% weightage and is your weakest area. Prioritize this unit before end-semester exams.</p>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'important topics' && (
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-[13px] font-outfit font-semibold text-[#374151] mb-3.5">Frequently appearing in exams</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge color="red" className="py-1 px-3">3NF ×5</Badge>
                                                <Badge color="amber" className="py-1 px-3">Normalization ×4</Badge>
                                                <Badge color="amber" className="py-1 px-3">BCNF ×4</Badge>
                                                <Badge color="blue" outlined className="py-1 px-3">ACID Properties ×3</Badge>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'resources' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border border-[#E5E7EB] rounded-xl p-4">
                                            <h3 className="flex items-center gap-2 text-[13px] font-outfit font-semibold text-[#111827] mb-3"><FileText size={16} className="text-[#1A56DB]"/> Notes & PDFs</h3>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-[13px] font-outfit text-[#374151] py-1 border-b border-[#F3F4F6]">CS603 Unit 3 Notes.pdf <Download size={14} className="text-[#9CA3AF] cursor-pointer hover:text-[#1A56DB]"/></div>
                                                <div className="flex items-center justify-between text-[13px] font-outfit text-[#374151] py-1 border-b border-[#F3F4F6]">DBMS Complete Notes Sem6.pdf <Download size={14} className="text-[#9CA3AF] cursor-pointer hover:text-[#1A56DB]"/></div>
                                            </div>
                                        </div>
                                        <div className="border border-[#E5E7EB] rounded-xl p-4">
                                            <h3 className="flex items-center gap-2 text-[13px] font-outfit font-semibold text-[#111827] mb-3"><Youtube size={16} className="text-[#EF4444]"/> Video Resources</h3>
                                            <div className="space-y-2">
                                                <div className="flex flex-col text-[13px] font-outfit text-[#374151] py-1 border-b border-[#F3F4F6]">
                                                    <div className="flex justify-between">DBMS Complete Course <LinkIcon size={12} className="text-[#1A56DB] cursor-pointer"/></div>
                                                    <span className="text-[11px] text-[#9CA3AF]">Neso Academy (YouTube)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'my progress' && (
                                    <div>
                                        <div className="flex items-center gap-8 mb-8">
                                            <div className="relative w-32 h-16 overflow-hidden flex justify-center items-end">
                                                <div className="absolute w-32 h-32 rounded-full border-[12px] border-[#F3F4F6]" />
                                                <motion.div initial={{rotate:-180}} animate={{rotate:-180 + (8/24)*180}} transition={{duration:0.7, delay:0.15, ease: "easeOut"}} className="absolute w-32 h-32 rounded-full border-[12px] border-[#1A56DB] border-b-transparent border-r-transparent origin-center" />
                                                <div className="text-center absolute bottom-0"><p className="text-[20px] font-mono font-bold text-[#111827]">8/24</p></div>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-outfit font-medium text-[#374151]">33% syllabus covered</p>
                                                <p className="text-[12px] font-outfit text-[#6B7280]">Unit 1 and parts of Unit 2 completed.</p>
                                            </div>
                                        </div>
                                        <h3 className="text-[12px] font-outfit font-bold uppercase text-[#9CA3AF] tracking-wider mb-4">Suggested study plan</h3>
                                        <div className="bg-[#1A56DB]/5 border border-[#1A56DB]/15 rounded-[10px] p-4">
                                            <p className="text-[13px] font-outfit text-[#374151] leading-[1.7]">
                                                Based on your progress and CS603 exam in 3 days: Focus on Unit 3 (Normalization) — 30% weightage, 5 topics not covered. Estimate 2.5 hours. Then Unit 4 (Transactions) — 20% weightage.
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {(activeTab === 'experiments' && selSubData.type === 'lab') && (
                                    <div className="space-y-2">
                                        {selSubData.experiments?.map((exp: any) => (
                                            <div key={exp.id} className="border border-[#F3F4F6] rounded-xl overflow-hidden">
                                                <div className="px-5 py-3.5 flex items-center justify-between bg-white cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-[#0EA5E9]/10 text-[#0EA5E9] text-[11px] font-mono font-bold w-7 h-7 flex items-center justify-center rounded-lg">{exp.id}</div>
                                                        <span className="text-[13px] font-outfit font-medium text-[#111827]">{exp.title}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Badge color={exp.status === 'Completed' ? 'green' : exp.status === 'Pending' ? 'amber' : 'gray'}>{exp.status}</Badge>
                                                        <ChevronDown size={16} className="text-[#9CA3AF]" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Section D: Search & Filters */}
                <SectionD_SearchFilters />

                {/* Section E: Progress Mapping */}
                <SectionE_ProgressMapping />

                {/* Section F: Insights */}
                <SectionF_InsightsStrip />

            </motion.div>
        </StudentLayout>
    );
};

export default Curriculum;
