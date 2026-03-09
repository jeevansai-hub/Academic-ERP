import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, GraduationCap, BookOpen, AlertTriangle,
  CheckCircle2, XCircle, FileText, Download,
  AlertCircle, MessageSquare, Clock
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { studentInfo, sgpaTrend, subjects, recentActivity } from '../../data/studentData';

// Count-up hook
const useCountUp = (target: number, duration = 800, decimals = 0) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Number(start.toFixed(decimals)));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, decimals]);
  return val;
};

const cardStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } }
};
const cardItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

const Dashboard: React.FC = () => {
  const sgpa = useCountUp(7.60, 800, 2);
  const cgpa = useCountUp(8.04, 800, 2);
  const totalSub = useCountUp(6, 800);
  const backlogs = useCountUp(1, 800);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const barData = subjects.map(s => ({
    name: s.code, percentage: s.percentage, status: s.status, fullName: s.name,
  }));

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="rounded-xl p-7"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderLeft: '3px solid var(--blue)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="font-title text-[28px]" style={{ color: 'var(--text-primary)' }}>
              {greeting}, {studentInfo.name}
            </h1>
            <div className="flex flex-wrap items-center gap-5 mt-3">
              {[
                { icon: GraduationCap, text: studentInfo.rollNo, mono: true },
                { icon: BookOpen, text: `Semester ${studentInfo.semester}` },
                { icon: FileText, text: studentInfo.department },
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                  <item.icon size={14} />
                  <span className={item.mono ? 'font-mono' : ''}>{item.text}</span>
                </span>
              ))}
            </div>
          </div>
          <span className="text-[12px] whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
            <span className="font-mono">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </span>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        variants={cardStagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            icon: TrendingUp, iconColor: 'var(--blue)', iconBg: 'var(--blue-light)',
            badge: 'Good', badgeColor: 'var(--green)', badgeBg: 'var(--green-light)',
            label: 'CURRENT SGPA', value: sgpa.toFixed(2), sub: 'Semester 6',
          },
          {
            icon: GraduationCap, iconColor: 'var(--green)', iconBg: 'var(--green-light)',
            label: 'AVERAGE CGPA', value: cgpa.toFixed(2), sub: 'Till Semester 6',
          },
          {
            icon: BookOpen, iconColor: 'var(--purple)', iconBg: 'var(--purple-light)',
            label: 'TOTAL SUBJECTS', value: totalSub.toString(), sub: null,
            subStats: [
              { icon: CheckCircle2, text: '5 Passed', color: 'var(--green)' },
              { icon: XCircle, text: '1 Failed', color: 'var(--red)' },
            ],
          },
          {
            icon: AlertTriangle, iconColor: 'var(--red)', iconBg: 'var(--red-light)',
            badge: 'Action Required', badgeColor: 'var(--red)', badgeBg: 'var(--red-light)',
            label: 'BACKLOGS COUNT', value: backlogs.toString(),
            sub: 'Requires immediate attention', subColor: 'var(--red)',
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            variants={cardItem}
            className="rounded-xl p-6 relative overflow-hidden cursor-default"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 200ms ease-out, box-shadow 200ms ease-out, border-color 200ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--border-strong)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              e.currentTarget.style.borderColor = 'var(--border-default)';
            }}
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: card.iconBg, border: `1px solid ${card.iconColor}20` }}>
                <card.icon size={16} strokeWidth={1.5} style={{ color: card.iconColor }} />
              </div>
              {card.badge && (
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full"
                  style={{ background: card.badgeBg, color: card.badgeColor }}>
                  {card.badge}
                </span>
              )}
            </div>
            <p className="text-[11px] font-medium tracking-[1.5px] uppercase mt-4"
              style={{ color: 'var(--text-label)' }}>{card.label}</p>
            <p className="font-mono text-[32px] font-medium mt-1" style={{ color: 'var(--text-primary)' }}>
              {card.value}
            </p>
            {card.sub && (
              <p className="text-[12px] mt-1" style={{ color: card.subColor || 'var(--text-muted)' }}>
                {card.sub}
              </p>
            )}
            {card.subStats && (
              <div className="flex items-center gap-3 mt-2">
                {card.subStats.map((s, j) => (
                  <span key={j} className="flex items-center gap-1 text-[12px]" style={{ color: s.color }}>
                    <s.icon size={12} /> {s.text}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="rounded-xl py-5 px-6"
        style={{
          background: 'var(--red-light)',
          border: '1px solid rgba(220,38,38,0.2)',
          borderLeft: '3px solid var(--red)',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={16} style={{ color: 'var(--red)' }} />
          <span className="text-[14px] font-semibold" style={{ color: 'var(--red)' }}>Important Alerts</span>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5 text-[13px]">
            <XCircle size={14} style={{ color: 'var(--red)' }} />
            <span style={{ color: 'var(--red)' }} className="font-semibold">Mathematics</span>
            <span style={{ color: 'var(--text-secondary)' }}>— Failed (46%)</span>
          </div>
          <div className="flex items-center gap-2.5 text-[13px]">
            <AlertCircle size={14} style={{ color: 'var(--amber)' }} />
            <span style={{ color: 'var(--amber)' }} className="font-semibold">Mathematics</span>
            <span style={{ color: 'var(--text-secondary)' }}>— Backlog pending (2 attempts left)</span>
          </div>
        </div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SGPA Trend */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="rounded-xl p-6"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>SGPA Trend</span>
            <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>Semester 1 — 6</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sgpaTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-faint)" vertical={false} />
              <XAxis dataKey="sem" tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} />
              <YAxis domain={[6, 10]} tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#0f172a', border: 'none', borderRadius: 8, padding: '10px 14px',
                }}
                labelStyle={{ color: '#fff', fontFamily: 'DM Sans', fontSize: 11, fontWeight: 500 }}
                itemStyle={{ color: 'var(--green)', fontFamily: 'JetBrains Mono', fontSize: 13 }}
                formatter={(value: number) => [value.toFixed(1), 'SGPA']}
              />
              <Line
                type="monotone" dataKey="sgpa" stroke="var(--green)" strokeWidth={2.5}
                dot={{ r: 4, fill: 'var(--green)', stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Subject Performance */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="rounded-xl p-6"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>Subject Performance</span>
            <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>Semester 6</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-faint)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" width={50} tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 8, padding: '10px 14px' }}
                labelStyle={{ color: '#fff', fontFamily: 'DM Sans', fontSize: 11 }}
                itemStyle={{ fontFamily: 'JetBrains Mono', fontSize: 13 }}
                formatter={(value: number, name: string, entry: any) => [
                  `${value}%`,
                  entry.payload.fullName
                ]}
              />
              <Bar dataKey="percentage" radius={[0, 4, 4, 0]} animationDuration={600} animationEasing="ease-out">
                {barData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.status === 'Fail' ? 'var(--red)' : 'var(--blue)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.45 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {[
          { icon: FileText, label: 'View Marks', page: 'marks' },
          { icon: Download, label: 'Download Report', page: 'reports' },
          { icon: AlertCircle, label: 'Check Backlogs', page: 'backlogs' },
          { icon: MessageSquare, label: 'View Remarks', page: 'remarks' },
        ].map((action, i) => (
          <div
            key={i}
            className="rounded-xl py-5 px-4 flex flex-col items-center gap-2.5 cursor-pointer"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              transition: 'all 200ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderLeft = '2px solid var(--blue)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderLeft = '1px solid var(--border-default)';
            }}
          >
            <action.icon size={20} style={{ color: 'var(--blue)' }} />
            <span className="text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>{action.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="rounded-xl p-6"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Activity</span>
          <Clock size={14} style={{ color: 'var(--text-muted)' }} />
        </div>
        {recentActivity.map((a, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-2.5"
            style={{ borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border-faint)' : 'none' }}
          >
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: a.color }} />
            <span className="flex-1 text-[13px]" style={{ color: 'var(--text-primary)' }}>{a.text}</span>
            <span className="font-mono text-[11px] flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{a.time}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
