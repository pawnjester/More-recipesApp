/* eslint-disable */
import models from '../models';

console.log(models);

const favorite = models.Favorite;

export default class Favorite {
  addFavorite (req,res) {
    const userId = req.currentUser.id;
    const recipeId = req.params.recipeId;

    // favorite.findOrCreate({where:{userId, recipeId }})
    // .spread((favorite, created) => {
    //   if(created) {
    //     return res.status(201).send({message: `recipe with ${recipeId} has been added`});
    //   }
    //   return res.status(201).send({message: `recipe is already a favorite`});
    // })
    // .catch(e => {return res.status(400).send({message: 'recipe could not be added to favorite'})});
    // return this;
    favorite.findOne({
      where: {
        recipeId,
        userId
      }
    })
    .then(fav => {
      if(fav) {
        return res.status(201).send({message: 'recipe is already a favorite'});
      }
      favorite.create({
        recipeId,
        userId,
      })
      .then(newfav => {
        res.status(201).send({message: `recipe with ${recipeId} has been added`})
      })
      .catch(err => {return res.status(400).send({message: 'recipe could not be added to favorite'})})
    })

  }

  getAllFavorite(req, res) {
    const userId = req.currentUser.id;
    
    favorite.findAll({
      where: {
        userId
      },
      include: [{
        model: 'Recipe'
      }]
    })
    .then(userFavorite => {
      res.status(200).send({message: "the list of recipes", userFavorite})
    })
    .catch(e => {return res.status(400).send({message: "Recipe cannot be retrieved"})})

  }
}