import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Clock, FileCheck, CheckCircle, FolderOpen, AlertCircle,
  FileSpreadsheet, Files, UserCheck, TrendingUp, BarChart3, BookOpen,
  FileText, ShieldCheck, ArrowRightLeft, ScrollText, Briefcase, Receipt, MapPin, GraduationCap, Download,
  Eye, Share2, Archive, X, Map, Building2, Globe, Award, Package, Star, Calendar,
  Check, ChevronDown, Lightbulb
} from 'lucide-react';
import StudentLayout from '../../components/layout/StudentLayout';
import { AUTO_GENERATED_REPORTS, OFFICIAL_DOCUMENTS, ACTIVE_REQUESTS_MOCK, HISTORY_MOCK } from './ReportsMockData';

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

const iconMap: any = {
    FileSpreadsheet, Files, UserCheck, TrendingUp, BarChart3, BookOpen,
    FileText, ShieldCheck, ArrowRightLeft, ScrollText, Briefcase, Receipt, MapPin, GraduationCap
};

const SectionA_QuickStatus = ({ setActiveTab }: any) => (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.26, ease: 'easeOut' }} 
        className="w-full mt-6 bg-[#1A56DB]/5 border border-[#1A56DB]/20 rounded-[14px] px-6 py-3.5 flex justify-between items-center"
    >
        <div className="flex items-center gap-2.5">
            <Clock size={16} className="text-[#1A56DB]" />
            <span className="text-[13px] font-outfit font-medium text-[#374151]">1 document request in progress</span>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={() => setActiveTab('active')} className="px-3 py-1.5 bg-[#BFDBFE]/50 hover:bg-[#BFDBFE]/80 transition-colors border border-[#60A5FA]/30 rounded-full text-[12px] font-outfit font-medium text-[#1E3A8A] flex items-center gap-1.5 cursor-pointer">
                Bonafide · Under review
            </button>
        </div>
    </motion.div>
);

const NumberCounter = ({ value }: { value: number }) => {
    return <span>{value}</span>; // Static placeholder instead of framer-motion countup for simplicity
};

