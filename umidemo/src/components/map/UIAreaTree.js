import React, { Component } from 'react';
import { Map,MouseTool,InfoWindow,Markers,Marker } from 'react-amap';
import JSONPretty from 'react-json-pretty';
import styles from '../index.css';
import { Button } from 'antd';
import * as event from './event';
import ReactDom from 'React-DOM';
export default class UIAreaTree extends Component {

  constructor(props){
    super(props);
  
  
  }
  componentDidMount(){
     // console.info(props);
     event.eventEmitter.emit(event.OPEN_DIALOG,this);

  }

//   handleClick = (message) => {
//     event.eventEmitter.emit(event.OPEN_DIALOG,"mgx");
// };

    render() {
     
      return <div id='areaTree' style={{height:"60px"}} />;
    }
  }
  
  

  