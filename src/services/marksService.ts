import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  writeBatch, 
  orderBy, 
  updateDoc,
  onSnapshot,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase/config";

// --- Types & Interfaces ---

export interface WeeklyMarksEntry {
  studentId: string;
  score: number;
  attempt: 'present' | 'absent';
  remark?: string;
}

export interface WeeklyMarksPayload {
  subjectCode: string;
  section: string;
  week: number;
  date: string;
  maxMarks: number;
  semester: number;
  academicYear: string;
  enteredBy: string;
  entries: WeeklyMarksEntry[];
}

export interface MidMarksEntry {
  studentId: string;
  partA: number;
  partB: number;
  total: number;
  status: 'pass' | 'fail';
}

export interface MidMarksPayload {
  subjectCode: string;
  section: string;
  examType: 'mid1' | 'mid2';
  maxMarks: number;
  partAMax: number;
  partBMax: number;
  semester: number;
  academicYear: string;
  enteredBy: string;
  entries: MidMarksEntry[];
}

export interface LabMarksEntry {
  studentId: string;
  labRecord: number;
  vivaVoce: number;
  programExecution: number;
  writtenTest: number;
  total: number;
}

export interface LabMarksPayload {
  subjectCode: string;
  section: string;
  assessmentType: 'internal' | 'external';
  maxMarks: number;
  semester: number;
  academicYear: string;
  enteredBy: string;
  entries: LabMarksEntry[];
}

export interface ExternalMarksEntry {
  studentId: string;
  internalMarks: number;
  externalMarks: number;
  total: number;
  grade: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  result: 'pass' | 'fail';
  verificationStatus: 'pending' | 'uploaded' | 'verified' | 'flagged';
  flagReason?: string;
}

export interface ExternalMarksPayload {
  subjectCode: string;
  section: string;
  semester: number;
  academicYear: string;
  uploadedBy: string;
  publishStatus: 'draft' | 'published';
  entries: ExternalMarksEntry[];
}

// --- Write Functions ---

const TIMEOUT_MS = 15000; 

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number = TIMEOUT_MS): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("Database operation timed out.")), timeoutMs);
  });
  return Promise.race([promise, timeout]);
}

export async function saveWeeklyMarks(payload: WeeklyMarksPayload) {
  try {
    const docId = `${payload.academicYear}_${payload.semester}_${payload.subjectCode}_${payload.section}_week${payload.week}`;
    const docRef = doc(db, "weeklyMarks", docId);
    
    await withTimeout(setDoc(docRef, {
        ...payload,
        updatedAt: serverTimestamp()
    }, { merge: true }));
    
    return true;
  } catch (err: any) {
    console.error("saveWeeklyMarks error:", err);
    throw new Error(err.message || "Failed to save weekly marks");
  }
}

export async function saveMidMarks(payload: MidMarksPayload) {
  try {
    const docId = `${payload.academicYear}_${payload.semester}_${payload.subjectCode}_${payload.section}_${payload.examType}`;
    const docRef = doc(db, "midMarks", docId);
    
    await withTimeout(setDoc(docRef, { ...payload, updatedAt: serverTimestamp() }, { merge: true }));
    return true;
  } catch (err: any) {
    console.error("saveMidMarks error:", err);
    throw new Error(err.message || "Failed to save mid marks");
  }
}

export async function saveLabMarks(payload: LabMarksPayload) {
  try {
    const docId = `${payload.academicYear}_${payload.semester}_${payload.subjectCode}_${payload.section}_lab_${payload.assessmentType}`;
    const docRef = doc(db, "labMarks", docId);
    
    await withTimeout(setDoc(docRef, { ...payload, updatedAt: serverTimestamp() }, { merge: true }));
    return true;
  } catch (err: any) {
    console.error("saveLabMarks error:", err);
    throw new Error(err.message || "Failed to save lab marks");
  }
}

export async function saveExternalMarks(payload: ExternalMarksPayload) {
  try {
    const docId = `${payload.academicYear}_${payload.semester}_${payload.subjectCode}_${payload.section}_external`;
    const docRef = doc(db, "externalMarks", docId);
    
    await withTimeout(setDoc(docRef, { ...payload, updatedAt: serverTimestamp() }, { merge: true }));
    return true;
  } catch (err: any) {
    console.error("saveExternalMarks error:", err);
    throw new Error(err.message || "Failed to save external marks");
  }
}

