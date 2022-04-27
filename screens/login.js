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
    Dimensions
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
const {width,height} = Dimensions.get("screen")
class LoginScreenClass extends Component {
constructor(props)
{
    super(props)
    this.state = {
        showPassword:false,
        loader:false
    }
}
    render(){
        return (<SafeAreaView
        style={{flex:1,flexDirection:"column"}}
        >
    
        <KeyboardAvoidingView style={{flex:1,flexDirection:"column"}} >
           <ScrollView 
           keyboardShouldPersistTaps="always"
           style={{flex:1,width:"100%",backgroundColor:"transparent"}} >
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
        <Formik 
       initialValues={{username:'',password:''}}                      
       onSubmit={(values, actions) => {
           if(!this.state.loader)
           {
        this.setState({loader:true})
        PostDATA("login",values).then((res)=>{
        this.setState({loader:false});
            if(res.status)
            {
            this.props.navigation.reset({
                index:0,
                routes:[{name:'ClaimedReferal',params:{url:"redeem"}}],
              })
          }else{
            alert(res.message)
          }
        })
        }else{
            ToastAndroid.show("Please wait...",ToastAndroid.LONG);
        }
  
       }}
       style={{width:"100%"}}
       validationSchema={FormSchema}
     >
     {({setFieldValue,handleSubmit,errors,values,touched})=>(<View  style={{flex:1,flexDirection:"column",justifyContent:"center",width:"100%",padding:50}}>
                <Text style={[styles.titleText,{width:"100%",textAlign:"left"}]}>Login</Text>
                <Animatable.View 
                animation="slideInUp"
                duration={1000}
                easing="ease-in-out-back"
                useNativeDriver
                style={[styles.InputWraper]} >
                <TextInput 
                onChangeText={(d)=>{
                setFieldValue('username',d);
                 }}
                value={values.username}
                keyboardType="default"
                placeholder="Enter your username"
                style={[styles.Input]}
                />
                </Animatable.View>
        {touched.username?<Text style={{color:"red",fontSize:10}}>{errors.username}</Text>:null}
                <Animatable.View 
                animation="slideInUp"
                duration={2000} 
                easing="ease-in-out-back"
                useNativeDriver
                style={[styles.InputWraper]} >
                <TextInput 
                secureTextEntry={this.state.showPassword}
                onChangeText={(d)=>{
                    setFieldValue('password',d);
                     }}
                    value={values.password}
                    keyboardType="default"
                placeholder="Enter your password"
                style={[styles.Input]}
                />
                <TouchableOpacity 
                style={{position:"absolute",right:10}}
                >
                </TouchableOpacity>
                </Animatable.View>
        {touched.password?<Text style={{color:"red",fontSize:10}}>{errors.password}</Text>:null}
                
                <Animatable.View 
                animation="slideInRight"
                duration={500} 
                easing="ease-in-out-back"
                useNativeDriver
                >
                <TouchableOpacity 
                testID='loginBtn'
                onPress={handleSubmit}
                style={[styles.btn]}
                >
                  {this.state.loader?<View style={{flexDirection:"row"}}>
                      <ActivityIndicator size={"small"} color="red" />
                      <Text style={{color:"red",fontSize:12,paddingHorizontal:20}}>Please wait...</Text>
                      </View>:<Text style={[styles.btnText]}>Login</Text>} 
                </TouchableOpacity>
                </Animatable.View>
      </View>)}
      </Formik>
      </View>
      </ScrollView>
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
)(LoginScreenClass);


