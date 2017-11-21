import React, { Component } from 'react';

export default class Recipe extends Component {
  constructor(props) {
    super(props)
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete =(event) => {
    console.log('we are deleting');                          
    this.props.deleteRecipe(this.props.recipe.id);
    console.log('we are deleting******');                
  }
  render() {
    return (
      <div className="col-md-4 col-xs-12 " >
      
        <div className="card">
            <img className="card-img-top" src= {this.props.recipe.imageUrl}/>
            <div className="card-body">
              <h4 className="card-title">{this.props.recipe.name}</h4>
              <p className="card-text">{this.props.recipe.ingredients}</p>
              <p className="card-text">{this.props.recipe.method}</p>

            </div>
            <div className="card-body clearfix">
              <div className="text-left text-success float-left">
                <i className="fa fa-pencil" aria-hidden="true"></i><a href="" data-toggle="modal" data-target="#editModal"><span id='clickableAwesomeFont' className="text-success">&nbsp;Edit</span></a>
              </div>
              <div className="text-right text-danger float-right">
                <i className="fa fa-trash" aria-hidden="true"></i><span id='clickableAwesomeFont' onClick = {() =>this.onDelete()}className="delete">&nbsp;Delete</span>
              </div>
              <div className="text-center text-primary float-center">
                <i className="fa fa-eye" aria-hidden="true"></i><span id='clickableAwesomeFont' className="view">&nbsp;View</span>
              </div>
            </div>
          </div>
          </div>
          
    )
  }
}
