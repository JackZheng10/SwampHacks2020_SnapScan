import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Modal
} from "react-native";
import { Camera } from "expo-camera";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ViewPager from "@react-native-community/viewpager";
import Test from "./components/test.js";

import { styles } from "./components/styles.js";
import ScanInfoScreen from "./components/ScanInfoScreen.js";
import StatisticsScreen from "./components/StatisticsScreen.js";
import PurchaseHistory from "./components/PurchaseHistory.js";
import Swiper from "react-native-swiper";

const servURL = "http://10.140.189.199:3001/blog";
const lservURL = "http://10.140.187.64:3000/blog";
export default class CameraScreen extends Component {
  state = {
    permission: null,
    camera: null,
    listOfThings: "test",
    indicatorColors: ["#70C4FF", "#3FC272", "#F5E184", "#F56B5E"],
    indicatorIndex: 0,
    showLoading: false,
    showScanInfoScreen: false
  };

  componentDidMount = async () => {
    const perm = await Camera.requestPermissionsAsync();
    console.log(perm.status);
    this.setState({ permission: perm.status == "granted" });
    console.log(this.state.permission);
    setTimeout(() => {
      this.changeColor();
    }, 800);
  };

  changeColor = async () => {
    this.setState({ indicatorIndex: this.state.indicatorIndex + 1 });
    if (this.state.indicatorIndex > this.state.indicatorColors.length)
      this.setState({ indicatorIndex: 0 });
    setTimeout(() => {
      this.changeColor();
    }, 800);
  };

  take = async cam => {
    //console.log(cam);
    const options = { quality: 1, base64: true, exif: true };
    console.log("trying taking picture");
    this.setState({ showLoading: true });

    const data = await cam.takePictureAsync(options);
    console.log("done");
    //console.log(data.base64);
    console.log("trying sending to server");
    fetch(servURL, {
      method: "POST",
      Accept: "application/json",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(
      res => {
        res.text().then(content => {
          console.log(content);
        });
        this.setState({ showLoading: false });
        this.setState({ showScanInfoScreen: true });
      },
      reason => {
        console.log(reason);
        this.setState({ showLoading: false });
      }
    );
    this.setState({ listOfThings: "change" });
  };

  render() {
    if (this.state.permission == null) {
      return <View />;
    }
    if (this.state.permission == false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <Swiper
        style={{
          flex: 1
        }}
        loop={false}
        showsPagination={false}
        index={1}
      >
        <PurchaseHistory />

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
          <Modal
            transparent={true}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            visible={this.state.showLoading}
          >
            <ActivityIndicator
              size={"large"}
              color={this.state.indicatorColors[this.state.indicatorIndex]}
              style={{ marginTop: 200 }}
            />
          </Modal>
          <Modal visible={this.state.showScanInfoScreen}>
            <ScanInfoScreen />
          </Modal>
        </View>
        <StatisticsScreen />
      </Swiper>
    );
  }
}
