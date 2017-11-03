import React, { Component } from 'react';
import RecipeForm from './RecipeForm';



class RecipePage extends Component {
  render() {
    return (
      
      <div className= "home-inner">
        <div className ="container">
          <div className= "row justify-content-center">
            <div className='col-lg-6'>
              <div className= "card bg-white text-center card-form">
                <div className="card-body">
                  <h3>Please Add A Recipe</h3>
                  <RecipeForm />                  
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
        
      </div>
      
    )
  }
}

export default RecipePage;
