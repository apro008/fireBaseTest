import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Button = () => {
  return (
    <View style={styles.container}>
      <Text>Button</Text>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 70,
    width: 100,
  },
});
