import React, { useState } from 'react'
import { SafeAreaView, View, ScrollView, Text, Dimensions, TouchableOpacity, Animated } from 'react-native'


const Coupon = () => {

    const { height, width } = Dimensions.get('window')
    const SCREEN_HEIGHT = Math.round(height)
    const SCREEN_WIDTH = Math.round(width)
    // Animation
    const startValue = new Animated.Value(Math.round(height + height * 0.3))
    const endValue = Math.round(height - height * 0.3)
    const duration = 1000


    const _showBottomView = (key) => {

        const toValue = key === 'HIDE' ? height : endValue

        Animated.timing(startValue, {
            toValue,
            duration: duration,
            useNativeDriver: true,
        }).start()

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }}>
            <View style={{ flex: 9, borderWidth: 1, borderColor: 'black', margin: 5 }}>
                <ScrollView
                    style={{ flex: 1 }}>
                    <View style={{ height: SCREEN_HEIGHT * 0.2, width: '95%', borderColor: 'black', borderWidth: 1, marginLeft: '2.5%', marginTop: SCREEN_HEIGHT * 0.01, alignItems: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => _showBottomView()}
                            style={{ height: SCREEN_HEIGHT * 0.065, width: '75%', borderRadius: 5, borderWidth: 1, borderColor: 'green', alignItems: 'center', justifyContent: 'center', }}>
                            <Text>
                                SHOW BOTTOM VIEW
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            {/* Bottom view */}

            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        height: height * 0.3,
                        width: width,
                        backgroundColor: 'white',
                        alignItems: 'center', justifyContent: 'center',
                        borderTopRightRadius: 23, borderTopLeftRadius: 23,
                        transform: [
                            {
                                translateY: startValue
                            },
                        ],
                    },
                ]} >

                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => _showBottomView('HIDE')}
                    style={{ height: SCREEN_HEIGHT * 0.065, width: '75%', borderRadius: 5, borderWidth: 1, borderColor: 'green', alignItems: 'center', justifyContent: 'center', }}>
                    <Text>
                        HIDE BOTTOM VIEW
                    </Text>
                </TouchableOpacity>

            </Animated.View>

        </SafeAreaView>
    )
}

export default Coupon