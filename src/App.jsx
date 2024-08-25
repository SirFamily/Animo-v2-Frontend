import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";
import Hamster from "./component/loading/Hamster";
import styles from './Css/app.module.css';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingAnimation}>
          <Hamster />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <AppRouter />
    </div>
  );
}

export default App;