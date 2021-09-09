import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import GlobalStyles from './GlobalStyles';

const CustomButton = ({name, size, color, text, style, onPress, textStyle}) => {
  return (
    <>
      <TouchableOpacity
        style={[GlobalStyles.buttonContainer, {...style}]}
        onPress={onPress}>
        <View style={styles.icon}>
          <EvilIcons name={name} size={size || 30} color={color || 'blue'} />
        </View>
        <Text style={[styles.text, {...textStyle}]}>{text} </Text>
      </TouchableOpacity>
    </>
  );
};
export default CustomButton;

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    //borderWidth: 1,
  },
  text: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center',
    justifyContent: 'center',
    //borderWidth: 1,
    flex: 1,
    fontWeight: 'bold',
    marginLeft: -10,
  },
});
