import { create } from 'zustand';
import { User, Incident } from './types';

interface Store {
  user: User | null;
  currentIncident: Incident | null;
  isResponderActive: boolean;
  setUser: (user: User | null) => void;
  setCurrentIncident: (incident: Incident | null) => void;
  setResponderActive: (active: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  currentIncident: null,
  isResponderActive: false,
  setUser: (user) => set({ user }),
  setCurrentIncident: (incident) => set({ currentIncident: incident }),
  setResponderActive: (active) => set({ isResponderActive: active }),
}));
