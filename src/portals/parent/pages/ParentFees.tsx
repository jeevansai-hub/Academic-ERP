import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParentAuth } from '../context/ParentContext';
import { subscribeToStudentFees, updateFeeTransaction } from '../utils/parentFirestore';
import { formatCurrency } from '../utils/formatters';
import { generateReceiptPDF } from '../utils/generateReceiptPDF';
import { 
  CreditCard, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone,
  Info,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import ParentSkeletonLoader from '../components/ParentSkeletonLoader';

const ParentFees: React.FC = () => {
    const { parentProfile, studentProfile, loading: contextLoading, activeStudentUID } = useParentAuth();
    const [loading, setLoading] = useState(true);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [fees, setFees] = useState<any[]>([]);
    const [processing, setProcessing] = useState<string | null>(null);
    const [paymentSuccess, setPaymentSuccess] = useState<any>(null);

    useEffect(() => {
        setPageLoaded(true);
        const studentId = studentProfile?.rollNo || studentProfile?.uid || activeStudentUID;

        if (!studentId) {
           if (!contextLoading) setLoading(false);
           return;
        }

        const unsub = subscribeToStudentFees(studentId, (data) => {
            setFees(data);
            setLoading(false);
        });
        return () => unsub();
    }, [studentProfile?.rollNo, studentProfile?.uid, activeStudentUID, contextLoading]);

    const handleMockPayment = async (fee: any) => {
        if (!fee.id) return;
        setProcessing(fee.id);
        
        // Simulate PG latency
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        try {
            const receiptNo = `RCP-${Math.floor(100000 + Math.random() * 900000)}`;
            const transactionData = {
                status: 'Paid' as any,
                paidDate: new Date().toISOString(),
                receiptNumber: receiptNo,
                transactionId: `TXN-${Date.now()}`
            };
            
            await updateFeeTransaction(fee.id, transactionData);
            setPaymentSuccess({ ...fee, ...transactionData });
            setProcessing(null);
        } catch (err) {
            console.error(err);
            setProcessing(null);
        }
    };

    const downloadReceipt = (fee: any) => {
        generateReceiptPDF(fee, studentProfile, parentProfile);
    };

    const itemVariant = {
        hidden: { opacity: 0, scale: 0.98, y: 12 },
        show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
    };

    if (loading || contextLoading) return <ParentSkeletonLoader type="page" />;

    return (
        <motion.div 
            initial="hidden" animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="space-y-8 pb-12"
        >
            {/* Header Area */}
            <motion.div variants={itemVariant} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                   <h1 className="text-[28px] font-fraunces font-light italic text-[#111827]">Fees & Payments</h1>
                   <p className="text-[13px] text-[#6B7280] font-outfit mt-1">Manage academic dues and download digital receipts for {studentProfile?.name || 'Student'}</p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-blue-50/50 rounded-2xl border border-blue-100">
                   <ShieldCheck size={18} className="text-blue-600" />
                   <span className="text-[12px] font-bold text-blue-700 uppercase tracking-tighter">SECURE GATEWAY</span>
                </div>
            </motion.div>

            {/* Success Overlay */}
            <AnimatePresence>
                {paymentSuccess && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                   >
                     <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl space-y-6"
                     >
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
                           <CheckCircle2 size={40} className="text-white" />
                        </div>
                        <div className="space-y-2">
                           <h2 className="text-2xl font-bold text-gray-900 font-outfit">Payment Successful!</h2>
                           <p className="text-sm text-gray-500 font-medium">Transaction ID: {paymentSuccess.transactionId}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl text-left border border-gray-100 italic text-[13px] text-gray-600">
                           A confirmation email has been sent to your registered email address.
                        </div>
                        <div className="grid grid-cols-1 gap-3 pt-4">
                           <button 
                             onClick={() => downloadReceipt(paymentSuccess)}
                             className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                           >
                             <Download size={18} /> Download Receipt
                           </button>
                           <button 
                             onClick={() => setPaymentSuccess(null)}
                             className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                           >
                             Close
                           </button>
                        </div>
                     </motion.div>
                   </motion.div>
                )}
            </AnimatePresence>

            {/* Fee Items List */}
            <div className="space-y-6">
                {fees.length > 0 ? fees.map((f, i) => (
                    <motion.div 
                        key={i} 
                        variants={itemVariant}
                        className={`group bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-sm transition-all hover:shadow-xl hover:translate-y-[-2px]
                           ${f.status === 'Paid' ? 'border-l-[4px] border-l-green-500' : (f.status === 'Overdue' ? 'border-l-[4px] border-l-red-500' : 'border-l-[4px] border-l-amber-500')}`}
                    >
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                            <div className="flex gap-6 items-start">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm
                                   ${f.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                    <CreditCard size={28} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-[18px] font-bold text-gray-900 font-outfit">{f.feeType}</h3>
                                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest
                                           ${f.status === 'Paid' ? 'bg-green-50 text-green-600 border border-green-100' : 
                                             f.status === 'Overdue' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                            {f.status}
                                        </span>
                                    </div>
                                    <p className="text-[14px] text-gray-500 font-medium">Semester: <span className="text-gray-900">{f.semester}</span> | Due Date: <span className={f.status === 'Overdue' ? 'text-red-500 font-bold' : 'text-gray-900'}>{f.dueDate ? new Date(f.dueDate).toLocaleDateString() : '—'}</span></p>
                                </div>
                            </div>

                            <div className="flex items-center gap-12 w-full lg:w-auto border-t lg:border-none pt-6 lg:pt-0">
                                <div className="text-right flex-1 lg:flex-none">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount Payable</p>
                                    <p className="text-[28px] font-mono font-bold text-[#0C2461] leading-none mt-1">{formatCurrency(f.amount)}</p>
                                </div>
                                
                                <div className="flex-1 lg:flex-none min-w-[140px]">
                                    {f.status === 'Paid' ? (
                                        <button 
                                            onClick={() => downloadReceipt(f)}
                                            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all text-sm group-hover:border-blue-300"
                                        >
                                            <Download size={16} /> Receipt
                                        </button>
                                    ) : (
                                        <button 
                                            disabled={processing === f.id}
                                            onClick={() => handleMockPayment(f)}
                                            className={`w-full py-4 rounded-2xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2
                                               ${processing === f.id ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#0C2461] text-white hover:bg-[#1A56DB] active:scale-95'}`}
                                        >
                                            {processing === f.id ? (
                                                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                                            ) : (
                                                <>Pay Now <ArrowUpRight size={18} /></>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )) : (
                    <motion.div variants={itemVariant} className="p-20 text-center bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200">
                        <Smartphone size={48} className="mx-auto text-gray-300 mb-6" />
                        <h3 className="text-xl font-bold text-gray-900 font-outfit">No Pending Dues</h3>
                        <p className="text-sm text-gray-500 mt-2">All academic fees for this student are currently up to date.</p>
                    </motion.div>
                )}
            </div>

            {/* Support Info Strip */}
            <motion.div variants={itemVariant} className="bg-gray-50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100">
               <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                     <Info size={20} />
                  </div>
                  <div>
                     <h4 className="font-bold text-gray-900 font-outfit">Payment Support</h4>
                     <p className="text-[13px] text-gray-500 mt-1 font-medium leading-relaxed">
                        Payments take up to 24 hours to reflect in the portal registry. For urgent queries, contact the accounts office.
                     </p>
                  </div>
               </div>
               <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shrink-0">
                  Fee Catalog <ExternalLink size={16} />
               </button>
            </motion.div>
        </motion.div>
    );
};

export default ParentFees;
