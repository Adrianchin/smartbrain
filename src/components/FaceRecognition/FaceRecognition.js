import React from 'react';
import './FaceRecognition.css'

//displays the image under the url input box. Also shows the bounding box output by Clarifai (with soem math done to it)

const FaceRecognition = ({imageUrl, box}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
                <div className='bounding-box' style={{top: box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}> </div>
            </div>
        </div>
    );
} 

export default FaceRecognition;