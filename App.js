import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

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
    console.log(cam);
    const options = { quality: 1, base64: true, exif: true };
    console.log("trying taking picture");

    var test = await cam.takePictureAsync(options);
    console.log(test);
  };
  render() {
    if (this.state.permission == null) {
      return <View />;
    }
    if (this.state.permission == false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
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
  }
});