export async function publishExternalMarks(semester: number, academicYear: string, adminUid: string) {
  try {
    const q = query(
      collection(db, "externalMarks"),
      where("semester", "==", semester),
      where("academicYear", "==", academicYear)
    );
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    let count = 0;

    snapshot.docs.forEach((d) => {
      batch.update(d.ref, { 
        publishStatus: "published", 
        publishedAt: serverTimestamp(),
        publishedBy: adminUid 
      });
      count++;
    });

    await batch.commit();
    return count;
  } catch (err: any) {
    console.error("publishExternalMarks error:", err);
    throw new Error(err.message || "Failed to publish marks");
  }
}

// --- Read Functions ---

export async function getStudentAllMarks(studentUid: string, semester: number, academicYear: string) {
  try {
    const [weekly, mids, labs, externals] = await Promise.all([
      getStudentWeeklyMarks(studentUid, null, semester, academicYear),
      getStudentMidMarks(studentUid, semester, academicYear),
      getStudentLabMarks(studentUid, semester, academicYear),
      getStudentExternalMarks(studentUid, semester, academicYear)
    ]);
    
    return {
      weekly,
      mid1: mids.mid1,
      mid2: mids.mid2,
      labInternal: labs.internal,
      labExternal: labs.external,
      external: externals
    };
  } catch (err: any) {
    console.error("getStudentAllMarks error:", err);
    throw new Error("Failed to fetch all student marks");
  }
}

export function subscribeToStudentMarks(
  studentUid: string, 
  semester: number, 
  academicYear: string, 
  callback: (data: any) => void
) {
  const actualId = studentUid; 
  const weeklyQ = query(collection(db, "weeklyMarks"), where("semester", "==", semester), where("academicYear", "==", academicYear));
  const midQ = query(collection(db, "midMarks"), where("semester", "==", semester), where("academicYear", "==", academicYear));
  const labQ = query(collection(db, "labMarks"), where("semester", "==", semester), where("academicYear", "==", academicYear));
  const extQ = query(collection(db, "externalMarks"), where("semester", "==", semester), where("academicYear", "==", academicYear), where("publishStatus", "==", "published"));

  const triggerUpdate = async () => {
    try {
      const data = await getStudentAllMarks(actualId, semester, academicYear);
      callback(data);
    } catch (err) {
      console.error("subscribeToStudentMarks update error:", err);
    }
  };

  const unsubs = [
    onSnapshot(weeklyQ, triggerUpdate),
    onSnapshot(midQ, triggerUpdate),
    onSnapshot(labQ, triggerUpdate),
    onSnapshot(extQ, triggerUpdate)
  ];

  return () => unsubs.forEach(un => un());
}

export async function getStudentWeeklyMarks(studentId: string, subjectCode: string | null, semester: number, academicYear: string) {
  try {
    const q = query(collection(db, "weeklyMarks"), where("semester", "==", semester), where("academicYear", "==", academicYear));
    const snapshot = await getDocs(q);
    const results: any[] = [];

    console.log(`[marksService] Searching weekly marks for ${studentId} (Sem: ${semester})`);
    snapshot.docs.forEach(d => {
      const data = d.data();
      console.log(`[marksService] Found weekly doc: ${d.id}, Entries: ${data.entries?.length || 0}`);
      const entry = data.entries?.find((e: any) => {
        const id1 = e.studentId?.toString().trim().toLowerCase() || "";
        const id2 = studentId.toString().trim().toLowerCase();
        return id1 === id2 || id1.endsWith(id2) || id2.endsWith(id1);
      });
      if (entry) {
        console.log(`[marksService] ✅ Matched student: ${studentId} in weekly doc: ${d.id}`);
        results.push({ ...entry, subjectCode: data.subjectCode, week: data.week, date: data.date });
      }
    });

    return results.sort((a,b) => a.week - b.week);
  } catch (err) {
    console.error("getStudentWeeklyMarks error:", err);
    return [];
  }
}

export async function getStudentMidMarks(studentId: string, semester: number, academicYear: string) {
  try {
    const q = query(collection(db, "midMarks"), where("semester", "==", semester), where("academicYear", "==", academicYear));
    const snapshot = await getDocs(q);
    const res = { mid1: [] as any[], mid2: [] as any[] };

    console.log(`[marksService] Searching mid marks for ${studentId} (Sem: ${semester})`);
    snapshot.docs.forEach(d => {
      const data = d.data();
      console.log(`[marksService] Found mid doc: ${d.id}, Entries: ${data.entries?.length || 0}`);
      const entry = data.entries?.find((e: any) => {
        const id1 = e.studentId?.toString().trim().toLowerCase() || "";
        const id2 = studentId.toString().trim().toLowerCase();
        return id1 === id2 || id1.endsWith(id2) || id2.endsWith(id1);
      });
      if (entry) {
        console.log(`[marksService] ✅ Matched student: ${studentId} in mid doc: ${d.id}`);
        const item = { ...entry, subjectCode: data.subjectCode };
        if (data.examType === 'mid1') res.mid1.push(item);
        else res.mid2.push(item);
      }
    });
    return res;
  } catch (err) {
    console.error("getStudentMidMarks error:", err);
    return { mid1: [], mid2: [] };
  }
}

