// Navigate Between Screens using React Navigation in React Native //
// https://aboutreact.com/react-native-stack-navigation //
import React,{useState,useEffect} from 'react';
import { View, Text, SafeAreaView,StyleSheet,ScrollView, TouchableWithoutFeedback,TouchableOpacity,Image} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'

const login = ({navigation}) => {
   const[username,setusername]=useState('');
   const[password,setpassword]=useState('');

   const[usernameerr,setusernameerr]=useState('');
   const[passworderr,setpassworderr]=useState('');
  

   const[isusernameerr,setisusernameerr]=useState(false);
   const[ispassworderr,setispassworderr]=useState(false);



   const startmatch=()=>{
      if( username==''){
        setusernameerr('Username is required.');
        setisusernameerr(true);
      }else if(password == ''){
        setpassworderr('Password is required.');
        setispassworderr(true);
      }else{
        if((username =='admin' || username =='Admin') && (password=='admin' || password=='Admin')){
            navigation.navigate("NewMatch");
        }else{
            alert("Please enter valid username and password.");
         }
     
       
      }

      
   };


  return (
  
    <View style={{flex: 1,}}>
       <View style={{backgroundColor:'#1a1aff',height:60,alignItems:'center',flexDirection:'row'}}>
          <Text style={{fontSize:25,color:'#fff',fontWeight:'700',marginLeft:15,position:'relative',bottom:-5}}>Cricket</Text>
          <Text style={{fontSize:18,color:'#fff',marginTop:5,position:'relative',bottom:-5}}> score</Text>
       </View>
       <ScrollView>
       <View style={{backgroundColor:'#F0F0F0',flex:1,marginBottom:50,justifyContent:'center'}}>
       <Image source={require('./images/user.png')} style={{alignSelf:'center',marginTop:30,marginBottom:10}}></Image>
          <View style={{margin:10,alignContent:'center'}}>
         
          <Text style={styles.lbl}> Username</Text>
          <Input
              placeholder={'Username'}
              inputStyle={{fontSize:14}}

              rightIcon={isusernameerr? <Icon
                name='exclamation-circle'
                size={18}
                color='red'
              />:null}        
              inputContainerStyle={{height:35}}
              onChangeText={value =>{ setusername(value);
                setusernameerr('');
                setisusernameerr(false);
               
              }}
              errorStyle={{ color: 'red' }}
              errorMessage={usernameerr}
              />
    <Text style={styles.lbl}> Password</Text>
              <Input
              placeholder={'Password'}
              inputStyle={{fontSize:14,}}
              rightIcon={ispassworderr?<Icon
                name='exclamation-circle'
                size={18}
                color='red'
              />:null}
              inputContainerStyle={{height:35}}
              onChangeText={value => {setpassword(value);
                setpassworderr('');
                setispassworderr(false);
               
                
              }}
              errorStyle={{ color: 'red' }}
              errorMessage={passworderr}
              />
            </View>
            

            <TouchableOpacity style={{alignItems:'center',alignSelf:'center',marginHorizontal:20,borderRadius:10, padding:10,backgroundColor:'#1a1aff',width:'90%'}} onPress={()=>{startmatch()}}>
              <Text style={{color:'#fff',fontSize:15,margin:2}}>Login</Text>
              
            </TouchableOpacity>

            <View style={{flex:2,justifyContent:'center',alignItems:'center',marginVertical:20}}>
             
            
              <Text style={{color:'#1a1aff'}}>Username: Admin</Text>
              <Text style={{color:'#1a1aff'}}>Password: Admin</Text>
             
            </View>
       </View>
       </ScrollView>
  
    </View>
  
  );
};

export default login;

let styles=StyleSheet.create({
 card:{
  backgroundColor:'#fff',
  borderRadius:10,
  elevation:5,
  paddingHorizontal:10,
  paddingTop:10,
  margin:10,
  flexWrap:'nowrap',
 
 },
 lbl:{
 marginTop:0,
 marginLeft:10,
 fontSize:15,
 color:'#1a1aff',
 alignSelf:'flex-start'

 }
})
