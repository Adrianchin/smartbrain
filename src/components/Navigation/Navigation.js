import React from 'react';

/*Navigation componant, shows the signin, register and signout at top*/

const Navigation = ({onRouteChange, isSignedIn}) => {
        if(isSignedIn){/* if isSignedIn true, show only signout*/
            return ( /*on click, runs function onRouteChange as 'signout' as input. Note ()=> is used so it does not run when rendered, it will only run when button is clicked*/
            <nav style = {{display:'flex', justifyContent: 'flex-end'}}>
                <p onClick={()=> onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>//
            </nav>
             );
        } else {/* if isSignedIn false, show signin and register*/
            return (/*on click, runs function onRouteChange as 'signout' or 'register' as input*/
                <nav style = {{display:'flex', justifyContent: 'flex-end'}}>
                    <p onClick={()=> onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign in</p>
                    <p onClick={()=> onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
                </nav>
            ); 
        }
} 

export default Navigation;