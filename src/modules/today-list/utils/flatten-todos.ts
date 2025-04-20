import {
  FlatTodo,
  MandalartType,
  SubTopicType,
  TodoType,
  TopicType,
} from '../types/today-list-type';

export const flattenTodos = (mandalart: MandalartType): FlatTodo[] => {
  const { core, topics, subtopics, todos } = mandalart;
  // todo를 기준으로 각각 연결되는 소주제와 대주제 찾기
  return todos.map((todo: TodoType) => {
    const subtopic = subtopics.find(
      (subtopic: SubTopicType) => subtopic.id === todo.cellId
    );
    const topic = topics.find(
      (topic: TopicType) => topic.id === subtopic?.topicId
    );
    return {
      mandalartId: core.id,
      mandalartTitle: core.title,
      topicId: topic?.id,
      topicTitle: topic?.topic,
      subtopicId: subtopic?.id,
      subtopicContent: subtopic?.content,
      todoId: todo.id,
      todoTitle: todo.title,
      scheduledDate: todo.scheduledDate,
      isDone: todo.isDone,
    } as FlatTodo;
  });
};
