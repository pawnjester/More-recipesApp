const Validation = {
  recipeId(req, res, next) {
    const { recipeId } = req.params;

    if (isNaN(recipeId)) {
      return res.status(406).json({
        statusCode: 406,
        error: 'Recipe id is not a number'
      });
    }
    next();
  },

  reviewId(req, res, next) {
    const { reviewId } = req.params;
    if (isNaN(reviewId)) {
      return res.status(406).json({
        statusCode: 406,
        error: 'Review id is not a number'
      });
    }
    if (!reviewId) {
      return res.status(406).json({
        statusCode: 406,
        error: 'You need to put in a review ID'
      });
    }
    next();
  },

  reviewContent(req, res, next) {
    const { data } = req.body;
    if (!data) {
      return res.status(406).json({
        statusCode: 406,
        error: 'You need to put a review!'
      });
    }
    next();
  },

  favoriteId(req, res, next) {
    const { favoriteId } = req.params;
    if (isNaN(favoriteId)) {
      return res.status(406).json({
        statusCode: 406,
        error: 'Favorite id is not a number'
      });
    }
    next();
  },

  addRecipeValidation(req, res, next) {
    let name;
    let ingredients;
    if (req.body.name) {
      name = req.body.name.trim().toLowerCase();
    }
    if (req.body.ingredients) {
      ingredients = req.body.ingredients.trim().toLowerCase();
    }
    const { method } = req.body;
    if (!name) {
      return res.status(406).json({
        statusCode: 406,
        error: 'You need to fill in a name of the recipe'
      });
    } else if (!ingredients) {
      return res.status(406).json({
        statusCode: 406,
        error: 'You need to fill in the Ingredients'
      });
    } else if (!method) {
      return res.status(406).json({
        statusCode: 406,
        error: 'You need to fill in the method of preparation'
      });
    } else if (!ingredients && !name && !method) {
      return res.status(406).json({
        statusCode: 406,
        error: 'Please enter the required details (name, Ingredients and method)'
      });
    }
    next();
  },

  editRecipeValidation(req, res, next) {
    let name;
    let ingredients;
    if (req.body.name) {
      name = req.body.name.trim().toLowerCase();
    }
    if (req.body.ingredients) {
      ingredients = req.body.ingredients.trim().toLowerCase();
    }
    next();
  },

  signUpvalidation(req, res, next) {
    let email;
    let username;
    let password;
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const whiteSpace = /\s/;

    if (req.body.email) {
      email = req.body.email.trim();
    }

    if (req.body.username) {
      username = req.body.username.trim();
    }

    if (req.body.password) {
      password = req.body.password;
    }

    if (!username && !password && !email) {
      return res.status(406).json({
        statusCode: 406,
        error: 'Please fill in the required details'
      });
    }

    if (!username || username.length < 6) {
      return res.status(406).json({
        statusCode: 406,
        error: 'You need to fill in your username with a minimum length of 6'
      });
    } else if (!email) {
      return res.status(406).json({
        statusCode: 406,
        error: 'You need to fill in your email'
      });
    } else if (!filter.test(email)) {
      return res.status(406).json({
        statusCode: 406,
        error: 'Invalid email address!'
      });
    } else if (!req.body.password) {
      return res.status(406).json({
        statusCode: 406,
        error: 'You need to fill in the password'
      });
    } else if (whiteSpace.test(password)) {
      return res.status(406).json({
        statusCode: 406,
        error: 'Password cannot contain spaces'
      });
    } else if (password.length < 6) {
      return res.status(406).json({
        statusCode: 406,
        error: 'You need to fill in a password with a minimum length of 6'
      });
    }
    next();
  },

  signInValidation(req, res, next) {
    let identifier;

    if (req.body.identifier) {
      identifier = req.body.identifier.trim();
    }

    if (req.body.identifier) {
      identifier = req.body.identifier.trim();
    }

    if (!req.body.identifier) {
      return res.status(406).json({
        statusCode: 406,
        error: 'Email or username cannot be empty'
      });
    }
    if (!req.body.password) {
      return res.status(406)
        .json({
          statusCode: 406,
          error: 'Password field cannot be empty',
        });
    }
    next();
  },

  checkEmailValidation(req, res, next) {
    const { email } = req.body;
    if (!email) {
      return res.status(406).json({
        statusCode: 406,
        error: 'Please put in an email'
      });
    }
    next();
  },

  changePasswordValidation(req, res, next) {
    const { oldPassword, password } = req.body;

    if (!oldPassword || oldPassword.length < 6) {
      return res.status(406).json({
        statusCode: 406,
        error: 'You need to fill in your password, minimum of 6'
      });
    }
    if (!password || password.length < 6) {
      return res.status(406).json({
        statusCode: 406,
        error: 'You need to fill in your password, minimum of 6'
      });
    }

    next();
  }


};
export default Validation;
