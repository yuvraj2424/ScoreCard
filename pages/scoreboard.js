// Navigate Between Screens using React Navigation in React Native //
// https://aboutreact.com/react-native-stack-navigation //
import React,{useState,useEffect} from 'react';
import { View, Text, SafeAreaView,StyleSheet,ScrollView,AlertIOS, TouchableWithoutFeedback,TouchableOpacity,Alert } from 'react-native';
import { Divider,Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { BottomSheet } from 'react-native-btr';
import AsyncStorage from '@react-native-community/async-storage';
import prompt from 'react-native-prompt-android';


var countball=[];

var undorun=[];  //store data in array for undo
var undoball=[];
var undoover=[];
var undoprun=[];
var undopball=[];
var undopfour=[];
var undopsix=[];
var undobowlerball=[];
var undobowlerrun = [];
var undobowlerwicket=[];
var undowicket=[];

var bowlername=[{name:"hello",over:0}];  // add previous bowler


const scoreboard = ({navigation}) => {
 
    const [finalover,setfinalover]=useState(0);
    const [iswide, setiswide] = useState(false);
    const [isnoball, setisnoball] = useState(false);
    const [isbyes, setisbyes] = useState(false);
    const [islegbyes, setislegbyes] = useState(false);
    const [iswicket, setiswicket] = useState(false);

    const [disablevalue,setdisablevalue]=useState(false);
    const [visible, setVisible] = useState(false);
    const [ isExtras, setExtras] =useState(false)
    const [ isPartnership, setPartnership] =useState(false)

    const [iswk,setiswk]=useState(false);
    const [isprompt ,setisprompt] = useState(false);

    const [totalruns,settotalruns]=useState(0);
    const [totalover,settotalover]=useState(0);
    const [totalballs,settotalballs]=useState(0);
    const [totalwicket,settotalwicket]=useState(0);

    const [team1,setteam1]=useState('');
    const [team2,setteam2]=useState('');
   const [teamname,setteamname]=useState('');
   const [firstbatsman,setfirstbatsman]=useState('');
   const [secondbatsman,setsecondbatsman]=useState('');
   const [bowler,setbowler]=useState("");
 

   const [runf,setrunf]=useState(0);  //batsman
   const [ballf,setballf]=useState(0);
   const [foursf,setfoursf]=useState(0);
   const [sixf,setsixf]=useState(0);
   const [runs,setruns]=useState(0);
   const [balls,setballs]=useState(0);
   const [fourss,setfourss]=useState(0);
   const [sixs,setsixs]=useState(0);

   const[bowlerover,setbowlerover]=useState(0); //bowlers
   const[bowlerball, setbowlerball]=useState(0);
   const[bowlerwicket,setbowlerwicket]=useState(0);
   const [bowlerrun,setbowlerrun]=useState(0);

   const [Extraruns, setExtraruns] = useState(0);
   const [Partnershipruns ,setPartnershiprun] = useState(0);


   useEffect(()=>{

   
   
            AsyncStorage.getItem('NewMatchData').then(data =>{
                    if(data){
                        let ourData = JSON.parse(data);
                        console.log("Team name",ourData);
                        setteam1(ourData.hostTeam);
                        setteam2(ourData.visitorTeam);

                        setfinalover(ourData.overs);
                        if(ourData.hostTeam == ourData.checkedtosswon){
                             if(ourData.hostTeam == ourData.checkedtosswon){
                                    if(ourData.checkedopted=='Bat' && global.ischeckinning==false){
                                        setteamname(ourData.hostTeam)
                                    }else{
                                        setteamname(ourData.visitorTeam)
                                    }
                                }else {
                                    if(ourData.checkedopted=='Bowl' && global.ischeckinning==true){
                                        setteamname(ourData.visitorTeam)
                                    }else{
                                        setteamname(ourData.hostTeam)
                                    }
                     }
                    }else{

                    
                     if(ourData.visitorTeam == ourData.checkedtosswon){
                        if(ourData.checkedopted=='Bat' && global.ischeckinning==false){
                             setteamname(ourData.visitorTeam)
                        }else{
                            setteamname(ourData.hostTeam)
                        }
                    }else {
                        if(ourData.checkedopted=='Bowl' && global.ischeckinning==true){
                            setteamname(ourData.hostTeam);
                        }else{
                            setteamname(ourData.visitorTeam)
                        }
           }
        }

                    


                        
                 }
            });


        AsyncStorage.getItem('fplayer').then(data =>{
            if(data){
                let ourData = JSON.parse(data);
                setfirstbatsman(ourData.pname);
                setrunf(ourData.run);
                setballf(ourData.ball);
                setfoursf(ourData.four);
                setsixf(ourData.six);
            }
          });

          AsyncStorage.getItem('splayer').then(data =>{
            if(data){
                let ourData = JSON.parse(data);
                setsecondbatsman(ourData.pname);
                setruns(ourData.run);
                setballs(ourData.ball);
                setfourss(ourData.four);
                setsixs(ourData.six);
            }
          });

          AsyncStorage.getItem('bplayer').then(data =>{
            if(data){
                let ourData = JSON.parse(data);
                setbowler(ourData.bname);
               // setbowlerover(ourData.over);
                setbowlerball(ourData.ball);
                setbowlerrun(ourData.brun);
                setbowlerwicket(ourData.wicket);

                global.bname.push(ourData.bname);
                var pbowler=  global.bname.filter(item=>{
                    return  item===ourData.bname
                  });
                  setbowlerover(pbowler.length-1);
            }
          });

         console.log(global.bname);

         AsyncStorage.getItem('totalrecord').then(data =>{
            if(data){
                let ourData = JSON.parse(data);
                settotalruns(ourData.run);
                settotalover(ourData.over);
                settotalballs(ourData.ball);
                settotalwicket(ourData.wicket);
                
            }
          });

         
         
       console.log(global.totalscore);
       console.log(global.ischeckinning);

        return()=>{
           
           console.log( "exist page")
        };
   },[]);

  const fplayer=async(pname,run,ball,four,six)=>{
      try{
      let data={
          pname:pname,
          run:run,
          ball:ball,
          four:four,
          six:six
      }
     await AsyncStorage.setItem('fplayer',JSON.stringify(data));
    }catch(err){
        console.log(err);
    }
  }

  const splayer=async(sname,run,ball,four,six)=>{
    let data={
        pname:sname,
        run:run,
        ball:ball,
        four:four,
        six:six
    }
    await AsyncStorage.setItem('splayer',JSON.stringify(data));
}

const bplayer=async(bname,over,ball,brun,wicket)=>{
    let data={
        bname:bname,
        over:over,
        ball:ball,
        brun:brun,
        wicket:wicket
        
    }
    await AsyncStorage.setItem('bplayer',JSON.stringify(data));
}


const totalrecord=async(run,over,ball,wicket)=>{
    let data={
        run:run,
        over:over,
        ball:ball,
        wicket:wicket
        
    }
    await AsyncStorage.setItem('totalrecord',JSON.stringify(data));
  }
  

   const extrarun=()=>{
       setisbyes(false);
       setiswide(false);
       setiswicket(false);
       setisnoball(false);
       setislegbyes(false);
   }

   const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

   const cleararray=()=>{
    countball=[];

    undorun=[];  //store data in array for undo
     undoball=[];
    undoover=[];
     undoprun=[];
    undopball=[];
     undopfour=[];
   undopsix=[];
    undobowlerball=[];
   undobowlerrun = [];
     undobowlerwicket=[];
    undowicket=[];
   }


   const completedmatch=()=>{
    clearInterval(clearinterval);
  
       if(global.totalscore!=0 && global.totalscore<=totalruns && global.ischeckinning==true){
        global.teamname=teamname;
    
        Alert.alert(
            "",
          ' completed match.',
            [
              
              { text: "OK", onPress: () =>{
                playingrecored();
                cleararray();
                navigation.replace("winpage");} 
              }
            ]
          );

          clearInterval(clearinterval);
       }
      
       var value=(finalover * 6)-(totalballs + (totalover*6));

       if(value<=0 && totalover > 0 && global.ischeckinning==true){

        global.teamname=teamname;
        
        Alert.alert(
            "",
          ' completed match.',
            [
              
              { text: "OK", onPress: () =>{
                playingrecored();
                cleararray();
                navigation.replace("winpage");} 
              }
            ]
          );

          clearInterval(clearinterval);
       }
   }


   const firstmatch=()=>{
    clearInterval(clearinterval);
    if(finalover == totalover && totalover > 0){

        global.totalscore=totalruns+1;
        global.ischeckinning=true;
        global.teamname=teamname;
      

        Alert.alert(
            "",
            teamname + ' completed match.',
            [
              
              { text: "OK", onPress: () =>{
                playingrecored();
                cleararray();
                navigation.replace("selectopening");} 
              }
            ]
          );

         

      }
   }

 var clearinterval=  setInterval(()=>{
    
    if(global.ischeckinning==true){
        completedmatch();
    }else{
        firstmatch();
    }
    
   },3000)

   const changeplayer=()=>{

    Alert.alert(
        "",
        "which player is change now?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),          
          },
          { text: "Bowler", onPress: () =>{
            playingrecored();
            swapbatsman();
             countball=[];
             gotobowlerpage();
            } 
        },
        { text: "Batsman", onPress: () =>{
            playingrecored();
            
          
            changebatsman();} 
        },
        ]
      );

   }

   const changebatsman=()=>{

    Alert.alert(
        "",
        "Please change batsman?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),          
          },
          { text: "Striker", onPress: () =>{
            playingrecored();
            setiswk(false);
            global.isbat="striker";
            navigation.replace("fallofwicket");
            } 
        },
        { 
            text: "Non-striker", onPress: () =>{
            playingrecored();
            setiswk(false);
            global.isbat="nonstriker";
            navigation.replace("fallofwicket");
          } 
        },
        ]
      );

   }

   const gotobowlerpage=()=>{
    Alert.alert(
        "",
        "change bowler?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),          
          },
          { text: "OK", onPress: () =>{
            playingrecored();
            cleararray();
         //   swapbatsman();
             countball=[];
            navigation.replace("choosebowler");} }
        ]
      );
  
       



   }

   const playingrecored=()=>{
    fplayer(firstbatsman,runf,ballf,foursf,sixf);
    splayer(secondbatsman,runs,balls,fourss,sixs);
    bplayer(bowler,bowlerover,bowlerball,bowlerrun,bowlerwicket);

    totalrecord(totalruns,totalover,totalballs,totalwicket);
   }



 const Paneltyruns=()=>{

    prompt(
        'This inning',
        'Penalty runs?',
        [
         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
         {text: 'OK', onPress: (text) => {
            settotalruns(totalruns + parseInt(text))
            global.extraruns = global.extraruns + parseInt(text);
            playingrecored();
         }},
        ],
        {
            type: 'numeric',
            cancelable: true,
            defaultValue: 0,
            placeholder: '0',
            keyboardType:'numeric',
        }
    );
     
   
  }


  const zerorun=()=>{
      if(finalover == totalover){

        firstmatch();

      }else{

      

    if(bowlerball == 6){
        alert("Please change bowler");
    }else{
        if(iswk==true){
            alert("Please change batsman.");
        }else{
    

 
    if(iswicket==true){
       setbowlerwicket(bowlerwicket+1);
       settotalwicket(totalwicket+1);
       undobowlerwicket.push(1);
       undowicket.push(1);
       countball.push('OUT');
       setiswk(true);
         
    }else{
        if(iswide == true){
            countball.push(1); //count ball
        }else{
            countball.push(0); //count ball
        }
        
    }

    if(isnoball == true && (isbyes == true || islegbyes ==true)){

        global.Partnershipruns=global.Partnershipruns+1;
        global.extraruns = global.extraruns +1 ;
        settotalruns(totalruns+1);  // total runs
        setbowlerrun(bowlerrun+1);
        setrunf(runf+0);
        setballf(ballf+1);
        undorun.push(1);  //undo data
        undoball.push(0);
        undoprun.push(0);
        undopball.push(1);
        undopfour.push(0);
        undopsix.push(0);
        undobowlerball.push(0);
        undobowlerrun.push(1);
        undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();


    }else{

    
   
    if(iswide == true){
        global.Partnershipruns=global.Partnershipruns+1;
        global.extraruns = global.extraruns +1 ;
        settotalruns(totalruns+1);  // total runs
        setbowlerrun(bowlerrun+1);

        undorun.push(1);  //undo data
        undoball.push(0);
        undoprun.push(0);
        undopball.push(0);
        undopfour.push(0);
        undopsix.push(0);
        undobowlerball.push(0);
        undobowlerrun.push(1);
        undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();
    }else{
          
        if(isnoball == true){
            global.Partnershipruns=global.Partnershipruns+1;
            global.extraruns = global.extraruns +1 ;
            settotalruns(totalruns+1);  // total runs
            setbowlerrun(bowlerrun+1);
            setrunf(runf+0);
            setballf(ballf+1);
            undorun.push(1);  //undo data
            undoball.push(0);
            undoprun.push(0);
            undopball.push(1);
            undopfour.push(0);
            undopsix.push(0);
            undobowlerball.push(0);
            undobowlerrun.push(1);
            undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();
            
            
        }else{

            if(isbyes==true){


                setrunf(runf+0);
                setballf(ballf+1);
                global.Partnershipruns=global.Partnershipruns+0;
                global.extraruns = global.extraruns +0;
                settotalruns(totalruns+0);  // total runs
                setbowlerrun(bowlerrun+0);
    
                
            
    
                undorun.push(0);  //undo data
                undoball.push(1);
                undoprun.push(0);
                undopball.push(1);
                undopfour.push(0);
                undopsix.push(0);
                undobowlerball.push(1);
                undobowlerrun.push(0);
                undobowlerwicket.push(0);
                undowicket.push(0);
                
    
                settotalballs(totalballs+1); // total balls
                setbowlerball(bowlerball+1);
    
                if(totalballs == 5){   
                    settotalover(totalover+1)   //total overs
                   // setbowlerover(bowlerover+1);
                    settotalballs(0);
                   // playingrecored();
               //    swapbatsman();
                  
                }

                playingrecored();

            }else{
                setrunf(runf+0);
                setballf(ballf+1);
                settotalruns(totalruns+0);  // total runs
                setbowlerrun(bowlerrun+0);
    
                
            
    
                undorun.push(0);  //undo data
                undoball.push(1);
                undoprun.push(0);
                undopball.push(1);
                undopfour.push(0);
                undopsix.push(0);
                undobowlerball.push(1);
                undobowlerrun.push(0);
            
                
    
                settotalballs(totalballs+1); // total balls
                setbowlerball(bowlerball+1);
    
                if(totalballs == 5){   
                    settotalover(totalover+1)   //total overs
                    settotalballs(0);
                    //setbowlerover(bowlerover+1);
                  //  playingrecored();
                //  swapbatsman();
              //  firstmatch();

                     
                   
                }

                playingrecored();
                
               
            }

            
        }
     }
    }
}
 }
}

      extrarun();
  };

  const onerun=()=>{
    if(finalover == totalover){

        firstmatch();

      }else{


    if(bowlerball == 6){
        alert("Please change bowler");
    }else{
        if(iswk==true){
            alert("Please change batsman.");
        }else{



    if(iswicket==true){
        setbowlerwicket(bowlerwicket+1);
        settotalwicket(totalwicket+1);
        undobowlerwicket.push(1);
        undowicket.push(1);
        countball.push('OUT');
        setiswk(true);
     }else{
        if(iswide == true){
            countball.push(2); //count ball
        }else{
            countball.push(1); //count ball
        }
     }



     if(isnoball == true && (isbyes == true || islegbyes ==true)){

        global.Partnershipruns=global.Partnershipruns+2;
        global.extraruns = global.extraruns +2;
        settotalruns(totalruns+2);  // total runs
        setbowlerrun(bowlerrun+2);
        let temp1=runf+0; // run swap
        setrunf(runs);
        setruns(temp1);

        let temp2=ballf+1; // ball swap
        setballf(balls);
        setballs(temp2);

        let temp3=foursf; // four swap
        setfoursf(fourss);
        setfourss(temp3);

        let temp4=sixf; // four swap
        setsixf(sixs);
        setsixs(temp4);

        let temp5=firstbatsman; // batsman swap
        setfirstbatsman(secondbatsman);
        setsecondbatsman(temp5);
        undorun.push(2);  //undo data
        undoball.push(0);
        undoprun.push(0);
        undopball.push(1);
        undopfour.push(0);
        undopsix.push(0);
        undobowlerball.push(0);
        undobowlerrun.push(2);
        undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();
     }else{

     if(iswide == true){
        global.Partnershipruns=global.Partnershipruns+2;
        global.extraruns = global.extraruns +2 ;
        settotalruns(totalruns+2);  // total runs
        setbowlerrun(bowlerrun+2);
        swapbatsman();
        undorun.push(2);  //undo data
        undoball.push(0);
        undoprun.push(0);
        undopball.push(0);
        undopfour.push(0);
        undopsix.push(0);
        undobowlerball.push(0);
        undobowlerrun.push(2);
        undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();
    }else{

        if(isnoball == true){
            global.Partnershipruns=global.Partnershipruns+2;
            global.extraruns = global.extraruns + 2 ;
            settotalruns(totalruns+2);  // total runs
            setbowlerrun(bowlerrun+2);
            let temp1=runf+1; // run swap
            setrunf(runs);
            setruns(temp1);

            let temp2=ballf+1; // ball swap
            setballf(balls);
            setballs(temp2);
    
            let temp3=foursf; // four swap
            setfoursf(fourss);
            setfourss(temp3);

            let temp4=sixf; // four swap
            setsixf(sixs);
            setsixs(temp4);

            let temp5=firstbatsman; // batsman swap
            setfirstbatsman(secondbatsman);
            setsecondbatsman(temp5);
            undorun.push(2);  //undo data
            undoball.push(0);
            undoprun.push(1);
            undopball.push(1);
            undopfour.push(0);
            undopsix.push(0);
            undobowlerball.push(0);
            undobowlerrun.push(2);
            undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();
            
            
        }else{

            if(isbyes==true){

                global.Partnershipruns=global.Partnershipruns+1;
                global.extraruns = global.extraruns +1 ;
                settotalruns(totalruns+1);  // total runs
                setbowlerrun(bowlerrun+1);
    
                settotalballs(totalballs+1); // total balls
                setbowlerball(bowlerball+1);
                
                
    
                undorun.push(1);  //undo data
                undoball.push(1);
                undoprun.push(0);
                undopball.push(1);
                undopfour.push(0);
                undopsix.push(0);
                undobowlerball.push(1);
                undobowlerrun.push(0);
                undobowlerwicket.push(0);
                undowicket.push(0);
            
    
                if(totalballs == 5){   
                    settotalover(totalover+1)   //total ball
                 //   setbowlerover(bowlerover+1);
                    settotalballs(0);
                    
                 //   playingrecored();
                  //  swapbatsman();
                }
                    
                    let temp1=runf+0; // run swap
                    setrunf(runs);
                    setruns(temp1);
    
                    let temp2=ballf+1; // ball swap
                    setballf(balls);
                    setballs(temp2);
            
                    let temp3=foursf; // four swap
                    setfoursf(fourss);
                    setfourss(temp3);
    
                    let temp4=sixf; // four swap
                    setsixf(sixs);
                    setsixs(temp4);
    
                    let temp5=firstbatsman; // batsman swap
                    setfirstbatsman(secondbatsman);
                    setsecondbatsman(temp5);

                    playingrecored();

            }else{
                global.Partnershipruns=global.Partnershipruns+1;
                settotalruns(totalruns+1);  // total runs
                setbowlerrun(bowlerrun+1);
    
                settotalballs(totalballs+1); // total balls
                setbowlerball(bowlerball+1);
                
                
    
                undorun.push(1);  //undo data
                undoball.push(1);
                undoprun.push(1);
                undopball.push(1);
                undopfour.push(0);
                undopsix.push(0);
                undobowlerball.push(1);
                undobowlerrun.push(1);
              
    
                if(totalballs == 5){   
                    settotalover(totalover+1)   //total balls
                  //  setbowlerover(bowlerover+1);
                    settotalballs(0);
                   // playingrecored();
                  // swapbatsman();
                }
                    
                    let temp1=runf+1; // run swap
                    setrunf(runs);
                    setruns(temp1);
    
                    let temp2=ballf+1; // ball swap
                    setballf(balls);
                    setballs(temp2);
            
                    let temp3=foursf; // four swap
                    setfoursf(fourss);
                    setfourss(temp3);
    
                    let temp4=sixf; // four swap
                    setsixf(sixs);
                    setsixs(temp4);
    
                    let temp5=firstbatsman; // batsman swap
                    setfirstbatsman(secondbatsman);
                    setsecondbatsman(temp5);


                    playingrecored();

               }

            }
        }
     }
    }
    }
}

    extrarun();
   };

