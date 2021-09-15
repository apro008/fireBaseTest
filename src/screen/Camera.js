import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Animated,
  Alert,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from 'react-native';
import GlobalStyles from '../Utlis/GlobalStyles';
import BottomSheet from 'reanimated-bottom-sheet';
import CustomButton from '../Utlis/CustomButton';
import AddImage from './AddImage';

import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const Camera = () => {
  const [image, setImage] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [transferred, setTransferred] = React.useState(0);
  const [downloadUrl, setDownloadUrl] = React.useState(null);

  const sheetRef = React.useRef(null);
  const fall = new Animated.Value(1);

  const takePhotoFromCamera = () => {
    try {
      ImagePicker.openCamera({
        compressImageMaxHeight: 1280,
        compressImageMaxWidth: 720,
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
        compressImageMaxHeight: 1280,
        compressImageMaxWidth: 720,
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

  const UploadCancelHandle = () => {
    setImage(null);
    //console.log(`cancel pressed`);
  };

  const UploadHandle = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    let extension = filename.split('.').pop();
    let name = filename.split('.').slice(0, 1).join();
    filename = name + '-' + Date.now() + '.' + extension;
    console.log(`filename`, filename);

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          10,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setDownloadUrl(url);
      setUploading(false);
      setImage(null);

      console.log(`DownloadUrl-`, downloadUrl);

      Alert.alert('Success', `Here is your download url: ${url}`);
    } catch (error) {
      console.log(error);
      return null;
    }

    // task.then(() => {
    //   console.log('Image uploaded to the bucket!');
    // });
  };

  const renderHeader = () => (
    <View style={styles.headerDotContainer}>
      <View style={styles.headerDot} />
    </View>
  );

  return (
    <>
      <Animated.View style={[styles.container]}>
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
          {downloadUrl != null ? (
            <TouchableOpacity onPress={() => Linking.openURL(downloadUrl)}>
              <Text style={[GlobalStyles.Text, {color: 'blue'}]}>
                Open Last Uploaded Picture
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {image != null ? (
          <AddImage
            imageURI={image}
            onPressUpload={UploadHandle}
            onPressCancel={UploadCancelHandle}
          />
        ) : null}
        {uploading ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>{transferred} % Complete</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : null}
      </Animated.View>
      {/* <View>
        <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        />
      </View> */}
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

export default Camera;

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
