import { create } from 'zustand';
import { api } from '../lib/api';

interface MentoringState {
  mentees: any[];
  activity: any | null;
  chart: any | null;
  sessions: any[];
  review: any | null;
  isLoading: boolean;
  error: string | null;
  fetchMentees: () => Promise<void>;
  fetchActivity: (studentId: string, semester: number) => Promise<void>;
  updateActivity: (studentId: string, semester: number, data: any) => Promise<void>;
  fetchChart: (studentId: string, semester: number) => Promise<void>;
  updateChart: (studentId: string, semester: number, data: any) => Promise<void>;
  fetchSessions: (studentId: string, semester: number) => Promise<void>;
  logSession: (studentId: string, sessionData: any) => Promise<void>;
  signSession: (studentId: string, semester: number, sessionNumber: number) => Promise<void>;
  fetchReview: (studentId: string, semester: number) => Promise<void>;
  updateReview: (studentId: string, semester: number, data: any) => Promise<void>;
  signOffReview: (studentId: string, semester: number) => Promise<void>;
}

export const useMentoringStore = create<MentoringState>((set) => ({
  mentees: [],
  activity: null,
  chart: null,
  sessions: [],
  review: null,
  isLoading: false,
  error: null,

  fetchMentees: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.get('/mentoring/my-mentees');
      set({ mentees: data.mentees, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchActivity: async (studentId: string, semester: number) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.get(`/mentoring/activity/${studentId}/semester/${semester}`);
      set({ activity: data.activity, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  updateActivity: async (studentId: string, semester: number, payload: any) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.put(
        `/mentoring/activity/${studentId}/semester/${semester}`,
        payload,
      );
      set({ activity: data.activity, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  fetchChart: async (studentId: string, semester: number) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.get(`/mentoring/chart/${studentId}/semester/${semester}`);
      set({ chart: data.chart, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  updateChart: async (studentId: string, semester: number, payload: any) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.put(
        `/mentoring/chart/${studentId}/semester/${semester}`,
        payload,
      );
      set({ chart: data.chart, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  fetchSessions: async (studentId: string, semester: number) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.get(`/mentoring/sessions/${studentId}/semester/${semester}`);
      set({ sessions: data.sessions || [], isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  logSession: async (studentId: string, sessionData: any) => {
    set({ isLoading: true, error: null });
    try {
      await api.post(`/mentoring/sessions/${studentId}`, sessionData);
      const data = await api.get(
        `/mentoring/sessions/${studentId}/semester/${sessionData.semester}`,
      );
      set({ sessions: data.sessions || [], isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  signSession: async (studentId: string, semester: number, sessionNumber: number) => {
    set({ isLoading: true, error: null });
    try {
      await api.post(
        `/mentoring/sessions/${studentId}/semester/${semester}/session/${sessionNumber}/sign`,
        {},
      );
      const data = await api.get(`/mentoring/sessions/${studentId}/semester/${semester}`);
      set({ sessions: data.sessions || [], isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  fetchReview: async (studentId: string, semester: number) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.get(`/mentoring/review/${studentId}/semester/${semester}`);
      set({ review: data.review, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  updateReview: async (studentId: string, semester: number, payload: any) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.put(
        `/mentoring/review/${studentId}/semester/${semester}`,
        payload,
      );
      set({ review: data.review, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  signOffReview: async (studentId: string, semester: number) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.post(
        `/mentoring/review/${studentId}/semester/${semester}/sign-off`,
        {},
      );
      set({ review: data.review, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },
}));