const tworun=()=>{

    if(finalover == totalover){

        firstmatch();

      }else{

    if(bowlerball == 6){
        alert("Please change bowler");
    }else{
        if(iswk==true){
            alert("Please change batsman.");
        }else{


    if(iswicket==true){
        setbowlerwicket(bowlerwicket+1);
        settotalwicket(totalwicket+1);
        undobowlerwicket.push(1);
        undowicket.push(1);
        countball.push('OUT');
        setiswk(true);
     }else{
        if(iswide == true){
            countball.push(3); //count ball
        }else{
            countball.push(2); //count ball
        }
     }

     if(isnoball == true && (isbyes == true || islegbyes ==true)){
        global.Partnershipruns=global.Partnershipruns+3;
        global.extraruns = global.extraruns + 3 ;
        settotalruns(totalruns+3);  // total runs
        setbowlerrun(bowlerrun+3);
        setrunf(runf+0);
        setballf(ballf+1);
        undorun.push(3);  //undo data
        undoball.push(0);
        undoprun.push(0);
        undopball.push(1);
        undopfour.push(0);
        undopsix.push(0);
        undobowlerball.push(0);
        undobowlerrun.push(3);
        undobowlerwicket.push(0);
            undowicket.push(0);
            playingrecored();

     }else{

     if(iswide == true){
        global.Partnershipruns=global.Partnershipruns+3;
        global.extraruns = global.extraruns +3 ;
        settotalruns(totalruns+3);  // total runs
        setbowlerrun(bowlerrun+3);
       // swapbatsman();
       undorun.push(3);  //undo data
        undoball.push(0);
        undoprun.push(0);
        undopball.push(0);
        undopfour.push(0);
        undopsix.push(0);
        undobowlerball.push(0);
        undobowlerrun.push(3);
        undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();
    }else{

        if(isnoball == true){
            global.Partnershipruns=global.Partnershipruns+3;
            global.extraruns = global.extraruns +3 ;
            settotalruns(totalruns+3);  // total runs
            setbowlerrun(bowlerrun+3);
            setrunf(runf+2);
            setballf(ballf+1);
            undorun.push(3);  //undo data
            undoball.push(0);
            undoprun.push(2);
            undopball.push(1);
            undopfour.push(0);
            undopsix.push(0);
            undobowlerball.push(0);
            undobowlerrun.push(3);
            undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();
            
            
        }else{
            if(isbyes==true){
                global.Partnershipruns=global.Partnershipruns+2;
                global.extraruns = global.extraruns +2 ;
                settotalruns(totalruns+2);  // total runs
                setbowlerrun(bowlerrun+2);
    
                settotalballs(totalballs+1); // total balls
                setbowlerball(bowlerball+1);
    
    
                undorun.push(2);  //undo data
                undoball.push(1);
            undoprun.push(0);
            undopball.push(1);
            undopfour.push(0);
            undopsix.push(0);
            undobowlerball.push(1);
            undobowlerrun.push(0);
            undobowlerwicket.push(0);
            undowicket.push(0);
    
                if(totalballs == 5){   
                    settotalover(totalover+1)   //total balls
                    settotalballs(0);
                  //  setbowlerover(bowlerover+1);
        
                  //  playingrecored();
                 // swapbatsman();
                }
    
                setrunf(runf+0);
                setballf(ballf+1);

                playingrecored();

            }else{
                global.Partnershipruns=global.Partnershipruns+2;

                settotalruns(totalruns+2);  // total runs
                setbowlerrun(bowlerrun+2);
    
                settotalballs(totalballs+1); // total balls
                setbowlerball(bowlerball+1);
    
    
                undorun.push(2);  //undo data
                undoball.push(1);
                undoprun.push(2);
                undopball.push(1);
                undopfour.push(0);
                undopsix.push(0);
                undobowlerball.push(1);
                undobowlerrun.push(2);
           
    
                if(totalballs == 5){   
                    settotalover(totalover+1)   //total balls
                    settotalballs(0);
                   // setbowlerover(bowlerover+1);
                    
                   // playingrecored();
                 //  swapbatsman();
                }
    
                setrunf(runf+2);
                setballf(ballf+1);

                playingrecored();

            }

            
    }   }
}
    }
    }
}
    extrarun();

};

