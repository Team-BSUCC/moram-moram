export type MandalartType = Tables<'mandalarts'> & {
  done_count: number;
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
  topic_index?: number;
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

export type BroadcastPayloadType = CellBroadCastParamsType | TodoBroadCastType;

export type PartialBroadcastPayloadType = Partial<BroadcastPayloadType>;

export type BroadcastStoreType = {
  core: Map<string, CoreBroadCastType>;
  topic: Map<string, TopicBroadCastType>;
  subTopic: Map<string, SubTopicBroadCastType>;
  todo: Map<string, TodoBroadCastType>;
};

export type FormatBroadcastStorePayloadType = {
  core: {
    [k: string]: CoreBroadCastType;
  };
  topic: {
    [k: string]: TopicBroadCastType;
  };
  subTopic: {
    [k: string]: SubTopicBroadCastType;
  };
  todo: {
    [k: string]: TodoBroadCastType;
  };
};

export type MandalartCore = {
  id: string;
  roomId: string;
  title: string;
  subTitle: string | null;
  private: boolean;
  doneCount: number;
  startDate: Date;
  endDate: Date;
  color: number;
  createdAt: string;
};

export type MandalartTopic = {
  id: string;
  mandalartId: string;
  topicIndex: number;
  createdAt: string;
  topic: string;
};

export type MandalartSubtopic = {
  id: string;
  topicId: string;
  cellIndex: number;
  isDone: boolean;
  content: string | null;
  createdAt: string;
};

export type CellTodo = {
  id: string;
  cellId: string;
  title: string;
  scheduledDate: string | null;
  isDone: boolean;
  createdAt: string;
};

export type MandalartAllJson = {
  core: MandalartCore;
  topics: MandalartTopic[];
  subtopics: MandalartSubtopic[];
  todos: CellTodo[];
};

export type MandalartFloatingSheetInfo =
  | MandalartCore
  | MandalartTopic
  | MandalartSubtopic
  | undefined
  | null;

export type BroadCastDataType =
  | MandalartCore
  | MandalartTopic
  | MandalartSubtopic;

export type TodoBroadCastType = {
  value: CellTodo;
  action: string;
};

type CoreBroadCastType = { action: 'core'; value: MandalartCore };

type TopicBroadCastType = { action: 'topic'; value: MandalartTopic };

type SubTopicBroadCastType = { action: 'subTopic'; value: MandalartSubtopic };

export type CellBroadCastParamsType =
  | { action: 'core'; value: MandalartCore }
  | { action: 'topic'; value: MandalartTopic }
  | { action: 'subTopic'; value: MandalartSubtopic };

export type DateRangeState = {
  year: string;
  month: string;
  day: string;
};

export type ReceiveBroadCastPayload =
  | { action: 'core'; value: MandalartCore }
  | { action: 'topic'; value: MandalartTopic }
  | { action: 'subTopic'; value: MandalartSubtopic }
  | { action: 'CREATE'; value: CellTodo }
  | { action: 'UPDATE'; value: CellTodo }
  | { action: 'DELETE'; value: CellTodo };
