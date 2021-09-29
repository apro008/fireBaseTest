import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import GlobalStyles from '../Utlis/GlobalStyles';
import CustomButton from '../Utlis/CustomButton';
import {TextinputModal} from '../Utlis/TextinputModal';

import database from '@react-native-firebase/database';

const uploadItem = async item => {
  await database().ref('/items').push({
    name: item,
  });
};

const AddItem = () => {
  const [name, setName] = React.useState('');
  const handleSubmit = () => {
    uploadItem(name);
    Alert.alert('Item Saved');
    setName('');
  };
  //console.log(name);

  return (
    <View style={styles.container}>
      <Text style={GlobalStyles.Text}>Add Item</Text>
      <TextinputModal value={name} onChangeText={text => setName(text)} />
      <CustomButton
        text="Add"
        name="archive"
        color="#fff"
        onPress={handleSubmit}
        style={styles.customButtonStyle}
        textStyle={{color: '#fff'}}
      />
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  customButtonStyle: {
    backgroundColor: '#4d7fff',
    marginBottom: 10,
    left: -10,
  },
});
