import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { NavigationContainer } from '@react-navigation/native';


const CameraScreen = ({ route, navigation }) => {

  const BASE_URL = 'https://api.kairos.com/';
  const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'app_id': 'bb412d36',
    'app_key': '1d1cbf3573fbb5b20772ccbb87d74ed7'
  }

  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([])
  const cameraRef = useRef(null);
  const { onSetDetectedUser, subjectId } = route.params;

  const faceDetected = ({ faces }) => {
    setFaces(faces) // instead of setFaces({faces})
    // console.log({ faces })
  }

  useEffect(() => {

    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //Enroll Method
  const enroll = async (subjectId, base64) => {
    console.log("Making enrol!")
    const rawResponse = await fetch(`${BASE_URL}enroll`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        "image": base64,
        "subject_id": `${subjectId}`,
        "gallery_name": "Emergency_Gallery"
      })
    });
    console.log("ENroll done")
    const content = await rawResponse.json();
    console.log(content);
    return content;
  }

  //Recognize Method
  const recognize = async (base64) => {
    console.log("MADE FETCH");
    const rawResponse = await fetch(`${BASE_URL}recognize`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        "image": base64,
        "gallery_name": "Emergency_Gallery"
      })
    });
    console.log("FETCH DONE")
    const content = await rawResponse.json();
    return content;
  }

  const snap = async (recognize_) => {
    try {
      if (cameraRef) {
        console.log(cameraRef)
        let photo = await cameraRef.current.takePictureAsync({ base64: true });
        if (!faceDetected) {
          alert('No face detected!');
          return;
        }
        const { base64 } = photo;

        if (recognize_) {
          const response = await recognize(base64);

          console.log(response);
          if (response.images) {
            onSetDetectedUser(response.images[0].transaction.subject_id);
          } else {
            onSetDetectedUser(null);
          }
          navigation.navigate('Home');

        } else {
          //TODO
          console.log(subjectId);
          const response = await enroll(subjectId, base64);
          if (response.face_id) {
            console.log("Succeeded enrolling!")
          } else {
            console.log("Enroll failed")
          }

          navigation.navigate('Home');

        }
      }
    } catch (e) {
      console.log('error on snap: ', e)
    }
  };

  if (hasPermission !== true) {
    return <Text>No access to camera</Text>
  }

  return (
    <>
      <Camera
        ref={cameraRef}
        style={{
          flex: 1,
        }}
        type='front'
        onFacesDetected={faceDetected}
        FaceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.fast,
          detectLandmarks: FaceDetector.Constants.Landmarks.all,
          runClassifications: FaceDetector.Constants.Classifications.none,
          minDetectionInterval: 5000,
          tracking: false
        }}
      >
        {/* <View style={styles.container}> */}

        {/* </View> */}
      </Camera>
      <View style={styles.container}>
        {
          !!subjectId &&

          <TouchableOpacity
            style={styles.userButton}
            onPress={() => snap(false)}>
            <Text
              style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              {' '}Enroll{' '}
            </Text>
          </TouchableOpacity>
        }
        {
          !subjectId &&
          <TouchableOpacity
            style={styles.userButton}
            onPress={() => snap(true)}>
            <Text
              style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              {' '}Recognize{' '}
            </Text>
          </TouchableOpacity>
        }

      </View>
    </>
  );
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: '10%',
    backgroundColor: '#00000000',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  userButton: {
    backgroundColor: '#4183e0',
    width: '30%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  }
});

export default CameraScreen;
