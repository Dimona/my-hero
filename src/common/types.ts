export type QuestionListItem<V> = {
  name: string;
  value: V;
};

export type QuestionList<V> = QuestionListItem<V>[];
