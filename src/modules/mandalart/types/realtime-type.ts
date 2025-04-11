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

export type BroadcastStoreType = {
  core: Map<string, CorePayloadType>;
  topic: Map<string, TopicPayloadType>;
  subTopic: Map<string, SubtopicPayloadType>;
  todo: Map<string, TodoPayloadType>;
};

export type FormatBroadcastStorePayloadType = {
  core: {
    [k: string]: CorePayloadType;
  };
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

// 공통 속성을 정의한 기본 인터페이스
type BaseCellInfoType = {
  content?: string;
  title?: string;
  topic?: string;
  isCenter?: boolean;
};

// 핵심주제
type CoreCellInfoType = MandalartType & BaseCellInfoType;

// 중심 대주제
type TopicCenterInfoType = Omit<TopicType, 'mandalart_subtopics'> &
  BaseCellInfoType;

// 중심이 아닌 대주제 (중간 블록)
type TopicNotCenterInfoType = TopicType & BaseCellInfoType;

// 소주제
type SubTopicCellInfoType = SubTopicType & BaseCellInfoType;

// CellInfo 통합 타입
export type CellInfoType =
  | CoreCellInfoType
  | TopicCenterInfoType
  | TopicNotCenterInfoType
  | SubTopicCellInfoType
  | (TodoType & BaseCellInfoType);

// 카테고리가 있는 타입들
export type CoreInfoType = CoreCellInfoType & {
  category: 'CORE';
};

export type TopicInfoType = (TopicCenterInfoType | TopicNotCenterInfoType) & {
  category: 'TOPIC';
  mandalart_subtopics: SubTopicType[];
};

export type SubtopicInfoType = SubTopicCellInfoType & {
  category: 'SUBTOPIC';
  cell_todos?: TodoType[];
};

export type ShowInfoType = CoreInfoType | TopicInfoType | SubtopicInfoType;
