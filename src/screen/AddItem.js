import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Button,
} from 'react-native';
import GlobalStyles from '../Utlis/GlobalStyles';
import database from '@react-native-firebase/database';

let addItem = item => {
  database().ref('/items').push({
    name: item,
  });
};

const AddItem = () => {
  const [name, setName] = React.useState('');
  const handleSubmit = () => {
    addItem(name);
    Alert.alert('Item Saved');
  };
  //console.log(name);

  return (
    <View style={styles.container}>
      <Text style={GlobalStyles.Text}>Add</Text>
      <View>
        <TextInput
          style={GlobalStyles.TextInput}
          value={name}
          onChangeText={text => setName(text)}
        />
        <Button title="Add" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'row',
    alignItems: 'center',
  },
});
