import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from 'react-native';

import GlobalStyles from '../Utlis/GlobalStyles';
import {
  TextinputModal,
  TextinputModal2,
  TextinputModal3,
} from '../Utlis/TextinputModal';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import CustomButton from '../Utlis/CustomButton';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';
import {NativeModules} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const {RNTwitterSignIn} = NativeModules;

const HideKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Signin = ({navigation}) => {
  const [Email, setEmail] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [user, setUser] = React.useState(null);

  const SigninB = () => {
    if (Email.trim().length > 5 && Password.trim().length > 7) {
      auth()
        .signInWithEmailAndPassword(Email, Password)
        .then(() => {
          console.log(`Sign in Successfull`);
          setEmail();
          setPassword();
        })
        .catch(e => {
          if (e.code === 'auth/wrong-password') {
            Alert.alert(`Please Enter a Valid Password`);
          }
          if (e.code === 'auth/user-not-found') {
            Alert.alert(`No User Found with this Email`);
          }
          if (e.code === 'auth/invalid-email') {
            Alert.alert('The email address is badly formatted');
          }
          console.log(e);
        });
    } else {
      Alert.alert(`Please enter your email and password`);
    }
  };

  //console.log(`fullname:`, user);

  // const nameSplit = () => {
  //   if (user) {
  //     var nameArr = user.displayName.split(' ');
  //     console.log(nameArr);
  //   }
  // };

  const SignOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        setEmail('');
        setPassword('');
        setUser(null);
      });
  };

  const onTwitterButtonPress = async () => {
    const {authToken, authTokenSecret} = await RNTwitterSignIn.logIn();

    // Create a Twitter credential with the tokens
    const twitterCredential = auth.TwitterAuthProvider.credential(
      authToken,
      authTokenSecret,
    );

    // Sign-in the user with the credential
    await auth()
      .signInWithCredential(twitterCredential)
      .then(() => {
        //Once the user creation has happened successfully, we can add the currentUser into firestore
        //with the appropriate details.
        console.log('current User', auth().currentUser);
        firestore()
          .collection('users')
          .doc(auth().currentUser.email)
          .set({
            fname: auth().currentUser.displayName.split(' ')[0],
            lname: auth().currentUser.displayName.split(' ')[1],
            email: auth().currentUser.email,
            createdAt: firestore.Timestamp.fromDate(new Date()),
            userImg: auth().currentUser.photoURL,
          })
          //ensure we catch any errors at this stage to advise us if something does go wrong
          .catch(error => {
            console.log(
              'Something went wrong with added user to firestore: ',
              error,
            );
          });
      });
  };

  const onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    // Sign-in the user with the credential
    await auth()
      .signInWithCredential(facebookCredential)
      .then(() => {
        //Once the user creation has happened successfully, we can add the currentUser into firestore
        //with the appropriate details.
        console.log('current User', auth().currentUser);
        firestore()
          .collection('users')
          .doc(auth().currentUser.email)
          .set({
            fname: auth().currentUser.displayName.split(' ')[0],
            lname: auth().currentUser.displayName.split(' ')[1],
            email: auth().currentUser.email,
            createdAt: firestore.Timestamp.fromDate(new Date()),
            userImg: auth().currentUser.photoURL,
          })
          //ensure we catch any errors at this stage to advise us if something does go wrong
          .catch(error => {
            console.log(
              'Something went wrong with added user to firestore: ',
              error,
            );
          });
      });
    // Once signed in, get the users AccesToken
    // const data = await AccessToken.getCurrentAccessToken();
    // if (!data) {
    //   throw 'Something went wrong obtaining access token';
    // }
    // // Create a Firebase credential with the AccessToken
    // const facebookCredential = auth.FacebookAuthProvider.credential(
    //   data.accessToken,
    // );
    // // Sign-in the user with the credential
    // await auth().signInWithCredential(facebookCredential);

    // LoginManager.logInWithPermissions(['public_profile']).then(
    //   function (result) {
    //     if (result.isCancelled) {
    //       console.log('Login cancelled');
    //     } else {
    //       console.log(
    //         'Login success with permissions: ' +
    //           result.grantedPermissions.toString(),
    //       );
    //     }
    //   },
    //   function (error) {
    //     console.log('Login fail with error: ' + error);
    //   },
    // );

    // LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    //   function (result) {
    //     if (result.isCancelled) {
    //       alert('Login Cancelled ' + JSON.stringify(result));
    //     } else {
    //       alert(
    //         'Login success with  permisssions: ' +
    //           result.grantedPermissions.toString(),
    //       );
    //       alert('Login Success ' + result.toString());
    //     }
    //   },
    //   function (error) {
    //     alert('Login failed with error: ' + error);
    //   },
    // );
  };

  React.useEffect(() => {
    const onAuthStateChanged = u => {
      setUser(u);
    };

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    // const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // // Sign-in the user with the credential
    // return await auth().signInWithCredential(googleCredential);

    try {
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      await auth()
        .signInWithCredential(googleCredential)
        // Use it only when user Sign's up,
        // so create different social signup function
        .then(() => {
          //Once the user creation has happened successfully, we can add the currentUser into firestore
          //with the appropriate details.
          console.log('current User', auth().currentUser);
          firestore()
            .collection('users')
            .doc(auth().currentUser.email)
            .set({
              fname: auth().currentUser.displayName.split(' ')[0],
              lname: auth().currentUser.displayName.split(' ')[1],
              email: auth().currentUser.email,
              createdAt: firestore.Timestamp.fromDate(new Date()),
              userImg: auth().currentUser.photoURL,
            })
            //ensure we catch any errors at this stage to advise us if something does go wrong
            .catch(error => {
              console.log(
                'Something went wrong with added user to firestore: ',
                error,
              );
            });
        })
        //we need to catch the whole sign up process if it fails too.
        .catch(error => {
          console.log('Something went wrong with sign up: ', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(`Email:`, Email);
  console.log(`Password:`, Password);
  return (
    <HideKeyboard>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={{
            uri: 'https://thumbs.dreamstime.com/b/white-texture-background-brush-strokes-white-canvas-painting-close-up-rough-textured-white-texture-background-subtle-155483842.jpg',
          }}
          style={GlobalStyles.BGimage}
        />
        {user ? (
          <View>
            <Text
              style={[
                styles.welcomeText,
                {},
              ]}>{`Welcome ${user.displayName}`}</Text>
            <Text
              style={styles.welcomeText}>{`Your email is ${user.email}`}</Text>
          </View>
        ) : (
          <Text>Please Login</Text>
        )}
        <TextinputModal
          iconName="user"
          placeholder="Email.."
          value={Email}
          onChangeText={text => setEmail(text)}
          editable={user ? false : true}
        />
        <TextinputModal
          iconName="lock"
          placeholder="Password.."
          value={Password}
          onChangeText={text => setPassword(text)}
          editable={user ? false : true}
          secureTextEntry={true}
        />
        {!user ? (
          <CustomButton
            text="Sign In"
            onPress={SigninB}
            style={{backgroundColor: '#4d7fff', marginBottom: 10}}
            textStyle={{color: '#fff'}}
          />
        ) : (
          <CustomButton
            text="Log Out"
            onPress={SignOut}
            style={{backgroundColor: '#4d7fff', marginBottom: 10}}
            textStyle={{color: '#fff'}}
          />
        )}
        {!user ? (
          <CustomButton
            text="Sign In With Facebook"
            name="sc-facebook"
            style={{backgroundColor: '#3b5997', marginBottom: 10}}
            textStyle={{color: '#fff'}}
            color={'#fff'}
            onPress={onFacebookButtonPress}
          />
        ) : null}
        {!user ? (
          <CustomButton
            text="Sign In With Google"
            name="sc-google-plus"
            style={{backgroundColor: '#ffd5c7', marginBottom: 10}}
            textStyle={{color: '#ff571f'}}
            color={'#ff571f'}
            onPress={onGoogleButtonPress}
          />
        ) : null}
        {!user ? (
          <CustomButton
            text="Sign In With Twitter"
            name="sc-twitter"
            style={{backgroundColor: '#00ACED', marginBottom: 10}}
            textStyle={{color: '#fff'}}
            color={'#fff'}
            onPress={onTwitterButtonPress}
          />
        ) : null}
        {/* <TextinputModal2 name="lock" name2="lock" />
        <TextinputModal3 iconName="lock" /> */}

        {/* {user ? (
          <CustomButton
            text="Log Out"
            onPress={SignOut}
            style={{backgroundColor: '#4d7fff', marginBottom: 10}}
            textStyle={{color: '#fff'}}
          />
        ) : null} */}
        {!user ? (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.text}>Dont Have an Account?Sign Up</Text>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    </HideKeyboard>
  );
};

export default Signin;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0048ff',
  },
  welcomeText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