const threerun=()=>{
    if(finalover == totalover){

        firstmatch();

      }else{

    if(bowlerball == 6){
        alert("Please change bowler");
    }else{

        if(iswk==true){
            alert("Please change batsman.");
        }else{

    if(iswicket==true){
        setbowlerwicket(bowlerwicket+1);
        settotalwicket(totalwicket+1);
        undobowlerwicket.push(1);
        undowicket.push(1);
        countball.push('OUT');
        setiswk(true);
     }else{
        if(iswide == true){
            countball.push(4); //count ball
        }else{
            countball.push(3); //count ball
        }
     }
 
     if(isnoball == true && (isbyes == true || islegbyes ==true)){
        global.Partnershipruns=global.Partnershipruns+4;
        global.extraruns = global.extraruns +4 ;
        settotalruns(totalruns+4);  // total runs
        setbowlerrun(bowlerrun+4);
        let temp1=runf+0; // run swap
    setrunf(runs);
    setruns(temp1);

    let temp2=ballf+1; // ball swap
    setballf(balls);
    setballs(temp2);

    let temp3=foursf; // four swap
    setfoursf(fourss);
    setfourss(temp3);

    let temp4=sixf; // four swap
    setsixf(sixs);
    setsixs(temp4);

    let temp5=firstbatsman; // batsman swap
    setfirstbatsman(secondbatsman);
    setsecondbatsman(temp5);
        undorun.push(4);  //undo data
        undoball.push(0);
        undoprun.push(0);
        undopball.push(1);
        undopfour.push(0);
        undopsix.push(0);
        undobowlerball.push(0);
        undobowlerrun.push(4);
        undobowlerwicket.push(0);
            undowicket.push(0);


            playingrecored();
     
    }else{

    

     if(iswide == true){
        global.Partnershipruns=global.Partnershipruns+4;
        global.extraruns = global.extraruns +4 ;
        settotalruns(totalruns+4);  // total runs
        setbowlerrun(bowlerrun+4);
        swapbatsman();
        undorun.push(4);  //undo data
        undoball.push(0);
        undoprun.push(0);
        undopball.push(0);
        undopfour.push(0);
        undopsix.push(0);
        undobowlerball.push(0);
        undobowlerrun.push(4);
        undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();
    }else{

        if(isnoball == true){
            global.Partnershipruns=global.Partnershipruns+4;
            global.extraruns = global.extraruns +4 ;
            settotalruns(totalruns+4);  // total runs
            setbowlerrun(bowlerrun+4);
            let temp1=runf+3; // run swap
        setrunf(runs);
        setruns(temp1);

        let temp2=ballf+1; // ball swap
        setballf(balls);
        setballs(temp2);
  
        let temp3=foursf; // four swap
        setfoursf(fourss);
        setfourss(temp3);

        let temp4=sixf; // four swap
        setsixf(sixs);
        setsixs(temp4);

        let temp5=firstbatsman; // batsman swap
        setfirstbatsman(secondbatsman);
        setsecondbatsman(temp5);
            undorun.push(4);  //undo data
            undoball.push(0);
            undoprun.push(3);
            undopball.push(1);
            undopfour.push(0);
            undopsix.push(0);
            undobowlerball.push(0);
            undobowlerrun.push(4);
            undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();
            
            
        }else{

            if(isbyes==true){
                global.Partnershipruns=global.Partnershipruns+3;
                global.extraruns = global.extraruns +3 ;
                settotalruns(totalruns+3);  // total runs
                setbowlerrun(bowlerrun+3);
        
                settotalballs(totalballs+1); // total balls
                setbowlerball(bowlerball+1);
        
                
                undorun.push(3);  //undo data
                undoball.push(1);
              undoprun.push(0);
              undopball.push(1);
               undopfour.push(0);
            undopsix.push(0);
            undobowlerball.push(1);
            undobowlerrun.push(0);
            undobowlerwicket.push(0);
            undowicket.push(0);
             
        
                if(totalballs == 5){   
                    settotalover(totalover+1)   //total balls
                    settotalballs(0);
                  //  setbowlerover(bowlerover+1);
                    
                   // playingrecored();
                 //  swapbatsman();
                }
        
                let temp1=runf+0; // run swap
                setrunf(runs);
                setruns(temp1);
        
                let temp2=ballf+1; // ball swap
                setballf(balls);
                setballs(temp2);
          
                let temp3=foursf; // four swap
                setfoursf(fourss);
                setfourss(temp3);
        
                let temp4=sixf; // four swap
                setsixf(sixs);
                setsixs(temp4);
        
                let temp5=firstbatsman; // batsman swap
                setfirstbatsman(secondbatsman);
                setsecondbatsman(temp5);

                playingrecored();

            }else{

                global.Partnershipruns=global.Partnershipruns+3;
                settotalruns(totalruns+3);  // total runs
                setbowlerrun(bowlerrun+3);
        
                settotalballs(totalballs+1); // total balls
                setbowlerball(bowlerball+1);
        
                
                undorun.push(3);  //undo data
                undoball.push(1);
              undoprun.push(3);
              undopball.push(1);
               undopfour.push(0);
            undopsix.push(0);
            undobowlerball.push(1);
            undobowlerrun.push(3);
           
             
        
                if(totalballs == 5){   
                    settotalover(totalover+1)   //total balls
                    settotalballs(0);
                   // setbowlerover(bowlerover+1);
        
                   // playingrecored();
                  // swapbatsman();
                }
        
                let temp1=runf+3; // run swap
                setrunf(runs);
                setruns(temp1);
        
                let temp2=ballf+1; // ball swap
                setballf(balls);
                setballs(temp2);
          
                let temp3=foursf; // four swap
                setfoursf(fourss);
                setfourss(temp3);
        
                let temp4=sixf; // four swap
                setsixf(sixs);
                setsixs(temp4);
        
                let temp5=firstbatsman; // batsman swap
                setfirstbatsman(secondbatsman);
                setsecondbatsman(temp5);

                playingrecored();

            }

        }
    }
  }
}
    }
}

    extrarun();
};


 const fourrun=()=>{
    if(finalover == totalover){

        firstmatch();

      }else{

    if(bowlerball == 6){
        alert("Please change bowler");
    }else{
        if(iswk==true){
            alert("Please change batsman.");
        }else{


    if(iswicket==true){
        setbowlerwicket(bowlerwicket+1);
        settotalwicket(totalwicket+1);
        undobowlerwicket.push(1);
        undowicket.push(1);
        countball.push('OUT');
        setiswk(true);
     }else{
        if(iswide == true){
            countball.push(5); //count ball
        }else{
            countball.push(4); //count ball
        }
     }

     if(isnoball == true && (isbyes == true || islegbyes ==true)){

        global.Partnershipruns=global.Partnershipruns+5;
        global.extraruns = global.extraruns +5 ;
        settotalruns(totalruns+5);  // total runs
        setbowlerrun(bowlerrun+5);
        setrunf(runf+0);
        setballf(ballf+1);
        setfoursf(foursf+0);
        undorun.push(5);  //undo data
        undoball.push(0);
        undoprun.push(0);
        undopball.push(1);
        undopfour.push(0);
        undopsix.push(0);
        undobowlerball.push(0);
        undobowlerrun.push(5);
        undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();
     }else{

     

     if(iswide == true){
        global.Partnershipruns=global.Partnershipruns+5;
        global.extraruns = global.extraruns +5 ;
        settotalruns(totalruns+5);  // total runs
        setbowlerrun(bowlerrun+5);
       // swapbatsman();
       undorun.push(5);  //undo data
        undoball.push(0);
        undoprun.push(0);
        undopball.push(0);
        undopfour.push(1);
        undopsix.push(0);
        undobowlerball.push(0);
        undobowlerrun.push(5);
        undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();
    }else{

        if(isnoball == true){

            global.Partnershipruns=global.Partnershipruns+5;
            global.extraruns = global.extraruns +5 ;
            settotalruns(totalruns+5);  // total runs
            setbowlerrun(bowlerrun+5);
            setrunf(runf+4);
            setballf(ballf+1);
            setfoursf(foursf+1);
            undorun.push(5);  //undo data
            undoball.push(0);
            undoprun.push(4);
            undopball.push(1);
            undopfour.push(0);
            undopsix.push(0);
            undobowlerball.push(0);
            undobowlerrun.push(5);
            undobowlerwicket.push(0);
            undowicket.push(0);
            
            playingrecored();
            
        }else{

            if(isbyes==true){

                global.Partnershipruns=global.Partnershipruns+4;
                global.extraruns = global.extraruns +4 ;
                settotalruns(totalruns+4);  // total runs
                setbowlerrun(bowlerrun+4);
            
                settotalballs(totalballs+1); // total balls
                setbowlerball(bowlerball+1);
            
              
            
               
                undorun.push(4);  //undo data
                undoball.push(1);
              undoprun.push(0);
              undopball.push(1);
               undopfour.push(0);
            undopsix.push(0);
            undobowlerball.push(1);
            undobowlerrun.push(0);
            undobowlerwicket.push(0);
            undowicket.push(0);
               
            
                if(totalballs == 5){   
                    settotalover(totalover+1)   //total balls
                    settotalballs(0);
                  //  setbowlerover(bowlerover+1);
            
                  //  playingrecored();
                 // swapbatsman();
                }
            
                setrunf(runf+0);
                setballf(ballf+1);
                setfoursf(foursf+0);

                playingrecored();
            }else{

                global.Partnershipruns=global.Partnershipruns+4;
                settotalruns(totalruns+4);  // total runs
                setbowlerrun(bowlerrun+4);
            
                settotalballs(totalballs+1); // total balls
                setbowlerball(bowlerball+1);
            
              
            
               
                undorun.push(4);  //undo data
                undoball.push(1);
              undoprun.push(4);
              undopball.push(1);
               undopfour.push(1);
            undopsix.push(0);
            undobowlerball.push(1);
            undobowlerrun.push(4);
           
               
            
                if(totalballs == 5){   
                    settotalover(totalover+1)   //total balls
                    settotalballs(0);
                   // setbowlerover(bowlerover+1);
                
                   // playingrecored();
                   //swapbatsman();
                }
            
                setrunf(runf+4);
                setballf(ballf+1);
                setfoursf(foursf+1);

                playingrecored();



            }
        }
    }
}
    }
}
      }

extrarun();
 };

 const fiverun=()=>{
    if(finalover == totalover){

        firstmatch();

      }else{

    if(bowlerball == 6){
        alert("Please change bowler");
    }else{
        if(iswk==true){
            alert("Please change batsman.");
        }else{


    if(iswicket==true){
        setbowlerwicket(bowlerwicket+1);
        settotalwicket(totalwicket+1);
        undobowlerwicket.push(1);
        undowicket.push(1);
        countball.push('OUT');
        setiswk(true);
     }else{
        if(iswide == true){
            countball.push(6); //count ball
        }else{
            countball.push(5); //count ball
        }
     }

     if(isnoball == true && (isbyes == true || islegbyes ==true)){

        global.Partnershipruns=global.Partnershipruns+6;
        global.extraruns = global.extraruns +6 ;
        settotalruns(totalruns+6);  // total runs
        setbowlerrun(bowlerrun+6);
        let temp1=runf+0; // run swap
        setrunf(runs);
        setruns(temp1);

        let temp2=ballf+1; // ball swap
        setballf(balls);
        setballs(temp2);

        let temp3=foursf; // four swap
        setfoursf(fourss);
        setfourss(temp3);

        let temp4=sixf; // four swap
        setsixf(sixs);
        setsixs(temp4);

        let temp5=firstbatsman; // batsman swap
        setfirstbatsman(secondbatsman);
        setsecondbatsman(temp5);

        undorun.push(6);  //undo data
        undoball.push(0);
        undoprun.push(0);
        undopball.push(1);
        undopfour.push(0);
        undopsix.push(0);
        undobowlerball.push(0);
        undobowlerrun.push(6);
        undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();

     }else{

     if(iswide == true){

        global.Partnershipruns=global.Partnershipruns+6;
        global.extraruns = global.extraruns +6 ;
        settotalruns(totalruns+6);  // total runs
        setbowlerrun(bowlerrun+6);
        swapbatsman();
        undorun.push(6);  //undo data
        undoball.push(0);
        undoprun.push(0);
        undopball.push(0);
        undopfour.push(0);
        undopsix.push(0);
        undobowlerball.push(0);
        undobowlerrun.push(6);
        undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();
    }else{
        if(isnoball == true){
            global.Partnershipruns=global.Partnershipruns+6;
            global.extraruns = global.extraruns +6 ;
            settotalruns(totalruns+6);  // total runs
            setbowlerrun(bowlerrun+6);
            let temp1=runf+5; // run swap
            setrunf(runs);
            setruns(temp1);

            let temp2=ballf+1; // ball swap
            setballf(balls);
            setballs(temp2);
    
            let temp3=foursf; // four swap
            setfoursf(fourss);
            setfourss(temp3);

            let temp4=sixf; // four swap
            setsixf(sixs);
            setsixs(temp4);

            let temp5=firstbatsman; // batsman swap
            setfirstbatsman(secondbatsman);
            setsecondbatsman(temp5);

            undorun.push(6);  //undo data
            undoball.push(0);
            undoprun.push(5);
            undopball.push(1);
            undopfour.push(0);
            undopsix.push(0);
            undobowlerball.push(0);
            undobowlerrun.push(6);
            undobowlerwicket.push(0);
            undowicket.push(0);
            

            playingrecored();
            
        }else{

            if(isbyes==true){

                global.Partnershipruns=global.Partnershipruns+5;
                global.extraruns = global.extraruns +5 ;
                settotalruns(totalruns+5);  // total runs
                setbowlerrun(bowlerrun+5);

                settotalballs(totalballs+1); // total balls
                setbowlerball(bowlerball+1);

            

                undorun.push(5);  //undo data
                undoball.push(1);
            undoprun.push(0);
            undopball.push(1);
            undopfour.push(0);
            undopsix.push(0);
            undobowlerball.push(1);
            undobowlerrun.push(0);
            undobowlerwicket.push(0);
            undowicket.push(0);
            
            

                if(totalballs == 5){   
                    settotalover(totalover+1)   //total balls
                    settotalballs(0);
                   // setbowlerover(bowlerover+1);
                
                  //  playingrecored();
                //  swapbatsman();
                }

                let temp1=runf+0; // run swap
                    setrunf(runs);
                    setruns(temp1);

                    let temp2=ballf+1; // ball swap
                    setballf(balls);
                    setballs(temp2);
            
                    let temp3=foursf; // four swap
                    setfoursf(fourss);
                    setfourss(temp3);

                    let temp4=sixf; // four swap
                    setsixf(sixs);
                    setsixs(temp4);

                    let temp5=firstbatsman; // batsman swap
                    setfirstbatsman(secondbatsman);
                    setsecondbatsman(temp5);

                    playingrecored();

            }else{

                global.Partnershipruns=global.Partnershipruns+5;
                settotalruns(totalruns+5);  // total runs
                setbowlerrun(bowlerrun+5);

                settotalballs(totalballs+1); // total balls
                setbowlerball(bowlerball+1);

            

                undorun.push(5);  //undo data
                undoball.push(1);
            undoprun.push(5);
            undopball.push(1);
            undopfour.push(0);
            undopsix.push(0);
            undobowlerball.push(1);
            undobowlerrun.push(5);
            
            
            

                if(totalballs == 5){   
                    settotalover(totalover+1)   //total balls
                    settotalballs(0);
                   // setbowlerover(bowlerover+1);
                    
                  //  playingrecored();
                 // swapbatsman();
                }

                let temp1=runf+5; // run swap
                    setrunf(runs);
                    setruns(temp1);

                    let temp2=ballf+1; // ball swap
                    setballf(balls);
                    setballs(temp2);
            
                    let temp3=foursf; // four swap
                    setfoursf(fourss);
                    setfourss(temp3);

                    let temp4=sixf; // four swap
                    setsixf(sixs);
                    setsixs(temp4);

                    let temp5=firstbatsman; // batsman swap
                    setfirstbatsman(secondbatsman);
                    setsecondbatsman(temp5);

                    playingrecored();

            }
        }
    }              
   }
}
}
      }

extrarun();
};

