import React, { Component } from 'react';
import { Map,MouseTool,InfoWindow,Markers,Marker } from 'react-amap';
import JSONPretty from 'react-json-pretty';
import styles from '../index.css';
import { Button } from 'antd';
import * as event from './event';
import ReactDom from 'React-DOM';
export default class UIDistrictExplorer extends Component {

  constructor(props){
    super(props);
   this.map = props.__map__;
    this.loadUI();


  }
  componentDidMount() {
    // 组件装载完成以后声明一个自定义事件
    event.eventEmitter.on(event.OPEN_DIALOG,(divObj)=>{
      let areaTree= document.getElementById("areaTree");
      ReactDom.findDOMNode(areaTree).style.color='red';
         // areaTree.style.color='red';
       
       console.info(divObj);
   
   });
  }
  componentWillUnmount() {
    event.eventEmitter.removeAllListeners(event.OPEN_DIALOG);
  }
  loadUI(){

   window.AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
    let districtExplorer=new DistrictExplorer({
        eventSupport: true,
        map: this.map
      
      });
    let mapw=this.map;
      var adcode = 610000; //全国的区划编码
      districtExplorer.loadAreaNode(adcode, function(error, areaNode) {

        if (error) {
           console.error(error);
           return;
        }
         //绘制载入的区划节点
         districtExplorer.clearFeaturePolygons();
 
         //just some colors
         var colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00"];
      
         //绘制子级区划
         districtExplorer.renderSubFeatures(areaNode, function(feature, i) {
      
            var fillColor = colors[i % colors.length];
            var strokeColor = colors[colors.length - 1 - i % colors.length];
      
            return {
               cursor: 'default',
               bubble: true,
               strokeColor: strokeColor, //线颜色
               strokeOpacity: 1, //线透明度
               strokeWeight: 1, //线宽
               fillColor: fillColor, //填充色
               fillOpacity: 0.35, //填充透明度
            };
         });
      
         //绘制父级区划，仅用黑色描边
         districtExplorer.renderParentFeature(areaNode, {
            cursor: 'default',
            bubble: true,
            strokeColor: 'black', //线颜色
            fillColor: null,
            strokeWeight: 3, //线宽
         });
      
         //更新地图视野以适合区划面
         districtExplorer.getAllFeaturePolygons();
      console.info(mapw.getCenter());
      
         mapw.setFitView(districtExplorer.getAllFeaturePolygons());
     //  this.renderAreaNode.bind(this);
     });
    });
  }


    render() {
           return null;
    }
  }
  
  

  