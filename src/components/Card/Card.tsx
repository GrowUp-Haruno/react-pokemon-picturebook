import { FC, ReactNode } from 'react';
import './card.css';

export const Card: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <div className="card">{children}</div>;
};

