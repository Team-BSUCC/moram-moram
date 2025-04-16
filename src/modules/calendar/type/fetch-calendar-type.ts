export type TodoFetchType = {
  created_at: string;
  id: string;
  is_done: boolean;
  title: string;
};

export type SubFetchType = {
  cell_index: number;
  cell_todos: TodoFetchType[];
  content: string;
  created_at: string;
  id: string;
  is_done: boolean;
};

export type TopicFetchType = {
  created_at: string;
  id: string;
  mandalart_subtopics: SubFetchType[];
  topic: string;
  topic_index: number;
};

export type MandalartFetchType = {
  created_at: string;
  id: string;
  mandalart_topics: TopicFetchType[];
  private: boolean;
  title: string;
  done_count: number;
};

export type RoomFetchType = {
  id: string;
  mandalarts: MandalartFetchType[];
};

export type ParticipantsType = {
  role: string;
  rooms: RoomFetchType;
};

export type ProcessedDataType = {
  done_count: number;
  title: string;
  topics: {
    title: string;
    subtopics: {
      title: string;
      isDone: boolean;
      todos: { title: string; isDone: boolean; createdAt: string }[];
    }[];
  }[];
}[];

// 원하는 데이터 형태로 가공하기 위한 임시 배열 타입들
export type TodoTempType = {
  title: string;
  isDone: boolean;
  createdAt: string;
};

export type SubtopicTempType = {
  title: string;
  isDone: boolean;
  todos: TodoTempType[];
};

export type TopicTempType = {
  title: string;
  subtopics: SubtopicTempType[];
};

export type CoreTempType = {
  title: string;
  done_count: number;
  topics: TopicTempType[];
};
