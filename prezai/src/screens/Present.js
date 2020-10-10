import {Link} from 'react-router-dom';
import VeerNavbar from "../components/VeerNavbar";
import FileBase64 from "./Upload.js";
import React, {Component} from "react";
import Dictaphone from "./Dictaphone.js";
import recording from "./recording.gif";

class Present extends Component {
    constructor(props) {
      super(props);
      this.state = {
       title:"Nand's Presentation",
       choice:0,
       mic_color:"#3563DB",
       doc_color:"#C4C4C4",
       cam_color:"#C4C4C4",
       mic_size:124,
       doc_size:124,
       cam_size:124,
       text_value:"",
       files:[],
       
      };

      this.Mic = this.Mic.bind(this);
      this.Doc = this.Doc.bind(this);
      this.Cam = this.Cam.bind(this);
      this.MicSize = this.MicSize.bind(this);
      this.DocSize = this.DocSize.bind(this);
      this.CamSize = this.CamSize.bind(this);
      this.ResetSize = this.ResetSize.bind(this);
      this.handleTextChange = this.HandleTextChange.bind(this);
      this.sendText = this.sendText.bind(this);
      
    }
    Mic(event){
        this.setState({mic_color:"#3563DB"});
        this.setState({doc_color:"#C4C4C4"});
        this.setState({cam_color:"#C4C4C4"});
        this.setState({choice:0});
    }

    Doc(event){
        this.setState({mic_color:"#C4C4C4"});
        this.setState({doc_color:"#3563DB"});
        this.setState({cam_color:"#C4C4C4"});
        this.setState({text_value:""});
        this.setState({choice:1});
    }

    Cam(event){
        this.setState({mic_color:"#C4C4C4"});
        this.setState({cam_color:"#3563DB"});
        this.setState({doc_color:"#C4C4C4"});
        this.setState({files:[]});
        this.setState({choice:2});
    }

    MicSize(event){
      this.setState({mic_size:134});
      this.setState({cam_size:124});
      this.setState({doc_size:124});
      
    }

    CamSize(event){
      this.setState({mic_size:124});
      this.setState({cam_size:134});
      this.setState({doc_size:124});
      
    }

    DocSize(event){
      this.setState({mic_size:124});
      this.setState({cam_size:124});
      this.setState({doc_size:134});
      
    }

    ResetSize(event){
      this.setState({mic_size:124});
      this.setState({cam_size:124});
      this.setState({doc_size:124});
      
    }

    HandleTextChange(event){
      this.setState({text_value: event.target.value});
    }

    sendText(){
      console.log(this.state.text_value);
    }

