import { create } from 'zustand';
import { api } from '../lib/api';

interface StudentState {
  currentStudent: any | null;
  isLoading: boolean;
  error: string | null;
  fetchStudent: (studentIdOrRegNo: string) => Promise<void>;
  updatePersonalDetails: (studentId: string, data: any) => Promise<void>;
  updateFamilyDetails: (studentId: string, data: any) => Promise<void>;
  updateAcademicHistory: (studentId: string, data: any) => Promise<void>;
  updateAmbitionAndProfile: (studentId: string, data: any) => Promise<void>;
}

export const useStudentStore = create<StudentState>((set, get) => ({
  currentStudent: null,
  isLoading: false,
  error: null,

  fetchStudent: async (studentIdOrRegNo: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.get(`/students/${studentIdOrRegNo}`);
      set({ currentStudent: data.student, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  updatePersonalDetails: async (studentId: string, details: any) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.put(`/students/personal-details/${studentId}`, details);
      const student = get().currentStudent;
      if (student) {
        set({ currentStudent: { ...student, personalDetails: res.details }, isLoading: false });
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateFamilyDetails: async (studentId: string, details: any) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.put(`/students/family-details/${studentId}`, details);
      const student = get().currentStudent;
      if (student) {
        set({ currentStudent: { ...student, familyDetails: res.details }, isLoading: false });
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateAcademicHistory: async (studentId: string, details: any) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.put(`/students/academic-history/${studentId}`, details);
      const student = get().currentStudent;
      if (student) {
        set({ currentStudent: { ...student, academicHistory: res.details }, isLoading: false });
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateAmbitionAndProfile: async (studentId: string, details: any) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.put(`/students/ambition-and-profile/${studentId}`, details);
      const student = get().currentStudent;
      if (student) {
        set({ currentStudent: { ...student, ambitionAndProfile: res.details }, isLoading: false });
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },
}));

