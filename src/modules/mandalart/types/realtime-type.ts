import { Tables } from '@/shared/types/database.types';

export type CorePayloadType = Tables<'mandalarts'> & {
  category: 'CORE';
  value: string;
};

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
  | CorePayloadType
  | TopicPayloadType
  | SubtopicPayloadType
  | TodoPayloadType;

export type PartialBroadcastPayloadType = Partial<BroadcastPayloadType>;

export type MandalartType = Tables<'mandalarts'> & {
  mandalart_topics: TopicsType;
};

export type TopicsType = (Tables<'mandalart_topics'> & {
  mandalart_subtopics: (Tables<'mandalart_subtopics'> & {
    cell_todos: TodoType[];
  })[];
})[];

export type TodoType = Tables<'cell_todos'>;

export type TopicType = TopicsType[number];

export type SubTopicType = TopicType['mandalart_subtopics'][number];

export type CellInfo =
  | (MandalartType & { isCenter: true; title: string })
  | (Omit<TopicType, 'mandalart_subtopics'> & { isCenter: true })
  | (TopicType & { isCenter: false })
  | (SubTopicType & { isCenter: false })
  | TodoType;

export type ExtendedCellInfo = CellInfo & {
  cell_todos?: TodoType[];
  content?: string;
  title?: string;
  topic?: string;
};

export type ShowInfoType = CoreInfo | TopicInfo | SubtopicInfo;

type CoreInfo = ExtendedCellInfo & {
  category: 'CORE';
  mandalart_topics: TopicType[];
};

type TopicInfo = ExtendedCellInfo & {
  category: 'TOPIC';
  mandalart_subtopics: SubTopicType[];
};

type SubtopicInfo = ExtendedCellInfo & {
  category: 'SUBTOPIC';
  cell_todos?: TodoType[];
};

export type BroadcastStoreType = {
  core: Map<string, CorePayloadType>;
  topic: Map<string, TopicPayloadType>;
  subTopic: Map<string, SubtopicPayloadType>;
  todo: Map<string, TodoPayloadType>;
};

export type FormatBroadcastStorePayloadType = {
  topic: {
    [k: string]: TopicPayloadType;
  };
  subTopic: {
    [k: string]: SubtopicPayloadType;
  };
  todo: {
    [k: string]: TodoPayloadType;
  };
};
