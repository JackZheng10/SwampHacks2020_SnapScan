import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ViewPager from "@react-native-community/viewpager";
import Test from "./components/test.js";
import {styles} from './components/styles.js'

export default class CameraScreen extends Component {
  state = {
    permission: null,
    camera: null,
    listOfThings: "test",
  };

  componentDidMount = async () => {
    const perm = await Camera.requestPermissionsAsync();
    console.log(perm.status);
    this.setState({ permission: perm.status == "granted" });
    console.log(this.state.permission);
  };

  take = async cam => {
    //console.log(cam);
    const options = { quality: 1, base64: true, exif: true };
    console.log("trying taking picture");

    const data = await cam.takePictureAsync(options);
    console.log("done");
    console.log("trying sending to server");
    fetch("http://10.136.104.219:3001/blog", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(
      res => {
        res.json().then(response => {
          console.log(response);
          console.log("succeed");
        });
      },
      reason => {
        console.log(reason);
      }
    );
    this.setState({listOfThings:"change"});
  };

  render() {
    if (this.state.permission == null) {
      return <View />;
    }
    if (this.state.permission == false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <ViewPager
        style={{
          flex: 1
        }}
        initialPage={1}
        orientation="horizontal"
      >

        <View key="0" style={styles.slideBody}>
          <Camera
            style={{ flex: 1 }}
            ratio="16:9"
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            ></View>
            <TouchableOpacity
              style={styles.takeButton}
              onPress={() => this.take(this.camera)}
            >
              <MaterialIcons name="camera" size={40} color="white" />
            </TouchableOpacity>
          </Camera>
        </View>
        <Test test={this.state.listOfThings}/>
        <View key="2" style={styles.slideBody}>
          <Text>test</Text>
        </View>
      </ViewPager>
    );
  }
}