const StatCard = ({ title, value, icon: Icon, badge, subtext, color, onClick }: any) => {
    const borders: any = { green: 'border-l-[#10B981]', amber: 'border-l-[#F59E0B]', blue: 'border-l-[#1A56DB]' };
    const bgs: any = { green: 'bg-[#10B981]/10 text-[#10B981]', amber: 'bg-[#F59E0B]/10 text-[#F59E0B]', blue: 'bg-[#1A56DB]/10 text-[#1A56DB]' };
    return (
        <motion.div onClick={onClick} className={`bg-white border-y border-r border-[#E5E7EB] border-l-4 ${borders[color]} rounded-[16px] p-6 shadow-sm hover:translate-y-[-3px] hover:shadow-md hover:border-[#D1D5DB] transition-all cursor-pointer`}>
            <div className="flex justify-between items-start mb-2">
                <p className="text-[10px] font-outfit font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">{title}</p>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bgs[color]}`}><Icon size={16} /></div>
            </div>
            <p className={`text-[32px] font-mono font-bold leading-tight ${color === 'amber' ? 'text-[#F59E0B]' : color === 'green' && value === 0 ? 'text-[#10B981]' : 'text-[#111827]'}`}>
                <NumberCounter value={value} />
            </p>
            <p className={`text-[12px] font-outfit mt-1 ${value === 0 && color === 'green' ? 'text-[#10B981]' : 'text-[#6B7280]'}`}>{subtext}</p>
            <div className="mt-3">
                <Badge color={badge.color}>{badge.label}</Badge>
            </div>
        </motion.div>
    );
};

const DocumentCard = ({ doc, type, handleDownload, handlePreview, openRequestModal }: any) => {
    const Icon = iconMap[doc.iconName] || FileText;
    const [downloading, setDownloading] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    const onDownloadClick = () => {
        setDownloading(true);
        setTimeout(() => {
            setDownloading(false);
            setDownloaded(true);
            setTimeout(() => setDownloaded(false), 1500);
        }, 800);
    };

    return (
        <motion.div className="bg-white border border-[#E5E7EB] rounded-[14px] p-4.5 hover:shadow-md hover:border-[#D1D5DB] hover:-translate-y-[3px] transition-all flex flex-col h-full">
            <div className="flex justify-between items-start">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg" style={{backgroundColor: doc.iconBg, color: doc.iconColor}}>
                    <Icon size={18} />
                </div>
                <Badge color={doc.badge.color}>{doc.badge.label}</Badge>
            </div>
            <h3 className="text-[14px] font-outfit font-bold text-[#111827] mt-[10px] line-clamp-1">{doc.title}</h3>
            <p className="text-[12px] font-outfit text-[#6B7280] leading-[1.6] mt-1 line-clamp-2 h-[38px]">{doc.description}</p>
            
            {type === 'official' && doc.processing && (
                <div className="mt-2 text-[11px] font-outfit text-[#9CA3AF] flex items-center gap-1.5"><Clock size={11} /> Typical: {doc.processing.split('·')[0]}</div>
            )}
            
            {(type === 'auto' || doc.date) && (
                <div className="flex items-center gap-3 mt-2.5 pt-2.5 border-t border-[#F3F4F6]">
                    <div className="flex items-center gap-1.5 text-[#9CA3AF]"><Calendar size={11}/><span className="text-[11px] font-mono">{doc.date || doc.processing}</span></div>
                    {doc.meta && <div className="flex items-center gap-1.5 text-[#9CA3AF] ml-auto"><FileText size={11}/><span className="text-[11px] font-mono">{doc.meta}</span></div>}
                </div>
            )}

            {doc.lastDownloaded && <p className="text-[10px] font-mono text-[#9CA3AF] mt-2">Last downloaded: {doc.lastDownloaded}</p>}
            
            <div className="mt-auto pt-3">
                {type === 'auto' ? (
                    <>
                        <button onClick={onDownloadClick} className={`w-full h-9 rounded-lg text-[12px] font-outfit font-medium text-white flex items-center justify-center gap-1.5 mb-2 transition-all ${downloaded ? 'bg-[#10B981]' : downloading ? 'bg-[#34D399]' : 'bg-[#10B981] hover:bg-[#059669]'}`}>
                            {downloaded ? <CheckCircle size={14}/> : downloading ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <Download size={14}/>}
                            {downloaded ? 'Downloaded ✓' : downloading ? 'Generating...' : 'Download PDF'}
                        </button>
                        <div className="flex gap-2">
                            <button onClick={() => handlePreview(doc)} className="flex-1 h-9 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[12px] font-outfit font-medium text-[#374151] flex items-center justify-center gap-1.5 transition-colors"><Eye size={14}/> Preview</button>
                            <button className="flex-1 h-9 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[12px] font-outfit font-medium text-[#374151] flex items-center justify-center gap-1.5 transition-colors"><Share2 size={14}/> Share</button>
                        </div>
                    </>
                ) : (
                    <>
                        {doc.state === 'available' && <button onClick={() => openRequestModal(doc)} className="w-full h-9 bg-[#1A56DB] hover:bg-[#1648C0] text-white rounded-lg text-[12px] font-outfit font-medium transition-colors">Request Document</button>}
                        {doc.state === 'in-progress' && (
                            <div className="flex flex-col items-center">
                                <Badge color="amber" className="w-full py-1.5 text-center flex items-center justify-center gap-1.5">⏳ Processing · Stage 2 of 4</Badge>
                                <span className="text-[11px] font-outfit text-[#1A56DB] mt-1.5 hover:underline cursor-pointer">View status →</span>
                            </div>
                        )}
                        {doc.note && <div className="bg-[#FEF3C7]/50 border-l-2 border-[#F59E0B] p-2 mt-2 text-[10px] font-outfit text-[#92400E] leading-tight">{doc.note}</div>}
                    </>
                )}
            </div>
        </motion.div>
    );
};

const Tab4History = () => (
    <div className="overflow-x-auto border-t border-[#F3F4F6] -mx-6 px-6 sm:mx-0 sm:px-0 mt-4">
        <table className="w-full min-w-[900px]">
            <thead>
                <tr className="bg-[#F9FAFB] border-b-2 border-[#F3F4F6]">
                    <th className="text-left py-3 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] tracking-wider">Document name</th>
                    <th className="text-left py-3 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] tracking-wider">Type</th>
                    <th className="text-left py-3 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] tracking-wider">Reference</th>
                    <th className="text-left py-3 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] tracking-wider">Purpose</th>
                    <th className="text-right py-3 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] tracking-wider">Issued date</th>
                    <th className="text-right py-3 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] tracking-wider">Valid until</th>
                    <th className="text-right py-3 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] tracking-wider">Copies</th>
                    <th className="text-left py-3 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 text-[10px] font-outfit font-bold uppercase text-[#9CA3AF] tracking-wider">Action</th>
                </tr>
            </thead>
            <tbody>
                {HISTORY_MOCK.map((row) => (
                    <tr key={row.id} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] cursor-pointer group transition-colors">
                        <td className="py-3 px-4 text-[13px] font-outfit font-medium text-[#111827]">{row.name}</td>
                        <td className="py-3 px-4"><Badge color={row.typeColor} outlined>{row.type}</Badge></td>
                        <td className="py-3 px-4 text-[12px] font-mono text-[#9CA3AF]">{row.reference}</td>
                        <td className="py-3 px-4 text-[12px] font-outfit text-[#6B7280]">{row.purpose}</td>
                        <td className="py-3 px-4 text-[12px] font-mono text-[#374151] text-right">{row.issued}</td>
                        <td className={`py-3 px-4 text-[12px] font-outfit text-right ${row.validColor === 'red' ? 'text-[#EF4444]' : row.validColor === 'amber' ? 'text-[#F59E0B]' : 'text-[#6B7280]'}`}>{row.validity}</td>
                        <td className="py-3 px-4 text-[12px] font-mono text-[#374151] text-right">{row.copies}</td>
                        <td className="py-3 px-4"><Badge color={row.status === 'Active' ? 'green' : 'gray'}>{row.status}</Badge></td>
                        <td className="py-3 px-4 text-[12px] font-outfit font-medium text-[#1A56DB] group-hover:underline">{row.action}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const SectionD_DocumentGuide = () => {
    const defaultOpen = 1;
    const [openAcc, setOpenAcc] = useState<number | null>(defaultOpen);

    const toggle = (i: number) => setOpenAcc(openAcc === i ? null : i);

    const data = [
        { id: 1, title: 'Internship application', icon: Briefcase, color: '#F59E0B' },
        { id: 2, title: 'Education loan', icon: Building2, color: '#1A56DB' },
        { id: 3, title: 'Scholarship application', icon: GraduationCap, color: '#7C3AED' },
        { id: 4, title: 'Visa / passport application', icon: Globe, color: '#0EA5E9' },
        { id: 5, title: 'Higher education / postgraduate admission', icon: BookOpen, color: '#10B981' },
        { id: 6, title: 'Government job / competitive exams', icon: Award, color: '#EF4444' }
    ];

    return (
        <div className="w-full mt-8 bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm">
            <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Map size={16} className="text-[#6B7280]" />
                    <h3 className="text-[14px] font-outfit font-bold text-[#111827]">Document guide — what do I need for?</h3>
                </div>
                <span className="text-[11px] font-outfit text-[#9CA3AF]">6 common situations covered</span>
            </div>
            <div className="p-6">
                {data.map((d) => (
                    <div key={d.id} className="bg-white border border-[#E5E7EB] rounded-xl mb-2 overflow-hidden">
                        <div onClick={() => toggle(d.id)} className="px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                            <div className="flex items-center gap-3">
                                <d.icon size={16} color={d.color} />
                                <span className="text-[13px] font-outfit font-medium text-[#111827]">{d.title}</span>
                            </div>
                            <ChevronDown size={18} className={`text-[#9CA3AF] transition-transform duration-200 ${openAcc === d.id ? 'rotate-180' : ''}`} />
                        </div>
                        <AnimatePresence>
                            {openAcc === d.id && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-[#F9FAFB] border-t border-[#F3F4F6]">
                                    <div className="p-5">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-3">
                                                <span className="text-[13px] font-outfit text-[#374151]">Bonafide Certificate</span>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[11px] font-outfit text-[#6B7280]">Available to request</span>
                                                    <span className="text-[12px] font-outfit font-medium text-[#1A56DB] cursor-pointer hover:underline">Request</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-3">
                                                <span className="text-[13px] font-outfit text-[#374151]">Latest Marks Sheet</span>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[11px] font-outfit text-[#10B981] flex items-center gap-1"><CheckCircle size={10}/> Available now</span>
                                                    <span className="text-[12px] font-outfit font-medium text-[#10B981] cursor-pointer hover:underline">Download</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-3">
                                                <span className="text-[13px] font-outfit text-[#374151]">NOC for Internship</span>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[11px] font-outfit text-[#6B7280]">Available to request</span>
                                                    <span className="text-[12px] font-outfit font-medium text-[#1A56DB] cursor-pointer hover:underline">Request</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center pb-1">
                                                <span className="text-[13px] font-outfit text-[#374151]">No Dues Certificate</span>
                                                <span className="text-[11px] font-outfit text-[#6B7280] italic">Contact accounts office directly</span>
                                            </div>
                                        </div>
                                        <button className="w-full mt-5 h-9 border border-[#1A56DB] text-[#1A56DB] rounded-lg text-[13px] font-outfit font-medium hover:bg-[#1A56DB]/5 transition-colors">Request all missing</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SectionE_InsightsStrip = () => (
    <div className="w-full mt-6 bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm mb-16 overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Lightbulb size={16} className="text-[#F59E0B]" />
                <h3 className="text-[14px] font-outfit font-bold text-[#111827]">Document intelligence</h3>
            </div>
            <span className="text-[11px] font-outfit italic text-[#9CA3AF] hidden sm:block">Based on your profile and academic status</span>
        </div>
        <div className="p-6 overflow-x-auto flex gap-4 pb-6 custom-scrollbar">
            <div className="min-w-[280px] w-[280px] p-5 rounded-[14px] border-3 border-[#F59E0B] shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center shrink-0"><Clock size={14}/></div>
                    <h4 className="text-[13px] font-outfit font-bold text-[#111827] leading-tight">Bonafide Certificate expiring in 24 days</h4>
                </div>
                <p className="text-[12px] font-outfit text-[#6B7280] leading-[1.6] flex-1">
                    Your Bonafide Certificate (REQ-2398) expires on 14 April 2026. If you need it for upcoming internship applications, re-request before it expires.
                </p>
                <button className="mt-4 text-[12px] font-outfit font-bold text-[#F59E0B] hover:underline text-left">Re-request now →</button>
            </div>
            
            <div className="min-w-[280px] w-[280px] p-5 rounded-[14px] border border-[#1A56DB] shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#1A56DB]/10 text-[#1A56DB] flex items-center justify-center shrink-0"><Briefcase size={14}/></div>
                    <h4 className="text-[13px] font-outfit font-bold text-[#111827] leading-tight">Internship application season</h4>
                </div>
                <p className="text-[12px] font-outfit text-[#6B7280] leading-[1.6] flex-1">
                    March–April is peak internship joining season. Most companies require Bonafide + NOC. Request these 5–7 days before your joining date.
                </p>
                <button className="mt-4 text-[12px] font-outfit font-bold text-[#1A56DB] hover:underline text-left">View internship documents →</button>
            </div>

            <div className="min-w-[280px] w-[280px] p-5 rounded-[14px] border border-[#10B981] shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center shrink-0"><Package size={14}/></div>
                    <h4 className="text-[13px] font-outfit font-bold text-[#111827] leading-tight">Request your internship bundle</h4>
                </div>
                <p className="text-[12px] font-outfit text-[#6B7280] leading-[1.6] flex-1">
                    You haven't requested an NOC. If you have an offer, request the NOC + Bonafide together. Both process in 2–3 days.
                </p>
                <button className="mt-4 text-[12px] font-outfit font-bold text-[#10B981] hover:underline text-left">Request all →</button>
            </div>
            
            <div className="min-w-[280px] w-[280px] p-5 rounded-[14px] border border-[#E5E7EB] shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#F3F4F6] text-[#6B7280] flex items-center justify-center shrink-0"><Star size={14}/></div>
                    <h4 className="text-[13px] font-outfit font-bold text-[#111827] leading-tight">Most requested: Bonafide</h4>
                </div>
                <p className="text-[12px] font-outfit text-[#6B7280] leading-[1.6] flex-1">
                    Bonafide Certificate is the most requested by students in your batch. Keep one active at all times.
                </p>
                <button className="mt-4 text-[12px] font-outfit font-bold text-[#6B7280] hover:text-[#374151] hover:underline text-left">Request Bonafide →</button>
            </div>
        </div>
    </div>
);

// MOCK MODALS
const RequestModal = ({ isOpen, onClose, preselected }: any) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-[4px] z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[20px] w-full max-w-[580px] shadow-[0_24px_48px_rgba(0,0,0,0.16)] overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-[18px] font-outfit font-bold text-[#111827]">{preselected ? preselected.title : 'Request Document'}</h2>
                        <p className="text-[12px] font-outfit text-[#6B7280] mt-1">Fill in the details below. Reference number will be generated on submission.</p>
                    </div>
                    <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#374151] transition-colors"><X size={20}/></button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[12px] font-outfit font-medium text-[#374151] mb-1.5">Document type *</label>
                            <select defaultValue={preselected?.title} className="w-full h-10 border border-[#E5E7EB] rounded-[10px] px-3 text-[13px] font-outfit text-[#111827] outline-none">
                                {OFFICIAL_DOCUMENTS.map(d => <option key={d.id}>{d.title}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-[12px] font-outfit font-medium text-[#374151] mb-1.5">Purpose *</label>
                            <select className="w-full h-10 border border-[#E5E7EB] rounded-[10px] px-3 text-[13px] font-outfit text-[#111827] outline-none">
                                <option>Internship application</option>
                                <option>Bank account</option>
                                <option>Scholarship</option>
                                <option>Education loan</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[12px] font-outfit font-medium text-[#374151] mb-2">Urgency</label>
                            <div className="flex gap-3">
                                <label className="flex items-center gap-2 cursor-pointer bg-[#F9FAFB] border border-[#1A56DB] p-2 rounded-lg pr-4">
                                    <input type="radio" name="urgency" defaultChecked className="w-4 h-4 accent-[#1A56DB]" />
                                    <span className="text-[12px] font-outfit text-[#111827]">Standard (2-3 days)</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer border border-[#E5E7EB] p-2 rounded-lg pr-4 opacity-70">
                                    <input type="radio" name="urgency" className="w-4 h-4 accent-[#1A56DB]" />
                                    <span className="text-[12px] font-outfit text-[#374151]">Urgent (1 day)</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[12px] font-outfit font-medium text-[#374151] mb-1.5">Additional notes (optional)</label>
                            <textarea placeholder="Any special instructions or context for this request" className="w-full h-[80px] border border-[#E5E7EB] rounded-[10px] p-3 text-[13px] font-outfit text-[#111827] outline-none resize-none" />
                        </div>
                    </div>
                    <div className="mt-6 bg-[#1A56DB]/5 border border-[#1A56DB]/20 rounded-lg p-3">
                        <p className="text-[12px] font-mono text-[#374151]">Expected ready: Tuesday, 24 March 2026 (2–3 working days at standard processing)</p>
                    </div>
                </div>
                <div className="px-6 py-4 border-t border-[#F3F4F6] flex flex-col gap-2 shrink-0">
                    <button onClick={onClose} className="w-full h-10 bg-[#1A56DB] hover:bg-[#1648C0] text-white rounded-[10px] text-[13px] font-outfit font-medium transition-colors">Submit Request</button>
                    <button onClick={onClose} className="w-full h-8 text-[#6B7280] rounded-[10px] text-[12px] font-outfit font-medium hover:bg-[#F3F4F6] transition-colors">Cancel</button>
                </div>
            </motion.div>
        </div>
    );
};

// Main Page Component
const ReportsDownloads = () => {
    const [activeTab, setActiveTab] = useState('auto-generated');
    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const [selectedDocForRequest, setSelectedDocForRequest] = useState(null);

    const openRequest = (doc: any = null) => {
        setSelectedDocForRequest(doc);
        setRequestModalOpen(true);
    };

    return (
        <StudentLayout activePage="reports" onNavigate={(id: string) => window.location.href = `/student/${id}`}>
            <motion.div 
                className="w-full max-w-[1400px] mx-auto px-5 md:px-[28px] pt-[24px] pb-[64px]"
                initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
                {/* Header */}
                <motion.div initial={{opacity:0, y:16}} animate={{opacity:1, y:0}} className="pb-5 border-b border-[#F3F4F6] flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-[24px] font-fraunces italic font-light text-[#111827]">Reports & Downloads</h1>
                        <p className="text-[13px] font-outfit text-[#6B7280] mt-1">Official documents · Academic reports · Request tracking · Semester 6</p>
                        <p className="text-[11px] font-outfit text-[#9CA3AF] mt-1">All documents are digitally verified · Last synced: Today, 9:41 AM</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <div className="relative w-full sm:w-[260px] group">
                            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#1A56DB] transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search documents, certificates..." 
                                className="w-full h-10 pl-10 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] text-[13px] font-outfit outline-none focus:border-[#1A56DB] focus:ring-3 focus:ring-[#1A56DB]/12 transition-all sm:focus:w-[320px]"
                            />
                        </div>
                        <button onClick={() => openRequest()} className="w-full sm:w-auto h-10 px-[18px] flex items-center justify-center gap-2 bg-[#1A56DB] hover:bg-[#1648C0] text-white rounded-[10px] text-[13px] font-outfit font-medium transition-transform active:scale-97 shrink-0">
                            <Plus size={16} /> Request Document
                        </button>
                    </div>
                </motion.div>

                {/* Section A */}
                <SectionA_QuickStatus setActiveTab={setActiveTab} />

                {/* Section B: Summary Stat Cards */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <StatCard onClick={() => setActiveTab('auto-generated')} color="green" title="AVAILABLE NOW" value={6} badge={{label: "No processing needed", color: "green"}} icon={FileCheck} subtext="Auto-generated · Ready to download instantly" />
                    <StatCard onClick={() => setActiveTab('active')} color="amber" title="ACTIVE REQUESTS" value={1} badge={{label: "Processing", color: "amber"}} icon={Clock} subtext="Bonafide Certificate · Under review" />
                    <StatCard onClick={() => setActiveTab('history')} color="blue" title="TOTAL ISSUED" value={8} badge={{label: "2 new this semester", color: "blue"}} icon={FolderOpen} subtext="All time · Across all semesters" />
                    <StatCard onClick={() => setActiveTab('history')} color="amber" title="EXPIRING SOON" value={1} badge={{label: "Renew soon", color: "amber"}} icon={AlertCircle} subtext="Bonafide Certificate · Expires 14 Apr 2026" />
                </div>

                {/* Section C: Primary Tab Bar */}
                <div className="mt-6 bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm overflow-hidden">
                    <div className="h-12 bg-[#F9FAFB] border-b border-[#F3F4F6] px-2 md:px-6 flex overflow-x-auto custom-scrollbar gap-2 md:gap-8 relative">
                        {['Auto-Generated', 'Official Documents', 'Active Requests', 'History'].map((tabText, i) => {
                            const tVal = tabText.toLowerCase().replace(' ', '-');
                            const isActive = activeTab === tVal;
                            const counts = [6, 8, 1, 8];
                            return (
                                <button 
                                    key={tVal} onClick={() => setActiveTab(tVal)}
                                    className={`h-full flex items-center gap-2 text-[12px] md:text-[13px] font-outfit font-medium relative whitespace-nowrap px-2 md:px-0 transition-colors ${isActive ? 'text-[#1A56DB]' : 'text-[#6B7280] hover:text-[#374151]'}`}
                                >
                                    {tabText} 
                                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1A56DB]/10 text-[#1A56DB]`}>{counts[i]}</span>
                                    {isActive && <motion.div layoutId="tabIndRpts" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1A56DB] rounded-t-sm" />}
                                </button>
                            );
                        })}
                    </div>

                    <div className="p-4 md:p-6 pb-7">
                        {activeTab === 'auto-generated' && (
                            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.2}}>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1.5 rounded-full text-[12px] font-medium font-outfit bg-[#F3F4F6] text-[#374151] cursor-pointer">All</span>
                                    {['Marks', 'Attendance', 'Performance', 'CGPA'].map(f => (
                                        <span key={f} className="px-3 py-1.5 rounded-full text-[12px] font-medium font-outfit text-[#6B7280] hover:bg-[#F3F4F6] transition-colors border border-transparent cursor-pointer">{f}</span>
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {AUTO_GENERATED_REPORTS.map(doc => (
                                        <DocumentCard key={doc.id} doc={doc} type="auto" handlePreview={() => alert("Preview clicked")} />
                                    ))}
                                </div>
                                <div className="mt-5 bg-[#F9FAFB] border border-[#F3F4F6] rounded-[10px] p-3.5 px-5 flex justify-between items-center">
                                    <div>
                                        <h4 className="text-[13px] font-outfit font-medium text-[#374151]">Download all auto-generated reports</h4>
                                        <p className="text-[11px] font-mono text-[#9CA3AF] mt-0.5">6 reports · Combined ZIP file · ~1.4 MB</p>
                                    </div>
                                    <button className="h-9 px-4 border border-[#E5E7EB] rounded-lg text-[12px] font-outfit font-medium flex items-center gap-2 hover:bg-white text-[#374151] transition-colors"><Archive size={14}/> Download All (ZIP)</button>
                                </div>
                            </motion.div>
                        )}
                        
                        {activeTab === 'official-documents' && (
                            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.2}}>
                                <div className="flex flex-wrap gap-2 mb-4 mt-2">
                                    <span className="px-3 py-1.5 rounded-full text-[12px] font-medium font-outfit bg-[#F3F4F6] text-[#374151] cursor-pointer">All</span>
                                    {['Certificate', 'Letter', 'NOC', 'Transcript'].map(f => (
                                        <span key={f} className="px-3 py-1.5 rounded-full text-[12px] font-medium font-outfit text-[#6B7280] hover:bg-[#F3F4F6] transition-colors border border-transparent cursor-pointer">{f}</span>
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {OFFICIAL_DOCUMENTS.map(doc => (
                                        <DocumentCard key={doc.id} doc={doc} type="official" openRequestModal={openRequest} />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'active-requests' && (
                            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.2}} className="pt-2">
                                {ACTIVE_REQUESTS_MOCK.map(req => (
                                    <div key={req.id} className="bg-white border border-[#E5E7EB] rounded-[14px] p-5 md:p-6 shadow-sm mb-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-[14px] font-outfit font-bold text-[#111827]">{req.title}</h3>
                                                <p className="text-[12px] font-outfit text-[#6B7280] mt-1">{req.purpose}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[11px] font-mono text-[#9CA3AF] mb-1">{req.id}</p>
                                                <p className="text-[12px] font-mono text-[#9CA3AF]">{req.submittedDate}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Progress Timeline placeholder */}
                                        <div className="w-full mt-6 mb-7 relative">
                                            <div className="absolute top-1/2 -translate-y-1/2 w-full h-[2px] bg-[#E5E7EB]">
                                                <div className="h-full bg-[#1A56DB] w-1/3" />
                                            </div>
                                            <div className="relative z-10 flex justify-between">
                                                <div className="w-6 h-6 rounded-full bg-[#1A56DB] flex flex-col items-center justify-center text-white ring-4 ring-white"><Check size={12}/> <span className="absolute top-8 text-[11px] font-outfit font-medium text-[#374151]">Submitted</span></div>
                                                <div className="w-6 h-6 rounded-full border-2 border-[#1A56DB] bg-white flex items-center justify-center ring-4 ring-white shadow-[0_0_0_4px_rgba(26,86,219,0.15)]"><div className="w-2 h-2 rounded-full bg-[#1A56DB]"/> <span className="absolute top-8 text-[11px] font-outfit font-medium text-[#1A56DB] whitespace-nowrap">Under review</span></div>
                                                <div className="w-6 h-6 rounded-full bg-[#E5E7EB] border border-[#D1D5DB] flex items-center justify-center ring-4 ring-white"><span className="absolute top-8 text-[11px] font-outfit font-medium text-[#9CA3AF]">Approved</span></div>
                                                <div className="w-6 h-6 rounded-full bg-[#E5E7EB] border border-[#D1D5DB] flex items-center justify-center ring-4 ring-white"><span className="absolute top-8 text-[11px] font-outfit font-medium text-[#9CA3AF] whitespace-nowrap">Ready for collection</span></div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <p className="text-[12px] font-outfit text-[#6B7280]">{req.statusLine}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[12px] font-outfit font-medium text-[#374151]">Notify me</span>
                                                <div className="w-8 h-[18px] bg-[#1A56DB] rounded-full p-0.5 cursor-pointer flex justify-end">
                                                    <div className="w-[14px] h-[14px] bg-white rounded-full shadow-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'history' && (
                            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.2}}>
                                <div className="mb-4 bg-[#F59E0B]/10 border border-[#F59E0B]/30 p-2.5 px-4 rounded-lg flex items-center gap-2">
                                    <span className="text-[12px] font-outfit text-[#92400E]">1 document expiring soon: Bonafide Certificate expires in 24 days · Re-request if needed.</span>
                                    <span className="text-[12px] font-outfit font-bold text-[#D97706] hover:underline cursor-pointer ml-auto">Re-request now →</span>
                                </div>
                                <Tab4History />
                            </motion.div>
                        )}

                    </div>
                </div>

                {/* Section D */}
                <SectionD_DocumentGuide />

                {/* Section E */}
                <SectionE_InsightsStrip />

            </motion.div>
            
            <RequestModal isOpen={requestModalOpen} onClose={() => setRequestModalOpen(false)} preselected={selectedDocForRequest} />
        </StudentLayout>
    );
};

export default ReportsDownloads;
