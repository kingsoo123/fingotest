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
    FlatList,
    Linking
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
class DashboardScreenClass extends Component {
    componentDidMount()
    {
        // this.getUsers()
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
getUser(url = null)
{
    this.setState({loader:true})
    PostGET("user").then((res)=>{
    if(res.status)
    {
     alert(JSON.stringify(res.data))
    }
    this.setState({loader:false})
    })
}
    render(){
        const ThumbWidth = (width/2)-60;
        const ThumbMargin = 5;
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
       <Text style={[styles.titleText,{width:"100%",textAlign:"left"}]}>Dashboard</Text>
       <View  style={[styles.card,{width:"100%",height:ThumbWidth,margin:ThumbMargin,justifyContent:"center",alignItems:"center",flexDirection:"column"}]}>
       <Text style={{fontSize:14,fontWeight:"bold"}}>Hey buddy!</Text>
       <Text style={{fontSize:14,textAlign:"center"}}>This is to introduce you to a referal platform where you can share and redeem your referals.</Text>
       </View>
       <View  style={{flex:1,flexDirection:"row",flexWrap:"wrap"}}>
       <TouchableOpacity 
       testID='claimBtn'
       onPress={()=>{
           this.props.navigation.navigate("ClaimedReferal",{url:"claimed_referrals"})
       }}
       activeOpacity={0.8} style={[styles.card,{width:ThumbWidth,height:ThumbWidth,margin:ThumbMargin,justifyContent:"center",alignItems:"center",flexDirection:"column"}]}>
       <Image 
                source={require("../images/cr.png")}
                style={{width:50,height:50}}
                resizeMethod="scale"
                resizeMode='stretch'
                />
            <Text style={{fontSize:12,fontWeight:"bold"}}>Claimed Referal</Text>
 
        </TouchableOpacity>
        <TouchableOpacity 
        testID='RedeemBtn'
        onPress={()=>{
            this.props.navigation.navigate("ClaimedReferal",{url:"redeem"})
        }}
        activeOpacity={0.8} style={[styles.card,{width:ThumbWidth,height:ThumbWidth,margin:ThumbMargin,justifyContent:"center",alignItems:"center",flexDirection:"column"}]}>
        <Image 
                source={require("../images/rd.png")}
                style={{width:50,height:50}}
                resizeMethod="scale"
                resizeMode='stretch'
                />
            <Text style={{fontSize:12,fontWeight:"bold"}}>Redeem Referal</Text>
        </TouchableOpacity>
        <View  style={[styles.card,{width:ThumbWidth,height:ThumbWidth,margin:ThumbMargin,justifyContent:"center",alignItems:"center",flexDirection:"column",opacity:0.5}]}>
        </View>
       <View  style={[styles.card,{width:"100%",height:ThumbWidth,margin:ThumbMargin,justifyContent:"center",alignItems:"center",flexDirection:"column"}]}>
       <Text style={{fontSize:14,fontWeight:"bold"}}>Contact us</Text>
       <TouchableOpacity 
       onPress={()=>{
           Linking.openURL("mailto:support@"+this.props.Reducer?.company_name)
       }}
       >
       <Text style={{fontSize:14,textDecorationLine:"underline",textAlign:"center"}}>support@{this.props.Reducer?.company_name}</Text>
       </TouchableOpacity>
       </View>
       </View>

      </View>
      </View>
      </KeyboardAvoidingView>
      </SafeAreaView>);
    }

}

const mapStateToProps = state => {
    return state;
};

export default connect(
    mapStateToProps
)(DashboardScreenClass);


