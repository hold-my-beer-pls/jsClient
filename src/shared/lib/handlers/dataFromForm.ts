import { FormEvent } from 'react';

export const dataFromForm = <T>(e: FormEvent<HTMLFormElement>): T => {
  const formData = new FormData(e.currentTarget) as unknown as Iterable<[T, FormDataEntryValue]>;
  return Object.fromEntries(formData);
};
