export interface Mark {
  credits: number;
  grade: string;
}

export interface CGPARecord {
  sgpa: number;
  semester: number;
  totalCredits: number;
}

export const cgpaService = {
  calculateSGPA: (marks: Mark[]): number => {
    let totalCredits = 0;
    let earnedPoints = 0;

    for (const mark of marks) {
      let gradePoints = 0;
      switch (mark.grade) {
        case 'O': gradePoints = 10; break;
        case 'A+': gradePoints = 9; break;
        case 'A': gradePoints = 8; break;
        case 'B+': gradePoints = 7; break;
        case 'B': gradePoints = 6; break;
        case 'C': gradePoints = 5; break;
        case 'F': gradePoints = 0; break;
      }
      totalCredits += mark.credits;
      earnedPoints += (gradePoints * mark.credits);
    }

    if (totalCredits === 0) return 0;
    return Number((earnedPoints / totalCredits).toFixed(2));
  },

  calculateCGPA: (records: CGPARecord[]): number => {
    let totalCredits = 0;
    let totalSgpaPoints = 0;

    for (const record of records) {
      totalCredits += record.totalCredits;
      totalSgpaPoints += (record.sgpa * record.totalCredits);
    }

    if (totalCredits === 0) return 0;
    return Number((totalSgpaPoints / totalCredits).toFixed(2));
  }
};
