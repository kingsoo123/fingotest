
import React from 'react';
import {
  StyleSheet,
  useColorScheme,
  Dimensions,
  Appearance
} from 'react-native';
const {width,height} = Dimensions.get("screen")

const them =  Appearance.getColorScheme() === "light";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: them?'white':'black',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText:{
        color:"white",
        fontSize:25,
        marginVertical:10
    },
    InputWraper:{
        width:"100%",
        backgroundColor:"white",
        borderRadius:40,
        borderColor:"black",
        borderWidth:2,
        overflow:"hidden",
        marginVertical:10
    },
    Input:{
        paddingHorizontal:20,
        fontSize:13,
        textAlign:"center"
    },
    btn:{
        height:45,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#D8FA06",
        borderRadius:40,
        marginVertical:20
    },
    btnText:{
       color:"black",
       fontSize:16,
       fontWeight:"bold"
    },
    card:{
        backgroundColor:"white",
        minHeight:50,
        minWidth:50,
        borderRadius:15,
        padding:10,
        alignSelf:"center"
    },
    subText:{
        color:"white",
        fontSize:14
    }
});
export default styles;