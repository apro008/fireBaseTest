import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  Text: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
  },
  TextInput: {
    width: width - 30,
    height: 40,
    borderWidth: 2,
  },
  inputStyle: {
    borderBottomWidth: 0.5,
    height: height / 19,
    width: width * 0.78,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: 'bold',
    margin: 8,
    backgroundColor: '#fff',
    padding: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
    //borderWidth: 1,
    alignSelf: 'center',
  },
  BGimage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5,
  },
  buttonContainer: {
    flexDirection: 'row',
    height: height / 16,
    width: width * 0.78,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginLeft: 20,
  },
});
