import {Link} from 'react-router-dom';
import VeerNavbar from "../components/VeerNavbar"
import React, {Component} from "react";

class Generate extends Component {
    constructor(props) {
      super(props);
      this.state = {
       value:"",
       error:"",
      };
      this.handleChange = this.handleChange.bind(this);
      this.clickButton = this.clickButton.bind(this);
    } 

    componentDidMount(){
      window.sessionStorage.setItem("id", null);
      window.sessionStorage.setItem("title", null);
    }
     handleChange(event) {
        this.setState({value: event.target.value});
      }

      clickButton(event){
        
        if (this.state.value.length < 83){
          
          this.setState({error:"Invalid Presentation ID"});
        }
        else {
          fetch('https://us-central1-todo-app-291703.cloudfunctions.net/name', {
            method: 'post',headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify({id: this.state.value.substr(39, 44)})}).then((Response) => Response.json()).then((Result) => {
              if (Result.status == "success"){
                window.sessionStorage.setItem("id", this.state.value.substr(39, 44));
                window.sessionStorage.setItem("title", Result.title);
                this.props.history.push("/present");
              }
              else{
                this.setState({error:"Invalid Presentation ID"});
              }

            })
        }
         
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
           <div style = {{display: "flex", justifyContent: "center", alignItems: "center", color: "#FF0000", fontFamily:"Roboto", fontSize:"16pt", marginTop:"3%"}}>{this.state.error}</div>
           </div>
          );
      }
  }
  
  export default Generate;