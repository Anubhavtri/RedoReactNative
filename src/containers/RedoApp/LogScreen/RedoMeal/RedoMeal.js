import React from 'react'
import { connect } from 'react-redux'
import { View, Text , TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Actions from './RedoMealAction'

export const RedoMeal = (props) => {
    return (
        <SafeAreaView>
            <View>
                <Text>Meal:</Text>
            </View>
            <TouchableOpacity onPress={()=>{
                props.postmeal(props.token)
            }}>
                <Text>Meal send</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.userData?.token,
})

const mapDispatchToProps = (dispatch) => {
    return {
        postmeal: (token) => {
            dispatch(Actions.postmeal(token))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedoMeal)