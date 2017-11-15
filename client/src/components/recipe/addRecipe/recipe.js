import React, { Component } from 'react'

export default class Recipe extends Component {
  render() {
    return (
        <div className="card">
            <img className="card-img-top" src="" alt="Pizza"/>
            <div className="card-body">
              <h4 className="card-title">{this.props.name}</h4>
              <p className="card-text">efgr</p>

            </div>
            <div className="card-body clearfix">
              <div className="text-left text-success float-left">
                <i className="fa fa-pencil" aria-hidden="true"></i><a href="" data-toggle="modal" data-target="#editModal"><span id='clickableAwesomeFont' className="text-success">&nbsp;Edit</span></a>
              </div>
              <div className="text-right text-danger float-right">
                <i className="fa fa-trash" aria-hidden="true"></i><span id='clickableAwesomeFont' className="delete">&nbsp;Delete</span>
              </div>
              <div className="text-center text-primary float-center">
                <i className="fa fa-eye" aria-hidden="true"></i><span id='clickableAwesomeFont' className="view">&nbsp;View</span>
              </div>
            </div>
          </div>
    )
  }
}
