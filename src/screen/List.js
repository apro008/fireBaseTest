import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GlobalStyles from '../Utlis/GlobalStyles';

const List = () => {
  return (
    <View style={styles.container}>
      <Text style={GlobalStyles.Text}>List</Text>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
