import React, { Component } from 'react';
import { Map,MouseTool,InfoWindow,Markers,Marker } from 'react-amap';
import JSONPretty from 'react-json-pretty';
import styles from '../index.css';
import { Button } from 'antd';

export default class UIMaker extends Component {

  constructor(props){
    super(props);
   this.map = props.__map__;
    this.loadUI();
  }

  loadUI(){
  	window.AMapUI.loadUI(['overlay/SimpleMarker'], SimpleMarker => {
    	new SimpleMarker({
      	iconLabel: {
        	innerHTML: '<div class="my-blue-point"><img src="//webapi.amap.com/theme/v1.3/hotNew.png"/></div>'
        },
        iconLabel: 'U',
        iconStyle: 'green',
        map: this.map,
        position: [108.905717,34.218224]
      });
    });
  }


    render() {
      
      return null;
    }
  }
  
  

  