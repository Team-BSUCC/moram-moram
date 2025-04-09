import { Tables } from '@/shared/types/database.types';

export type BroadcastPayloadType =
  | (Tables<'mandalart_topics'> & { category: 'TOPIC'; value: string })
  | (Tables<'mandalart_subtopics'> & { category: 'SUBTOPIC'; value: string })
  | (Tables<'cell_todos'> & {
      action: string;
      value: string;
      category: 'TODO';
    });

export type PartialBroadcastPayloadType = Partial<BroadcastPayloadType>;
