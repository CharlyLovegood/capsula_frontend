import React from 'react';
import { Location } from 'grommet-icons';

import { Marker } from 'react-map-gl';
import { Text } from 'grommet';



function Mark(props) {
        const [latitude, setLatitude] = React.useState(props.latitude);
        const [longitude, setLongitude] = React.useState(props.longitude);
        console.log(props)
        return (
            <Marker draggable={false} onDragEnd={(event) => {
                setLatitude(event.lngLat[1]);
                setLongitude(event.lngLat[0]);
                }} 
                longitude={longitude} 
                latitude={latitude} 
                offsetLeft={-4} 
                offsetTop={-20}
            >
                <Location color='#2affb0' onClick={() => props.setPopUp(latitude, longitude)}></Location>
                <Text color='#2affb0'>{props.name}</Text>
            </Marker>
        )
}

export default Mark;