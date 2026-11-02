import { create } from 'zustand';
import { api } from '../lib/api';

interface EndProgramState {
  summary: any | null;
  student: any | null;
  isLoading: boolean;
  error: string | null;
  fetchEndProgramSummary: (studentId: string) => Promise<void>;
  updateSummary: (studentId: string, payload: any) => Promise<void>;
  addProject: (studentId: string, project: any) => Promise<void>;
  addPlacement: (studentId: string, placement: any) => Promise<void>;
  updateExitContact: (studentId: string, contact: any) => Promise<void>;
  signOff: (studentId: string, role: 'MENTOR' | 'HOD', remarks?: string) => Promise<void>;
}

export const useEndProgramStore = create<EndProgramState>((set) => ({
  summary: null,
  student: null,
  isLoading: false,
  error: null,

  fetchEndProgramSummary: async (studentId: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.get(`/end-program/${studentId}`);
      set({ summary: data.summary, student: data.student, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  updateSummary: async (studentId: string, payload: any) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.put(`/end-program/summary/${studentId}`, payload);
      set({ summary: data.summary, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  addProject: async (studentId: string, project: any) => {
    set({ isLoading: true, error: null });
    try {
      await api.post(`/end-program/projects/${studentId}`, project);
      const data = await api.get(`/end-program/${studentId}`);
      set({ summary: data.summary, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  addPlacement: async (studentId: string, placement: any) => {
    set({ isLoading: true, error: null });
    try {
      await api.post(`/end-program/placements/${studentId}`, placement);
      const data = await api.get(`/end-program/${studentId}`);
      set({ summary: data.summary, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateExitContact: async (studentId: string, contact: any) => {
    set({ isLoading: true, error: null });
    try {
      await api.put(`/end-program/exit-contact/${studentId}`, contact);
      const data = await api.get(`/end-program/${studentId}`);
      set({ summary: data.summary, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  signOff: async (studentId: string, role: 'MENTOR' | 'HOD', remarks?: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.post(`/end-program/sign-off/${studentId}`, { role, remarks });
      const data = await api.get(`/end-program/${studentId}`);
      set({ summary: data.summary, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },
}));

