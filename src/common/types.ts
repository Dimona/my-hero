export type QuestionListItem<V> = {
  name: string;
  value: V;
};

export type QuestionList<V> = QuestionListItem<V>[];

// Sum of all prob(s) should be 1
export type ProbabilityConfig<V = any> = {
  value: V;
  prob: number;
}[];
