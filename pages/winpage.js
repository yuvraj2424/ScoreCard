// Navigate Between Screens using React Navigation in React Native //
// https://aboutreact.com/react-native-stack-navigation //
// import React in our code
import React, {useEffect, useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
//Import Library to make a cannon
import ConfettiCannon from 'react-native-confetti-cannon';
import Icon from 'react-native-vector-icons/FontAwesome';

const winpage = ({route, navigation}) => {
    
    const [shoot, setShoot] = useState(false);

    useEffect(() => {
      //Time out to fire the cannon
      setTimeout(() => {
        setShoot(true);
      }, 2000);
    }, []);
  
    const handlePress = () => {
      //To fire the cannon again
     navigation.replace("NewMatch");
    };
  
    return (
      <SafeAreaView style={styles.container}>
          
        <View style={styles.container}>
          {/*Card to show the Gift*/}
         
          <View style={styles.cardStyle}>
            <Text style={styles.headingStyle}>
              Congrates !!
            </Text>
            <View style={styles.simpleLineStyle} />
            
            <Image
              style={styles.logoStyle}
              source={require('./images/tropy.png')}
            />
           <Text style={styles.paragraph}>
            {global.teamname}  win the match
            </Text>

            <View
            style={{
              marginTop: 20,
              backgroundColor: '#1a1aff',
              width: '100%',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                padding: 10,
                textAlign: 'center',
              }}
              onPress={handlePress} >
              Start New Match
            </Text>
          </View>
            
          </View>
          {/*Cannon which will fire whenever shoot is true*/}
          {shoot ? 
            <ConfettiCannon
              count={400}
              origin={{x: -10, y: 0}} 
            /> 
            : null
          }
        </View>
      </SafeAreaView>
    );
};

export default winpage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 10,
      backgroundColor: '#ecf0f1',
      padding: 12,
    },
    cardStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      backgroundColor: 'white',
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