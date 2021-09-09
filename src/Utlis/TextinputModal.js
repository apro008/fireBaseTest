import React from 'react';
import {StyleSheet, View, TextInput, Dimensions} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GlobalStyles from './GlobalStyles';

const {height} = Dimensions.get('window');

const TextinputModal = ({
  iconName,
  onPress,
  style,
  onChangeText,
  value,
  size,
  placeholder,
  secureTextEntry,
  iconName2,
  onPress2,
  size2,
  style2,
  editable,
}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Feather
        name={iconName}
        onPress={onPress}
        size={size || 22}
        style={[GlobalStyles.icon, {...style}]}
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[GlobalStyles.inputStyle]}
        numberOfLines={1}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
      <Feather
        name={iconName2}
        onPress={onPress2}
        size={size2 || 22}
        style={[GlobalStyles.icon, {...style2}]}
      />
    </View>
  );
};

const TextinputModal2 = ({name, value, placeholder, name2}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconStyle}>
        <AntDesign name={name} size={25} color="#666" />
      </View>
      <TextInput
        value={value}
        numberOfLines={1}
        placeholder={placeholder}
        style={styles.input}
      />
      <View style={styles.iconStyle}>
        <AntDesign name={name2} size={25} color="#666" />
      </View>
    </View>
  );
};

const TextinputModal3 = ({iconName, value, onChangeText, placeholder}) => {
  return (
    <View style={styles.container2}>
      <View style={styles.icon}>
        <Feather name={iconName} size={22} color="#000" />
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input3: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    borderRightWidth: 1,
  },
  container2: {
    flexDirection: 'row',
    height: height / 15,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
  },
  icon: {
    justifyContent: 'center',
    height: '100%',
    padding: 10,
    //borderRightWidth: 1,
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    alignItems: 'center',
    width: 50,
  },
  container: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: height / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {TextinputModal, TextinputModal2, TextinputModal3};
