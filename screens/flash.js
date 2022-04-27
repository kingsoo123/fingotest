import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../includes/styles';
const {width,height} = Dimensions.get("screen");
import * as AnimatedView from 'react-native-animatable'
class FlashScreenClass extends Component {
componentDidMount()
{
    setTimeout(()=>{
        this.props.navigation.reset({
            index:0,
            routes:[{name:"Login"}]
          })
    },4000)
}
    render() {
        return (
            <View style={styles.container}>
                <Image 
                source={require("../images/bck.png")}
                style={{...StyleSheet.absoluteFillObject,width:"100%",height:"100%"}}
                resizeMethod="scale"
                resizeMode='stretch'
                />
                <View 
                style={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}
                >
                {["","",""].map((a,i,self)=>{
                var circleWith = (width/2) - 50*i;
                return <AnimatedView.View
                animation={{
                    from:{
                        height:circleWith / 2,
                        width:circleWith / 2
                    },
                    to:{
                        height:circleWith,
                        width:circleWith
                    }
                }}
                key={i}
                duration={1000*(i+1)}
                iterationCount="infinite"
                style={{width:circleWith,height:circleWith,borderRadius:circleWith,justifyContent:"center",alignItems:"center",position:"absolute",backgroundColor:"rgba(255,255,255,0.5)"}}
                >
                </AnimatedView.View>})}
                <Text style={{position:"absolute"}}>Loading...</Text>

                </View>
            </View>
        );
    }

}

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ }, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FlashScreenClass);


