import styles from './BreadCrumbs.module.scss';
import { Navigation } from '@/shared/constants/navigation.ts';

interface Props {
  items: { name: string; path: Navigation }[];
}

export const BreadCrumbs = ({ items }: Props) => {
  const getPath = (pathIndex: number) => {
    let path: string = items[0].path;
    for (let i = 1; i <= pathIndex; i++) {
      path += `/${items[i].path}`;
    }
    return path;
  };

  return (
    <nav className={styles.breadcrumbContainer}>
      <ul>
        {items.map(({ path, name }, index) => (
          <li key={path}>{index !== items.length - 1 ? <a href={getPath(index)}>{name}</a> : <span>{name}</span>}</li>
        ))}
      </ul>
    </nav>
  );
};
