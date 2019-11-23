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
import { remote_url } from './../../helpers';

import styles from './Map.module.css';
import PopUpButton from '../Button/PopUpButton';
import { bookStatuses } from './../../helpers/constants';
import SwapAgreement from '../Books/SwapAgreement';
import { Send } from 'grommet-icons';


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
            markers: []
        };
        this.renderPopup = this.renderPopup.bind(this);
        this.renderMarkerPopup = this.renderMarkerPopup.bind(this);
    }


    componentDidUpdate(prevProps) {
        if (this.props.width !== this.state.viewport.width) {
            this.setState({viewport: { ...this.state.viewport, width:this.props.width || 550}});
        }
        if (prevProps.markers !== this.props.markers)
            {if (this.props.interactive) {
                this.setState({markers: this.props.markers});
            } else {
                let map = [];
                this.props.markers.forEach(el => {
                    if (el.point.length) {
                        el.point.forEach(point => {
                            map.push({latitude: null, longitude: null, distance: null, ...point , ...el.owner, status: el.status, id: el.id});
                        })
                    } else {
                        map.push({latitude: null, longitude: null, distance: null, ...el.point , ...el.owner, status: el.status, id: el.id});
                    }
                })
                this.setState({markers: map});
            }
        }
    }
    

    componentDidMount() {
        if (this.props.interactive) {
            this.setState({markers: this.props.markers});
        } else {
            let map = [];
            this.props.markers.forEach(el => {
                if (el.point.length) {
                    el.point.forEach(point => {
                        map.push({latitude: null, longitude: null, distance: null, ...point , ...el.owner, status: el.status, id: el.id});
                    })
                } else {
                    map.push({latitude: null, longitude: null, distance: null, ...el.point , ...el.owner, status: el.status, id: el.id});
                }
            })
            this.setState({markers: map});
        }

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
        };
          
        const error = (err) => {
            this.setState({permissionGiven: false});
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
            this.setState( {markers: [...markers, {latitude: latitude, longitude: longitude, name: markerName, id: markers.length !== 0 ? markers[markers.length-1].id + 1 : 1} ]} );
            this.setState({markerName: ''});
            this.setState({newMarker: true});
            this.props.addMarker({latitude: latitude, longitude: longitude, name: markerName});
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
        })});

        this.props.deleteMarker(id);
    }

    renderPopup(){
        const {popupInfo} = this.state;
        return this.state.popupInfo.show && (
            <Popup tipSize={5}
                anchor='bottom-right'
                longitude={popupInfo.state.longitude}
                latitude={popupInfo.state.latitude}
                closeButton={true}
                onClose={() => this.setState({popupInfo: {...popupInfo, show: false}})}
                closeOnClick={false}
            >
                
                <Box margin={{vertical: '-5px'}} direction='row'>
                    <img 
                        alt='avatar'
                        src={popupInfo.info.avatar || remote_url.images.user_default}
                        className={styles.avatar}
                        onError={()=>{this.setState({popupInfo: {info: {...popupInfo.info, avatar: remote_url.images.user_default}}})}}
                    />
                    <Box pad='10px' direction='column'>
                        <Text>{popupInfo.info.django_user.username}</Text>
                        <Text>{String(popupInfo.info.distance || '??? ').slice(0,5)} км</Text>

                    </Box>
                </Box>
                <Box className={styles.botton} margin={{vertical: '10px'}} fill='horizontal'>
                    {popupInfo.info.status === bookStatuses.AVAILABLE ?
                        <PopUpButton fill='horizontal' 
                            innerObject={onclose => <SwapAgreement swapRequest={this.props.swapRequest} bookId={popupInfo.info.id} onClose={onclose}></SwapAgreement>} 
                            label={<Text color='brand'>Попросить</Text>} 
                            icon={<Send color='brand'></Send>}>
                        </PopUpButton>
                        :
                        <PopUpButton title='Книга занята' disabled fill='horizontal' label={<Text color='brand'>Попросить</Text>} icon={<Send color='brand'></Send>}></PopUpButton>
                    }
                </Box>
            </Popup>
        )
    }



    render() {
        const mapTab = (
        <Tab title='Карта'>
            {!this.state.permissionGiven &&
                <Box align='center' fill='horizontal' height='30px'>
                    <Text color='brand'>Вы не дали доступ к своей геопозиции</Text>
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
                            <Mark el={el} name={el.name} key={el.latitude + el.longitude} 
                                    latitude={Number(el.latitude)} 
                                    longitude={Number(el.longitude)} 
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
        </Tab>);

        const listTab = (
            <Tab title='Список'>
                {!this.state.permissionGiven &&
                    <Box align='center' fill='horizontal'>
                        <Text color='brand'>Вы не дали доступ к своей геопозиции</Text>
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
            </Tab>);
        return (
            <Box align='center' fill direction='column'>
                {this.props.interactive && 
                <Tabs fill>
                    {mapTab}
                    {listTab}
                </Tabs>
                }
                {!this.props.interactive && 
                <Tabs fill>
                    {listTab}
                    {mapTab}
                </Tabs>
                }
            </Box>
        );
    }
}

export default Map