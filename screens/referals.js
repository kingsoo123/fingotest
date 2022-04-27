import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ToastAndroid,
    ScrollView,
    Dimensions,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../includes/styles';
import  {Formik} from "formik";
import * as y  from 'yup';
import *  as Animatable  from 'react-native-animatable';
const FormSchema = y.object({
  username:y.string().required("Username is required."),
  password:y.string().required("Password is required.").max(50,"Maximum of 50 character is allowed"),
})
import {PostDATA} from '../includes/func';
const {width,height} = Dimensions.get("screen");
import Icons from '../includes/icons'
class ReferalsScreenClass extends Component {
    componentDidMount()
    {
        this.getUsers()
    }
getUsers()
{
    PostDATA("user").then((res)=>{
    alert(JSON.stringify(res))
    })
}
constructor(props)
{
    super(props)
    this.state = {
        usersList:[
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""],
        loader:false
    }
}
    render(){
        return (<SafeAreaView
        style={{flex:1,flexDirection:"column"}}
        >
    
        <KeyboardAvoidingView style={{flex:1,flexDirection:"column"}} >
           <View style={[styles.container,{minHeight:height-100}]}>
            <Image 
                source={require("../images/bck.png")}
                style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}
                resizeMethod="scale"
                resizeMode='stretch'
                />
                <Image 
                source={require("../images/blind.png")}
                style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}
                resizeMethod="scale"
                resizeMode='stretch'
                />   
       <View  style={{flex:1,flexDirection:"column",justifyContent:"center",width:"100%",padding:50}}>
       <Text style={[styles.titleText,{width:"100%",textAlign:"left"}]}>Users with referals codes</Text>
       
        <FlatList
        contentContainerStyle={{width:"100%"}}
        data={this.state.usersList}
        keyExtractor={(item,index)=>`${index}`}
        renderItem={({item,index})=>{
            return <TouchableOpacity 
            style={{width:"100%",borderRadius:40,alignItems:"center",flexDirection:"row",backgroundColor:"white",padding:20,minHeight:40,marginBottom:10}}
            >
            <Icons.AntDesign name="user" size={25}/>
            <Text style={{marginHorizontal:20}}>{item?.name}</Text>
            </TouchableOpacity>
        }}
        />
    
      </View>
      </View>
      </KeyboardAvoidingView>
      </SafeAreaView>);
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
)(ReferalsScreenClass);


