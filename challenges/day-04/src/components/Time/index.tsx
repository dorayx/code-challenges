import cx from 'classnames';
import { Grid, GridCell } from '../Grid';
import { IStyleable } from '../../utils/types.ts';
import { type FC, useCallback } from 'react';
import { type IConvertorComponentStyleable } from '../Clock/types.ts';
import styles from './index.module.css';
import { wheelable } from '../Wheel';

export interface ITimeProps extends IStyleable, IConvertorComponentStyleable {
  hour: number;
  minute: number;
  onHourChange?: (hour: number) => void;
  onMinuteChange?: (minute: number) => void;
}

const WheelableGridCell = wheelable()(GridCell);

const formatHour = (num: number) => {
  const hour = num < 0 ? 24 + (num % 24) : num % 24;
  return String(hour).padStart(2, '0');
};

const formatMinute = (num: number) => {
  const minute = num < 0 ? 60 + (num % 60) : num % 60;
  return String(minute).padStart(2, '0');
};

export const Time: FC<ITimeProps> = ({
  className,
  labelClassName,
  textClassName,
  hour,
  minute,
  onHourChange,
  onMinuteChange,
}) => {
  const handleHourChange = useCallback((hour: number) => onHourChange?.(hour), [onHourChange]);
  const handleMinuteChange = useCallback((minute: number) => onMinuteChange?.(minute), [onMinuteChange]);

  return (
    <Grid className={cx(className, styles.container)}>
      <GridCell className={cx(labelClassName, styles.hourLabel)}>HOUR</GridCell>
      <WheelableGridCell
        startNumber={hour}
        onNumberRender={formatHour}
        onNumberChange={handleHourChange}
        className={cx(textClassName, styles.hourText)}
      />
      <GridCell className={cx(styles.separator)}>:</GridCell>
      <GridCell className={cx(labelClassName, styles.minuteLabel)}>MINUTE</GridCell>
      <WheelableGridCell
        startNumber={minute}
        onNumberRender={formatMinute}
        onNumberChange={handleMinuteChange}
        className={cx(textClassName, styles.minuteText)}
      />
    </Grid>
  );
};
