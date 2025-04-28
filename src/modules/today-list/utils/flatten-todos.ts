import {
  FlatTodo,
  MandalartType,
  SubTopicType,
  TodoType,
  TopicType,
} from '../types/today-list-type';

/**
 * 만다라트의 투두를 평탄화하여 FlatTodo 배열로 변환하는 함수
 * @param mandalart - 만다라트 데이터
 * @returns - 평탄화된 투두 리스트
 */
export const flattenTodos = (mandalart: MandalartType): FlatTodo[] => {
  const { core, topics, subtopics, todos } = mandalart;
  // todo를 기준으로 각각 연결되는 소주제와 대주제 찾기
  return todos?.map((todo: TodoType) => {
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
      topicColor: topic?.topicIndex,
      color: core.color,
    } as FlatTodo;
  });
};
