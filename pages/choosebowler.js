// Navigate Between Screens using React Navigation in React Native //
// https://aboutreact.com/react-native-stack-navigation //
import React,{useState,useEffect} from 'react';
import { View, Text, SafeAreaView,StyleSheet,ScrollView, TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'

const choosebowler = ({navigation}) => {
   const[bowlername,setbowlername]=useState('');
   const[bowlernameerr,setbowlernameerr]=useState('');
   const[isbowlernameerr,setisbowlernameerr]=useState(false);

   const[bowlerover,setbowlerover]=useState(0); //bowlers
   const[bowlerball, setbowlerball]=useState(0);
   const[bowlerwicket,setbowlerwicket]=useState(0);
   const [bowlerrun,setbowlerrun]=useState(0);
   const [drop,setdrop]=useState(true);

   useEffect(()=>{

   },[])



   const startmatch=()=>{
      if(bowlername==''){
        setbowlernameerr('Bowler name is required.');
        setisbowlernameerr(true);
      }else{

          bplayer(bowlername,bowlerover,bowlerball,bowlerrun,bowlerwicket);
         navigation.navigate("scoreboard");


      }

      
   };

   const bplayer=(bname,over,ball,brun,wicket)=>{
    let data={
        bname:bname,
        over:over,
        ball:ball,
        brun:brun,
        wicket:wicket
        
    }
    AsyncStorage.setItem('bplayer',JSON.stringify(data));
}


  return (
    <ScrollView>
    <View style={{flex: 1,}}>
       <View style={{backgroundColor:'#1a1aff',height:60,alignItems:'center',flexDirection:'row'}}>
             <Icon
                name='arrow-left'
                size={15}
                color='red'
                style={{fontSize:20,color:'#fff',fontWeight:'200',marginLeft:15,position:'relative',bottom:-5}}
                onPress={()=>{navigation.replace('NewMatch')}}
              />
          <Text style={{fontSize:20,color:'#fff',fontWeight:'200',marginLeft:15,position:'relative',bottom:-5}}>   Choose bowler</Text>

       </View>
       <View style={{backgroundColor:'#F0F0F0',flex:1}}>
         
          <View style={{...styles.card}}>
          <Text style={styles.lbl}>Select a new bowler</Text>
          <Input
              placeholder={'Player name'}
              inputStyle={{fontSize:14}}
               value={bowlername}
              rightIcon={isbowlernameerr? <Icon
                name='exclamation-circle'
                size={18}
                color='red'
              />:null}        
              inputContainerStyle={{height:25}}
              onChangeText={value =>{ 
                setbowlername(value);
                setbowlernameerr('');
                setisbowlernameerr(false);
                setdrop(false)
               
              }}
              errorStyle={{ color: 'red' }}
              errorMessage={bowlernameerr}
              />
       
        { drop==false? <View style={{position:'absolute',top:60,left:20}}>
          {global.bname.filter(name => name.includes(bowlername)).map((filteredName,key )=> (
            <ScrollView>
            <TouchableOpacity key={key} style={{padding:10,backgroundColor:'#fff',width:300}} onPress={()=>{
              setdrop(true)
              setbowlername(filteredName);
          
              }}>
                <Text>
                  {filteredName}
                </Text>
              </TouchableOpacity>
              </ScrollView>
          ))}
          </View>:null } 
            



         </View>
            
           

            <TouchableOpacity style={{alignItems:'center',margin:10,marginTop:50,borderRadius:10, padding:10,backgroundColor:'#1a1aff'}} onPress={()=>{startmatch()}}>
              <Text style={{color:'#fff',fontSize:15,margin:2}}>Done</Text>
              
            </TouchableOpacity>
       </View>
    </View>
    </ScrollView>
  );
};

export default choosebowler;

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
 
 marginLeft:10,
 fontSize:15,
 color:'#1a1aff'

 }
})
