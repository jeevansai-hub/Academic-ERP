import React, { useEffect, useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
  BarChart, Bar
} from 'recharts';
import { 
  Users, GraduationCap, BookOpen, AlertCircle, 
  Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal,
  ChevronRight, Calendar, Database, Shield
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Dashboard: React.FC = () => {
  const { students, faculty, subjects, auditLogs } = useAdmin();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const stats = [
    { label: 'Total Students', value: students.length.toLocaleString(), sub: '+120 this semester', icon: <Users />, color: 'blue', trend: 'up', trendVal: '12%' },
    { label: 'Active Faculty', value: faculty.length.toLocaleString(), sub: '+3 this year', icon: <GraduationCap />, color: 'purple', trend: 'up', trendVal: '4%' },
    { label: 'Total Subjects', value: subjects.length.toLocaleString(), sub: 'Running this semester', icon: <BookOpen />, color: 'orange', trend: 'neutral', trendVal: '0%' },
    { label: 'Backlog Alert', value: '47', sub: 'Action required', icon: <AlertCircle />, color: 'red', trend: 'down', trendVal: '8%' },
    { label: 'System Health', value: '99.9%', sub: 'OPERATIONAL', icon: <Shield />, color: 'green', trend: 'neutral', trendVal: '0%' },
  ];

  const chartData = [
    { name: 'Mon', students: 400, faculty: 240 },
    { name: 'Tue', students: 300, faculty: 139 },
    { name: 'Wed', students: 200, faculty: 980 },
    { name: 'Thu', students: 278, faculty: 390 },
    { name: 'Fri', students: 189, faculty: 480 },
    { name: 'Sat', students: 239, faculty: 380 },
    { name: 'Sun', students: 349, faculty: 430 },
  ];

  if (!isLoaded) return null;

  return (
    <div className="adm-root" style={{ animation: 'adm-fadeUp 400ms var(--ease-out)' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)',
        borderRadius: '16px', padding: '32px', marginBottom: '24px', position: 'relative',
        overflow: 'hidden', color: '#fff'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>Admin Control Center</h1>
          <p style={{ opacity: 0.7, fontSize: '14px', marginBottom: '20px' }}>Vignan's IIT — ECAP Portal Management</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{ 
              background: 'rgba(255,255,255,0.12)', padding: '6px 12px', borderRadius: '20px', 
              fontSize: '11px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              <div style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%' }}></div>
              All Systems Operational
            </span>
            <span style={{ 
              background: 'rgba(255,255,255,0.12)', padding: '6px 12px', borderRadius: '20px', 
              fontSize: '11px', fontWeight: 500
            }}>
              📅 {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
        {/* Decor */}
        <div style={{
          position: 'absolute', right: '-20px', bottom: '-20px', width: '200px', height: '200px',
          background: 'rgba(255,255,255,0.05)', borderRadius: '50%'
        }}></div>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' 
      }}>
        {stats.map((s, i) => (
          <div key={i} className="adm-card adm-card-interactive" style={{ padding: '20px', animationDelay: `${i * 70}ms` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--t4)', textTransform: 'uppercase' }}>{s.label}</div>
              <div style={{ 
                width: '36px', height: '36px', borderRadius: '10px', 
                background: `var(--${s.color}l)`, color: `var(--${s.color})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {s.icon}
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--t1)', fontFamily: 'DM Mono' }}>{s.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              {s.trend === 'up' && <ArrowUpRight size={14} color="#10b981" />}
              {s.trend === 'down' && <ArrowDownRight size={14} color="#ef4444" />}
              <span style={{ 
                fontSize: '11px', fontWeight: 600, 
                color: s.trend === 'up' ? '#10b981' : s.trend === 'down' ? '#ef4444' : 'var(--t4)' 
              }}>{s.trendVal}</span>
              <span style={{ fontSize: '11px', color: 'var(--t4)' }}>{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '4.5fr 3.5fr 2fr', gap: '16px', marginBottom: '24px' }}>
        {/* Portal Activity */}
        <div className="adm-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
             <div>
               <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--t1)' }}>Portal Activity</h3>
               <p style={{ fontSize: '12px', color: 'var(--t4)' }}>Last 7 Days Usage</p>
             </div>
             <div style={{ display: 'flex', gap: '4px', background: 'var(--bdl)', padding: '3px', borderRadius: '8px' }}>
               <button className="adm-btn" style={{ height: '26px', fontSize: '11px', background: 'var(--p)', color: '#fff' }}>Both</button>
               <button className="adm-btn adm-btn-ghost" style={{ height: '26px', fontSize: '11px' }}>Students</button>
             </div>
          </div>
          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="students" stroke="#2563eb" fillOpacity={1} fill="url(#colorStudents)" strokeWidth={2} />
                <Area type="monotone" dataKey="faculty" stroke="#7c3aed" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="adm-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Recent Activity</h3>
            <button style={{ background: 'none', border: 'none', color: 'var(--p)', fontSize: '12px', cursor: 'pointer' }}>View All →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {auditLogs.slice(0, 5).map((log, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', borderLeft: '2px solid var(--bdl)', paddingLeft: '16px', position: 'relative' }}>
                <div style={{ 
                  position: 'absolute', left: '-5px', top: '0', width: '8px', height: '8px', 
                  borderRadius: '50%', background: log.action === 'CREATE' ? 'var(--s)' : 'var(--p)'
                }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--t1)' }}>{log.details}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--t4)' }}>{log.userName}</span>
                    <span style={{ fontSize: '11px', color: 'var(--t4)' }}>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="adm-card">
           <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>System Alerts</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'var(--dl)', borderLeft: '3px solid var(--d)', padding: '12px', borderRadius: '8px' }}>
               <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--d)' }}>Critical</div>
               <div style={{ fontSize: '12px', color: 'var(--t2)', marginTop: '2px' }}>47 students at backlog risk.</div>
               <button style={{ border: 'none', background: 'none', color: 'var(--d)', fontSize: '11px', fontWeight: 600, marginTop: '8px', cursor: 'pointer' }}>View Students</button>
            </div>
            <div style={{ background: 'var(--wl)', borderLeft: '3px solid var(--w)', padding: '12px', borderRadius: '8px' }}>
               <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--w)' }}>Warning</div>
               <div style={{ fontSize: '12px', color: 'var(--t2)', marginTop: '2px' }}>8 faculty pending uploads.</div>
               <button style={{ border: 'none', background: 'none', color: 'var(--w)', fontSize: '11px', fontWeight: 600, marginTop: '8px', cursor: 'pointer' }}>Send Reminders</button>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Overview */}
      <div className="adm-table-container">
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Branch-wise Overview</h3>
          <button className="adm-btn adm-btn-outline">Export CSV</button>
        </div>
        <table className="adm-table">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Students</th>
              <th>Avg CGPA</th>
              <th>Backlogs</th>
              <th>Pass Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'CSE', count: 480, cgpa: 8.2, backlogs: 5, rate: '98%', status: 'Healthy' },
              { name: 'IT', count: 240, cgpa: 8.1, backlogs: 2, rate: '99%', status: 'Healthy' },
              { name: 'ECE', count: 360, cgpa: 7.8, backlogs: 12, rate: '92%', status: 'Healthy' },
              { name: 'MECH', count: 300, cgpa: 7.2, backlogs: 8, rate: '94%', status: 'Healthy' },
            ].map((b, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{b.name}</td>
                <td>{b.count}</td>
                <td style={{ fontWeight: 700, color: 'var(--p)', fontFamily: 'DM Mono' }}>{b.cgpa}</td>
                <td>
                  <span className="adm-badge" style={{ background: b.backlogs > 10 ? 'var(--dl)' : 'transparent', color: b.backlogs > 10 ? 'var(--d)' : 'inherit' }}>
                    {b.backlogs}
                  </span>
                </td>
                <td>{b.rate}</td>
                <td>
                  <span className="adm-badge" style={{ background: 'var(--sl)', color: 'var(--s)' }}>
                    <div className="adm-badge-dot" style={{ background: 'var(--s)' }}></div>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
