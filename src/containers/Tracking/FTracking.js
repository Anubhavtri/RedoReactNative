import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import { point } from '@turf/helpers';
import { lineString as makeLineString } from '@turf/helpers';
import RouteSimulator from './RouteSimulator';
import carIcon from './car.png';
import bearing from '@turf/bearing';
import bbox from '@turf/bbox';

// for map sdk
MapmyIndiaGL.setMapSDKKey('4e1801731a2e64986f7af64debbfede3');//place your mapsdkKey
MapmyIndiaGL.setRestAPIKey('4e1801731a2e64986f7af64debbfede3');//your restApiKey
MapmyIndiaGL.setAtlasClientId('33OkryzDZsKamfiPiKFdn3JedW3I1sO_efflBdDslqsmTSZmsD2SPw4DU3SPC459TYVRlA4DUCLLpIoO5jAOJQ==');//your atlasClientId key
MapmyIndiaGL.setAtlasClientSecret('lrFxI-iSEg8wS11NUoDEndR2zcztS6p73mr5dC4bfgeS1SSbfOhj2SKP-Vh0gbPinqh-w3f66JbgvjrDuq5OdXMZYOVLEuEG'); //your atlasClientSecret key
MapmyIndiaGL.setAtlasGrantType('client_credentials');

//restApi sdk
Mapmyindia.setRestApiKey('4e1801731a2e64986f7af64debbfede3');//your restApiKey
Mapmyindia.setClientId('33OkryzDZsKamfiPiKFdn3JedW3I1sO_efflBdDslqsmTSZmsD2SPw4DU3SPC459TYVRlA4DUCLLpIoO5jAOJQ==');//your atlasClientId key
Mapmyindia.setClientSecret('lrFxI-iSEg8wS11NUoDEndR2zcztS6p73mr5dC4bfgeS1SSbfOhj2SKP-Vh0gbPinqh-w3f66JbgvjrDuq5OdXMZYOVLEuEG');//your atlasClientSecret key

