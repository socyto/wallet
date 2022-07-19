import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { StyleSheet, Dimensions, View } from 'react-native';

import firebase from "./firebase";
import appEvent from './handler/appEvent';


export default class App extends Component {
  webview: WebView | null = null;
  constructor(props: any) {
    super(props);

    this.handleOnMessage = this.handleOnMessage.bind(this);
    this.handlePostMessage = this.handlePostMessage.bind(this);
  }

  handlePostMessage()  {
    if (!this?.webview) return;
    const user = firebase.auth.currentUser;
    this.webview.postMessage(JSON.stringify({
      event: 'auth',
      data: user?.getIdToken(),
    }));
  };

  handleOnMessage = (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);
    console.log("message", message);
    if (message.event === 'login') {
      appEvent.signIn(message.data);
    }
  }

  render() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <WebView
          style={{ height: windowHeight, width: windowWidth }}
          originWhitelist={['*']}
          source={{ uri: 'http://172.16.4.172:3000/signin' }}
          onMessage={this.handleOnMessage}
          onError={error => console.log(error)}
          ref={(r) => this.webview = r}
          javaScriptEnabledAndroid={true}
          javaScriptEnabled={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
