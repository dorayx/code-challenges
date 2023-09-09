import cx from 'classnames';
import { type FC, type PropsWithChildren } from 'react';
import { type IStyleable } from '../../utils/types.ts';
import styles from './index.module.css';

export interface IGridProps extends IStyleable {}

/**
 * ## CSS Variables
 *
 * - `--col` (defaults to `auto`) defines the column position of the element.
 * - `--row` (defaults to `auto`) defines the row position of the element.
 */
export const GridCell: FC<PropsWithChildren<IGridProps>> = ({ className, children }) => {
  return <div className={cx(className, styles.gridCell, styles.withPosition)}>{children}</div>;
};
