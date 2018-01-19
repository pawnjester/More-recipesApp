import expect from 'expect';
import mailer from '../helper/mailer';
import imageUploader from '../../client/src/helpers/imageUpload';

describe('Functions', () => {
  describe('Send mail', () => {
    it('should send a mail', () => {
      expect(mailer('randomUrl', 'philip', 'example@gmail.com'));
    });
  });
  // describe('should upload an image', () => {
  //   it('should upload an image', () => {
  //     expect(imageUploader('https://res.cloudinary.com/digr7ls7o/image/upload/v1516267645/grtqdxfxad0t7u7pyczf.jpg'));
  //   });
  // });
});
