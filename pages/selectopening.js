// Navigate Between Screens using React Navigation in React Native //
// https://aboutreact.com/react-native-stack-navigation //
import React,{useState,useEffect} from 'react';
import { View, Text, SafeAreaView,StyleSheet,ScrollView, TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'

const selectopening = ({navigation}) => {
   const[striker,setstriker]=useState('');
   const[nonstriker,setnonstriker]=useState('');
   const[openingbowler,setopeningbowler]=useState('');
 

   const[strikererr,setstrikererr]=useState('');
   const[nonstrikererr,setnonstrikererr]=useState('');
   const[openingbowlererr,setopeningbowlererr]=useState('');

   const[isstrikererr,setisstrikererr]=useState(false);
   const[isnonstrikererr,setisnonstrikererr]=useState(false);
   const[isopeningbowlererr,setisopeningbowlererr]=useState(false);


   const startmatch=()=>{
      if(striker==''){
        setstrikererr('Player name is required.');
        setisstrikererr(true);
      }else if( nonstriker == ''){
        setnonstrikererr('Player name is required.');
        setisnonstrikererr(true);
      }else if( openingbowler == ''){
        setopeningbowlererr("Player name is required");
        setisopeningbowlererr(true);
      }else{

        global.bname=[];

        let data={
          "striker":striker,
          "nonstriker":nonstriker,
          "openingbowler":openingbowler,
        };
        AsyncStorage.setItem('OpeningPlayerData',JSON.stringify(data));
        fplayer(striker,0,0,0,0);
        splayer(nonstriker,0,0,0,0);
        bplayer(openingbowler,0,0,0,0);
        totalrecord(0,0,0,0);

        global.Partnershipruns = 0;
        global.extraruns = 0;


       navigation.replace("scoreboard");
      }

      
   };

   const fplayer=(pname,run,ball,four,six)=>{
    let data={
        pname:pname,
        run:run,
        ball:ball,
        four:four,
        six:six
    }
    AsyncStorage.setItem('fplayer',JSON.stringify(data));
}

const splayer=(sname,run,ball,four,six)=>{
  let data={
      pname:sname,
      run:run,
      ball:ball,
      four:four,
      six:six
  }
  AsyncStorage.setItem('splayer',JSON.stringify(data));
}

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


const totalrecord=(run,over,ball,wicket)=>{
  let data={
      run:run,
      over:over,
      ball:ball,
      wicket:wicket
      
  }
  AsyncStorage.setItem('totalrecord',JSON.stringify(data));
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
          <Text style={{fontSize:20,color:'#fff',fontWeight:'200',marginLeft:15,position:'relative',bottom:-5}}>Select Opening players</Text>

       </View>
       <View style={{backgroundColor:'#F0F0F0',flex:1}}>
         
          <View style={{...styles.card}}>
          <Text style={styles.lbl}>Striker</Text>
          <Input
              placeholder={'Player name'}
              inputStyle={{fontSize:14}}

              rightIcon={isstrikererr? <Icon
                name='exclamation-circle'
                size={18}
                color='red'
              />:null}        
              inputContainerStyle={{height:25}}
              onChangeText={value =>{ setstriker(value);
                setstrikererr('');
                setisstrikererr(false);
               
              }}
              errorStyle={{ color: 'red' }}
              errorMessage={strikererr}
              />
        <Text style={styles.lbl}>Non-striker</Text>
              <Input
              placeholder={'Player name'}
              inputStyle={{fontSize:14,}}
              rightIcon={isnonstrikererr?<Icon
                name='exclamation-circle'
                size={18}
                color='red'
              />:null}
              inputContainerStyle={{height:25}}
              onChangeText={value => {setnonstriker(value);
                setnonstrikererr('');
                setisnonstrikererr(false);
               
                
              }}
              errorStyle={{ color: 'red' }}
              errorMessage={nonstrikererr}
              />
            </View>
            




            
            <View  style={{...styles.card,}}>
            <Text style={styles.lbl}> Opening bowler</Text>
            <Input
              placeholder={'Player name'}
              inputStyle={{fontSize:14}}
              rightIcon={isopeningbowlererr?<Icon
                name='exclamation-circle'
                size={18}
                color='red'
              />:null}
              inputContainerStyle={{height:25,margin:0}}
              containerStyle={{margin:0}}
              onChangeText={value =>{ setopeningbowler(value);
                setopeningbowlererr("");
                setisopeningbowlererr(false);
              
              }}
              errorStyle={{ color: 'red' }}
              errorMessage={openingbowlererr}
              />
            </View>

            <TouchableOpacity style={{alignItems:'center',margin:10,borderRadius:10, padding:10,backgroundColor:'#1a1aff'}} onPress={()=>{startmatch()}}>
              <Text style={{color:'#fff',fontSize:15,margin:2}}>Start match</Text>
              
            </TouchableOpacity>
       </View>
    </View>
    </ScrollView>
  );
};

export default selectopening;

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
