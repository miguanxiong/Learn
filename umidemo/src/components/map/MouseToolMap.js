import React, { Component } from 'react';
import { Map,MouseTool,InfoWindow,Markers } from 'react-amap';
import JSONPretty from 'react-json-pretty';
import styles from '../index.css';
import { Button } from 'antd';
const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
  }))
);
export default class MouseToolMap extends Component {
 constructor(){
     super();
     const self =this;
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
       currentCity:{command:"开始绘制"},
       useCluster: true
      }
      //map 事件
      this.mapEvents={
        created: (instance) => { console.log(instance.getZoom())
            this.state.mapIns=instance;
        }
       
      }
      // 鼠标工具事件
      this.toolEvents = {
        created: (tool) => {
          console.log(tool)
          self.tool = tool;
        },
        draw({obj}) {
         self.drawWhat(obj);
        //  console.info(obj);
        }
      }
      this.markers = randomMarker(10);
 }
 drawWhat(obj) {
  let text = '';
  let textJson = {};
  switch(obj.CLASS_NAME) {
    case 'AMap.Marker':
     text = `你绘制了一个标记，坐标位置是 {${obj.getPosition()}}`;
     textJson=obj.getPosition();
     textJson.text=text;
     break;
    case 'AMap.Polygon':
      text = `你绘制了一个多边形，有${obj.getPath().length}个端点`;
      break;
    case 'AMap.Circle':
      text = `你绘制了一个圆形，圆心位置为{${obj.getCenter()}}`;
      break;
    default:
      text = '';
  }
  this.setState({
    currentCity: textJson
  });
}
 drawMarker(){
   console.info("准备绘制坐标点");
  if (this.tool){
    this.tool.marker({
      "draggable":true,
      //"icon":""
     // content:"红色监控区"
   //  bubble:true
  // raiseOnDrag:true
   // "angle":50
  //  "animation":"AMAP_ANIMATION_DROP"
  // "title":"设置文字"
   }
     
    );
    this.setState({
      what: '准备绘制坐标点'
    });
  }
}
//获取地图中maker
getMarkers(){
  this.state.mapIns
    let makers= this.state.mapIns.getAllOverlays('marker');
    console.info(makers);
    makers.forEach(element => {
      console.info("经度:"+element.getPosition().getLng());
      console.info("维度:"+element.getPosition().getLat());
    });
  
}

    render() {
      
      return (
        <div className={styles.geoMap} >
       <JSONPretty id="json-pretty" className="test-class"  json={this.state.currentCity}></JSONPretty>
        <Button onClick={()=>{this.drawMarker()}}>Draw Marker</Button> 
        <Button onClick={this.getMarkers.bind(this)}>output markers</Button>
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
        {/* 创建鼠标工具 */}
        <MouseTool events={this.toolEvents}/>
        <Markers 
            markers={this.markers}   
            useCluster={this.state.useCluster}   
          />
          </Map>
         
        </div>
      );
    }
  }
  
  

  