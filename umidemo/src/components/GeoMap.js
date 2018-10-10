import React, { Component } from 'react';
import { Map,MouseTool,InfoWindow } from 'react-amap';
import JSONPretty from 'react-json-pretty';
import styles from './index.css';
export default class GeoMap extends Component {
 constructor(){
     super();
    this.mapPlugins=[
        'MapType',
      'Scale',
      'OverView',
      'ControlBar',
        "ToolBar"];
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
    this.windowEvents = {
        created: (iw) => {console.log(iw)},
        open: () => {console.log('InfoWindow opened')},
        close: () => {console.log('InfoWindow closed')},
        change: () => {console.log('InfoWindow prop changed')},
        click: () => { 
            console.log('You clicked map')
       }
      }
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
           this.toggleVisible(); 
        //  this.Map.get
        // this.setState(this.state.currentCity,(cityInfo)=>{
        //     this.state.mapIns.getCity(
        //         (cityInfo)=>{
        //             return cityInfo;}
        //     );
        //     console.info(this.state.currentCity);
        // });
        
        }
        //moveend:this.logMapinfo()
      }
 }
 toggleVisible() {
    this.setState({
      visible: !this.state.visible
    })
  }
 
  componentDidUpdate(){
      console.info(
          "componentWillUpdate"
      );
  }
    render() {
      
        const html = `<div><h4>Greetings</h4><p>This is content of this info window</p><p>Click 'Change Value' Button: ${this.state.value}</p></div>`;
      return (
        <div className={styles.geoMap} >
        {/* zoom:5中国 */}
          <Map 
          amapkey={"6567cbc58c5746a491ccac4cddabe74b"}
          version={"1.4.10"}
          zoom={6} 
          center={this.mapCenter} 
          events={this.mapEvents}
          plugins={this.mapPlugins}
        //允许缩放   
          zoomEnable={true}
          useAMapUI//加此参数
          >
          <MouseTool events={this.toolEvents}/>
          <InfoWindow
            position={this.state.position}
            visible={this.state.visible}
            isCustom={false}
            content={html}
            size={this.state.size}
            offset={this.state.offset}
            events={this.windowEvents}
          />
          </Map>
         <JSONPretty id="json-pretty" className="test-class" themeClassName="custom-json-pretty" json={this.state.currentCity}></JSONPretty>
        </div>
      );
    }
  }
  
  

  