/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import { useEffect } from 'react'
import BackgroundGeolocation from "react-native-background-geolocation";

const App: () => React$Node = () => {

  // onMotionChange(event) {
  //   console.log('[motionchange] -', event.isMoving, event.location)
  // }

  useEffect(() => {
     BackgroundGeolocation.onLocation((location) => {
         console.log("[onLocation] success: ", location);
       }, (error) => {
         console.log("[onLocation] ERROR: ", error);
       });

       BackgroundGeolocation.onMotionChange((event) => {
          console.log('[motionchange] -', event.isMoving, event.location)
       });

     BackgroundGeolocation.ready({
       // Geolocation Config
       desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
       distanceFilter: 10,
       // Activity Recognition
       stopTimeout: 1,
       // Application config
       debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
       logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
       stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
       startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
     }, (state) => {
       console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
 
       if (!state.enabled) {
         BackgroundGeolocation.start(function() {
           console.log("- Start success");
         });
       }
     });
    //return function is called on component unmount 
    return () => {
      BackgroundGeolocation.removeListeners();
    }
  }, [])

  return (
    <>
      <SafeAreaView />
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
