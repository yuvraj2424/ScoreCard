// Navigate Between Screens using React Navigation in React Native //
// https://aboutreact.com/react-native-stack-navigation //
// import React in our code
import React,{useState,useEffect} from 'react';
import { View, Text, SafeAreaView,StyleSheet,ScrollView, TouchableWithoutFeedback,TouchableOpacity,Image} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'

var teamarray=[{
    team1:'Yuvi',
    team2:'musale'
}]

const teams = ({route, navigation}) => {


    useEffect(()=>{
        var data={
            team1:'Yuvi',
            team2:'musale'
        };
        teamarray.push(data);
    },[])


    const adddata=()=>{
        var data={
            team1:'Yuvi',
            team2:'musale'
        };
        teamarray.push(data);
      //  console.log(teamarray);
    }
    
   
   
  
    return (
        <View style={{flex: 1,}}>
        <View style={{backgroundColor:'#1a1aff',height:60,alignItems:'center',flexDirection:'row'}}>
           <Text style={{fontSize:25,color:'#fff',fontWeight:'700',marginLeft:15,position:'relative',bottom:-5}}>Cricket</Text>
           <Text style={{fontSize:18,color:'#fff',marginTop:5,position:'relative',bottom:-5}}> score</Text>
        </View>
        <ScrollView>
        <View style={{backgroundColor:'#F0F0F0',flex:1,marginBottom:50}}>
        <View style={{...styles.card}}>
            {teamarray.map((item,index)=>(
                <TouchableOpacity key={index}>
                    <Text>{item.team1}</Text>
                    <Text>{item.team2}</Text>
                  
                </TouchableOpacity>
            )

            )}
        </View>
       
        </View>
        </ScrollView>
       <View style={{flexDirection:'row', justifyContent:'space-evenly',alignItems:'center',width:'100%', height:50,backgroundColor:'#fff',position:'absolute',bottom:0}}>
          <TouchableOpacity onPress={()=>navigation.navigate("NewMatch")}>
               <Image source={require('./images/cricket.png')}
                style={{height:20,width:20,alignSelf:'center'}}
               />
               <Text style={{color:'black'}}>New Match</Text>
          </TouchableOpacity>
 
          <TouchableOpacity>
               <Image source={require('./images/group.png')}
                style={{height:20,width:20,alignSelf:'center'}}
               />
               <Text style={{color:'#1a1aff'}}>Teams</Text>
          </TouchableOpacity>
 
          <TouchableOpacity>
               <Image source={require('./images/history.png')}
                style={{height:20,width:20, alignSelf:'center'}}
               />
               <Text style={{color:'black'}}>History</Text>
          </TouchableOpacity>
       </View>
     </View>
    );
};

export default teams;

const styles = StyleSheet.create({
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
       marginTop:10,
       marginLeft:10,
       fontSize:15,
       color:'#1a1aff'
      
       },
    textLargeStyle: {
      margin: 24,
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'green',
    },
    simpleLineStyle: {
      backgroundColor: 'grey',
      width: '100%',
      height: 1,
    },
    headingStyle: {
      margin: 24,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'green',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      textAlign: 'center',
    },
    logoStyle: {
      height: 300,
      width: 300,
    },
  });