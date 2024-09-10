import { Complexity } from '@/shared/constants';

export const complexityConfig = [
  { text: 'Все', value: 'all' },
  { text: 'Легкие', value: Complexity.low },
  { text: 'Средние', value: Complexity.average },
  { text: 'Сложные', value: Complexity.hard },
];

export const numberQuestionConfig = [
  { text: '5', value: '5' },
  { text: '10', value: '10' },
  { text: '15', value: '15' },
  { text: '20', value: '20' },
];
