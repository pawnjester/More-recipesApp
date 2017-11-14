import React, { Component } from 'react';
import  Recipe  from './recipe';

export default class RecipeGrid extends Component {
  render() {
    return (
    <div className="col-md-4 col-xs-4">
        <Recipe />
    </div>
    )
  }
}
