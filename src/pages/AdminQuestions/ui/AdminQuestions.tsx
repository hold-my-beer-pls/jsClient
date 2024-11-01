import { FormEvent } from 'react';
import { shallowEqual } from 'react-redux';
import styles from './AdminQuestions.module.scss';
import {
  addQuestion,
  editQuestion,
  resetCurrentQuestion,
  selectModal,
  setModalIsShown,
  setModalMode,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} from '@/entities/Question';
import { BreadCrumbs, Button, Modal } from '@/shared/ui';
import { ModalMode, Navigation } from '@/shared/constants';
import { QuestionTable } from '@/widgets/Question/QuestionTable';
import { Form, getDataForCreate, getDataForUpdate, QuestionCreateData, QuestionUpdateData } from '@/features/Question';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { dataFromForm } from '@/shared/lib/handlers';

const AdminQuestions = () => {
  const [createQuestion] = useCreateQuestionMutation();
  const [updateQuestion] = useUpdateQuestionMutation();
  const { modalIsShown, currentQuestion, modalMode } = useAppSelector(selectModal, shallowEqual);
  const dispatch = useAppDispatch();

  const handleSetIsShownModal = (state: boolean) => {
    dispatch(setModalIsShown(state));
    dispatch(setModalMode(state ? ModalMode.create : ModalMode.nothing));
    dispatch(resetCurrentQuestion());
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (modalMode === ModalMode.create) {
      const formData = dataFromForm<QuestionCreateData>(e);
      const requestData = getDataForCreate(formData);
      createQuestion(requestData)
        .unwrap()
        .then((res) => {
          dispatch(addQuestion(res));
          handleSetIsShownModal(false);
        });
    } else if (modalMode === ModalMode.edit && currentQuestion) {
      const formData = dataFromForm<Omit<QuestionUpdateData, 'id'>>(e);
      const requestData = getDataForUpdate(formData);
      updateQuestion({ id: currentQuestion.id, ...requestData })
        .unwrap()
        .then((res) => {
          dispatch(editQuestion(res));
          handleSetIsShownModal(false);
        });
    }
  };

  return (
    <div className={styles.container}>
      <BreadCrumbs
        items={[
          { path: Navigation.admin, name: 'Админ панель' },
          { path: Navigation.questionsList, name: 'Список вопросов' },
        ]}
      />
      <Button onClick={() => handleSetIsShownModal(true)}>Создать вопрос</Button>
      <div>
        <div>поиск</div>
        <div>фильтры</div>
      </div>
      <QuestionTable />
      <Modal isOpen={modalIsShown} onClose={() => handleSetIsShownModal(false)} className={styles.formModal}>
        {modalMode === ModalMode.create ? 'Создание вопроса' : 'Редактирование вопроса'}
        <Form onSubmit={handleSubmit} currentQuestion={currentQuestion} />
      </Modal>
    </div>
  );
};

export default AdminQuestions;
