import styles from './index.css';
import MouseToolMap from '../components/map/MouseToolMap';
import { Form,Input } from 'antd';
import { Map } from 'react-amap';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      { props.children }
   
      <div style={{height:'600px'}}>
      <MouseToolMap 
          amapkey={"6567cbc58c5746a491ccac4cddabe74b"}
          version={"1.4.10"}
          zoom={6} 
          // center={this.mapCenter} 
          // events={this.mapEvents}
          // plugins={this.mapPlugins}
        //允许缩放   
          zoomEnable={true}
          useAMapUI//加此参数
          ></MouseToolMap> 
      </div>
    </div>
  );
}

export default BasicLayout;
