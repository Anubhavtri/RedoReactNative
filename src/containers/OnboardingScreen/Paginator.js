import React from 'react'
import { View, Text ,Animated,useWindowDimensions, TouchableOpacity} from 'react-native'
import OnboardingStyle from './OnboardingStyle';
import { create } from '../../helpers/PlatformSpecificStyles';
import {Screens} from '../../helpers/Screens';

const Paginator = ({ data,scrollX,scrollto,navigation }) => {
    let styles = create(OnboardingStyle);

    const { width } = useWindowDimensions()

   
    return (
             <View >
                 <View style={styles.InnerDivDots,{backgroundColor:'green'}} >
                {data?.map((_,i)=>{
                    const inputRange = [(i-1)*width, (i)*width,(i+1)*width];

                    const backgroundColor = scrollX.interpolate({
                        inputRange,
                        outputRange:['#FFFFFF','#E5184E','#FFFFFF'],
                        extrapolate: 'clamp',
                    })
                    return(<Animated.View style={[styles.InnerDotsActive,{backgroundColor}]} key={i.toString()} />)     
                })}
                 </View>
            </View>
    )
}

export default Paginator
