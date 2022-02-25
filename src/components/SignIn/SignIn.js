import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      signInEmail: '',
      signInPassword: ''
    }
  }
  onEmailChange = (event) => { /* function to setState of signInEmail to the event.target.value (this is what is sent from the input) */
    this.setState({signInEmail: event.target.value})
  }
  onPasswordChange = (event) => { /* function to setState of signInPassword to the event.target.value (this is what is sent from the input) */
    this.setState({signInPassword: event.target.value})
  }

   onSubmitSignIn = () => { /* This fetches info from the back end. This will send the email and password (live updated as per constructor) */
    fetch('http://localhost:3000/signin', {
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email:this.state.signInEmail,
        password:this.state.signInPassword
      })
    })
    .then(response=>response.json()) /* Response from back end expects info back. Sets response to the response.json and checks data to see if it returned success from the back end. If success, sets homepage to home */
    .then(user => {
      if (user.id) { /* user.id is used because if it bounces back, user will contain a string and be true. user.id is empty = false */
        this.props.loadUser(user);
        this.props.onRouteChange('home'); /* Sets onRouteChange to home. This is shown in the App.js file as the new route, which is live updated on the App.js file*/
      }
    })
  }
  

  render() {
    const {onRouteChange} = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address"
                  onChange={this.onEmailChange} /* stores value onto email varable with function */
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password"
                  onChange={this.onPasswordChange} /* stores value onto password varable with function */
                  />
                </div>
              </fieldset>
              <div className="">
                <input 
                onClick={this.onSubmitSignIn} /* Sends data to back end with function */
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign in"/>
              </div>
              <div className="lh-copy mt3">
                <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
              </div>
          </div>
        </main>
      </article>
    );
  }
} 
export default SignIn;