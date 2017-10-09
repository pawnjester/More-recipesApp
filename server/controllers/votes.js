/* eslint-disable */
import models from '../models';

const recipe = models.Recipe;

const upvotes = models.Upvote;
const downvotes = models.Downvote;

/**
 * Class Definition for the Vote Object
 * @export
 * @class Vote
 */
export default class Vote {
  /**
   * up-vote a recipe
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {object} Class instance
   * @memberof Vote
   */
  upvote(req, res) {

    const userId = req.currentUser.id;
    const recipeId = req.params.recipeId;
    downvotes.findOne({
      where: {
          $and: [
            { userId },
            { recipeId }
          ]
        }
    })
    .then(downFound => {
      if(downFound) {
        downvotes.destroy({
          where: {
          $and: [
            { userId },
            { recipeId }
          ]
        }
      })
      .then(() => {
        recipe.findOne({
          where:{
            id: recipeId
          }
        })
        .then(dec => {
          dec.decrement('downVotes')
        })
      })
      }
    })

    upvotes.findOne({
      where: {
        $and : [
          {userId},
          {recipeId}
        ]
      }
    })
    .then(voteFound => {
      if(voteFound) {
        return res.status(400).json({
          message: `This recipe with id: ${recipeId} has already been upvoted`
        })
      }

      upvotes.create({
        userId,
        recipeId
      })
      .then((upvote) => {
        recipe.findOne({
          where: {
            id: recipeId
          }
        })
        .then((recipeVote) => {
          recipeVote.increment('upVotes')
          res.status(201).json({
          message: `This recipe with id: ${recipeId} just Upvoted`
        })
        })
        
      })
    })
  }

  downvote (req, res) {
    const userId = req.currentUser.id;
    const recipeId = req.params.recipeId;
    upvotes.findOne({
      where: {
          $and: [
            { userId },
            { recipeId }
          ]
        }
    })
    .then(upFound => {
      if(upFound) {
        upvotes.destroy({
          where: {
          $and: [
            { userId },
            { recipeId }
          ]
        }
      })
      .then(() => {
        recipe.findOne({
          where:{
            id: recipeId
          }
        })
        .then(dec => {
          dec.decrement('upVotes')
        })
      })
      }
    })

    downvotes.findOne({
      where: {
        $and : [
          {userId},
          {recipeId}
        ]
      }
    })
    .then(voteFound => {
      if(voteFound) {
        return res.status(400).json({
          message: `This recipe with id: ${recipeId} has already been downvoted`
        })
      }

      downvotes.create({
        userId,
        recipeId
      })
      .then((downvote) => {
        recipe.findOne({
          where: {
            id: recipeId
          }
        })
        .then((recipeVote) => {
          recipeVote.increment('downVotes')
          res.status(201).json({
          message: `This recipe with id: ${recipeId} just downvoted`
        })
        })
        
      })
    })
  }
}
