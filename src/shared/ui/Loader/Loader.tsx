import cn from 'classnames';
import styles from './Loader.module.scss';

interface Props {
  className?: string;
}

export const Loader = ({ className }: Props) => {
  return (
    <div className={cn(styles.container, className)}>
      <span className={styles.loader} />
    </div>
  );
};
