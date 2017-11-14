import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import sha1 from 'sha1';
import superagent from 'superagent';

class AllRecipes extends Component {

  constructor(){
    super()
    this.state = {
      images: []
    }
  }

  upLoadFile(files) {
    console.log('uploadFile: ')
    const image = files[0]

    const cloudName = 'digr7ls7o'

    const url =  'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'

    const timestamp = Date.now()/1000
    const uploadPreset = 'bd7kolap'

    const paramStr ='timestamp='+timestamp+'&upload_preset='+uploadPreset+'mr9XYhDjoiITDCHXlNm8jEvV03w';

    const signature = sha1(paramStr)

    const params = {
      'api_key': '569938115268323',
      'timestamp' : timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    }

    let uploadRequest = superagent.post(url)
    uploadRequest.attach('file', image)

    Object.keys(params).forEach((key) => {
      uploadRequest.field(key, params[key])
    })

    uploadRequest.end((err, resp) => {
      if(err) {
        // alert(err)
        return
      }

      console.log('UPLOAD COMPLETE: '+JSON.stringify(resp.body))
      const uploaded = resp.body

      let updatedImages = Object.assign([], this.state.images)
      updatedImages.push(uploaded)

      this.setState({
        images: updatedImages
      })
    })
  }
  
  render() {
    const list = this.state.images.map((image, i) => {
      return (
        <li key={i}>
          <img src= {image.secure_url} style = {{width: 50, height: 50}}/>
        </li>
      )
    })

    return (
      <div style ={{paddingTop : 100}}>
        Images Component <br/>
        <button name="myFile" type="file" onClick={this.upLoadFile.bind(this)} />
        <ol>
          { list }
        </ol>
        
      </div>
      
    )
  }





}

export default AllRecipes;