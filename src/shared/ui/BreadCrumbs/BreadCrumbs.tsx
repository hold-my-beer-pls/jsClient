import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BreadCrumbs.module.scss';

import { Navigation } from '@/shared/constants/navigation.ts';

interface Props {
  items: { name: string; path: Navigation }[];
}

export const BreadCrumbs = ({ items }: Props) => {
  const navigate = useNavigate();

  const getPath = (pathIndex: number) => {
    let path: string = items[0].path;
    for (let i = 1; i <= pathIndex; i++) {
      path += `/${items[i].path}`;
    }
    return path;
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault();
    navigate(getPath(index));
  };

  return (
    <nav className={styles.breadcrumbContainer}>
      <ul>
        {items.map(({ path, name }, index) => (
          <li key={path}>
            {index !== items.length - 1 ? (
              <a href={getPath(index)} onClick={(e) => handleClick(e, index)}>
                {name}
              </a>
            ) : (
              <span>{name}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
