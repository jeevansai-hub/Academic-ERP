import { onDocumentWritten, onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

// Function 1 — onMarksUpdate: Triggered when marks are written
export const onMarksUpdate = onDocumentWritten("marks/{markId}", async (event) => {
  const newData = event.data?.after.data();
  if (!newData) return;

  // Check if any marks are below 40
  if ((newData.total || 0) < 40) {
    const studentUID = newData.studentUID;
    const db = admin.firestore();
    
    // Find linked parent
    const parentQuery = await db.collection("users")
      .where("role", "==", "parent")
      .where("linkedStudentUID", "==", studentUID)
      .limit(1)
      .get();

    if (!parentQuery.empty) {
      const parentUID = parentQuery.docs[0].id;
      
      // Create notification
      await db.collection("notifications").add({
        recipientUID: parentUID,
        studentUID: studentUID,
        type: "marks",
        title: "Low Marks Alert",
        message: `${newData.subjectName}: Score is ${newData.total}/100. Immediate attention required.`,
        isRead: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        triggeredBy: "system"
      });
    }
  }
});

// Function 2 — onAttendanceUpdate: Triggered when attendance is written
export const onAttendanceUpdate = onDocumentWritten("attendance/{attendanceId}", async (event) => {
  const newData = event.data?.after.data();
  if (!newData) return;

  if ((newData.percentage || 0) < 75) {
    const studentUID = newData.studentUID;
    const db = admin.firestore();
    
    const parentQuery = await db.collection("users")
      .where("role", "==", "parent")
      .where("linkedStudentUID", "==", studentUID)
      .limit(1)
      .get();

    if (!parentQuery.empty) {
      const parentUID = parentQuery.docs[0].id;
      
      await db.collection("notifications").add({
        recipientUID: parentUID,
        studentUID: studentUID,
        type: "attendance",
        title: "Attendance Warning",
        message: `Attendance has dropped to ${newData.percentage}%. Minimum required is 75%.`,
        isRead: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        triggeredBy: "system"
      });
    }
  }
});

// Function 3 — onAnnouncementCreate: Triggered when admin creates announcement
export const onAnnouncementCreate = onDocumentCreated("announcements/{announcementId}", async (event) => {
  const data = event.data?.data();
  if (!data || !data.targetRoles?.includes("parent")) return;

  const db = admin.firestore();
  const parents = await db.collection("users").where("role", "==", "parent").get();

  const batch = db.batch();
  parents.forEach(doc => {
    const notifRef = db.collection("notifications").doc();
    batch.set(notifRef, {
      recipientUID: doc.id,
      studentUID: doc.data().linkedStudentUID || "ALL",
      type: "announcement",
      title: data.title || "New Announcement",
      message: data.message || "Please check the official notice board.",
      isRead: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      triggeredBy: "admin"
    });
  });

  await batch.commit();
});