const sixrun=()=>{
    if(finalover == totalover){

        firstmatch();

      }else{

    if(bowlerball == 6){
        alert("Please change bowler");
    }else{
        if(iswk==true){
            alert("Please change batsman.");
        }else{


    if(iswicket==true){
        setbowlerwicket(bowlerwicket+1);
        settotalwicket(totalwicket+1);
        undobowlerwicket.push(1);
        undowicket.push(1);
        countball.push('OUT');
        setiswk(true);
     }else{
        if(iswide == true){
            countball.push(7); //count ball
        }else{
            countball.push(6); //count ball
        }
     }

     if(isnoball == true && (isbyes == true || islegbyes ==true)){
        global.Partnershipruns=global.Partnershipruns+7;
        global.extraruns = global.extraruns +7 ;
        settotalruns(totalruns+7);  // total runs
        setbowlerrun(bowlerrun+7);
        setrunf(runf+0);
         setballf(ballf+1);
         setsixf(sixf+0);
         undorun.push(7);  //undo data
         undoball.push(0);
         undoprun.push(0);
         undopball.push(1);
         undopfour.push(0);
         undopsix.push(0);
         undobowlerball.push(0);
         undobowlerrun.push(7);
         undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();
     }else{

     if(iswide == true){
        global.Partnershipruns=global.Partnershipruns+7;
        global.extraruns = global.extraruns +7 ;
        settotalruns(totalruns+7);  // total runs
        setbowlerrun(bowlerrun+7);
      //  swapbatsman();
        undorun.push(7);  //undo data
        undoball.push(0);
        undoprun.push(0);
        undopball.push(0);
        undopfour.push(0);
        undopsix.push(0);
        undobowlerball.push(0);
        undobowlerrun.push(7);
        undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();
    }else{

        if(isnoball == true){

            global.Partnershipruns=global.Partnershipruns+7;
            global.extraruns = global.extraruns +7 ;
            settotalruns(totalruns+7);  // total runs
            setbowlerrun(bowlerrun+7);
           setrunf(runf+6);
            setballf(ballf+1);
            setsixf(sixf+1);
            undorun.push(7);  //undo data
            undoball.push(0);
            undoprun.push(6);
            undopball.push(1);
            undopfour.push(0);
            undopsix.push(1);
            undobowlerball.push(0);
            undobowlerrun.push(7);
            undobowlerwicket.push(0);
            undowicket.push(0);

            playingrecored();
            
            
        }else{

            if(isbyes==true || islegbyes==true){

                global.Partnershipruns=global.Partnershipruns+6;
                global.extraruns = global.extraruns +6 ;
                settotalruns(totalruns+6);  // total runs
                setbowlerrun(bowlerrun+6);
    
                settotalballs(totalballs+1); // total balls
                setbowlerball(bowlerball+1);
    
    
    
                undorun.push(6);  //undo data
                undoball.push(1);
            undoprun.push(0);
            undopball.push(1);
            undopfour.push(0);
            undopsix.push(0);
            undobowlerball.push(1);
            undobowlerrun.push(0);
            undobowlerwicket.push(0);
            undowicket.push(0);
            
    
                if(totalballs == 5){   
                    settotalover(totalover+1);   //total balls
                    settotalballs(0);
                   // setbowlerover(bowlerover+1);
                  //  setbowlerball(0);
                  //  playingrecored();
                 // swapbatsman();
                }
    
                setrunf(runf+0);
                setballf(ballf+1);
                setsixf(sixf+0);

                playingrecored();

            }else{

                global.Partnershipruns=global.Partnershipruns+6;
                settotalruns(totalruns+6);  // total runs
                setbowlerrun(bowlerrun+6);
    
                settotalballs(totalballs+1); // total balls
                setbowlerball(bowlerball+1);
    
    
    
                undorun.push(6);  //undo data
                undoball.push(1);
            undoprun.push(6);
            undopball.push(1);
            undopfour.push(0);
            undopsix.push(1);
            undobowlerball.push(1);
            undobowlerrun.push(6);
            
            
    
                if(totalballs == 5){   
                    settotalover(totalover+1);   //total balls
                    settotalballs(0);
                   // setbowlerover(bowlerover+1);
                   // setbowlerball(0);
                  //  playingrecored();
                //  swapbatsman();
                }
    
                setrunf(runf+6);
                setballf(ballf+1);
                setsixf(sixf+1);

                playingrecored();

            }

           
       }
    
    }
} 
        }

  }
}

  extrarun();
};

