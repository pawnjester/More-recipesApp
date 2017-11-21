import sha1 from 'sha1';
import superagent from 'superagent';


const imageUpload = (files) => {
    const image = files[0]
    
    const cloudName = 'digr7ls7o'

    const url =  'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'
    
    const timestamp = Date.now()/1000
    const uploadPreset = 'bd7kolap'

    const paramStr ='timestamp='+timestamp+'&upload_preset='+uploadPreset+'mr9XYhDjoiITDCHXlNm8jEvV03w';

    const signature = sha1(paramStr);

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

    if (resp.body.secure_url !== '') {
        console.log(resp.body.secure_url); // cloudinary image url
        }
    
    console.log('UPLOAD COMPLETE: '+JSON.stringify(resp.body))
    const uploaded = resp.body
    
    let updatedImages = Object.assign([], this.state.imageUrl)
    updatedImages.push(uploaded)

    return updatedImages
  

} 

export default imageUpload;