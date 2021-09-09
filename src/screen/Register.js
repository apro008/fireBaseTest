import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import GlobalStyles from '../Utlis/GlobalStyles';
import {TextinputModal} from '../Utlis/TextinputModal';
import auth from '@react-native-firebase/auth';
import CustomButton from '../Utlis/CustomButton';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const HideKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Register = ({navigation}) => {
  const [keyboardShow, setKeyboardShow] = React.useState(false);
  const [Email, setEmail] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [user, setUser] = React.useState();
  const [initializing, setInitializing] = React.useState(true);

  // console.log('Email:', Email);
  // console.log('Password:', Password);

  const onFacebookButtonPress = async () => {
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

    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return await auth().signInWithCredential(googleCredential);
  };

  const onAuthStateChanged = u => {
    setUser(u);
    if (initializing) setInitializing(false);
  };

  const createUser = () => {
    if (Email.trim().length > 5 && Password.trim().length > 5) {
      auth()
        .createUserWithEmailAndPassword(Email, Password)
        .then(() => {
          console.log('User is created');
          Alert.alert('User is created, Navigate to Signin page.');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Email is already in use');
            console.log('Email is already in use');
          }
          if (error.code === 'auth/invalid-email') {
            console.log('Invalid email, Please enter a valid email');
            Alert.alert('Invalid email, Please enter a valid email');
          }
          console.log(error);
        });
    } else {
      Alert.alert('Please enter a valid Email and Password');
    }
  };

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <HideKeyboard>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1603484477859-abe6a73f9366?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGFwZXIlMjB0ZXh0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
          }}
          resizeMethod="resize"
          style={GlobalStyles.BGimage}
        />
        <TextinputModal
          iconName="mail"
          placeholder="Email..."
          value={Email}
          onChangeText={text => setEmail(text)}
        />
        <TextinputModal
          iconName="lock"
          placeholder="Password..."
          value={Password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <CustomButton
          text="Sign Up"
          onPress={createUser}
          style={{backgroundColor: '#4d7fff', marginBottom: 10}}
          textStyle={{color: '#fff'}}
        />
        <CustomButton
          text="Sign Up With Facebook"
          name="sc-facebook"
          style={{backgroundColor: '#3b5997', marginBottom: 10}}
          textStyle={{color: '#fff'}}
          color={'#fff'}
          onPress={onFacebookButtonPress}
        />
        <CustomButton
          text="Sign Up With Google"
          name="sc-google-plus"
          style={{backgroundColor: '#ffd5c7', marginBottom: 10}}
          textStyle={{color: '#ff571f'}}
          color={'#ff571f'}
          onPress={onGoogleButtonPress}
        />
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.text}>Have an Account?Sign In</Text>
        </TouchableWithoutFeedback>
      </View>
    </HideKeyboard>
  );
};

export default Register;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0048ff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
