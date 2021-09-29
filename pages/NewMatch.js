// Navigate Between Screens using React Navigation in React Native //
// https://aboutreact.com/react-native-stack-navigation //
import React,{useState,useEffect} from 'react';
import { View, Text, SafeAreaView,StyleSheet,ScrollView, TouchableWithoutFeedback,TouchableOpacity,Image} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'

const NewMatch = ({navigation}) => {
   const[hostTeam,sethostTeam]=useState('Host Team');
   const[visitorTeam,setvisitorTeam]=useState('Visitor Team');
   const[overs,setOvers]=useState(0);
   const [checkedtosswon, setCheckedtosswon] = useState('hostTeam');
   const [checkedopted, setCheckedopted] = useState('Bat');

   const[hostTeamerr,sethostTeamerr]=useState('');
   const[visitorTeamerr,setvisitorTeamerr]=useState('');
   const[overserr,setOverserr]=useState('');

   const[ishostTeamerr,setishostTeamerr]=useState(false);
   const[isvisitorTeamerr,setisvisitorTeamerr]=useState(false);
   const[isoverserr,setisOverserr]=useState(false);


   const startmatch=()=>{
      if(hostTeam == 'Host Team' || hostTeam==''){
        sethostTeamerr('Team name is required.');
        setishostTeamerr(true);
      }else if(visitorTeam == 'Visitor Team' || visitorTeam == ''){
        setvisitorTeamerr('Team name is required.');
        setisvisitorTeamerr(true);
      }else if(overs == 0 || overs == ''){
        setOverserr("Over is required");
        setisOverserr(true);
      }else{
        
        let data={
          "hostTeam":hostTeam,
          "visitorTeam":visitorTeam,
          "overs":overs,
          "checkedtosswon":checkedtosswon,
          "checkedopted":checkedopted,
          "inning":'1st inning',
        }
        global.ischeckinning=false;
        global.totalscore=0;
       
        AsyncStorage.setItem('NewMatchData',JSON.stringify(data));
        navigation.navigate("selectopening");
      }

      
   };


  return (
  
    <View style={{flex: 1,}}>
       <View style={{backgroundColor:'#1a1aff',height:60,alignItems:'center',flexDirection:'row'}}>
          <Text style={{fontSize:25,color:'#fff',fontWeight:'700',marginLeft:15,position:'relative',bottom:-5}}>Cricket</Text>
          <Text style={{fontSize:18,color:'#fff',marginTop:5,position:'relative',bottom:-5}}> score</Text>
       </View>
       <ScrollView>
       <View style={{backgroundColor:'#F0F0F0',flex:1,marginBottom:50}}>
         <Text style={styles.lbl}> Teams</Text>
          <View style={{...styles.card}}>
          <Input
              placeholder={'Host Team'}
              inputStyle={{fontSize:14}}

              rightIcon={ishostTeamerr? <Icon
                name='exclamation-circle'
                size={18}
                color='red'
              />:null}        
              inputContainerStyle={{height:25}}
              onChangeText={value =>{ sethostTeam(value);
                sethostTeamerr('');
                setishostTeamerr(false);
               
              }}
              errorStyle={{ color: 'red' }}
              errorMessage={hostTeamerr}
              />

              <Input
              placeholder={'Visitor Team'}
              inputStyle={{fontSize:14,}}
              rightIcon={isvisitorTeamerr?<Icon
                name='exclamation-circle'
                size={18}
                color='red'
              />:null}
              inputContainerStyle={{height:25}}
              onChangeText={value => {setvisitorTeam(value);
                setvisitorTeamerr('');
                setisvisitorTeamerr(false);
               
                
              }}
              errorStyle={{ color: 'red' }}
              errorMessage={visitorTeamerr}
              />
            </View>
            <Text style={styles.lbl}> Toss won by?</Text>
            <View  style={{...styles.card,flexDirection:'row'}}>
            <RadioButton
                    value="hostTeam"
                    status={ checkedtosswon === hostTeam ? 'checked' : 'unchecked' }
                    onPress={() => setCheckedtosswon(hostTeam)}
                    color='#1a1aff'
                  />
                  <Text style={{textAlignVertical:'center'}}>{hostTeam}</Text>
                  <RadioButton
                    value="visitorTeam"
                    status={ checkedtosswon === visitorTeam ? 'checked' : 'unchecked' }
                    onPress={() => setCheckedtosswon(visitorTeam)}
                    color='#1a1aff'
                  />
                   <Text style={{textAlignVertical:'center'}}>{visitorTeam}</Text>
              
                  
               
            </View>


            <Text style={styles.lbl}> Opted to?</Text>
            <View  style={{...styles.card,flexDirection:'row'}}>
            <RadioButton
                    value="Bat"
                    status={ checkedopted === 'Bat' ? 'checked' : 'unchecked' }
                    onPress={() => setCheckedopted('Bat')}
                    color='#1a1aff'
                  />
                  <Text style={{textAlignVertical:'center'}}>Bat</Text>
                  <RadioButton
                    value="Bowl"
                    status={ checkedopted === 'Bowl' ? 'checked' : 'unchecked' }
                    onPress={() => setCheckedopted('Bowl')}
                    color='#1a1aff'
                  />
                   <Text style={{textAlignVertical:'center'}}>Bowl</Text>
            </View>


            <Text style={styles.lbl}> Overs?</Text>
            <View  style={{...styles.card,}}>
            <Input
              placeholder={'overs'}
              inputStyle={{fontSize:14}}
              rightIcon={isoverserr?<Icon
                name='exclamation-circle'
                size={18}
                color='red'
              />:null}
              inputContainerStyle={{height:25,margin:0}}
              containerStyle={{margin:0}}
              onChangeText={value =>{ setOvers(value);
                setOverserr("");
                setisOverserr(false);
              
              }}
              errorStyle={{ color: 'red' }}
              errorMessage={overserr}
              keyboardType="numeric"
              />
            </View>

            <TouchableOpacity  style={{alignItems:'center',alignSelf:'flex-end',margin:10,borderRadius:10, padding:10,backgroundColor:'#1a1aff',width:150}} onPress={()=>{startmatch()}}>
              <Text style={{color:'#fff',fontSize:15,margin:2}}>Start match</Text>
              
            </TouchableOpacity>
       </View>
       </ScrollView>
    {/*  <View style={{flexDirection:'row', justifyContent:'space-evenly',alignItems:'center',width:'100%', height:50,backgroundColor:'#fff',position:'absolute',bottom:0}}>
         <TouchableOpacity>
              <Image source={require('./images/cricket.png')}
               style={{height:20,width:20,alignSelf:'center'}}
              />
              <Text style={{color:'#1a1aff'}}>New Match</Text>
         </TouchableOpacity>

         <TouchableOpacity onPress={()=>navigation.navigate('teams')}>
              <Image source={require('./images/group.png')}
               style={{height:20,width:20,alignSelf:'center'}}
              />
              <Text style={{color:'black'}}>Teams</Text>
         </TouchableOpacity>

         <TouchableOpacity>
              <Image source={require('./images/history.png')}
               style={{height:20,width:20, alignSelf:'center'}}
              />
              <Text style={{color:'black'}}>History</Text>
         </TouchableOpacity>
      </View>*/}
    </View>
  
  );
};

export default NewMatch;

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
 marginTop:10,
 marginLeft:10,
 fontSize:15,
 color:'#1a1aff'

 }
})