const anyrun=()=>{

};


const undobutton=()=>{
    Alert.alert(
        "Undo",
        "Are you sure?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),          
          },
          { text: "OK", onPress: () =>{
            playingrecored();  
            undodata() }}
        ]
      );
}


const undodata=()=>{

    if( undorun.length!=0 && undoball.length!=0 && totalballs!=0){

               if(undowicket.length!=0){
                   settotalwicket(totalwicket - undowicket[undowicket.length-1]);
                   undowicket.pop();
               }
               if(undobowlerwicket.length!=0){
                   setbowlerwicket(bowlerwicket -undobowlerwicket[undobowlerwicket.length-1]);
                   undobowlerwicket.pop();
               }

               if(undobowlerrun.length!=0){
                   setbowlerrun(bowlerrun-undobowlerrun[undobowlerrun.length -1]);
                   undobowlerrun.pop();
               }

               if(undobowlerball.length!=0){
                   setbowlerball(bowlerball-undobowlerball[undobowlerball.length-1]);
                   undobowlerball.pop();
               }
    
  
                settotalruns(totalruns-undorun[undorun.length-1]) //total run undo
                undorun.pop();
                settotalwicket

                settotalballs(totalballs-undoball[undoball.length-1]); // total ball undo
                undoball.pop();

                countball.pop();

                if(undoprun[undoprun.length-1]==1){
                    let temp1=runs - undoprun[undoprun.length-1]; // run swap
                    setruns(runf);
                    setrunf(temp1);
                    
                    undoprun.pop();

                    let temp2=balls - undopball[undopball.length-1]; // run swap
                    setballs(ballf);
                    setballf(temp2);
                    undopball.pop();

                    let temp3=fourss - undopfour[undopfour.length-1]; // run swap
                    setfourss(foursf);
                    setfoursf(temp3);
                    undopfour.pop();

                    let temp4=sixs - undopsix[undopsix.length-1]; // run swap
                    setsixs(sixf);
                    setsixf(temp4);
                    undopsix.pop();

                    let temp5=firstbatsman; // batsman swap
                    setfirstbatsman(secondbatsman);
                    setsecondbatsman(temp5);
                }else if(undoprun[undoprun.length-1]==2){
                    setrunf(runf-undoprun[undoprun.length-1]);
                    undoprun.pop();
                    setballf(ballf-undopball[undopball.length-1]);
                    undopball.pop();
                    
                }else if(undoprun[undoprun.length-1]==3){

                    let temp1=runs - undoprun[undoprun.length-1]; // run swap
                    setruns(runf);
                    setrunf(temp1);
                    
                    undoprun.pop();

                    let temp2=balls - undopball[undopball.length-1]; // run swap
                    setballs(ballf);
                    setballf(temp2);
                    undopball.pop();

                    let temp3=fourss - undopfour[undopfour.length-1]; // run swap
                    setfourss(foursf);
                    setfoursf(temp3);
                    undopfour.pop();

                    let temp4=sixs - undopsix[undopsix.length-1]; // run swap
                    setsixs(sixf);
                    setsixf(temp4);
                    undopsix.pop();

                    let temp5=firstbatsman; // batsman swap
                    setfirstbatsman(secondbatsman);
                    setsecondbatsman(temp5);
                    

                }else if(undoprun[undoprun.length-1]==4){
                    setrunf(runf-undoprun[undoprun.length-1]);
                    undoprun.pop();
                    setballf(ballf-undopball[undopball.length-1]);
                    undopball.pop();
                    setfoursf(foursf-undopfour[undopfour.length-1]);
                    undopfour.pop();

                }else if(undoprun[undoprun.length-1]==5 || undoprun[undoprun.length-1]==7){
                    let temp1=runs - undoprun[undoprun.length-1]; // run swap
                    setruns(runf);
                    setrunf(temp1);
                    
                    undoprun.pop();

                    let temp2=balls - undopball[undopball.length-1]; // run swap
                    setballs(ballf);
                    setballf(temp2);
                    undopball.pop();

                    let temp3=fourss - undopfour[undopfour.length-1]; // run swap
                    setfourss(foursf);
                    setfoursf(temp3);
                    undopfour.pop();

                    let temp4=sixs - undopsix[undopsix.length-1]; // run swap
                    setsixs(sixf);
                    setsixf(temp4);
                    undopsix.pop();

                    let temp5=firstbatsman; // batsman swap
                    setfirstbatsman(secondbatsman);
                    setsecondbatsman(temp5);
                }else if(undoprun[undoprun.length-1]==6){
                    setrunf(runf-undoprun[undoprun.length-1]);
                    undoprun.pop();
                    setballf(ballf-undopball[undopball.length-1]);
                    undopball.pop();
                    setsixf(sixf-undopsix[undopsix.length-1]);
                    undopsix.pop();
                }else{
                    setballf(ballf-undopball[undopball.length-1]);  // for zero
                    undopball.pop();
                
                }

    }else{
        alert("Can't use undo.")
    }
};

