import cx from 'classnames';
import styles from './App.module.css';
import { Clock } from './components/Clock';

function App() {
  return <Clock className={cx(styles.container)} />;
}

export default App;