const fTracking = () => {

    const [route, setRoute] = useState();
    const [currentPoint, setCurrentPoint] = useState()
    const [routeSimulator, setRouteSimulator] = useState()
    const [bearing, setbearing] = useState(0)
    const [sourceCoordinates, setsourceCoordinates] = useState('77.3689289816222,28.611043001222633')
    const [destinationCoordinates, setdestinationCoordinates] = useState('77.37603895278735,28.62814080959938')
    const [routeCoordinates, setRouteCoordinates] = useState([])
    const [isMounted, setIsMounted] = useState(false)
    let routeSimulatore;
    useEffect(() => {
        callApi();
        setIsMounted(true);
    });

    const callApi = () => {
        Mapmyindia.route_adv(
            {
                source: sourceCoordinates,
                destination: destinationCoordinates,
                profile: 'driving',
                overview: 'simplified',
                geometries: 'geojson',
            },
            response => {
                console.log(
                    'Route_adv response: ' +
                    JSON.stringify(response.routes[0]?.geometry.coordinates),
                );
                setRoute(makeLineString(response.routes[0]?.geometry.coordinates))
                setRouteCoordinates(response.routes[0]?.geometry.coordinates,)

            },
        );
    }
    const renderOrigin = () => {
        if (!route) {
            return null;
        }

        let backgroundColor = 'red';

        if (currentPoint) {
            backgroundColor = '#314ccd';
        }

        const style = [layerStyles.origin, { circleColor: backgroundColor }];

        return (
            <MapmyIndiaGL.ShapeSource
                id="origin"
                shape={point(routeCoordinates[0])}>
                <MapmyIndiaGL.Animated.CircleLayer
                    id="originInnerCircle"
                    style={style}
                />
            </MapmyIndiaGL.ShapeSource>
        );
    }
    const renderRoute = () => {
        if (!route) {
            return null;
        }

        return (
            <MapmyIndiaGL.ShapeSource id="routeSource" shape={route}>
                <MapmyIndiaGL.LineLayer
                    id="routeFill"
                    style={layerStyles.route}
                    belowLayerID="originInnerCircle"
                />
            </MapmyIndiaGL.ShapeSource>
        );
    }
    const renderCurrentPoint = () => {
        if (!currentPoint) {
            return;
        }
        return (
            <MapmyIndiaGL.ShapeSource
                id="symbolLocationSource"
                shape={currentPoint}>
                <MapmyIndiaGL.SymbolLayer
                    id="symbolLocationSymbols"
                    minZoomLevel={1}
                    style={{
                        iconRotationAlignment: 'map',
                        iconImage: carIcon,
                        iconIgnorePlacement: true,
                        iconAllowOverlap: true,
                        iconAnchor: 'center',
                        iconRotate: ["get", "bearing"],
                        iconSize: 0.07,
                    }}
                />
            </MapmyIndiaGL.ShapeSource>
        );
    }
    const renderProgressLine = () => {
        if (!currentPoint) {
            return null;
        }

        const { nearestIndex } = currentPoint.properties;
        const coords = route.geometry.coordinates.filter(
            (c, i) => i <= nearestIndex,
        );
        coords.push(currentPoint.geometry.coordinates);

        if (coords.length < 2) {
            return null;
        }

        const lineString = makeLineString(coords);
        return (
            <MapmyIndiaGL.Animated.ShapeSource id="progressSource" shape={lineString}>
                <MapmyIndiaGL.Animated.LineLayer
                    id="progressFill"
                    style={layerStyles.progress}
                    aboveLayerID="routeFill"
                />
            </MapmyIndiaGL.Animated.ShapeSource>
        );
    }
    const onStart = () => {
        const bounds = bbox(route);
        camera.fitBounds(
            [bounds[0], bounds[1]],
            [bounds[2], bounds[3]],
            0,
            40,
        );
        routeSimulatore = new RouteSimulator(route, 0.02, isMounted);

        routeSimulatore.addListener(currentPoint => {
            if (currentPoint && isMounted == true) {
                let prevPoint = currentPoint;
                let bear = bearing(prevPoint, currentPoint);
                currentPoint.properties.bearing = bear + 180;
            }

            setCurrentPoint(currentPoint);
        });
        routeSimulatore.start();

        setRouteSimulator(routeSimulatore);
    }
    const renderActions = () => {
        if (routeSimulator) {
            return null;
        }
        return (
            <View style={styles.buttonCnt}>
                <Button
                    raised
                    title="Start"
                    onPress={onStart}
                    style={styles.button}
                    disabled={!route}
                />
            </View>
        );
    }
    const renderDestination = () => {
        if (!route) {
            return null;
        }

        return (
            <MapmyIndiaGL.ShapeSource
                id="destination"
                shape={point(routeCoordinates[routeCoordinates.length - 1])}>
                <MapmyIndiaGL.CircleLayer
                    id="destinationInnerCircle"
                    style={layerStyles.destination}
                />
            </MapmyIndiaGL.ShapeSource>
        );
    }
    return (

        <View style={{ flex: 1 }}>
            <MapmyIndiaGL.MapView style={{ flex: 1 }}>
                <MapmyIndiaGL.Camera
                    zoomLevel={16}
                    ref={c => (camera = c)}
                    centerCoordinate={[77.202432, 28.594475]}
                />

                {renderOrigin()}
                {renderRoute()}
                {renderCurrentPoint()}
                {renderProgressLine()}
                {renderDestination()}
            </MapmyIndiaGL.MapView>
            {renderActions()}
        </View>

    )
}
const styles = StyleSheet.create({
    button: {
      backgroundColor: 'blue',
      borderRadius: 3,
    },
    buttonCnt: {
      backgroundColor: 'transparent',
      bottom: 16,
      flexDirection: 'row',
      justifyContent: 'space-around',
      left: 0,
      position: 'absolute',
      right: 0,
    },
  });
  
  const layerStyles = {
    origin: {
      circleRadius: 10,
      circleColor: 'white',
    },
    destination: {
      circleRadius: 10,
      circleColor: 'green',
    },
    route: {
      lineColor: 'red',
      lineCap: "round",
      lineWidth: 5,
      lineOpacity: 0.84,
    },
    progress: {
      lineColor: '#314ccd',
      lineWidth: 5,
    },
  };
  

export default fTracking
