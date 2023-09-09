import cx from 'classnames';
import { Grid, GridCell } from '../Grid';
import { IStyleable } from '../../utils/types.ts';
import { type FC, useCallback } from 'react';
import { type IConvertorComponentStyleable } from '../Clock/types.ts';
import styles from './index.module.css';
import { wheelable } from '../Wheel';

export interface IDayOfWeekProps extends IStyleable, IConvertorComponentStyleable {
  dayOfWeek: number;
  onDayOfWeekChange?: (dayOfWeek: number) => void;
}

const WheelableGridCell = wheelable()(GridCell);

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const formatWeekOfDay = (num: number) => Math.abs(num % 7);

const renderWeekOfDay = (num: number) => DAYS[formatWeekOfDay(num)];

export const DayOfWeek: FC<IDayOfWeekProps> = ({
  className,
  labelClassName,
  textClassName,
  dayOfWeek,
  onDayOfWeekChange,
}) => {
  const handleDayOfWeekChange = useCallback((dayOfWeek: number) => onDayOfWeekChange?.(dayOfWeek), [onDayOfWeekChange]);

  return (
    <Grid className={cx(className, styles.container)}>
      <GridCell className={cx(labelClassName, styles.dayOfWeekLabel)}>DAY of WEEK</GridCell>
      <WheelableGridCell
        startNumber={dayOfWeek}
        onNumberChange={handleDayOfWeekChange}
        onNumberRender={renderWeekOfDay}
        className={cx(textClassName, styles.dayOfWeekText)}
      />
    </Grid>
  );
};
