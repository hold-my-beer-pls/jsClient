import cn from 'classnames';
import styles from './LoaderJs.module.scss';

interface Props {
  forPage?: boolean;
  className?: string;
}

export const LoaderJs = ({ className, forPage = false }: Props) => {
  return (
    <div className={cn(styles.container, { [styles.pageLoader]: forPage }, className)}>
      <div className={styles.loader_top}>
        <span className={styles.letter}>J</span>
        <span className={styles.letter}>S</span>
      </div>
      <div className={styles.loader_bottom}>
        <span className={styles.loader_static}>D</span>
        <span className={styles.loader_static}>U</span>
        <span className={styles.loader_static}>K</span>
      </div>
    </div>
  );
};
