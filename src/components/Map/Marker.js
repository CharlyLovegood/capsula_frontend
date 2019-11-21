import React from 'react';
import { Location } from 'grommet-icons';

import { Marker } from 'react-map-gl';
import { Text } from 'grommet';



function Mark(props) {
        const [latitude, setLatitude] = React.useState(props.latitude);
        const [longitude, setLongitude] = React.useState(props.longitude);

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
                <Location color='#ff8d75' onClick={() => props.setPopUp(latitude, longitude)}></Location>
                <Text color='#ff8d75'>{props.name}</Text>
            </Marker>
        )
}

export default Mark;