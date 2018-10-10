import React, { Component } from 'react';
import { Map,MouseTool,InfoWindow } from 'react-amap';
import JSONPretty from 'react-json-pretty';
import styles from '../index.css';
export default class MouseToolMap extends Component {
 constructor(){
     super();
     //map 插件
    this.mapPlugins=[
    
    //   {name:'MapType',
    //   options:{
    //   visible: true,
 
    //  }},
      //'Scale',
      //鹰眼
     {name:'OverView',
      options:{
      visible: true,
      isOpen:true
     }},
     {name:'ToolBar',
     options:{
      visible: true,
     // offset: 10,
      position:'LT',
      locate:true, //定位按钮
     // direction:true,
      autoPosition:true,
     // useNative:true,
      liteStyle:false
    }},
     // 'ControlBar',
        ];
    this.state = {
        visible: false,
        value: 1,
        position: {
          longitude: 120,
          latitude: 30
        },
        offset: [0, 0],
        size: {
          width: 200,
          height: 140,
        },
       mapIns:null,
       currentCity:{a:"asf"}
      }
      //map 事件
      this.mapEvents={
        created: (instance) => { console.log(instance.getZoom())
            this.state.mapIns=instance;
        },
        click: () => { 
            this.state.currentCity={a:"asf"};
            let cityInfo2;
            this.state.mapIns.getCity(cityInfo=>{
                console.info(cityInfo);
                this.state.currentCity=cityInfo;
                return cityInfo;
            }
            );
            console.info(cityInfo2);
            
            console.info(this.state.currentCity);
        }
    
      }
 }

 

    render() {
      
      return (
        <div className={styles.geoMap} >
        {/* zoom:5中国 */}
          <Map 
          amapkey={"6567cbc58c5746a491ccac4cddabe74b"}
          version={"1.4.10"}
          zoom={13} 
          center={this.mapCenter} 
          events={this.mapEvents}
         plugins={this.mapPlugins}
        //允许缩放   
          zoomEnable={true}
          useAMapUI={true}//加此参数
          >
      
       
          </Map>
        </div>
      );
    }
  }
  
  

  