import { create } from 'zustand';
import { UserRanking } from '../types';

interface RankingState {
  rankings: UserRanking[];
  loadRankings: () => void;
  getUserRank: (userId: string) => number | undefined;
}

// Mock rankings data
const mockRankings: UserRanking[] = [
  {
    rank: 1,
    user: {
      id: '1',
      username: 'alexcode',
      email: 'alex@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Code&background=667eea&color=fff',
      totalPoints: 25000,
      completedCourses: ['python', 'javascript', 'html'],
      certificates: [],
      createdAt: new Date('2024-01-01'),
    },
    points: 25000,
    coursesCompleted: 3,
    certificatesEarned: 3,
  },
  {
    rank: 2,
    user: {
      id: '2',
      username: 'developer99',
      email: 'dev@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Dev+Master&background=667eea&color=fff',
      totalPoints: 22000,
      completedCourses: ['python', 'javascript', 'cpp'],
      certificates: [],
      createdAt: new Date('2024-01-05'),
    },
    points: 22000,
    coursesCompleted: 3,
    certificatesEarned: 3,
  },
  {
    rank: 3,
    user: {
      id: '3',
      username: 'coder_pro',
      email: 'pro@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Pro+Coder&background=667eea&color=fff',
      totalPoints: 20000,
      completedCourses: ['python', 'java'],
      certificates: [],
      createdAt: new Date('2024-01-10'),
    },
    points: 20000,
    coursesCompleted: 2,
    certificatesEarned: 2,
  },
  {
    rank: 4,
    user: {
      id: '4',
      username: 'webmaster',
      email: 'web@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Web+Master&background=667eea&color=fff',
      totalPoints: 18000,
      completedCourses: ['html', 'javascript'],
      certificates: [],
      createdAt: new Date('2024-01-15'),
    },
    points: 18000,
    coursesCompleted: 2,
    certificatesEarned: 2,
  },
  {
    rank: 5,
    user: {
      id: '5',
      username: 'junior_dev',
      email: 'junior@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Junior+Dev&background=667eea&color=fff',
      totalPoints: 15000,
      completedCourses: ['python'],
      certificates: [],
      createdAt: new Date('2024-01-20'),
    },
    points: 15000,
    coursesCompleted: 1,
    certificatesEarned: 1,
  },
];

export const useRankingStore = create<RankingState>((set, get) => ({
  rankings: [],

  loadRankings: () => {
    set({ rankings: mockRankings });
  },

  getUserRank: (userId: string) => {
    return get().rankings.find((r) => r.user.id === userId)?.rank;
  },
}));