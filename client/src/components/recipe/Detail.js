import React, { Component } from 'react'

export default class Detail extends Component {
  render() {
    return (
        <div class ="container home-inner">
          <div class= "row justify-content-center">            
            <div class='col-lg-6 '>
              <div class= "card bg-danger text-center card-form">
                <div class="card-body">
                  <h3>Sign In</h3>
                  <p>Welcome to More-Recipes, Please log in</p>
                  <form>
                    
                    <div class= "form-group">
                      <input type="text" class="form-control form-control-lg" placeholder="Username"/>
                      
                    </div>
                    <div class= "form-group">
                      <input type="password" class="form-control form-control-lg" placeholder="Password"/>
                      
                    </div>
                    
                    <input type="submit" value ="Submit" class="btn btn-outline-light btn-block"/>
                  </form>
                  <div class="card-body ">                    
                    <p class="card-text text-right"><a href="reset_password.html"  class="text-white">Forgot Password?</a> </p>                    
                  </div>
                </div>
            </div>
            
          </div>
          
        </div>
        
      </div>
      
    )
}
}
