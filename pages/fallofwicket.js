// Navigate Between Screens using React Navigation in React Native //
// https://aboutreact.com/react-native-stack-navigation //
import React,{useState,useEffect} from 'react';
import { View, Text, SafeAreaView,StyleSheet,ScrollView, TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-community/async-storage'

const fallofwicket = ({navigation}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Bowled', value: 'Bowled'},
      {label: 'Catch Out', value: 'Catch Out'},
      {label: 'Stumping', value: 'Stumping'},
      {label: 'LBW', value: 'LBW'},
      {label: 'Hit Wicket', value: 'Hit Wicket'},
    ]);


    const[whohelp,setwhohelp]=useState('');
   const[newbatsman,setnewbatsman]=useState('');
   const [iswhohelp, setiswhohelp] = useState(false);
 

   const[whohelperr,setwhohelperr]=useState('');
   const[newbatsmanerr,setnewbatsmanerr]=useState('');


   const[iswhohelperr,setiswhohelperr]=useState(false);
   const[isnewbatsmanerr,setisnewbatsmanerr]=useState(false);
 


   const startmatch=()=>{
       if( newbatsman == ''){
        setnewbatsmanerr('Player name is required.');
        setisnewbatsmanerr(true);
      }else{
         if(global.isbat =="striker"){
          fplayer(newbatsman,0,0,0,0);
          navigation.navigate("scoreboard");
         
         }else{
          splayer(newbatsman,0,0,0,0);
          global.Partnershipruns = 0;
          navigation.navigate("scoreboard");
         }
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

  return (
   
    <View style={{flex: 1,}}>
       <View style={{backgroundColor:'#1a1aff',height:60,alignItems:'center',flexDirection:'row'}}>
             <Icon
                name='arrow-left'
                size={15}
                color='red'
                style={{fontSize:20,color:'#fff',fontWeight:'200',marginLeft:15,position:'relative',bottom:-5}}
                onPress={()=>{navigation.replace('NewMatch')}}
              />
          <Text style={{fontSize:20,color:'#fff',fontWeight:'200',marginLeft:15,position:'relative',bottom:-5}}>   Fall of wicket</Text>

       </View>
       <View style={{backgroundColor:'#F0F0F0',flex:1,margin:10}}>
               
      
       <Text style={styles.lbl}>How wicket fall?</Text>
                        <DropDownPicker
                          open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        onChangeValue={(value) => {
                             if(value == "Catch Out"){
                               setiswhohelp(true);
                             }
                            else if(value == "Stumping"){
                              setiswhohelp(true);
                            }else{
                              setiswhohelp(false);
                             }

                          }}
                          style={{borderWidth:0}}
                        />

   {iswhohelp ?<View>
       
       <Text style={styles.lbl}>Who helped?</Text>
       <Input
              placeholder={'Player name'}
              inputStyle={{fontSize:14}}

              rightIcon={iswhohelperr? <Icon
                name='exclamation-circle'
                size={18}
                color='red'
              />:null}        
              inputContainerStyle={{height:25}}
              onChangeText={value =>{ setwhohelp(value);
                setwhohelperr('');
                setiswhohelperr(false);
               
              }}
              errorStyle={{ color: 'red' }}
              errorMessage={whohelperr}
              />
          
     </View>:null}  
      <Text style={styles.lbl}>Batsman Name</Text>
              <Input
              placeholder={'Player name'}
              inputStyle={{fontSize:14,}}
              rightIcon={isnewbatsmanerr?<Icon
                name='exclamation-circle'
                size={18}
                color='red'
              />:null}
              inputContainerStyle={{height:25}}
              onChangeText={value => {setnewbatsman(value);
                setnewbatsmanerr('');
                setisnewbatsmanerr(false);
               
                
              }}
              errorStyle={{ color: 'red' }}
              errorMessage={newbatsmanerr}
              />
                  

         <TouchableOpacity style={{alignItems:'center',margin:10,borderRadius:10, padding:10,backgroundColor:'#1a1aff'}} onPress={()=>{startmatch()}}>
              <Text style={{color:'#fff',fontSize:15,margin:2}}>Done</Text>
              
            </TouchableOpacity>
                    
       

         
           
       </View>
    </View>
   
  );
};

export default fallofwicket;

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
