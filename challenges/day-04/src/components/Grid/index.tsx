import cx from 'classnames';
import { type FC, type PropsWithChildren } from 'react';
import { type IStyleable } from '../../utils/types.ts';
import { GridCell } from './GridCell.tsx';
import styles from './index.module.css';

export interface IGridProps extends IStyleable {}

/**
 * ## CSS Variables
 *
 * - `--grid-template-columns` (defaults to `auto`) defines the number of columns in a grid layout, and the width of each column.
 * - `--grid-template-rows` (defaults to `auto`) defines the height of each row in a grid layout.
 * - `--grid-gap` (defaults to `0`) defines the size of the gap between the rows and columns in a grid layout.
 *
 * If the grid component is nested into another grid component,
 * additional variables `--col` and `--row` are used to define the position of the element.
 */
export const Grid: FC<PropsWithChildren<IGridProps>> = ({ className, children }) => {
  return <div className={cx(className, styles.grid, styles.withPosition)}>{children}</div>;
};

export { GridCell };
