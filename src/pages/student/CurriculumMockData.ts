export const SUBJECT_MOCK_DATA = [
  {
    id: 'CS603',
    code: 'CS603',
    name: 'Database Management Systems',
    type: 'theory',
    faculty: 'Dr. Ramesh Kumar',
    credits: 4,
    units: 5,
    topicsCount: 24,
    performance: { score: 69.3, color: 'amber' },
    unitData: [
      {
        unitNumber: 1,
        name: 'Introduction to DBMS',
        weightage: 15,
        topics: [
          { name: 'Intro to DBMS', examFreq: 'none', performance: 'none' },
          { name: 'DBMS Architecture', examFreq: 'amber', performance: 'none' },
          { name: 'File System vs DBMS', examFreq: 'none', performance: 'none' },
          { name: 'Three-tier Architecture', examFreq: 'amber', performance: 'none' }
        ]
      },
      {
        unitNumber: 2,
        name: 'ER Model & Relational Model',
        weightage: 20,
        topics: [
          { name: 'Entity-Relationship Model', examFreq: 'red', performance: 'none' },
          { name: 'ER Diagram', examFreq: 'none', performance: 'none' },
          { name: 'Extended ER', examFreq: 'none', performance: 'none' },
          { name: 'Relational Model', examFreq: 'red', performance: 'none' },
          { name: 'Relational Algebra', examFreq: 'amber', performance: 'none' }
        ]
      },
      {
        unitNumber: 3,
        name: 'Normalization',
        weightage: 30,
        topics: [
          { name: '1NF', examFreq: 'red', performance: 'none', hasVideo: true },
          { name: '2NF', examFreq: 'amber', performance: 'none' },
          { name: '3NF', examFreq: 'red', performance: 'Weak' },
          { name: 'BCNF', examFreq: 'amber', performance: 'none' },
          { name: '4NF', examFreq: 'none', performance: 'none' },
          { name: '5NF', examFreq: 'none', performance: 'none' },
          { name: 'Multivalued Dependency', examFreq: 'none', performance: 'none' }
        ]
      },
      {
        unitNumber: 4,
        name: 'Transactions & Concurrency',
        weightage: 20,
        topics: [
          { name: 'Transaction Concepts', examFreq: 'amber', performance: 'Average' },
          { name: 'ACID Properties', examFreq: 'red', performance: 'Strong' },
          { name: 'Serializability', examFreq: 'amber', performance: 'none' },
          { name: 'Concurrency Control', examFreq: 'amber', performance: 'none' },
          { name: 'Two-Phase Locking', examFreq: 'none', performance: 'none' }
        ]
      },
      {
        unitNumber: 5,
        name: 'Indexing & Query Optimization',
        weightage: 15,
        topics: [
          { name: 'Indexing Concepts', examFreq: 'none', performance: 'none' },
          { name: 'B-Tree Index', examFreq: 'red', performance: 'none' },
          { name: 'Hash Index', examFreq: 'none', performance: 'none' }
        ]
      }
    ]
  },
  {
    id: 'CS602',
    code: 'CS602',
    name: 'Operating Systems',
    type: 'theory',
    faculty: 'Dr. Priya Sharma',
    credits: 4,
    units: 6,
    topicsCount: 28,
    performance: { score: 77.3, color: 'green' }
  },
  {
    id: 'MA601',
    code: 'MA601',
    name: 'Engineering Mathematics',
    type: 'theory',
    faculty: 'Dr. Suresh Nair',
    credits: 4,
    units: 5,
    topicsCount: 22,
    performance: { score: 60.0, color: 'amber' }
  },
  {
    id: 'EC601',
    code: 'EC601',
    name: 'Digital Circuits',
    type: 'theory',
    faculty: 'Dr. Anjali Menon',
    credits: 4,
    units: 6,
    topicsCount: 26,
    performance: { score: 83.2, color: 'green' }
  },
  {
    id: 'CS603L',
    code: 'CS603L',
    name: 'Database Management Systems Lab',
    type: 'lab',
    faculty: 'Dr. Ramesh Kumar',
    credits: 2,
    experimentsCount: 8,
    tools: ['MySQL', 'SQL Server'],
    performance: { score: 85.0, color: 'green' },
    experiments: [
        { id: 'E1', title: 'Create and Manage Databases using SQL', objective: 'Understand DDL commands.', tools: ['MySQL'], marks: 25, status: 'Completed' },
        { id: 'E2', title: 'SQL DML Operations (INSERT, UPDATE, DELETE)', objective: 'Practice data manipulation.', tools: ['MySQL'], marks: 25, status: 'Completed' },
        { id: 'E3', title: 'SQL Joins (Inner, Outer, Cross)', objective: 'Understand join operations.', tools: ['MySQL'], marks: 25, status: 'Completed' },
        { id: 'E4', title: 'Subqueries and Nested Queries', objective: 'Advanced query writing.', tools: ['MySQL'], marks: 25, status: 'Pending' },
        { id: 'E5', title: 'Normalization Implementation (1NF to 3NF)', objective: 'Apply normalization in SQL.', tools: ['MySQL'], marks: 25, status: 'Pending' },
        { id: 'E6', title: 'Stored Procedures and Functions', objective: 'Programmability in DB.', tools: ['MySQL'], marks: 25, status: 'Not attempted' },
        { id: 'E7', title: 'Triggers and Cursors', objective: 'Advanced triggers.', tools: ['MySQL'], marks: 25, status: 'Not attempted' },
        { id: 'E8', title: 'Transaction Management and ACID Properties', objective: 'Understanding transactions.', tools: ['MySQL'], marks: 25, status: 'Not attempted' },
    ]
  },
  {
    id: 'CS602L',
    code: 'CS602L',
    name: 'Operating Systems Lab',
    type: 'lab',
    faculty: 'Dr. Priya Sharma',
    credits: 2,
    experimentsCount: 10,
    tools: ['Linux Shell', 'C'],
    performance: { score: 72.0, color: 'amber' }
  },
  {
    id: 'EC601L',
    code: 'EC601L',
    name: 'Digital Circuits Lab',
    type: 'lab',
    faculty: 'Dr. Anjali Menon',
    credits: 2,
    experimentsCount: 8,
    tools: ['Breadboard', 'Multimeter', 'Logic Gates'],
    performance: { score: 88.0, color: 'green' }
  },
  {
    id: 'MA601L',
    code: 'MA601L',
    name: 'Engineering Mathematics Lab (Computational)',
    type: 'lab',
    faculty: 'Dr. Suresh Nair',
    credits: 1,
    experimentsCount: 6,
    tools: ['MATLAB', 'Python'],
    performance: { score: 79.5, color: 'green' }
  }
];
