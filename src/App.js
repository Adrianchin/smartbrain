import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import 'tachyons'
import Logo from './components/Logo/Logo'; 
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'; 
import Rank from './components/Rank/Rank'; 
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const app = new Clarifai.App({
  apiKey: "d9e83bac7f6c4e7d88c0691a3919dd0a",
 });

 /*Constructor is called whenever you are messing with state objects in react. This allows you to live update.*/
class App extends Component { /*constructor to create a copy of the compoannt and add to it, see advanced functions from Javasctipt advanced topics*/
  constructor () {
    super();
    this.state = {
      input:'', /*used for copying text in box*/
      imageUrl:'', /* used for storing imageURL*/
      box:{}, /* used for drawing the box shape on the picture*/
      route: 'signin', /* used for navigating the site, stores a string to direct the page*/
      isSignedIn:false, /* used for conditional to determine what to display in the top right/sign in status*/
      user: {
        id:'',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: 0,
      joined: data.joined,
    }})
  }
/*note that this is a function used to give box locations for the drawing of the box on the rendered image.*/
  calculateFaceLocation = (data) => { /*uses clarifi to calculate the location of the box for the image scan*/
    const clarifiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifiFace.left_col*width,
      topRow: clarifiFace.top_row*height,
      rightCol: width-(clarifiFace.right_col*width),
      bottomRow: height-(clarifiFace.bottom_row*height)
    };
  }

  displayFaceBox = (box) => {/*sets state for the box data, maybe it could be put into calculate face location?*/
    console.log(box);
    this.setState({box:box}); /*Note, setState is used to set the new state of the varable we constructed in the constructor. This is the live variable that updates */
  }

  onInputChange = (event) => {/* sets state for the input from event.target.value, ei. whatever the input is from the user. Placeholder*/
    this.setState({input: event.target.value});
  }

  onButtonSubmit=() => {/* calls the Clarifai API function on button press*/
    this.setState({imageUrl:this.state.input}) /* sets imageUrl to whatever is in this.state.input, or whatever is in the input box from the user*/
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
          method:'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id:this.state.user.id
        })
      })
      .then(response => response.json()) /*sets users count from the server to the new count number*/
      .then(count=>{
        this.setState(Object.assign(this.state.user, {entries: count})) /* FYI Important: This Object.assign( x, y) is a javascript spec that ONLY changes the items in the onject x, for ONLY entry Y. Otherwise it overwrites the entire object*/
      })
    }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })/*displays box calculated from Clarifai. Note response is the function called from Clarifai api*/
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {/*if signed out, when isSignedIn will be false. This will show navigation bar*/
      this.setState({isSignedIn: false});
    }
    else if (route === 'home'){/*if you are home, you are signed in and isSignedIn will be true. This will show navigation bar*/
      this.setState({isSignedIn: true});
    }
    this.setState({route: route}); /* Sets the dynamic variable route to the output of whatever page you are on, which is what SignIn.js changes*/
  }
/* Note: See how we will render the componants, which are calling functions with the this.(function name) which is written above. This is to setState of the live variable*/
  render(){
  return (
      <div className="App">
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home'/* if this.state.route is 'home', then run the main page, else nested loop for register or signup. Note this is in curley brackets because its jsx, so we can do conditionals with {} */
          ?<div>
          <Logo/>
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
            />
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
          :(
            this.state.route === 'signin' || this.state.route === 'signout' /*nested if else, if if this.state.route is 'signin', then run SignIn page, else Register Page. Also updated to do sign in if you log out!*/
          ?<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
