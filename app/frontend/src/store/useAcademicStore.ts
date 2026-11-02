import { create } from 'zustand';
import { api } from '../lib/api';

interface AcademicState {
  scorecard: any | null;
  myScorecards: any[] | null;
  isLoading: boolean;
  error: string | null;
  fetchMyPerformance: () => Promise<void>;
  fetchScorecard: (studentId: string, semester: number) => Promise<void>;
  updateMarks: (studentId: string, semester: number, subjectMarks: any[]) => Promise<void>;
  updateAttendance: (studentId: string, semester: number, attendance: any) => Promise<void>;
  updateUniversityResults: (studentId: string, semester: number, results: any) => Promise<void>;
  updateArrears: (studentId: string, semester: number, arrears: any[]) => Promise<void>;
  signScorecard: (studentId: string, semester: number) => Promise<void>;
}

export const useAcademicStore = create<AcademicState>((set) => ({
  scorecard: null,
  myScorecards: null,
  isLoading: false,
  error: null,

  fetchMyPerformance: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.get('/academic/my-performance');
      set({ myScorecards: data.semesters, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchScorecard: async (studentId: string, semester: number) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.get(`/academic/performance/${studentId}/semester/${semester}`);
      set({ scorecard: data.performance, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  updateMarks: async (studentId: string, semester: number, subjectMarks: any[]) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.put(
        `/academic/performance/${studentId}/semester/${semester}/marks`,
        { subjectMarks },
      );
      set({ scorecard: data.performance, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateAttendance: async (studentId: string, semester: number, attendance: any) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.put(
        `/academic/performance/${studentId}/semester/${semester}/attendance`,
        attendance,
      );
      set({ scorecard: data.performance, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateUniversityResults: async (studentId: string, semester: number, results: any) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.put(
        `/academic/performance/${studentId}/semester/${semester}/university-results`,
        results,
      );
      set({ scorecard: data.performance, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateArrears: async (studentId: string, semester: number, arrearsTracking: any[]) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.put(
        `/academic/performance/${studentId}/semester/${semester}/arrears`,
        { arrearsTracking },
      );
      set({ scorecard: data.performance, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  signScorecard: async (studentId: string, semester: number) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.post(
        `/academic/performance/${studentId}/semester/${semester}/sign`,
        {},
      );
      set({ scorecard: data.performance, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },
}));
