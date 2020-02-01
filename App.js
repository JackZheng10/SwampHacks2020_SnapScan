import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ViewPager from "@react-native-community/viewpager";

export default class CameraScreen extends Component {
  state = {
    permission: null,
    camera: null
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
        orientation="vertical"
      >
        <View key="0" style={styles.slideBody}>
          <Text>test</Text>
        </View>
        <View key="1" style={styles.slideBody}>
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
        <View key="2" style={styles.slideBody}>
          <Text>test2</Text>
        </View>
      </ViewPager>
    );
  }
}

const styles = StyleSheet.create({
  takeButton: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    padding: 5,
    borderRadius: 40,
    width: 80,
    height: 80,
    borderWidth: 5,
    borderColor: "white",
    backgroundColor: "transparent"
  },
  buttonText: {
    color: "white"
  },
  slideBody: {
    flex: 1
  }
});
