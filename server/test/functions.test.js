import expect from 'expect';
import mailer from '../helper/mailer';
import reviewMailer from '../helper/reviewMailer';

describe('Functions', () => {
  describe('Send mail', () => {
    it('should send a mail', () => {
      expect(mailer('randomUrl', 'philip', 'example@gmail.com'));
    });
    it('should send a mail', () => {
      expect(reviewMailer('randomUrl', 'philip', 'example@gmail.com', 'charles', 'This is trash'));
    });
  });

});
