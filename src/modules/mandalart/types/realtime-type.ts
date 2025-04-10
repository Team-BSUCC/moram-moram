import { Tables } from '@/shared/types/database.types';

export type TopicPayloadType = Tables<'mandalart_topics'> & {
  category: 'TOPIC';
  value: string;
};

export type SubtopicPayloadType = Tables<'mandalart_subtopics'> & {
  category: 'SUBTOPIC';
  value: string;
};

export type TodoPayloadType = Tables<'cell_todos'> & {
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  value: string;
  category: 'TODO';
};

export type BroadcastPayloadType =
  | TopicPayloadType
  | SubtopicPayloadType
  | TodoPayloadType;

export type PartialBroadcastPayloadType = Partial<BroadcastPayloadType>;

export type BroadcastStoreType = {
  topic: Map<string, TopicPayloadType>;
  subTopic: Map<string, SubtopicPayloadType>;
  todo: Map<string, TodoPayloadType>;
};
