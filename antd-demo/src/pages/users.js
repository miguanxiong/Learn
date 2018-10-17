import styles from './users.css';
import Users from '../components/Users';
export default function() {
//组件 自顶向下加载
  return (
    <div className={styles.normal}>
     <Users />
    </div>
  );
}
