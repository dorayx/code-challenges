import { type FC, useCallback, useState } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import { Grid } from '../Grid';
import { type IStyleable } from '../../utils/types.ts';
import { Date } from '../Date';
import { Time } from '../Time';
import { DayOfWeek } from '../DayOfWeek';
import styles from './index.module.css';

export interface IClockProps extends IStyleable {}

const shareStyles = {
  className: styles.component,
  labelClassName: styles.label,
  textClassName: styles.text,
};

export const Clock: FC<IClockProps> = ({ className }) => {
  const [currentDay] = useState(dayjs());

  const [year, setYear] = useState(currentDay.year());
  const [month, setMonth] = useState(currentDay.month() + 1);
  const [day, setDay] = useState(currentDay.date());

  const [dayOfWeek, setDayOfWeek] = useState(currentDay.day());

  const [hour, setHour] = useState(currentDay.hour());
  const [minute, setMinute] = useState(currentDay.minute());

  const onYearChange = useCallback((year: number) => setYear(year), []);
  const onMonthChange = useCallback((month: number) => setMonth(month), []);
  const onDayChange = useCallback((day: number) => setDay(day), []);

  const onDayOfWeekChange = useCallback((dayOfWeek: number) => setDayOfWeek(dayOfWeek), []);

  const onHourChange = useCallback((hour: number) => setHour(hour), []);
  const onMinuteChange = useCallback((minute: number) => setMinute(minute), []);

  return (
    <Grid className={cx(className, styles.container)}>
      <Date {...shareStyles} {...{ year, onYearChange, month, day, onMonthChange, onDayChange }} />
      <DayOfWeek {...shareStyles} {...{ dayOfWeek, onDayOfWeekChange }} />
      <Time {...shareStyles} {...{ hour, minute, onHourChange, onMinuteChange }} />
    </Grid>
  );
};
