import {Link} from 'react-router-dom';
import VeerNavbar from "../components/VeerNavbar"
import React, {Component} from "react";

class Generate extends Component {
    constructor(props) {
      super(props);
      this.state = {
       value:null,
      };
      this.handleChange = this.handleChange.bind(this);
      this.clickButton = this.clickButton.bind(this);
    } 
     handleChange(event) {
        this.setState({value: event.target.value});
      }

      clickButton(event){
        this.props.history.push("/present");
      }

    
      render() {
        
          return (
            
           <div style={{backgroundColor:'#fff', height:'100vh'}}>
           <VeerNavbar/>
           <div style = {{display: "flex", justifyContent: "center", alignItems: "center", color: '#3563DB', marginTop:"10%", fontFamily:'Roboto', fontSize:'36pt', fontWeight:'700'}}>Generate Presentations Seamlessly.</div>
           <div style = {{display: "flex", justifyContent: "center", alignItems: "center", color: "#626262", fontFamily:"Roboto", fontSize:"24pt", marginTop:"1%"}}>Enter a link to get started.</div>
           <div style = {{display: "flex", justifyContent: "center", alignItems: "center", marginTop:"5%"}}><input placeholder = "Enter a sharable Google Slides link." style = {{backgroundColor:'#E7E7E7', width: "50%", padding: '1.5%', paddingLeft:'2.3%', outlineColor:'#FFF', borderColor:"#CACACA", borderRadius:"20px 0px 0px 20px", borderWidth:0, fontSize:28}} value={this.state.value} onChange={this.handleChange}></input>
           <button onClick = {this.clickButton} style = {{display: "flex", justifyContent: "center", alignItems: "center",backgroundColor:"#3563DB", borderWidth:0, color:"#FFF", fontFamily:"Roboto", fontWeight:"600", fontSize:"200%", padding:"1.47%", paddingLeft:"3.5%", paddingRight:"3.5%", borderRadius:"0px 20px 20px 0px"}}>START</button>
           </div>
           </div>
          );
      }
  }
  
  export default Generate;