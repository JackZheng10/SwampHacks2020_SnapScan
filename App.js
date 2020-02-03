import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert
} from "react-native";
import { Camera } from "expo-camera";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ViewPager from "@react-native-community/viewpager";
//import History from "./components/History.js/index.js";

import { styles } from "./components/styles.js";
import ScanInfoScreen from "./components/ScanInfoScreen.js";
import StatisticsScreen from "./components/StatisticsScreen.js";
import PurchaseHistory from "./components/PurchaseHistory.js";
import Swiper from "react-native-swiper";
import * as FileSystem from "expo-file-system";

const servURL = "http://10.136.104.219:3001/receipt";
const lservURL = "http://10.140.187.64:3000/blog";
const saveFile = "savefile.txt";
export default class CameraScreen extends Component {
  state = {
    permission: null,
    camera: null,
    listOfThings: "test",
    indicatorColors: ["#70C4FF", "#3FC272", "#F5E184", "#F56B5E"],
    indicatorIndex: 0,
    showLoading: false,
    showScanInfoScreen: false,
    categoryColors: [],
    itemsList: [],
    total: 0,
    receiptList: []
  };

  addReceipt = (itemsList, totalPrice) => {
    const newReceiptList = this.state.receiptList;
    const d = new Date();
    const curDate =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getDate() +
      " " +
      d.getHours() +
      ":" +
      d.getMinutes() +
      ":" +
      d.getSeconds();
    newReceiptList.push({
      items: itemsList,
      total: totalPrice,
      date: curDate
    });
    console.log(newReceiptList);
    this.setState({ receiptList: newReceiptList });
    FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + "/" + saveFile,
      JSON.stringify(this.state.receiptList)
    ).then(
      () => {},
      reason => {
        console.log(reason);
      }
    );
    this.toggleResult(false);
  };

  componentDidMount = async () => {
    const perm = await Camera.requestPermissionsAsync();
    console.log(perm.status);
    this.setState({ permission: perm.status == "granted" });
    console.log(this.state.permission);
    FileSystem.readAsStringAsync(
      FileSystem.documentDirectory + "/" + saveFile
    ).then(
      data => {
        const d = JSON.parse(data);
        this.setState({ receiptList: d });
      },
      reason => {}
    );
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

  changeItemList = itemList => {
    this.setState({ itemsList: itemList });
  };

  toggleResult = on => {
    this.setState({ showScanInfoScreen: on });
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
        res.json().then(content => {
          console.log(content);
          if (content.response == "ERROR")
            Alert.alert("We did not reconize receipt!");
          else {
            this.setState({ itemsList: content.response.items });
            this.setState({ total: content.response.total });
            this.setState({ showScanInfoScreen: true });
          }
        });
        this.setState({ showLoading: false });
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
        <PurchaseHistory list={this.state.receiptList} />

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
              size={60}
              color={this.state.indicatorColors[this.state.indicatorIndex]}
              style={{ marginTop: 350 }}
            />
          </Modal>
          <Modal
            visible={this.state.showScanInfoScreen}
            onRequestClose={() => this.toggleResult(false)}
          >
            <ScanInfoScreen
              toggle={() => this.toggleResult(false)}
              save={(list, total) => this.addReceipt(list, total)}
              itemList={this.state.itemsList}
              total={this.state.total}
              cl={list => this.changeItemList(list)}
            />
          </Modal>
        </View>
        <StatisticsScreen dataList={this.state.receiptList} />
      </Swiper>
    );
  }
}
