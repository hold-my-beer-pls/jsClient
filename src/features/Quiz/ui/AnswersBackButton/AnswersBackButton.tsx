import { Button } from '@/shared/ui';
import { useIsMobile } from '@/shared/lib/hooks';
import { AnswersBackButtonMobile } from './AnswersBackButton.mobile.tsx';

interface Props {
  onClick: VoidFunction;
}

export const AnswersBackButton = ({ onClick }: Props) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <AnswersBackButtonMobile onClick={onClick} />
  ) : (
    <div>
      <Button onClick={onClick}>Назад</Button>
    </div>
  );
};
