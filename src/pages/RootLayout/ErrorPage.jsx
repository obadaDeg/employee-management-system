import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Oops!</h1>
      <p className={styles.message}>
        Something went wrong. We can't find what you're looking for.
      </p>
      <button className={styles.button} onClick={() => navigate('/')}>
        Go Back Home
      </button>
    </div>
  );
}
