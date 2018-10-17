import styles from './users.css';
import Users from '../components/Users';
export default function() {
  console.info("page/users-exe");
  return (
    <div className={styles.normal}>
      <h1>Page users</h1>
      <Users />
    </div>
  );
}
