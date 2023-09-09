import cx from 'classnames';
import { Grid, GridCell } from '../Grid';
import { IStyleable } from '../../utils/types.ts';
import { FC, useCallback } from 'react';
import { type IConvertorComponentStyleable } from '../Clock/types.ts';
import styles from './index.module.css';
import { wheelable } from '../Wheel';

export interface IDateProps extends IStyleable, IConvertorComponentStyleable {
  year: number;
  month: number;
  day: number;
  onYearChange?: (year: number) => void;
  onMonthChange?: (month: number) => void;
  onDayChange?: (day: number) => void;
}

const WheelableGridCell = wheelable()(GridCell);

const renderDate = (date: number) => String(date).padStart(2, '0');

const formatMonth = (num: number) => {
  const month = num < 0 ? 12 + (num % 12) : num % 12;
  return month === 0 ? 12 : month;
};

const renderMonth = (num: number) => renderDate(formatMonth(num));

export const Date: FC<IDateProps> = ({
  className,
  labelClassName,
  textClassName,
  year,
  month,
  day,
  onYearChange,
  onMonthChange,
  onDayChange,
}) => {
  const formatDay = useCallback(
    (num: number) => {
      // FIXME: 28, 29, 30, 31 days
      const day = num < 0 ? 31 + (num % 31) : num % 31;
      return day === 0 ? 31 : day;
    },
    [year, month, day],
  );

  const renderDay = useCallback((num: number) => renderDate(formatDay(num)), []);

  const handleYearChange = useCallback((year: number) => onYearChange?.(year), [onYearChange]);
  const handleMonthChange = useCallback((month: number) => onMonthChange?.(month), [onMonthChange]);
  const handleDayChange = useCallback((day: number) => onDayChange?.(day), [onDayChange]);

  return (
    <Grid className={cx(className, styles.container)}>
      <GridCell className={cx(labelClassName, styles.yearLabel)}>YEAR</GridCell>
      <WheelableGridCell
        startNumber={year}
        onNumberChange={handleYearChange}
        className={cx(textClassName, styles.yearText)}
      />
      <GridCell className={cx(labelClassName, styles.monthLabel)}>MONTH</GridCell>
      <WheelableGridCell
        startNumber={month}
        onNumberChange={handleMonthChange}
        onNumberRender={renderMonth}
        className={cx(textClassName, styles.monthText)}
      />
      <GridCell className={cx(labelClassName, styles.dayLabel)}>DAY</GridCell>
      <WheelableGridCell
        startNumber={day}
        onNumberRender={renderDay}
        onNumberChange={handleDayChange}
        className={cx(textClassName, styles.dayText)}
      />
    </Grid>
  );
};

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('format month', () => {
    it('transforms the number greater than 12', () => {
      expect(formatMonth(13)).toBe(1);
    });

    it('transforms the number greater than 24', () => {
      expect(formatMonth(25)).toBe(1);
    });

    it('transforms the number less than 0', () => {
      expect(formatMonth(-1)).toBe(11);
    });

    it('transforms the number less than -12', () => {
      expect(formatMonth(-13)).toBe(11);
    });

    it('transforms the number less than -24', () => {
      expect(formatMonth(-24)).toBe(12);
    });
  });
}
