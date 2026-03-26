import { create } from 'zustand';

interface Progress {
  [skill: string]: number;
}

interface GameState {
  level: number;
  exp: number;
  currentTasks: string[];
  progress: Progress;
  setLevel: (level: number) => void;
  setExp: (exp: number) => void;
  addExp: (amount: number) => void;
  setCurrentTasks: (tasks: string[]) => void;
  addTask: (task: string) => void;
  removeTask: (task: string) => void;
  trackProgress: (skill: string, progress: number) => void;
  getLearningFocus: () => string;
}

const useGameStore = create<GameState>((set, get) => ({
  level: 1,
  exp: 0,
  currentTasks: [],
  progress: {},
  setLevel: (level) => set({ level }),
  setExp: (exp) => set({ exp }),
  addExp: (amount) => set((state) => ({ exp: state.exp + amount })),
  setCurrentTasks: (tasks) => set({ currentTasks: tasks }),
  addTask: (task) => set((state) => ({ currentTasks: [...state.currentTasks, task] })),
  removeTask: (task) => set((state) => ({ currentTasks: state.currentTasks.filter((t) => t !== task) })),
  trackProgress: (skill, progress) =>
    set((state) => ({
      progress: {
        ...state.progress,
        [skill]: (state.progress[skill] || 0) + progress,
      },
    })),
  getLearningFocus: () => {
    const { progress } = get();
    const skills = Object.keys(progress);
    if (skills.length === 0) {
      return "No skills tracked yet.";
    }
    return skills.reduce((a, b) => (progress[a] < progress[b] ? a : b));
  },
}));

export default useGameStore;
