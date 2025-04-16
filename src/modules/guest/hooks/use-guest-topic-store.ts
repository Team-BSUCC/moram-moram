import { create } from 'zustand';

interface TopicState {
  core: string;
  topics: string[];
  setTopic: (index: number, value: string) => void;
  setCore: (value: string) => void;
}

const TOPIC_AMOUNT = 8;

export const useGuestTopicStore = create<TopicState>()((set) => ({
  core: '',
  topics: Array(TOPIC_AMOUNT).fill(''),
  setTopic: (index, value) =>
    set((state) => ({
      topics: state.topics.map((topic, i) => (i === index ? value : topic)),
      core: state.core,
    })),
  setCore: (value) => set((state) => ({ ...state, core: value })),
}));
