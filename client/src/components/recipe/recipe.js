import React, { Component } from 'react'

class Recipe extends Component {
  render() {
    return (
        <div class="row high">
      <div class="col-md-4 col-xs-4">
        <div class="card">
          <img class="card-img-top" src="img/chcolate-cream.jpg" alt="Chocolate cream"/>
          <div class="card-body">
            <h4 class="card-title">Chocolate cream</h4>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

          </div>
          <div class="card-body clearfix">
            <div class="text-left text-success float-left">
              <i class="fa fa-pencil" aria-hidden="true"></i><a href="" data-toggle="modal" data-target="#editModal"><span id='clickableAwesomeFont' class="text-success">&nbsp;Edit</span></a>
            </div>
            <div class="text-right text-danger float-right">
              <i class="fa fa-trash" aria-hidden="true"></i><span id='clickableAwesomeFont' class="delete">&nbsp;Delete</span>
            </div>
            <div class="text-center text-primary float-center">
              <i class="fa fa-eye" aria-hidden="true"></i><span id='clickableAwesomeFont' class="view" href="detail.html">&nbsp;View</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Recipe;
