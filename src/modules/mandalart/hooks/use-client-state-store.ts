/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import {
  CellTodo,
  MandalartCore,
  MandalartSubtopic,
  MandalartTopic,
  MandalartAllJson,
} from '../types/realtime-type';
import { shallow } from 'zustand/shallow';

type MapStore = {
  core: MandalartCore | null;
  topics: Map<string, MandalartTopic>;
  subTopics: Map<string, MandalartSubtopic>;
  todos: Map<string, CellTodo>;

  initialize: (data: MandalartAllJson) => void;

  setCoreItem: (item: MandalartCore) => void;

  setTopicItem: (key: string, item: MandalartTopic) => void;
  getTopicItem: (key: string) => MandalartTopic | null;

  setSubTopicItem: (key: string, item: MandalartSubtopic) => void;
  getSubTopicItem: (key: string) => MandalartSubtopic | null;

  setTodoItem: (key: string, item: CellTodo) => void;
  getTodoItem: (key: string) => CellTodo | undefined;
  removeTodoItem: (key: string) => void;

  clear: () => void;
};

export const useClientStateStore = create<MapStore>((set, get) => ({
  core: null,
  topics: new Map(),
  subTopics: new Map(),
  todos: new Map(),

  //initialize
  initialize: (fetchData) => {
    set({ core: fetchData.core });
    const topicMap = new Map(fetchData.topics.map((item) => [item.id, item]));
    set({ topics: topicMap });
    const subTopicMap = new Map(
      fetchData.subtopics.map((item) => [`${item.topicId}-${item.id}`, item])
    );
    set({ subTopics: subTopicMap });
    if (fetchData.todos) {
      const todoMap = new Map(
        fetchData.todos.map((item) => [`${item.cellId}-${item.id}`, item])
      );
      set({ todos: todoMap });
    }
  },

  // core
  setCoreItem: (item) => {
    set({ core: item });
  },

  // topics
  setTopicItem: (key, item) => {
    const newMap = new Map(get().topics);
    newMap.set(key, item);
    set({ topics: newMap });
  },
  getTopicItem: (key) => {
    const topic = get().topics.get(key);
    return topic ?? null;
  },

  // subTopics
  setSubTopicItem: (key, item) => {
    const newMap = new Map(get().subTopics);
    newMap.set(key, item);
    set({ subTopics: newMap });
  },
  getSubTopicItem: (key) => {
    const subTopic = get().subTopics.get(key);
    return subTopic ?? null;
  },

  // todos
  setTodoItem: (key, item) => {
    const newMap = new Map(get().todos);
    newMap.set(key, item);
    set({ todos: newMap });
  },
  getTodoItem: (key) => get().todos.get(key),
  removeTodoItem: (key) => {
    const newMap = new Map(get().todos);
    newMap.delete(key);
    set({ todos: newMap });
  },

  // 공통 초기화
  clear: () => {
    set({
      core: null,
      topics: new Map(),
      subTopics: new Map(),
      todos: new Map(),
    });
  },
  shallow,
}));
