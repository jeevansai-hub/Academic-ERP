import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  BarChart3, Download, Filter, Calendar, 
  TrendingUp, TrendingDown, Minus, Target
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('This Semester');

  const performanceData = [
    { name: 'CSE', score: 8.2, trend: 0.2 },
    { name: 'IT', score: 8.1, trend: 0.1 },
    { name: 'ECE', score: 7.8, trend: -0.1 },
    { name: 'Mech', score: 7.2, trend: 0.3 },
    { name: 'Civil', score: 7.5, trend: 0.0 },
    { name: 'EEE', score: 7.1, trend: -0.2 },
  ];

  const distributionData = [
    { name: '9.0 - 10.0', value: 120 },
    { name: '8.0 - 8.9', value: 450 },
    { name: '7.0 - 7.9', value: 980 },
    { name: '6.0 - 6.9', value: 650 },
    { name: 'Below 6.0', value: 200 },
  ];

  const COLORS = ['#2563eb', '#7c3aed', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="adm-root" style={{ animation: 'adm-fadeUp 400ms var(--ease-out)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 className="adm-title">Analytics & Reports</h1>
          <p className="adm-subtitle">Advanced data visualization of institutional performance</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="adm-btn adm-btn-outline">
            <Download size={16} /> Download Report
          </button>
          <div style={{ display: 'flex', gap: '4px', background: 'var(--c)', border: '1px solid var(--bd)', padding: '3px', borderRadius: '10px' }}>
            <button className="adm-btn adm-btn-ghost" style={{ height: '32px', fontSize: '12px' }}>This Year</button>
            <button className="adm-btn" style={{ height: '32px', fontSize: '12px', background: 'var(--p)', color: '#fff' }}>This Semester</button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Portal Avg CGPA', value: '7.85', trend: 'up', val: '+0.12' },
          { label: 'Overall Pass Rate', value: '94.2%', trend: 'up', val: '+2.1%' },
          { label: 'Attendance Avg', value: '88.4%', trend: 'down', val: '-1.5%' },
          { label: 'Assessment Score', value: '14.2 / 20', trend: 'neutral', val: '0.0' },
        ].map((s, i) => (
          <div key={i} className="adm-card" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--t4)', textTransform: 'uppercase' }}>{s.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '8px' }}>
               <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--t1)', fontFamily: 'DM Mono' }}>{s.value}</div>
               <div style={{ 
                 fontSize: '12px', fontWeight: 500, 
                 color: s.trend === 'up' ? 'var(--s)' : s.trend === 'down' ? 'var(--d)' : 'var(--t4)',
                 display: 'flex', alignItems: 'center', gap: '2px'
               }}>
                 {s.trend === 'up' ? <TrendingUp size={14} /> : s.trend === 'down' ? <TrendingDown size={14} /> : <Minus size={14} />}
                 {s.val}
               </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {/* Branch Performance */}
        <div className="adm-card">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px' }}>Branch Performance Comparison</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--sh-lg)' }} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={40}>
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="adm-card">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px' }}>Student CGPA Distribution</h3>
          <div style={{ height: '300px', display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ paddingRight: '40px' }}>
               {distributionData.map((d, i) => (
                 <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: COLORS[i % COLORS.length] }}></div>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--t2)', whiteSpace: 'nowrap' }}>{d.name}</span>
                    <span style={{ fontSize: '12px', color: 'var(--t4)', marginLeft: 'auto' }}>{d.value}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
