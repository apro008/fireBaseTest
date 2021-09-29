import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import GlobalStyles from '../Utlis/GlobalStyles';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1609972542679-801af2bbd56e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        }}
        resizeMethod="resize"
        style={GlobalStyles.BGimage}
      />
      <TouchableOpacity onPress={() => navigation.navigate('AddItem')}>
        <Text style={GlobalStyles.Text}>Add item</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
        <Text style={GlobalStyles.Text}>Capture and Upload</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={GlobalStyles.Text}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Text style={GlobalStyles.Text}>Signin</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