export async function getStudentLabMarks(studentId: string, semester: number, academicYear: string) {
  try {
    const q = query(collection(db, "labMarks"), where("semester", "==", semester), where("academicYear", "==", academicYear));
    const snapshot = await getDocs(q);
    const res = { internal: [] as any[], external: [] as any[] };

    snapshot.docs.forEach(d => {
      const data = d.data();
      const entry = data.entries?.find((e: any) => {
        const id1 = e.studentId?.toString().toLowerCase() || "";
        const id2 = studentId.toString().toLowerCase();
        return id1 === id2 || id1.endsWith(id2) || id2.endsWith(id1);
      });
      if (entry) {
        const item = { ...entry, subjectCode: data.subjectCode };
        if (data.assessmentType === 'internal') res.internal.push(item);
        else res.external.push(item);
      }
    });
    return res;
  } catch (err) {
    console.error("getStudentLabMarks error:", err);
    return { internal: [], external: [] };
  }
}

export async function getStudentExternalMarks(studentId: string, semester: number, academicYear: string) {
  try {
    const q = query(collection(db, "externalMarks"), where("semester", "==", semester), where("academicYear", "==", academicYear), where("publishStatus", "==", "published"));
    const snapshot = await getDocs(q);
    const results: any[] = [];

    snapshot.docs.forEach(d => {
      const data = d.data();
      const entry = data.entries?.find((e: any) => {
        const id1 = e.studentId?.toString().toLowerCase() || "";
        const id2 = studentId.toString().toLowerCase();
        return id1 === id2 || id1.endsWith(id2) || id2.endsWith(id1);
      });
      if (entry) results.push({ ...entry, subjectCode: data.subjectCode });
    });
    return results;
  } catch (err) {
    console.error("getStudentExternalMarks error:", err);
    return [];
  }
}

export async function getClassMarksForEntry(subjectCode: string, section: string, assessmentType: string, week: number | null, semester: number, academicYear: string) {
  let collectionName = "weeklyMarks";
  let docId = `${academicYear}_${semester}_${subjectCode}_${section}_week${week}`;

  if (assessmentType.toLowerCase().includes('mid')) {
    collectionName = "midMarks";
    const type = assessmentType.includes('1') ? 'mid1' : 'mid2';
    docId = `${academicYear}_${semester}_${subjectCode}_${section}_${type}`;
  } else if (assessmentType.toLowerCase().includes('lab')) {
    collectionName = "labMarks";
    const type = assessmentType.toLowerCase().includes('internal') ? 'internal' : 'external';
    docId = `${academicYear}_${semester}_${subjectCode}_${section}_lab_${type}`;
  } else if (assessmentType === 'external') {
    collectionName = "externalMarks";
    docId = `${academicYear}_${semester}_${subjectCode}_${section}_external`;
  }

  try {
    const docSnap = await getDoc(doc(db, collectionName, docId));
    if (docSnap.exists()) return docSnap.data().entries || [];
    return [];
  } catch (err) {
    console.error("getClassMarksForEntry error:", err);
    return [];
  }
}

export async function getAllStudentsExternalMarks(semester: number, academicYear: string, section?: string) {
  try {
    let q = query(
      collection(db, "externalMarks"),
      where("semester", "==", semester),
      where("academicYear", "==", academicYear)
    );
    if (section) q = query(q, where("section", "==", section));
    
    const snapshot = await getDocs(q);
    const allEntries: any[] = [];
    snapshot.docs.forEach(d => {
      const data = d.data();
      data.entries.forEach((e: any) => {
        allEntries.push({ ...e, subjectCode: data.subjectCode, section: data.section, publishStatus: data.publishStatus });
      });
    });
    return allEntries;
  } catch (err) {
    throw new Error("Failed to load admin marks");
  }
}

export async function getMarksPublishStatus(semester: number, academicYear: string) {
  const marks = await getAllStudentsExternalMarks(semester, academicYear);
  const total = marks.length;
  const published = marks.filter(m => m.publishStatus === 'published').length > 0 ? 'published' : 'draft';
  const verifiedCount = marks.filter(m => m.verificationStatus === 'verified').length;
  const flaggedCount = marks.filter(m => m.verificationStatus === 'flagged').length;
  const pendingCount = marks.filter(m => m.verificationStatus === 'pending').length;
  
  return {
    publishStatus: published as 'draft' | 'published',
    verifiedCount,
    flaggedCount,
    pendingCount,
    totalStudents: total
  };
}
