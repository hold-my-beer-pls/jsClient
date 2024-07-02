import { FormEvent } from 'react';

type StringType<T> = {
  [key in keyof T]: string;
};

export const dataFromForm = <T>(e: FormEvent<HTMLFormElement>): StringType<T> => {
  const formData = new FormData(e.currentTarget) as unknown as Iterable<[T, FormDataEntryValue]>;
  return Object.fromEntries(formData);
};
