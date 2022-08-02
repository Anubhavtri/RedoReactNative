import * as React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"

export default function UpdatesMaps(props) {
	const [ pin, setPin ] = React.useState({
		latitude: 37.78825,
		longitude: -122.4324
	})
	const [ region, setRegion ] = React.useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})

	const [cityname , setcityname] = React.useState()

	return (
		<View style={{ }}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 37.4219983,
					longitude: -122.084,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
				provider="google"
                showsUserLocation={true}
			>
				<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
				<Marker
					coordinate={pin}
					pinColor="black"
					draggable={true}
					onDragStart={(e) => {
						console.log("Drag start", e.nativeEvent.coordinates)
					}}
					onDragEnd={(e) => {
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
					}}
				>
					<Callout>
						<Text>I'm here</Text>
					</Callout>
				</Marker>
				{/* <Circle center={pin} radius={1000} /> */}
			</MapView>
			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(data, details , "all details which i want")
					setcityname(data?.description)
					props.cityname(data?.description)
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})
				}}
				query={{
					key: "AIzaSyBPjDlsHYhWtjt3FxgRPnTMXN-qJZ9hz0s",
					language: "en",
					components: "country:ind",
					types: "establishment",
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "white" }
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
        marginTop:40,
		width: Dimensions.get("window").width / 1.17,
		height: Dimensions.get("window").height / 2.5,
        // height: height / 3,
        // width: width / 1.17,
        backgroundColor: 'lightblue',
        borderRadius: 10,
        alignSelf: 'center'
	}
})