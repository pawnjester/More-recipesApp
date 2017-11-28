import axios from 'axios';

const uploadImage = (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'bd7kolap');
  return axios({
    method: 'POST',
    url: 'https://api.cloudinary.com/v1_1/digr7ls7o/image/upload',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: formData,
  }).then((response) => {
    console.log('response is ', response);
  }).catch((error) => {
    console.error(error);
  });
};
export default uploadImage;
