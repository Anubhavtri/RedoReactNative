import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Helpstyle from './Helpstyle';
import { create } from '../../helpers/PlatformSpecificStyles';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Pressable,
} from 'react-native';
import TextInput from '../../baseComponents/textInput/TextInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export const Help = props => {
  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.TopNav}>
        <MaterialCommunityIcons
          onPress={e => {
            props.navigation.goBack();
          }}
          style={{ fontSize: 25, marginRight: 10 }}
          name="arrow-left"
          backgroundColor="#3b5998"
        />
        <Text style={styles.topnavtext}>Help & support</Text>
      </View>
      <View style={[styles.Body, styles.paddingClass]}>
        <ScrollView>
          <View style={styles.first}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require('../../staticData/assests/help.png')}
            />
            <View style={styles.info}>
              <Text style={styles.heading}>We're here to help!</Text>
              <Text style={styles.infotext}>
                If you have any queries related to any of our tests or packages,
                you can contact us on the below mentioned phone number or email.
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoheading}>Call</Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:08988988787`);
                }}>
                <Text style={styles.contactinfo}>898 898 8787</Text>
              </TouchableOpacity>
              <Text style={styles.infoheading}>Email</Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('mailto:care@redcliffelabs.com');
                }}>
                <Text style={styles.contactinfo}>care@redcliffelabs.com </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
         <View style={[styles.Body]}>
        {/*      <ScrollView>
                <View style={[styles.BodyComponentSecond]}>
                  <View style={[styles.Bodyformbox]}>
                    <Text style={styles.subheading}>FAQs</Text>
                    <View style={styles.qncard}>
                      <Text style={styles.q}>
                        Who all are eligible for the test?
                      </Text>
                      <Text style={styles.a}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy psum
                      </Text>
                    </View>
                    <View style={styles.qncard}>
                      <Text style={styles.q}>
                        Who all are eligible for the test?
                      </Text>
                      <Text style={styles.a}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy psum
                      </Text>
                    </View>
                    <View style={styles.qncard}>
                      <Text style={styles.q}>
                        Who all are eligible for the test?
                      </Text>
                      <Text style={styles.a}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy psum
                      </Text>
                    </View>
                    <View style={styles.qncard}>
                      <Text style={styles.q}>
                        Who all are eligible for the test?
                      </Text>
                      <Text style={styles.a}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy psum
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView> */}
            </View>
      </View> 
    </SafeAreaView>
  );
};
let styles = create(Helpstyle);

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Help);
