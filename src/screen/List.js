import React from 'react';
import {StyleSheet, Text, View, Platform, Animated} from 'react-native';
import GlobalStyles from '../Utlis/GlobalStyles';
import BottomSheet from 'reanimated-bottom-sheet';
import CustomButton from '../Utlis/CustomButton';

import ImagePicker from 'react-native-image-crop-picker';

const List = () => {
  const [image, setImage] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const sheetRef = React.useRef(null);
  const fall = new Animated.Value(0);

  const takePhotoFromCamera = () => {
    try {
      ImagePicker.openCamera({
        compressImageMaxHeight: 300,
        compressImageMaxWidth: 300,
        cropping: true,
        compressImageQuality: 0.7,
      }).then(image => {
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
        console.log(`Image:`, image);
        sheetRef.current.snapTo(2);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const takePhotoFromLibrary = () => {
    try {
      ImagePicker.openPicker({
        compressImageMaxHeight: 300,
        compressImageMaxWidth: 300,
        cropping: true,
        compressImageQuality: 0.7,
      }).then(image => {
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
        console.log(`Image:`, image);
        sheetRef.current.snapTo(2);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleModalClick = () => {
    setModal(!modal);
    modal ? sheetRef.current.snapTo(2) : sheetRef.current.snapTo(0);
  };

  const renderContent = () => (
    <View style={styles.bottomSheet}>
      <View>
        <Text style={styles.bottomSheetText}>Upload Photo</Text>
        <Text style={styles.bottomSheetText2}>Choose Your Photo</Text>
      </View>
      <View style={styles.renderContent}>
        <CustomButton
          text="Take Photo"
          style={{marginBottom: 10, backgroundColor: '#4700a3'}}
          textStyle={{color: '#fff'}}
          name="camera"
          color="#fff"
          onPress={takePhotoFromCamera}
        />
        <CustomButton
          text="Choose From Library"
          style={{marginBottom: 10, backgroundColor: '#4700a3'}}
          textStyle={{color: '#fff'}}
          name="archive"
          color="#fff"
          onPress={takePhotoFromLibrary}
        />
        <CustomButton
          text="Cancel"
          style={{marginBottom: 10, backgroundColor: '#4700a3'}}
          textStyle={{color: '#fff'}}
          onPress={() => sheetRef.current.snapTo(2)}
          name="close-o"
          color="#fff"
        />
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerDotContainer}>
      <View style={styles.headerDot}></View>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={GlobalStyles.Text}>Camera</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <CustomButton
            name="external-link"
            color={'#fff'}
            text={modal ? 'Close Camera Menu' : 'Open Camera Menu'}
            textStyle={{color: '#fff'}}
            style={{backgroundColor: '#4d7fff'}}
            onPress={handleModalClick}
          />
        </View>
      </View>
      <View>
        {/* <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        /> */}
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[400, 300, 0]}
        borderRadius={10}
        renderHeader={renderHeader}
        renderContent={renderContent}
        initialSnap={2}
      />
    </>
  );
};

export default List;

const styles = StyleSheet.create({
  renderContent: {
    bottom: -30,
    paddingTop: 10,
  },
  bottomSheetText: {
    fontSize: 27,
    fontWeight: '900',
  },
  bottomSheetText2: {
    fontSize: 15,
    //fontWeight: '900',
    textAlign: 'center',
  },
  headerDotContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomWidth: 0.05,
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 1,
    paddingTop: 10,
    elevation: -1,
  },
  headerDot: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 16,
    height: 400,
    alignItems: 'center',
    //borderWidth: 0.5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center',
    backgroundColor: '#dbdbd9',
  },
});
