import React from 'react';

//register component that shows email, name and password for user. loads when this.state.route is NOT 'signin' nor 'home'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      email: '',
      password: '',
      name: '',
    }
  }


onNameChange = (event) => { /* function to setState of name to the event.target.value (this is what is sent from the input) */
  this.setState({name: event.target.value})
}
onEmailChange = (event) => { /* function to setState of email to the event.target.value (this is what is sent from the input) */
  this.setState({email: event.target.value})
}
onPasswordChange = (event) => { /* function to setState of password to the event.target.value (this is what is sent from the input) */
  this.setState({password: event.target.value})
}

onSubmitSignIn = () => { /* This fetches info from the back end. This will send the email and password (live updated as per constructor) */
  fetch('http://localhost:3000/register', {
    method:'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email:this.state.email,
      password:this.state.password,
      name: this.state.name
    })
  })
  .then(response=>response.json()) /* Response from back end expects info back. Sets response to the response.json and checks data to see if it returned success from the back end. If success, sets homepage to home */
  .then(user => {
    if (user.id) { /* user.id is used here because if empty user is registered, back end will return an error. user will contain the string of bad request (user is filled, so true), so we check user.id (will be empty, false) */
      this.props.loadUser(user); /* this is created because we want to call it from the app.js file, so we use this.props */
      this.props.onRouteChange('home'); /* Sets onRouteChange to home. This is shown in the App.js file as the new route, which is live updated on the App.js file*/
    }
  })
}

  render() {
    const { onRouteChange} = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="text" 
                name="name"  
                id="name"
                onChange={this.onNameChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email"  
                id="email"
                onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password"  
                id="password"
                onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input 
              onClick={(this.onSubmitSignIn)}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" 
              type="submit" 
              value="Register"/>
            </div>
          </div>
        </main>
      </article>
    );
  }
} 

export default Register;