const swapbatsman=()=>{
    
    let temp1=runf; // run swap
    setrunf(runs);
    setruns(temp1);

    let temp2=ballf; // ball swap
    setballf(balls);
    setballs(temp2);

    let temp3=foursf; // four swap
    setfoursf(fourss);
    setfourss(temp3);

    let temp4=sixf; // four swap
    setsixf(sixs);
    setsixs(temp4);

    let temp5=firstbatsman; // batsman swap
    setfirstbatsman(secondbatsman);
    setsecondbatsman(temp5);
};

 

 return (
  
    <View style={{flex: 1,}}>
       <View style={{backgroundColor:'#1a1aff',height:60,alignItems:'center',flexDirection:'row'}}>
             <Icon
                name='arrow-left'
                size={15}
                color='red'
                style={{fontSize:20,color:'#fff',fontWeight:'200',marginLeft:15,position:'relative',bottom:-5}}
                onPress={()=>{
                    navigation.replace('NewMatch');
                   
            
            }}
              />
          <Text style={{fontSize:20,color:'#fff',fontWeight:'200',marginLeft:15,position:'relative',bottom:-5}}>{team1} / {team2}</Text>

       </View>
       <ScrollView>
       <View style={{backgroundColor:'#F0F0F0',flex:1}}>
         
          <View style={{...styles.card}}>
             <Text style={{backgroundColor:'#1a1aff',color:'#fff',padding:3,fontWeight:'700',fontSize:18,textAlign:'center',width:'30%',borderRadius:10}}>{teamname}</Text>
             <View style={{flexDirection:'row'}}>
                 <Text style={{fontSize:25,color:'black'}}>{totalruns} - {totalwicket}</Text>
                 <Text style={{fontSize:17,position:'relative',bottom:-8}}>  ({totalover}.{totalballs})</Text>
             </View>
           {global.ischeckinning ?<Text style={{color:'#1a1aff'}}>{teamname} need {global.totalscore-totalruns} in {(finalover * 6)-(totalballs + (totalover*6))}</Text>:null}
           {global.ischeckinning ?  <Text style={{fontSize:18,position:'absolute',top:5,right:5}}>Need: {global.totalscore}</Text>:null}
          </View>

          <View style={{...styles.card}}>
              <View style={{flexDirection:'row',marginBottom:5,justifyContent:'space-between'}}>
                 <Text style={{width:65,}}>Batsman</Text>
                 <Text>R</Text>
                 <Text>B</Text>
                 <Text>4s</Text>
                 <Text>6s</Text>
              </View>
             <Divider></Divider>
             <View style={{flexDirection:'row',marginVertical:5,justifyContent:'space-between'}}>
                <Text style={{width:60,flexWrap:'nowrap',color:'#1a1aff'}}>{firstbatsman}*</Text>
                <Text>{runf}</Text>
                <Text>{ballf}</Text>
                <Text>{foursf}</Text>
                <Text>{sixf}</Text>
             </View>

             <View style={{flexDirection:'row',marginVertical:5,justifyContent:'space-between'}}>
                <Text style={{width:60,flexWrap:'nowrap',color:'#1a1aff'}}>{secondbatsman}</Text>
                <Text>{runs}</Text>
                <Text>{balls}</Text>
                <Text>{fourss}</Text>
                <Text>{sixs}</Text>
             </View>

             <View style={{flexDirection:'row',marginBottom:5,justifyContent:'space-between'}}>
                 <Text style={{width:65,}}>Bowler</Text>
                 <Text>O</Text>
                 <Text>M</Text>
                 <Text>R</Text>
                 <Text>W</Text>
              </View>
             <Divider></Divider>

             <View style={{flexDirection:'row',marginVertical:5,justifyContent:'space-between'}}>
                <Text style={{width:60,flexWrap:'nowrap',color:'#1a1aff'}}>{ bowler==''?global.bowlername:bowler}</Text>
                <Text>{bowlerover}.{bowlerball}</Text>
                <Text>0</Text>
                <Text>{bowlerrun}</Text>
                <Text>{bowlerwicket}</Text>
             </View>
          </View>
            

          <View style={{...styles.card,flexDirection:'row',height:43}}>
             <Text style={{marginBottom:5,textAlignVertical:'center'}}>This over:  </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection:'row',marginBottom:5,alignItems:'center',justifyContent:'center'}}>
                    {countball.map((item,index)=>{
                        return(
                            <View key={index} style={{ borderWidth:1,borderColor:'#989898', borderRadius:100,backgroundColor:"#1a1aff",margin:5,height:28,width:28,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{textAlign:'center',fontSize:10,color:"#fff"}} >{item}</Text>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
          </View>



          <View style={{...styles.card,}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Checkbox
                            status={iswide ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setiswide(!iswide);
                                setisnoball(false);
                                setislegbyes(false);
                                setisbyes(false);
                                setiswicket(false);
                            }}
                            color="#1a1aff"
                            />
                            <Text>Wide</Text>
                     </View>

                     <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Checkbox
                            status={isnoball ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setisnoball(!isnoball);
                                setiswide(false);
                                setiswicket(false);
                            }}
                            color="#1a1aff"
                            />
                            <Text>No Ball</Text>
                     </View>

                     <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Checkbox
                            status={isbyes ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setisbyes(!isbyes);
                                setislegbyes(false);
                                setiswide(false);
                                setiswicket(false);
                            }}
                            color="#1a1aff"
                            />
                            <Text>Byes</Text>
                     </View>

                     <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Checkbox
                            status={islegbyes ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setislegbyes(!islegbyes);
                                setisbyes(false);
                                setiswide(false);
                                setiswicket(false);
                            }}
                            color="#1a1aff"
                            />
                            <Text>Leg Byes</Text>
                     </View>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Checkbox
                                    status={iswicket ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setiswicket(!iswicket);
                                        setiswide(false);
                                        setisnoball(false);
                                setislegbyes(false);
                                setisbyes(false);
                                    }}
                                    color="#1a1aff"
                                    />
                                    <Text>Wicket</Text>
                            </View>

                            <TouchableOpacity disabled={disablevalue} style={{alignItems:'center',alignSelf:'flex-end',marginVertical:8,borderRadius:10, padding:8,backgroundColor:'#1a1aff',width:120}} onPress={()=>{changeplayer()}}>
                                <Text style={{color:'#fff',fontSize:15,}}>Change player</Text>
                                
                             </TouchableOpacity>

                            <TouchableOpacity style={{alignItems:'center',alignSelf:'flex-end',marginVertical:8,borderRadius:10, padding:8,backgroundColor:'#1a1aff',width:120}} onPress={()=>{swapbatsman()}}>
                                <Text style={{color:'#fff',fontSize:15,}}>Swap Batsman</Text>
                                
                             </TouchableOpacity>
                </View>
          </View>




        <View style={{flexDirection:'row'}}>
            <View style={{...styles.card}}>
                    <TouchableOpacity disabled={disablevalue} style={{alignItems:'center',alignSelf:'flex-end',marginVertical:2,borderRadius:10, padding:8,backgroundColor:'#1a1aff',width:100}} onPress={()=>{undobutton()}}>
                            <Text style={{color:'#fff',fontSize:15,}}>Undo</Text>
                                            
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignItems:'center',alignSelf:'flex-end',marginVertical:2,borderRadius:10, padding:8,backgroundColor:'#1a1aff',width:100}} onPress={()=>{
                        setVisible(!visible); 
                        setPartnership(true); 
                        setExtras(false); 
                        global.Partnership = runf+runs;
                        
                        }}>
                            <Text style={{color:'#fff',fontSize:15,}}>Partnership</Text>
                                            
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignItems:'center',alignSelf:'flex-end',marginVertical:5,borderRadius:10, padding:8,backgroundColor:'#1a1aff',width:100}} onPress={()=>{setVisible(!visible); setExtras(true); setPartnership(false);}}>
                            <Text style={{color:'#fff',fontSize:15,}}>Extras</Text>
                                    
                    </TouchableOpacity>

            </View>

            <View style={{...styles.card1,alignItems:'center',justifyContent:'space-evenly'}}>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity disabled={disablevalue} style={{...styles.runs}} onPress={()=>{zerorun() }}>
                            <Text style={{color:'black'}}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={disablevalue} style={{...styles.runs}} onPress={()=>{onerun() }}>
                            <Text style={{color:'black'}}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={disablevalue} style={{...styles.runs}} onPress={()=>{tworun() }}>
                            <Text style={{color:'black'}}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={disablevalue} style={{...styles.runs}} onPress={()=>{threerun() }}>
                            <Text style={{color:'black'}}>3</Text>
                    </TouchableOpacity>
               </View>

               <View style={{flexDirection:'row'}}>
                    <TouchableOpacity disabled={disablevalue} style={{...styles.runs}} onPress={()=>{fourrun()}}>
                            <Text style={{color:'black'}}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={disablevalue} style={{...styles.runs}} onPress={()=>{fiverun()}}>
                            <Text style={{color:'black'}}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={disablevalue} style={{...styles.runs}} onPress={()=>{sixrun()}}>
                            <Text style={{color:'black'}}>6</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={disablevalue} style={{...styles.runs}} onPress={()=>{Paneltyruns()}}>
                            <Text style={{color:'black'}}>...</Text>
                    </TouchableOpacity>
                   
               </View>
            </View>
            
       </View>   
    
       </View>
       </ScrollView>

        

       <BottomSheet
          visible={visible}
          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView}
          //Toggling the visibility state
          onBackdropPress={toggleBottomNavigationView}
          //Toggling the visibility state
        >
          {/*Bottom Sheet inner View*/}
          <View style={styles.bottomNavigationView}>
            { isExtras ? <View style={{flexDirection:'row'}}>
                 <Text style={{fontWeight:'700'}}>Extra Runs: </Text>
                 <Text style={{fontWeight:'700'}}>{ global.extraruns}</Text>
             </View>:null}

          { isPartnership ? <View style={{flexDirection:'row'}}>
                 <Text style={{fontWeight:'700'}}>Partnership: </Text>
                 <Text style={{fontWeight:'700'}}>{global.Partnership}</Text>
             </View>:null}
          </View>
        </BottomSheet>

       
    </View>
  
  );
};

export default scoreboard;

let styles=StyleSheet.create({
 card:{
  backgroundColor:'#fff',
  borderRadius:10,
  elevation:5,
  paddingHorizontal:10,
  paddingTop:10,
  margin:5,
  flexWrap:'nowrap',
 
 }, bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    padding:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },

 card1:{
    backgroundColor:'#fff',
    borderRadius:10,
    elevation:5,

    margin:5,
    flexWrap:'nowrap',
   
   },

 lbl:{
 
 marginLeft:10,
 fontSize:15,
 color:'#1a1aff'

 },
 runs:{
    borderWidth:2,
    borderColor:'#1a1aff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:100,
    height:45,
    width:45,
    margin:5,
    padding:10
 }
})
