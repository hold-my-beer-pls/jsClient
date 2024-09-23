import { MainButton, SecondaryButton } from '@twa-dev/sdk/react';
import WebApp from '@twa-dev/sdk';
import { Button } from '@/shared/ui';

const styles = getComputedStyle(document.documentElement);
const buttonColor = styles.getPropertyValue('--primary-color');
// const buttonSecondaryColor = styles.getPropertyValue('--secondary-color');
const buttonTextColor = styles.getPropertyValue('--text-primary-color');
const buttonDisabledColor = styles.getPropertyValue('--disabled-color');
const buttonDisabledTextColor = styles.getPropertyValue('--text-secondary-color');

interface Props {
  text: string;
  onClick: VoidFunction;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  theme?: 'primary' | 'secondary';
  position?: 'top' | 'left' | 'bottom' | 'right';
}

export const TelegramButton = ({
  text,
  onClick,
  disabled,
  isLoading,
  className,
  theme = 'primary',
  position = 'bottom',
}: Props) => {
  const color = disabled || isLoading ? buttonDisabledColor : buttonColor;
  const textColor = disabled || isLoading ? buttonDisabledTextColor : buttonTextColor;
  if (WebApp.platform === 'unknown') {
    return (
      <Button onClick={onClick} disabled={disabled} isLoading={isLoading} theme={theme} className={className}>
        {text}
      </Button>
    );
  }

  return theme === 'primary' ? (
    <MainButton
      text={text}
      onClick={onClick}
      disabled={disabled}
      progress={isLoading}
      color={color}
      textColor={textColor}
    />
  ) : (
    <SecondaryButton
      text={text}
      onClick={onClick}
      disabled={disabled}
      progress={isLoading}
      color="#f2f2f2"
      textColor={textColor}
      position={position}
    />
  );
};
