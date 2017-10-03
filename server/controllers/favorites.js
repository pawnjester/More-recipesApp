/* eslint-disable */
import models from '../models';

console.log(models);

const favorite = models.Favorite;

export class Favorite {
  addFavorite (req,res) {
    const userId = req.currentUser.id;
    const recipeId = req.params.recipeId;

    favorite.findOrCreate({where:{userId, recipeId }})
    .spread((favor, created) => {
      if(created) {
        return res.status(201).send({message: `recipe with ${recipeId} has been added`});
      }
      return res.status(201).send({message: `recipe is already a favorite`});
    })
    .catch(e => {return res.status(400).send({message: "recipe could not be added to favorite"})});
    return this;

  }

  getAllFavorite(req, res) {
    const userId = req.currentUser.id;
    
  }
}