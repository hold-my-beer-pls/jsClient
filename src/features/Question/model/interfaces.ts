interface QuestionData {
  questionText: string;
  code: string;
  radioAnswer: string;
  theme: string;
  explanation: string;
  complexity: string;
}

export interface QuestionCreateData extends QuestionData {
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}

export interface QuestionUpdateData extends QuestionData {
  id: string;

  [key: string]: string;
}
