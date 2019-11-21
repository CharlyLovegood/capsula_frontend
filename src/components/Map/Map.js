import React, {Component} from 'react';
import ReactMapGL, { FlyToInterpolator, 
    Marker, 
    Popup, 
    GeolocateControl, 
    NavigationControl, 
    Layer
} from 'react-map-gl';
import { Location } from 'grommet-icons';
import Mark from './Marker';
import { Button, Box, Tabs, Tab, TextInput, Text } from 'grommet';
import ListElement from './ListElement';


const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};


const BuildingsLayer = {
    id: '3d-buildings',
    source: 'composite',
    'source-layer': 'building',
    filter: ['==', 'extrude', 'true'],
    type: 'fill-extrusion',
    minzoom: 15,
    paint: {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            15.05, ['get', 'height']
        ],
        'fill-extrusion-base': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            15.05, ['get', 'min_height']
        ],
        'fill-extrusion-opacity': .5
    },
};



class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissionGiven: false,
            addMarker: false,
            newMarker: true,
            label: 'Добавить точку',
            markerName: '',
            viewport: {
                latitude: 55.7577,
                longitude: 37.4376,
                zoom: 12,
                pitch: 55,
                bearing: -17.6,
                width: this.props.width || 550,
                height: 500,
                antialias: true
            },
            currentPosition: {
                latitude: 55.7577,
                longitude: 37.4376,
            },
            popupInfo: {
                state: {
                    latitude: 55.7577,
                    longitude: 37.4376
                },
                info: {},
                show: false,
            },
            markers: [
                {
                    id: 1,
                    name: 'Дом',
                    latitude: 55.920202599999996,
                    longitude: 37.5198476,
                },
                {
                    id: 2,
                    name: 'Учеба',
                    latitude: 55.7577,
                    longitude: 37.5398476,
                },
                {
                    id: 3,
                    name: 'Работа',
                    latitude: 57.7577,
                    longitude: 38.4376,
                }
            ]
        };
        this.renderPopup = this.renderPopup.bind(this);
        this.renderMarkerPopup = this.renderMarkerPopup.bind(this);
    }


    componentDidUpdate() {
        if (this.props.width !== this.state.viewport.width) {
            this.setState({viewport: { ...this.state.viewport, width:this.props.width || 550}});
        }
    }
    

    componentDidMount() {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
          
        const success = (pos) => {
            var crd = pos.coords;

            this.setState({viewport: { ...this.state.viewport, latitude: crd.latitude, longitude: crd.longitude }})
            this.setState({ permissionGiven: true });
            this.setState({currentPosition: { latitude: crd.latitude, longitude: crd.longitude }});

            console.log('Ваше текущее метоположение:');
            console.log(`Широта: ${crd.latitude}`);
            console.log(`Долгота: ${crd.longitude}`);
            console.log(`Плюс-минус ${crd.accuracy} метров.`);
        };
          
        const error = (err) => {
            this.setState({permissionGiven: false});

            console.warn(`ERROR(${err.code}): ${err.message}`);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    addMarker() {
        if (this.state.newMarker) {
            const lat = this.state.viewport.latitude;
            const lon = this.state.viewport.longitude;
            this.setState({currentPosition: { latitude: lat , longitude: lon}});
            this.setState({newMarker: false});
        }

        const { latitude, longitude } = this.state.currentPosition;

        if ((this.state.popupInfo && this.state.popupInfo.state.latitude !== latitude) || !this.state.popupInfo) {
            this.setState( {popupInfo: { state: {
                    latitude: latitude,
                    longitude: longitude,
                }          
            }})
        }

        return(
            <Marker draggable={true} onDragEnd={(event) => {
                    this.setState({currentPosition: { latitude: event.lngLat[1], longitude: event.lngLat[0] }})
                }} 
                longitude={longitude} 
                latitude={latitude} 
                offsetLeft={-4} 
                offsetTop={-20}
            >
                <Location color='#ff9901' onClick={() => this.setState( {popupInfo: { state: {
                            latitude: latitude,
                            longitude: longitude,
                        }          
                }})}></Location>
            </Marker>
        )
    }

    confirmMarker() {
        const { latitude, longitude } = this.state.currentPosition;
        let { markers, markerName } = this.state;
        if (markerName !== '') {
            this.setState( {markers: [...markers, {latitude: latitude, longitude: longitude, name: markerName, id: markers[markers.length-1].id + 1} ]} );
            this.setState({markerName: ''});
            this.setState({newMarker: true});
            return true;
        }
        return false;
    }

    renderMarkerPopup(){
        return this.state.addMarker && this.state.popupInfo && (
            <Popup tipSize={5}
                anchor='bottom-right'
                longitude={this.state.popupInfo.state.longitude}
                latitude={this.state.popupInfo.state.latitude}
                closeButton={false}
            >
                <Box margin='-10px' fill>
                    <TextInput required 
                        plain 
                        placeholder="Название"
                        onChange={event => this.setState({markerName: event.target.value})}
                        value={this.state.markerName}
                    ></TextInput>
                </Box>
            </Popup>
        )
    }

    deleteMarker(id) {
        this.setState({markers: this.state.markers.filter(el => {
            return el.id !== id
        })})
    }

    renderPopup(){
        return this.state.popupInfo.show && (
            <Popup tipSize={5}
                anchor='bottom-right'
                longitude={this.state.popupInfo.state.longitude}
                latitude={this.state.popupInfo.state.latitude}
                closeButton={true}
                onClose={() => this.setState({popupInfo: {...this.state.popupInfo, show: false}})}
                closeOnClick={false}
            >
                {this.state.popupInfo.info.name}
            </Popup>
        )
    }



    render() {
        return (
            <Box align='center' fill direction='column'>
                <Tabs fill>
                    <Tab title='Карта'>
                        {!this.state.permissionGiven &&
                            <Box align='center' fill='horizontal' height='30px'>
                                <Text>Вы не дали доступ к своей геопозиции</Text>
                            </Box>
                        }
                        <Box height='5px'></Box>
                        <ReactMapGL
                            {...this.state.viewport}
                            mapStyle='mapbox://styles/mapbox/dark-v10'
                            transitionInterpolator={new FlyToInterpolator({curve: 14})}
                            mapboxApiAccessToken='pk.eyJ1IjoiaXZhbm92YW5hdGFzaGEiLCJhIjoiY2szNG42b3ZvMG5ubzNsbnlnMDU1eWRoMCJ9._ffQ1YfkfgpyfNrmzSRvCg'
                            onViewportChange={(viewport) => this.setState({viewport})}
                        >
                            <Layer {...BuildingsLayer} />
                            
                            <Box gap='5px' className='nav' style={navStyle}>
                                <NavigationControl />
                                <GeolocateControl trackUserLocation={true}
                                    showUserLocation={true}
                                    positionOptions={{enableHighAccuracy: true}}/>
                            </Box>

                            {this.state.markers.map(el => {
                                return(
                                    <Mark name={el.name} key={el.latitude + el.longitude} 
                                            latitude={el.latitude} 
                                            longitude={el.longitude} 
                                            setPopUp={(latitude, longitude) => this.setState({popupInfo: { state: {
                                            latitude: latitude,
                                            longitude: longitude,
                                        }, info: el, show: true}
                                    })}></Mark>
                                )
                            })}


                            {this.state.addMarker && this.addMarker()}

                            {this.props.interactive && this.renderMarkerPopup()}
                            {!this.props.interactive && this.renderPopup()}

                        </ReactMapGL>
                        {this.props.interactive &&
                            <Box gap='10px' fill='horizontal' direction='row'>
                                <Box width='50%' margin={{vertical: '10px'}}>
                                    <Button onClick={() => {
                                        if (this.state.addMarker === false) {
                                            this.setState({addMarker: true, label: 'Подтвердить'});
                                        } else {
                                            if (this.confirmMarker()) {
                                                this.setState({addMarker: false, label: 'Добавить точку', newMarker: true});
                                                this.setState({popupInfo: null});
                                            }
                                        }
                                    }} label={<Text color='brand'><strong>{this.state.label}</strong></Text>} />
                                </Box>
                                <Box width='50%' margin={{vertical: '10px'}}>
                                    <Button onClick={() => this.setState({addMarker: false, label: 'Добавить точку', popupInfo: null, newMarker: true, markerName: ''})} 
                                        disabled={!this.state.addMarker} 
                                        label={<Text color='brand'><strong>Отменить добавление</strong></Text>}>
                                    </Button>
                                </Box>
                            </Box>
                        }
                    </Tab>
                    <Tab title='Список'>
                        {!this.state.permissionGiven &&
                            <Box align='center' fill='horizontal'>
                                <Text>Вы не дали доступ к своей геопозиции</Text>
                            </Box>
                        }
                        <Box height='5px'></Box>
                        {this.props.interactive &&
                            <Box gap='10px' direction='column' height='456px' fill='horizontal'>

                                {this.state.markers.map(el => {
                                    return(
                                        <ListElement deleteMarker={() => this.deleteMarker(el.id)} 
                                            name={el.name} 
                                            latitude={el.latitude} 
                                            longitude={el.longitude} 
                                            key={el.latitude + el.longitude + '_list'} 
                                        />
                                    )
                                })}
                            </Box>
                        }
                        {!this.props.interactive &&
                            <Box gap='10px' direction='column' height='400px' fill='horizontal'>
                                {this.props.list}
                            </Box>
                        }
                    </Tab>
                </Tabs>
                

            </Box>
        );
    }
}

export default Map