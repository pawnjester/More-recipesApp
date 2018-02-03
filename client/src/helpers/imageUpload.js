import Promise from 'promise';
import superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const agent = superagentPromise(superagent, Promise);

/**
 * @description upload function
 *
 * @param {string} images
 *
 * @returns {null} description
 */
const uploadImage = (images) => {
  const formData = new FormData();
  const cloudName = process.env.CLOUDNAME;
  const uploadPreset = process.env.UPLOADPRESET;
  formData.append('file', images.target.files[0]);
  formData.append('tags', 'food', 'recipe');
  formData.append('upload_preset', `${uploadPreset}`);
  formData.append('api_key', '569938115268323');
  formData.append('timestamp', (Date.now() / 1000));

  return agent
    .post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
};
export default uploadImage;
