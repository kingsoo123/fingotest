import React, {PureComponent} from 'react';
import {
  Platform,
     StyleSheet,
     Text, 
     View,
     Clipboard,
     SafeAreaView,
     FlatList,
     ToastAndroid,
     TouchableOpacity,
    TextInput ,
    RefreshControl,
    ScrollView,
    Animated,
    Easing,
    NativeModules,
    Keyboard,
    Image,
    ActivityIndicator,
    Linking,
    TouchableWithoutFeedback,
    Dimensions,
    DatePickerAndroid,
    BackAndroid,
    WebView,
    Switch,
    AsyncStorage,
    ViewPagerAndroid,
    BackHandler,
    Modal } from 'react-native';

const BaseUrl = "https://api-v1-staging-eks.fingo.africa/auth/fe_test/";

export function returnAllNumbers(d)
{
  d = String(d).trim();
  return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{}A-Z a-z]/g, '');
}
export function returnUsername(d)
{
  d = String(d).trim();
  return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{} 0-9]/g, '');
}
export function returnAllNumbersWithComma(d)
{
  d = String(d).trim();
  return d.replace(/[-+&\/\\#()$~%.;'":*?<>{}A-Z a-z]/g, '');
}
export function returnMobile(d)
{
  d = String(d).trim();
  d = String(d[0]) == "0"?d.replace("0",""):d;
  return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{}A-Z a-z]/g, '');
}
export function returnAllLetter(d)
{
  d = String(d).trim();
  return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{} 0-9]/g, '');
}

export function PostDATA(url,data = {})
{
return new Promise((resolve,reject)=>{
 
var option = {
  method:`POST`,
  body:JSON.stringify(data),//formData,
  headers: {
    'Accept':'application/json',
    'Content-Type':'application/json'
  }
}


 fetch(BaseUrl+url,option).then((res)=>res.text()).then((resp)=>{
  resolve({
    status:resp == "success",
    message:resp,
    data:resp
  });
}).catch(e =>{
  resolve({
    status:false,
    message:e.message,
    data:{}
  });
})

})
}
export function PostGET(url,data = {})
{
return new Promise((resolve,reject)=>{
var myHeaders = new Headers();
  myHeaders.append("Accept",`application/json`);
  myHeaders.append("Content-Type",`application/json`);
var option = {
  method: "GET",
  headers: myHeaders
}
 fetch(`${BaseUrl}${url}`,option).then((res)=>res.text()).then((resp)=>{
  resolve({
    status:String(resp).includes("data"),
    message:"",
    data:String(resp).includes("data")?JSON.parse(resp):resp
  });
}).catch(e =>{
  resolve({
    status:false,
    message:e.message
  });
})
})
}
export function PasswordStrength(d)
{
  var regex = /[a-z]/;
  var regexCap = /[A-Z]/;
  var regexSp = /[!@#$%^&*()\-_=+{};:,<.>]/;
  var regexNum = /[0-9]/;
if(String(d).length < 8)
{
return false;
}
var strong = [];
  if(regex.test(d)) {
    strong.push("true");
    }
  if(regexCap.test(d)) {
    strong.push("true");
    }
  if(regexSp.test(d) && regexNum.test(d)) {
    strong.push("true");
    }
    return strong.length >= 2?true:false;
}

export function returnComma(str){
  if(str === "") {
    return str;
  }
  if(str === ".") {
    return String(str).replace('.','');
  }
  if(String(str) === "00"){
    return "0";
  }
  str = String(str).replace(/[^0-9.]/g,'');
  var getDot = String(str).split(".");
  var firstPart = getDot[0];
  if(firstPart.length >= 4) {
     firstPart = firstPart.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}
  if(getDot.length >= 2){
    return firstPart+"."+getDot[1];
  }
  return firstPart;
}
export function UniqueID(d) {
  var text = "";
  if(d == undefined)
  {
    d = 16;
  }else{
    d = parseInt(d);
  }
  var tm = new Date().getMilliseconds();
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < d; i++)
  {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
    return text;
}


