
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import { point } from '@turf/helpers';
import { lineString as makeLineString } from '@turf/helpers';
import RouteSimulator from './RouteSimulator';
import carIcon from './car.png';
import bearing from '@turf/bearing';
import bbox from '@turf/bbox';
import { connect } from 'react-redux'
import axios from 'axios';

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
  header: {
    // borderColor:'red',
    // borderWidth:1,
    minHeight: "10%",
    maxHeight: '10%',
    flex: 1,
    flexGrow: 1,
    padding: '5%',
    backgroundColor: '#F5F5F5'
  },
  container:{
    flex:1,
    flexGrow:1,
    backgroundColor:"#F5F5F5",
    
    marginTop: StatusBar.currentHeight || 0
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

let routeSimulator;
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

class TrackingAnimationActivity extends Component {
  constructor(props) {
    super(props);
    console.log(`${props?.latLang?.Longitude},${props?.latLang?.Latitude}`,"Print")
    console.log(`${props?.latLangCus?.Longitude},${props?.latLangCus?.Latitude}` ,"customer")
    console.log(`${props?.latLangPhl?.Longitude},${props?.latLangPhl?.Latitude}`,"rider")
    this.state = {
      route: null,
      currentPoint: null,
      routeSimulator: null,
      bearing: 0,
      sourceCoordinates: `${props?.latLangCus?.Longitude},${props?.latLangCus?.Latitude}`,
      destinationCoordinates: `${props?.latLangPhl?.Longitude},${props?.latLangPhl?.Latitude}`,
      routeCoordinates: [],
      isMounted: false,
      mmiAccessToken: "",
      phleboLatitude: "",
      phleboLongitude: "",
    };

    this.onStart = this.onStart.bind(this);
    
  }

  async componentDidMount() {
    this.callApi();
    this.setState({
      isMounted: true
    });
  }

  
  // componentDidUpdate(prevState) {
  //   if (prevState.mmiAccessToken !== this.state.mmiAccessToken && this.state.mmiAccessToken != "") {
  //     // this.getlivelocation();
  //   }
  // }

  callApi() {
    console.log(this.state.sourceCoordinates , "source cordinates")
    console.log( this.state.destinationCoordinates, "destination cordinates")
    Mapmyindia.route_adv(
      {
        source: this.state.sourceCoordinates,
        destination: this.state.destinationCoordinates,
        profile: 'driving',
        overview: 'simplified',
        geometries: 'geojson',
      },
      response => {
        console.log(
          'Route_adv response: ' +
          JSON.stringify(response?.routes[0]?.geometry.coordinates),
        );
        this.setState({
          route: makeLineString(response?.routes[0]?.geometry?.coordinates),
          routeCoordinates: response?.routes[0]?.geometry?.coordinates,
        });
      },
    );
  }
  //  componentDidMount() {
  //   this.getmmitoken();
  // }
  getmmitoken() {
    console.log("entererd")
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')
    params.append('client_id', '33OkryzDZsKamfiPiKFdn3JedW3I1sO_efflBdDslqsmTSZmsD2SPw4DU3SPC459TYVRlA4DUCLLpIoO5jAOJQ==')
    params.append('client_secret', 'lrFxI-iSEg8wS11NUoDEndR2zcztS6p73mr5dC4bfgeS1SSbfOhj2SKP-Vh0gbPinqh-w3f66JbgvjrDuq5OdXMZYOVLEuEG')

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    axios.post('https://outpost.mapmyindia.com/api/security/oauth/token', params, config)

      .then(({ data }) => {
        console.log("mmi data", data.access_token);
        this.setState({
          mmiAccessToken: `${data.access_token}`
        })
      })
      .catch(function (error) {
        console.log("error", error);
      });

  }
  // async componentDidMount() {
  //   this.getlivelocation();
  // }
  // getlivelocation() {

  //   let config = {
  //     headers: { 'Authorization': 'Bearer ' + this.state.mmiAccessToken },
  //     params: {
  //       name: '3rd_Party_MP_Pradhyum'
  //     },
  //   }
  //   axios.get('https://intouch.mapmyindia.com/iot/api/device/', config)

  //     .then(function (response) {
  //       console.log("live location", response.data.data[0].location.latitude);
  //       this.setState({
  //         phleboLatitude: `${response.data.data[0].location.latitude}`,
  //         phleboLongitude: `${response.data.data[0].location.longitude}`,


  //       })
  //     })
  //     .catch(function (error) {
  //       console.log("live loc err", error);
  //     })
  //   this.setState({
  //     destinationCoordinates: `${this.state.phleboLongitude},${this.state.phleboLatitude}`,
  //   })
  //   console.log("destination coord", this.state.destinationCoordinates)
  // }



  componentWillUnmount() {
    this.setState({
      isMounted: false
    })
    if (this.state.routeSimulator) {
      this.state.routeSimulator.stop();
    }
  }

  renderOrigin() {
    if (!this.state.route) {
      return null;
    }
    let backgroundColor = 'red';
    if (this.state.currentPoint) {
      backgroundColor = '#314ccd';
    }
    const style = [layerStyles.origin, { circleColor: backgroundColor }];
    return (
      <MapmyIndiaGL.ShapeSource
        id="origin"
        shape={point(this.state.routeCoordinates[0])}>
        <MapmyIndiaGL.Animated.CircleLayer
          id="originInnerCircle"
          style={style}
        />
      </MapmyIndiaGL.ShapeSource>
    );
  }

  renderRoute() {
    if (!this.state.route) {
      return null;
    }

    return (
      <MapmyIndiaGL.ShapeSource id="routeSource" shape={this.state.route}>
        <MapmyIndiaGL.LineLayer
          id="routeFill"
          style={layerStyles.route}
          belowLayerID="originInnerCircle"
        />
      </MapmyIndiaGL.ShapeSource>
    );
  }

  renderCurrentPoint() {
    if (!this.state.currentPoint) {
      return;
    }
    return (
      <MapmyIndiaGL.ShapeSource
        id="symbolLocationSource"
        shape={this.state.currentPoint}>
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

  renderProgressLine() {
    if (!this.state.currentPoint) {
      return null;
    }

    const { nearestIndex } = this.state.currentPoint.properties;
    const coords = this.state.route.geometry?.coordinates?.filter(
      (c, i) => i <= nearestIndex,
    );
    coords.push(this.state.currentPoint.geometry.coordinates);

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

  onStart() {
    const bounds = bbox(this.state.route);
    this.camera.fitBounds(
      [bounds[0], bounds[1]],
      [bounds[2], bounds[3]],
      0,
      40,
    );
    routeSimulator = new RouteSimulator(this.state.route, 0.02, this.state.isMounted);

    routeSimulator.addListener(currentPoint => {
      if (this.state.currentPoint && this.state.isMounted == true) {
        let prevPoint = this.state.currentPoint;
        let bear = bearing(prevPoint, currentPoint);
        currentPoint.properties.bearing = bear + 180;
      }

      this.setState({ currentPoint });
    });
    routeSimulator.start();

    this.setState({ routeSimulator });
  }


  componentWillUnmount() {
    if (routeSimulator) {
      routeSimulator.stop();
    }

  }
  renderActions() {
    if (this.state.routeSimulator) {
      return null;
    }
    return (
      <View style={styles.buttonCnt}>
        <Button
          raised
          title="Start"
          onPress={this.onStart}
          style={styles.button}
          disabled={!this.state.route}
        />
      </View>
    );
  }

  renderDestination() {
    if (!this.state.route) {
      return null;
    }

    return (
      <MapmyIndiaGL.ShapeSource
        id="destination"
        shape={point(this.state.routeCoordinates[this.state.routeCoordinates.length - 1])}>
        <MapmyIndiaGL.CircleLayer
          id="destinationInnerCircle"
          style={layerStyles.destination}
        />
      </MapmyIndiaGL.ShapeSource>
    );
  }

  render() {
    console.log("mmi token", this.state.mmiAccessToken)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ minHeight: '5%', flex: 1, flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              onPress={(e) => {
                this.props.navigation.goBack()
              }}
              style={{ fontSize: 25, marginRight: 10 }}
              name="arrow-left"
              backgroundColor="#3b5998"
            />
            <Text style={styles.text}>Tracking Page</Text>
          </View>
        </View>
        <MapmyIndiaGL.MapView
        surfaceView={true}
        style={{ flex: 1 }}>
          <MapmyIndiaGL.Camera
            zoomLevel={16}
            ref={c => (this.camera = c)}
            centerCoordinate={[ this.props?.latLangCus?.Longitude,this.props?.latLangCus?.Latitude ]}
          />
          {this.renderOrigin()}
          {this.renderRoute()}
          {/* {this.renderCurrentPoint()} */}
          {/* {this.renderProgressLine()} */}
          {this.renderDestination()}
        </MapmyIndiaGL.MapView>
        {/* {this.renderActions()} */}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  latLangPhl : state?.customerbooking?.latLngPhl,
  latLangCus : state?.customerbooking?.latLngCus
})

const mapDispatchToProps = (dispatch) => {
  return {
     
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackingAnimationActivity)
