export const QUERY_KEY = {
  core: (id: string): ['CORE', string] => ['CORE', id],
  topic: (id: string): ['TOPIC', string] => ['TOPIC', id],
  subtopic: (id: string): ['SUBTOPIC', string] => ['SUBTOPIC', id],
  todo: (id: string): ['TODO', string] => ['TODO', id],
  todolist: (id: string): ['TODOLIST', string] => ['TODOLIST', id],
};
