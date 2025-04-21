export type FlatTodo = {
  mandalartId: string;
  mandalartTitle: string;
  topicId: string;
  topicTitle: string;
  subtopicId: string;
  subtopicContent: string;
  todoId: string;
  todoTitle: string;
  scheduledDate: string;
  isDone: boolean;
  color: number;
};

/**
 * @todo: 테이블 정리 후 gentype한 뒤 Table<>로 가져올 예정
 */
export type CoreType = {
  color: number;
  createdAt: string;
  doneCount: number;
  endDate: string;
  id: string;
  private: boolean;
  roomId: string;
  startDate: string;
  subTitle: string;
  title: string;
};

export type SubTopicType = {
  cellIndex: number;
  content: string;
  createdAt: string;
  id: string;
  isDone: boolean;
  topicId: string;
};

export type TopicType = {
  createdAt: string;
  id: string;
  mandalartId: string;
  topic: string;
  topicIndex: number;
};

export type TodoType = {
  cellId: string;
  createdAt: string;
  id: string;
  isDone: boolean;
  scheduledDate: string;
  title: string;
};

export type MandalartType = {
  core: CoreType;
  subtopics: SubTopicType[];
  topics: TopicType[];
  todos: TodoType[];
};

export type MyMandalartsType = MandalartType[];
