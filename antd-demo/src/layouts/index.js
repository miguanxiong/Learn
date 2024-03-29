// import styles from './index.css';

// function BasicLayout(props) {

//   return (
   
//     <div className={styles.normal}>
//       <h1 className={styles.title}>Yay! Welcome to umi!</h1>
//       { props.children }
//     </div>
//   );
// }

// export default BasicLayout;

import React from 'react';
import styles from './index.css';
import Header from './Header';
import withRouter from 'umi/withRouter';

function Layout({ children, location }) {
  return (
    <div className={styles.normal}>
      <Header location={location} />
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Layout);