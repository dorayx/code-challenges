import { type ComponentType, type FC, PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import debounce from 'lodash.debounce';
import { type IStyleable } from '../../utils/types.ts';
import styles from './index.module.css';

export interface IWheelProps extends IStyleable {
  startNumber: number;
  onNumberChange?: (num: number) => void;
  onNumberRender?: (num: number) => ReactNode;
}

const EXPAND_LENGTH = 5;

const Wheel: FC<IWheelProps> = ({ className, startNumber, onNumberChange, onNumberRender }) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const refItemHeight = useRef<number>(0);
  const refBaseNumber = useRef<number>(startNumber);
  const refReposition = useRef(false);
  const refPrevScrollTop = useRef(Number.NEGATIVE_INFINITY);
  const refScrollDirection = useRef<1 | -1>(1);
  const refInited = useRef(false);

  const [isReady, setReady] = useState(false);
  const [rotatedNumbers, setRotatedNumbers] = useState<number[]>(expandRange(startNumber, EXPAND_LENGTH));
  const [activeNumber, setActiveNumber] = useState(startNumber);

  // redundancy keeps dependency simple
  const refRotatedNumbers = useRef<number[]>(rotatedNumbers);

  // get item height
  useEffect(() => {
    if (!refContainer.current) {
      return;
    }

    // ASSUME: height of each item is not changed
    const elItem = refContainer.current.querySelector('[data-wheel-item]');
    refItemHeight.current = elItem?.clientHeight ?? 0;
  }, []);

  // handle scroll
  useEffect(() => {
    if (!refContainer.current) {
      return;
    }

    let lastScroll: number | null = null;
    const handleScroll = debounce(() => {
      if (lastScroll) {
        cancelAnimationFrame(lastScroll);
      }

      lastScroll = requestAnimationFrame(() => {
        const itemHeight = refItemHeight.current;
        const { scrollHeight, scrollTop } = refContainer.current!;

        refScrollDirection.current = scrollTop > refPrevScrollTop.current ? 1 : -1;
        refPrevScrollTop.current = scrollTop;

        const pastCount = Math.round(scrollTop / itemHeight);
        refBaseNumber.current = refRotatedNumbers.current[pastCount + 1];
        setActiveNumber(() => refBaseNumber.current);

        const isReachTop = scrollTop < itemHeight * 2.5;
        const isReachedEnd = scrollTop > scrollHeight - itemHeight * 2.5;
        if (isReachTop || isReachedEnd) {
          refReposition.current = true;
          setRotatedNumbers(() => expandRange(refBaseNumber.current, EXPAND_LENGTH));
        }
      });
    }, 25);

    refContainer.current.addEventListener('scroll', handleScroll);
    return () => refContainer.current?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    refRotatedNumbers.current = rotatedNumbers;
  }, [rotatedNumbers]);

  // reposition the scroll view
  // coz position of the active number is changed
  useEffect(() => {
    if (!refReposition.current) {
      return;
    }

    refReposition.current = false;

    const index = rotatedNumbers[rotatedNumbers.length - 1] - refBaseNumber.current;
    // if we scroll down, the number below will have a high priority
    // if we scroll up, the number above will have a high priority
    const delta = refScrollDirection.current === 1 ? index - 0.5 : index - 1.5;
    refContainer.current!.scrollTop = refItemHeight.current * delta;
  }, [rotatedNumbers]);

  // scroll to start number at initialization
  useEffect(() => {
    if (!refContainer.current) {
      return;
    }

    if (refInited.current && refBaseNumber.current === startNumber) {
      return;
    }

    refBaseNumber.current = startNumber;

    const elTarget = refContainer.current.querySelector<HTMLElement>(`[data-wheel-item="${startNumber}"]`);
    if (!elTarget) {
      // FIXME: when new start number goes beyond the range of current rotated numbers
      return;
    }

    const newRotatedNumbers = expandRange(startNumber, EXPAND_LENGTH);
    setRotatedNumbers(() => newRotatedNumbers);

    const targetIndex = newRotatedNumbers.findIndex((num) => num === startNumber);
    refContainer.current.scrollTop = refItemHeight.current * (targetIndex - 1);

    setReady(() => true);
    refInited.current = true;
  }, [startNumber]);

  // pass internal active number to parent component
  useEffect(() => {
    onNumberChange?.(activeNumber);
  }, [activeNumber]);

  return (
    <div ref={refContainer} className={cx(className, styles.container, styles.withHiddeScrollbar)}>
      {rotatedNumbers.map((num, key) => (
        <span
          key={key}
          data-wheel-item={num}
          className={cx(styles.option, {
            [styles.cloak]: !isReady,
            [styles.activeOption]: num === activeNumber,
          })}
        >
          {onNumberRender?.(num)}
        </span>
      ))}
      <span className={cx(styles.option, styles.placeholderOption, { [styles.cloak]: isReady })}>
        {onNumberRender?.(startNumber)}
      </span>
    </div>
  );
};

Wheel.defaultProps = {
  onNumberRender: (num) => num,
};

export const wheelable = () =>
  function <T extends PropsWithChildren>(WrappedComponent: ComponentType<T>): FC<IWheelProps & T> {
    return ({ startNumber, onNumberRender, onNumberChange, className, ...otherProps }) => {
      return (
        // @ts-ignore
        <WrappedComponent className={cx(className, styles.wrapper)} {...otherProps}>
          <Wheel startNumber={startNumber} onNumberRender={onNumberRender} onNumberChange={onNumberChange} />
        </WrappedComponent>
      );
    };
  };

function expandRange(startNumber: number, expandLength: number) {
  const length = expandLength * 2 + 1;
  const startNumberIndex = Math.floor(length / 2);
  return Array.from({ length }, (_, i) => {
    if (i === startNumberIndex) {
      return startNumber;
    }

    if (i < startNumberIndex) {
      return startNumber - (startNumberIndex - i);
    } else {
      return startNumber + (i - startNumberIndex);
    }
  });
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('expanding range', () => {
    it('expands range of the positive number', () => {
      expect(expandRange(100, 10)).toMatchInlineSnapshot(`
        [
          90,
          91,
          92,
          93,
          94,
          95,
          96,
          97,
          98,
          99,
          100,
          101,
          102,
          103,
          104,
          105,
          106,
          107,
          108,
          109,
          110,
        ]
      `);
    });

    it('expands range of the zero', () => {
      expect(expandRange(0, 10)).toMatchInlineSnapshot(`
        [
          -10,
          -9,
          -8,
          -7,
          -6,
          -5,
          -4,
          -3,
          -2,
          -1,
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
        ]
      `);
    });

    it('expands range of a negative number', () => {
      expect(expandRange(-100, 10)).toMatchInlineSnapshot(`
        [
          -110,
          -109,
          -108,
          -107,
          -106,
          -105,
          -104,
          -103,
          -102,
          -101,
          -100,
          -99,
          -98,
          -97,
          -96,
          -95,
          -94,
          -93,
          -92,
          -91,
          -90,
        ]
      `);
    });
  });
}
