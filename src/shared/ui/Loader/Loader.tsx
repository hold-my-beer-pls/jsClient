import cn from 'classnames';
import styles from './Loader.module.scss';

interface Props {
  className?: string;
  forPage?: boolean;
}

export const Loader = ({ className, forPage = false }: Props) => {
  return (
    <div className={cn(styles.container, { [styles.pageLoader]: forPage }, className)}>
      <span className={styles.loader} />
    </div>
  );
};