    getFiles(files){
      this.setState({ files: files });
      fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA4d0yygjD_Viz1dh-SqGLTrHbJ_Nzs8qM', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"requests": 
      [{"image": 
      {"content": this.state.files.base64.substr(22, this.state.files.base64.length - 1)},
      "features": [{"type": "DOCUMENT_TEXT_DETECTION"}],
      "imageContext": {"languageHints": ["en-t-i0-handwrit"]}}]})
    }).then((Response) => Response.json())
      .then((Result) => {
        
        if (Result.status != 400){
        console.log(Result.responses[0].fullTextAnnotation.text);
        this.setState({mic_color:"#C4C4C4"});
        this.setState({doc_color:"#3563DB"});
        this.setState({cam_color:"#C4C4C4"});
        this.setState({text_value:Result.responses[0].fullTextAnnotation.text});
        this.setState({choice:1});
      }
      })

    }

    render() {
        
          return (
            
           <div style={{backgroundColor:'#fff', height:'100vh'}}>
           <VeerNavbar/>
           <div style = {{display: "flex", justifyContent: "center", alignItems: "center", color: '#3563DB', marginTop:"7%", fontFamily:'Roboto', fontSize:'36pt', fontWeight:'700'}}>{this.state.title}</div>
           <div style = {{height:"10vh", display: "flex", justifyContent: "center", alignItems: "center", "marginTop":"3%"}}>

           <svg onMouseEnter = {this.MicSize} onMouseLeave = {this.ResetSize} onClick = {this.Mic} height={this.state.mic_size} viewBox="0 0 130 124" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="65" cy="62" rx="65" ry="62" fill={this.state.mic_color}/><path d="M65.0002 70.625C70.2568 70.625 74.4685 66.5492 74.4685 61.5L74.5002 43.25C74.5002 38.2008 70.2568 34.125 65.0002 34.125C59.7435 34.125 55.5002 38.2008 55.5002 43.25V61.5C55.5002 66.5492 59.7435 70.625 65.0002 70.625ZM81.7835 61.5C81.7835 70.625 73.7402 77.0125 65.0002 77.0125C56.2602 77.0125 48.2168 70.625 48.2168 61.5H42.8335C42.8335 71.9025 51.4468 80.4496 61.8335 81.94V91.9167H68.1668V81.94C78.5535 80.48 87.1668 71.9025 87.1668 61.5H81.7835Z" fill="white"/></svg>

           <svg onMouseEnter = {this.DocSize} onMouseLeave = {this.ResetSize} onClick = {this.Doc} style = {{marginLeft:"3%", marginRight:"3%"}} height={this.state.doc_size} viewBox="0 0 129 124" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="64.5" cy="62" rx="64.5" ry="62" fill={this.state.doc_color}/><path d="M83.0594 49.5328C83.3406 49.8141 83.5 50.1937 83.5 50.5922V79.5C83.5 80.3297 82.8297 81 82 81H52C51.1703 81 50.5 80.3297 50.5 79.5V40.5C50.5 39.6703 51.1703 39 52 39H71.9078C72.3063 39 72.6906 39.1594 72.9719 39.4406L83.0594 49.5328ZM80.0406 51.2812L71.2188 42.4594V51.2812H80.0406ZM58 58.5938C57.9005 58.5938 57.8052 58.6333 57.7348 58.7036C57.6645 58.7739 57.625 58.8693 57.625 58.9688V61.2188C57.625 61.3182 57.6645 61.4136 57.7348 61.4839C57.8052 61.5542 57.9005 61.5938 58 61.5938H76C76.0995 61.5938 76.1948 61.5542 76.2652 61.4839C76.3355 61.4136 76.375 61.3182 76.375 61.2188V58.9688C76.375 58.8693 76.3355 58.7739 76.2652 58.7036C76.1948 58.6333 76.0995 58.5938 76 58.5938H58ZM58 64.9688C57.9005 64.9688 57.8052 65.0083 57.7348 65.0786C57.6645 65.1489 57.625 65.2443 57.625 65.3438V67.5938C57.625 67.6932 57.6645 67.7886 57.7348 67.8589C57.8052 67.9292 57.9005 67.9688 58 67.9688H66.625C66.7245 67.9688 66.8198 67.9292 66.8902 67.8589C66.9605 67.7886 67 67.6932 67 67.5938V65.3438C67 65.2443 66.9605 65.1489 66.8902 65.0786C66.8198 65.0083 66.7245 64.9688 66.625 64.9688H58Z" fill="white"/></svg>

           <svg onMouseEnter = {this.CamSize} onMouseLeave = {this.ResetSize} onClick = {this.Cam} height={this.state.cam_size} viewBox="0 0 130 124" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="65" cy="62" rx="65" ry="62" fill={this.state.cam_color}/><path d="M87 46.6154H78.5L76.475 41.2522C76.3351 40.8852 76.0787 40.568 75.7409 40.3439C75.4031 40.1197 75.0003 39.9997 74.5875 40H55.4125C54.5688 40 53.8125 40.5021 53.5312 41.2522L51.5 46.6154H43C40.2375 46.6154 38 48.7299 38 51.3407V78.2747C38 80.8854 40.2375 83 43 83H87C89.7625 83 92 80.8854 92 78.2747V51.3407C92 48.7299 89.7625 46.6154 87 46.6154ZM65 73.5494C59.475 73.5494 55 69.3203 55 64.0989C55 58.8775 59.475 54.6484 65 54.6484C70.525 54.6484 75 58.8775 75 64.0989C75 69.3203 70.525 73.5494 65 73.5494ZM59 64.0989C59 65.6028 59.6321 67.045 60.7574 68.1084C61.8826 69.1718 63.4087 69.7692 65 69.7692C66.5913 69.7692 68.1174 69.1718 69.2426 68.1084C70.3679 67.045 71 65.6028 71 64.0989C71 62.595 70.3679 61.1528 69.2426 60.0894C68.1174 59.026 66.5913 58.4286 65 58.4286C63.4087 58.4286 61.8826 59.026 60.7574 60.0894C59.6321 61.1528 59 62.595 59 64.0989Z" fill="white"/></svg>

           </div>

           <div style = {{display: "flex", justifyContent: "center", alignItems: "center", "marginTop":"3%"}}>


           {this.state.choice == 0 && <div>

            <div style = {{fontWeight:'400', display: "flex", justifyContent: "center", alignItems: "center", fontSize:"250%"}}>Listening...</div>
            <div style = {{display: "flex", justifyContent: "center", alignItems: "center", marginTop:"3%"}}><img src = {recording} width = {70} height = {70}></img></div>
            <Dictaphone/>
            </div>}

           {this.state.choice == 1 && 
            <div>
            
            <textarea value = {this.state.text_value} onChange = {this.handleTextChange} placeholder= "Enter text to summarize and add." style = {{color:"#626262", resize: 'none', outlineWidth: 0, padding: "4vh", borderWidth: 2, borderColor:"#CACACA", width: "70vh", height: "30vh", fontSize: "200%", fontFamily:"Roboto"}}></textarea>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <button onClick = {this.sendText} style = {{display: "flex", justifyContent: "center", alignItems: "center",backgroundColor:"#3563DB", borderWidth:0, color:"#FFF", fontFamily:"Roboto", fontWeight:"400", fontSize:"170%", padding:"3%", marginTop: "5%", width: "30vh", borderRadius:"1vh"}}>ADD</button>
            </div>
            </div>}

           {this.state.choice == 2 && 
            <div>

            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}><FileBase64 multiple={ false } onDone={ this.getFiles.bind(this) } /></div>
            <br/>
            
            <img src = {this.state.files.base64}></img>
            </div>
          }
           </div>
           </div>
          );
      }
  }
  
  export default Present;