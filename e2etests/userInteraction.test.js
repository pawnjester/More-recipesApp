module.exports = {
  'user receives error when the sign up form is not properly filled':
  (browser) => {
    browser
      .url('http://localhost:3000')
      .resizeWindow(1700, 800)
      .pause('1000')
      .execute(() => {
        document.querySelector('#Sign-Up-Form').click();
      })
      .setValue('input[name=username]', 'sharonette')
      .pause('1000')
      .click('#submit-button')
      .assert.containsText('.help-block', 'Email is Invalid')
      .pause('2000')
      .setValue('input[name=email]', 'sharron@exmaple.com')
      .assert.containsText('.help-block', 'Email is Invalid')
      .click('#submit-button')
      .pause('2000')
      .setValue('input[name=password]', 'lovelace')
      .assert.containsText('.help-block', 'This field is required')
      .click('#submit-button')
      .pause('3000')
      .setValue('input[name=passwordConfirmation', 'lozzvelace')
      .click('#submit-button')
      .assert.containsText('.help-block', 'Password must match')
      .pause(1000);
  },
  'user get automatically logged in when he sign up form is correctly filled':
  (browser) => {
    browser
      .url('http://localhost:3000')
      .pause('1000')
      .execute(() => {
        document.querySelector('#Sign-Up-Form').click();
      })
      .setValue('input[name=username]', 'lovelace')
      .setValue('input[name=email]', 'lovelace@exmaple.com')
      .setValue('input[name=password]', 'lovelace')
      .setValue('input[name=passwordConfirmation', 'lovelace')
      .pause('1000')
      .click('#submit-button')
      .pause('1000');
  },
  'user can sign out from the app':
  (browser) => {
    browser
      .url('http://localhost:3000')
      .pause(1000)
      .click('.nav-item.dropdown.show-large')
      .pause(1000)
      .click('#log-out-link')
      .pause('2000');
  },
  'do not allow a user sign in with no empty passsword':
  (browser) => {
    browser
      .url('http://localhost:3000')
      .pause('1000')
      .click('#sign-in-link')
      .pause(3000)
      .setValue('input[name=identifier]', 'lovelace@exmaple.com')
      .pause(1000)
      .setValue('input[name=password]', '')
      .pause(1000)
      .click('.login-submit')
      .pause(2000)
      .assert.containsText('.help-block', 'This field is required')
      .pause(1000);
  },
  'do not allow a user sign in with a wrong passsword':
  (browser) => {
    browser
      .url('http://localhost:3000')
      .pause('1000')
      .click('#sign-in-link')
      .pause(3000)
      .setValue('input[name=identifier]', 'lovelace@exmaple.com')
      .pause(1000)
      .setValue('input[name=password]', 'lovelace700')
      .pause(1000)
      .click('.login-submit')
      .pause(2000)
      .waitForElementVisible('.swal-modal', 100)
      .assert.containsText('.swal-modal', 'Oops!')
      .assert.containsText('.swal-modal', 'Sorry Invalid credentials')
      .pause(1000);
  },
  'allow a user sign in ':
  (browser) => {
    browser
      .refresh()
      .url('http://localhost:3000')
      .pause('1000')
      .click('#sign-in-link')
      .pause(3000)
      .setValue('input[name=identifier]', 'lovelace@exmaple.com')
      .pause(1000)
      .setValue('input[name=password]', 'lovelace')
      .pause(1000)
      .click('.login-submit')
      .pause(2000)
      .waitForElementVisible('.swal-modal', 100)
      .assert.containsText('.swal-modal', 'welcome')
      .pause(1000)
      .click('.swal-button.swal-button--confirm')
      .pause(2000);
  },
  'allow a user create a recipe':
  (browser) => {
    browser
      .click('.addrecipebtn')
      .pause(2000)
      .setValue('input[name=name]', 'Rice and Beans')
      .setValue('textarea[name=ingredients]', 'rice, stew and tomatoes')
      .setValue('textarea[name=method]', 'Boil the rice')
      .setValue('input[name=cookingTime]', '2')
      .setValue('select[name=option]', 'minutes')
      .click('.add-recipe-button')
      .pause(2000);
  },
  'allow a user edit a recipe':
  (browser) => {
    browser
      .pause(2000)
      .click('.edit-recipe-link')
      .pause(2000)
      .clearValue('input[name=name]')
      .clearValue('textarea[name=ingredients]')
      .clearValue('textarea[name=method]')
      .pause(2000)
      .setValue('input[name=name]', 'Stew and boli')
      .setValue('textarea[name=ingredients]', 'rice, stew and tomatoes')
      .setValue('textarea[name=method]', 'Boil the rice')
      .click('.edit-button-recipe')
      .pause(2000);
  },
  'allow a user view a recipe':
  (browser) => {
    browser
      .click('.view')
      .pause(2000);
  },
  'allow a user favorite a recipe':
  (browser) => {
    browser
      .pause(2000)
      .click('.favorite-btn')
      .waitForElementVisible('.toast-message', 100)
      .assert.containsText('.toast-message', 'recipe favorited');
  },
  'allow a user upvote a recipe':
  (browser) => {
    browser
      .click('.upvote-btn')
      .pause(2000)
      .assert.containsText('#upvote-state', '1')
      .pause(1000);
  },
  'allow a user downvote a recipe':
  (browser) => {
    browser
      .click('.downvote-btn')
      .pause(2000)
      .assert.containsText('#downvote-state', '1')
      .pause(2000)
      .assert.containsText('#upvote-state', '0');
  },
  'allow a user add a review to a recipe':
  (browser) => {
    browser
      .assert.elementPresent('Form')
      .pause(1000)
      .setValue('textarea[name=data]', 'This is really nice')
      .pause(1000)
      .click('.add-review-btn')
      .waitForElementVisible('.toast-message', 100)
      .assert.containsText('.toast-message', 'Review added!!')
      .pause(20000);
  },
  'navigate through the dropwdown':
  (browser) => {
    browser
      .click('.nav-item.dropdown.show-large')
      .pause(1000)
      .click('#favorite-drop')
      .pause(1000)
      .click('.nav-item.dropdown.show-large')
      .pause(1000)
      .click('#all-recipes-drop')
      .pause(1000)
      .click('.nav-item.dropdown.show-large')
      .pause(1000)
      .click('#profile-drop')
      .pause(1000)
      .click('.change-password-link')
      .pause(1000)
      .setValue('input[name=oldPassword', 'lovelace')
      .pause(1000)
      .setValue('input[name=password]', 'lovelace100')
      .pause(1000)
      .click('.password-color')
      .waitForElementVisible('.toast-message', 100)
      .assert.containsText('.toast-message', 'Password successfully changed')
      .pause(6000)
      .click('.nav-item.dropdown.show-large')
      .pause(1000)
      .click('#log-out-link');
  }
};
