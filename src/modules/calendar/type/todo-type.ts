// 달력에 표시하기 위한 데이터 타입들
type TodoType = {
  title: string;
  isDone: boolean;
  createdAt: string;
};

type SubtopicType = {
  title: string;
  isDone: boolean;
  todos: TodoType[];
};

type TopicType = {
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
