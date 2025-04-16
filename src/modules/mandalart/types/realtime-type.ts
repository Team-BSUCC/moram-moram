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
type CellInfoWithCoreCategoryType = CoreCellInfoType & {
  category: 'CORE';
};

type CellInfoWithTopicCategoryType = (
  | TopicCenterInfoType
  | TopicNotCenterInfoType
) & {
  category: 'TOPIC';
  mandalart_subtopics: SubTopicType[];
};

type CellInfoWithSubtopicCategoryType = SubTopicCellInfoType & {
  category: 'SUBTOPIC';
  cell_todos?: TodoType[];
};

export type ShowInfoType =
  | CellInfoWithCoreCategoryType
  | CellInfoWithTopicCategoryType
  | CellInfoWithSubtopicCategoryType;
import { Tables } from '@/shared/types/database.types';

export type CorePayloadType = CellInfoWithCoreCategoryType & {
  value: string;
};

export type TopicPayloadType = CellInfoWithTopicCategoryType & {
  value: string;
};

export type SubtopicPayloadType = CellInfoWithSubtopicCategoryType & {
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
