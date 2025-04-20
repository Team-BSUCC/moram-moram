// 달력에 표시하기 위한 데이터 타입들
export type TodoType = {
  id: string;
  title: string;
  isDone: boolean;
  createdAt: string;
  scheduledDate: string;
};

export type SubtopicType = {
  title: string;
  isDone: boolean;
  todos: TodoType[];
};

export type TopicType = {
  title: string;
  subtopics: SubtopicType[];
};

export type CoreType = {
  title: string;
  topics: TopicType[];
};

export type EventType = {
  title: string;
  date: string;
  isDone: boolean;
};
