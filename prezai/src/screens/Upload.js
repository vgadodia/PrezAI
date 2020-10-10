import React from 'react';

export default class FileBase64 extends React.Component {

  

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      
    };
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(event) {
    this.fileInput.click();
  }

  handleChange(e) {
    let files = e.target.files;
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

      let file = files[i];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {

        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };

        allFiles.push(fileInfo);

        if(allFiles.length == files.length){
          if(this.props.multiple) this.props.onDone(allFiles);
          else this.props.onDone(allFiles[0]);
        }

      }

    } 

  }

  render() {
    return (
      <div>
      <button onClick={this.handleClick} style = {{display: "flex", justifyContent: "center", alignItems: "center",backgroundColor:"#3563DB", borderWidth:0, color:"#FFF", fontFamily:"Roboto", fontWeight:"450", fontSize:"140%", padding:"8%", marginTop: "5%", width: "30vh", borderRadius:"1vh"}}>
        UPLOAD AN IMAGE
      </button>

      <input
        type="file"
        onChange={ this.handleChange.bind(this) }
        multiple={ this.props.multiple } 
        ref={fileInput => this.fileInput = fileInput} 
        style={{display: 'none'}}
      />
      </div>
    );
  }
}

FileBase64.defaultProps = {
  multiple: false,
};
