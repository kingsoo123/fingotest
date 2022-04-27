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
    Clipboard,
    Share
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../includes/styles';
import  {Formik} from "formik";
import * as y  from 'yup';
import *  as Animatable  from 'react-native-animatable';
const FormSchema = y.object({
    referral_code:y.string().required("Referral Code is required.")
})
import {PostDATA,PostGET} from '../includes/func';
const {width,height} = Dimensions.get("screen");
import Icons from '../includes/icons'
class ReferalsScreenClass extends Component {
    componentDidMount()
    {
        this.setState({redeem_screen:this.props?.route?.params?.url == "redeem"},()=>{
            if(!this.state.redeem_screen)
            {
             this.getUsers()
            }
        })
        
    }
async copyMe(txt)
{
    await Clipboard.setString(txt);
    ToastAndroid.show("Referral code copied successfully.",ToastAndroid.SHORT)
}
async shareMe(txt)
{
    await Share.share({
          message:`Hi am sharing this referral code with you , use it to redeem your price - (${txt}) \nalso download the app to benefit from our referral program https://play.google.com/store/apps/details?id=com.testapp`,
        });
}
getUsers(url = null)
{
    this.setState({loader:true})
    PostGET(url == null?this.props?.route?.params?.url:url).then((res)=>{
    if(res.status)
    {
     this.setState({usersList:[...res.data.data,...this.state.usersList.filter((a,i)=>i > res.data.data.length-1)]})
    //  alert(JSON.stringify(res.data))
    }
    this.setState({loader:false})
    })
}
constructor(props)
{
    super(props)
    this.state = {
        redeem_screen:false,
        usersList:[
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],  
        loader:false
    }
}
    render(){
        const {redeem_screen} = this.state;
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
       {!redeem_screen?<TouchableOpacity
            onPress={()=>{
                this.setState({redeem_screen:true})
            }}
            style={{width:20,height:40,justifyContent:"center",alignItems:"center"}}>
            <Icons.AntDesign name="left" color={"white"} size={20} />
            </TouchableOpacity>:null}
       <Text style={[styles.titleText,{width:"100%",textAlign:"left"}]}>{redeem_screen?"Redeem Referral Code":"Claimed Referrals"}</Text>
       <Text style={[styles.subText,{width:"100%",textAlign:"left",marginBottom:10}]}>{redeem_screen?"To gain access to list of referral code, you must enter referral code in the space provided below.":"This screen displays list of referrals that has been claimed by users and can copy or share the referals."}</Text>
       {!redeem_screen?<FlatList
        contentContainerStyle={{width:"100%"}}
        data={this.state.usersList}
        keyExtractor={(item,index)=>`${index}`}
        renderItem={({item,index})=>{
            if(item == "")
            {
                return <View 
                style={{width:"100%",height:60,borderRadius:40,backgroundColor:"rgba(255,255,255,0.2)",alignItems:"center",flexDirection:"row",padding:10,minHeight:40,marginBottom:10}}
                >
                 {index == 0 ?<View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                     <ActivityIndicator  color="white" size={"large"} />
                     <Text style={{color:"white",marginLeft:10,fontSize:12}}>Please wait a moment...</Text>
                     </View>:null}   
                </View>   
            }
            return <View 
            style={{width:"100%",borderRadius:40,alignItems:"center",flexDirection:"row",backgroundColor:"white",padding:10,minHeight:40,marginBottom:10}}
            >
                {item?.profilePicture?<Image 
                source={{uri:item?.profilePicture}}
                style={{width:30,height:30}}
                resizeMethod="scale"
                resizeMode='stretch'
                />:<Icons.AntDesign name="user" size={25}/>}
            <View style={{flex:1,flexDirection:"column",marginHorizontal:20}}>
            <Text style={{fontSize:14,fontWeight:"bold"}}>{item?.name}</Text>
            <Text style={{fontSize:14}}>Referal Code: {item?.referralCode}</Text>
            </View>
            <TouchableOpacity
            testID='shareBtn'
            onPress={()=>{
                this.shareMe(item?.referralCode)
            }} style={{width:40,height:40,justifyContent:"center",alignItems:"center"}}>
            <Icons.AntDesign name="sharealt" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
            testID='copyBtn'
            onPress={()=>{
                this.copyMe(item?.referralCode)
            }}
            style={{width:40,height:40,justifyContent:"center",alignItems:"center"}}>
            <Icons.Feather name="copy" size={20} />
            </TouchableOpacity>
            </View>
        }}
        />:<View style={{flex:1,flexDirection:"column"}}>
       <Text style={[styles.subText,{width:"100%",textAlign:"left",marginBottom:10}]}>Enter referal code</Text>
       <Formik 
       initialValues={{referral_code:'getin123'}}                      
       onSubmit={(values, actions) => {
           if(!this.state.loader)
           {
        this.setState({loader:true})
        PostDATA("redeem_referral",values).then((res)=>{
        this.setState({loader:false});
        if(res.status)
        {
            this.setState({redeem_screen:false},()=>{
                this.getUsers("claimed_referrals")
            })
        }
        alert(res.message)
        })
        }else{
            ToastAndroid.show("Please wait...",ToastAndroid.LONG);
        }
  
       }}
       style={{width:"100%"}}
       validationSchema={FormSchema}
     >
     {({setFieldValue,handleSubmit,errors,values,touched})=>(<View  style={{marginTop:50,flexDirection:"column",justifyContent:"center",width:"100%"}}>
                <Animatable.View 
                animation="slideInUp"
                duration={1000}
                easing="ease-in-out-back"
                useNativeDriver
                style={[styles.InputWraper]} >
                <TextInput 
                onChangeText={(d)=>{
                setFieldValue('referral_code',d);
                 }}
                value={values.referral_code}
                keyboardType="default"
                placeholder="Enter referral code"
                style={[styles.Input]}
                />
                </Animatable.View>
        
        <Text style={{color:"red",fontSize:10}}>{touched.referral_code && errors.referral_code}</Text>
        <Animatable.View 
                animation="slideInRight"
                duration={500} 
                easing="ease-in-out-back"
                useNativeDriver
                >
                <TouchableOpacity 
                onPress={handleSubmit}
                style={[styles.btn]}
                >
                  {this.state.loader?<View style={{flexDirection:"row"}}>
                      <ActivityIndicator size={"small"} color="red" />
                      <Text style={{color:"red",fontSize:12,paddingHorizontal:20}}>Please wait...</Text>
                      </View>:<Text style={[styles.btnText]}>Submit</Text>} 
                </TouchableOpacity>
                </Animatable.View>
      </View>)}
      </Formik>
        
         </View>}
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


