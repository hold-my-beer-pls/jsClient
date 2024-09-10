import cn from 'classnames';
import styles from './Select.module.scss';

interface Props {
  options: { value: string; text: string }[];
  onChange?: (value: string) => void;
  defaultValue?: string;
  classname?: string;
}

export const Select = ({ options, defaultValue, onChange, classname }: Props) => {
  return (
    <select
      className={cn(styles.select, classname)}
      defaultValue={defaultValue}
      onChange={(event) => onChange?.(event.currentTarget.value)}
    >
      {options.map(({ text, value }) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
};
