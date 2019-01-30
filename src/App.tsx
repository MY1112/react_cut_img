import React, { Component, ChangeEvent } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './App.css';

const src = require('./img/child.jpg')

interface IProps {}
class App extends Component<IProps,any> {
  constructor(props:IProps) {
    super(props)
    this.state = {
      src,
      cropResult: null,
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.useDefaultImage = this.useDefaultImage.bind(this);
  }

  private cropper:any

  private getInstance = (cropper:any) => {
    this.cropper = cropper
  }

  private onChange(e: any) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  private cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  private useDefaultImage() {
    this.setState({ src });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div>
        <div style={{ width: '100%' }}>
          <input type="file" onChange={this.onChange} />
          <button onClick={this.useDefaultImage}>Use default img</button>
          <br />
          <br />
          <Cropper
            style={{ height: 400, width: '100%' }}
            aspectRatio={16 / 9}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={this.getInstance}
          />
        </div>
        <div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1>Preview</h1>
            <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
          </div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1>
              <span>Crop</span>
              <button onClick={this.cropImage} style={{ float: 'right' }}>
                Crop Image
              </button>
            </h1>
            <img style={{ width: '100%' }} src={this.state.cropResult} alt="cropped image" />
          </div>
        </div>
        <br style={{ clear: 'both' }} />
      </div>
        </header>
      </div>
    );
  }
}

export default App;
