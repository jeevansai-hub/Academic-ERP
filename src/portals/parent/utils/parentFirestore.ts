import { db, auth } from '../../../firebase/config';
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';

export const getParentProfile = async (uid: string) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    throw new Error('Parent profile not found');
  } catch (error: any) {
    throw new Error(error.message || 'Error fetching parent profile');
  }
};

export const getLinkedStudentProfile = async (studentUID: string) => {
  try {
    const docRef = doc(db, 'users', studentUID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    throw new Error('Student profile not found');
  } catch (error: any) {
    throw new Error(error.message || 'Error fetching student profile');
  }
};

export const subscribeToStudentMarks = (studentUID: string, semester: string, callback: (data: any[]) => void) => {
  const q = query(
    collection(db, 'marks'),
    where('studentUID', '==', studentUID),
    where('semester', '==', semester)
  );
  return onSnapshot(q, (snapshot) => {
    const marks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(marks);
  }, (error) => {
    console.error("Error subscribing to marks:", error);
  });
};

export const subscribeToStudentAttendance = (studentUID: string, callback: (data: any[]) => void) => {
  const q = query(
    collection(db, 'attendance'),
    where('studentUID', '==', studentUID)
  );
  return onSnapshot(q, (snapshot) => {
    const attendance = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(attendance);
  }, (error) => {
    console.error("Error subscribing to attendance:", error);
  });
};

export const subscribeToStudentFees = (studentUID: string, callback: (data: any[]) => void) => {
  const q = query(
    collection(db, 'fees'),
    where('studentUID', '==', studentUID),
    orderBy('dueDate', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const fees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(fees);
  }, (error) => {
    console.error("Error subscribing to fees:", error);
  });
};

export const updateFeeTransaction = async (feeId: string, data: any) => {
  try {
    const docRef = doc(db, 'fees', feeId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error: any) {
    throw new Error(error.message || 'Error updating fee transaction');
  }
};

export const subscribeToParentNotifications = (parentUID: string, callback: (data: any[]) => void) => {
  const q = query(
    collection(db, 'notifications'),
    where('recipientUID', '==', parentUID),
    orderBy('createdAt', 'desc'),
    limit(50)
  );
  return onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(notifications);
  }, (error) => {
    console.error("Error subscribing to notifications:", error);
  });
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const docRef = doc(db, 'notifications', notificationId);
    await updateDoc(docRef, { isRead: true });
  } catch (error: any) {
    throw new Error(error.message || 'Error marking notification as read');
  }
};

export const markAllNotificationsAsRead = async (parentUID: string) => {
  try {
    const q = query(
      collection(db, 'notifications'),
      where('recipientUID', '==', parentUID),
      where('isRead', '==', false)
    );
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { isRead: true });
    });
    await batch.commit();
  } catch (error: any) {
    throw new Error(error.message || 'Error marking all notifications as read');
  }
};

export const submitMeetingRequest = async (data: any) => {
  try {
    await addDoc(collection(db, 'meetingRequests'), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error: any) {
    throw new Error(error.message || 'Error submitting meeting request');
  }
};

export const subscribeMeetingHistory = (parentUID: string, callback: (data: any[]) => void) => {
  const q = query(
    collection(db, 'meetingRequests'),
    where('parentUID', '==', parentUID),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(history);
  }, (error) => {
    console.error("Error subscribing to meeting history:", error);
  });
};

export const updateParentProfile = async (uid: string, data: any) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error: any) {
    throw new Error(error.message || 'Error updating profile');
  }
};

export const getStudentFacultyAdvisor = async (studentUID: string) => {
  try {
    // Assuming student profile has facultyAdvisorUID
    const studentDoc = await getDoc(doc(db, 'users', studentUID));
    if (!studentDoc.exists()) throw new Error('Student not found');
    
    const facultyUID = studentDoc.data().facultyAdvisorUID;
    if (!facultyUID) return null;

    const facultyDoc = await getDoc(doc(db, 'users', facultyUID));
    if (facultyDoc.exists()) {
      return { uid: facultyUID, ...facultyDoc.data() };
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message || 'Error fetching faculty advisor');
  }
};
