import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { StyleSheet, View, StatusBar as StatusBarReact } from 'react-native';

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
    if (message.event === 'login') {
      appEvent.signIn(message.data);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar/>
        <WebView
          style={{ flex: 1 }}
          originWhitelist={['*']}
          source={{ uri: 'http://192.168.0.91:8080/' }}
          onMessage={this.handleOnMessage}
          onError={error => console.log(error)}
          ref={(r) => this.webview = r}
          javaScriptEnabledAndroid={true}
          javaScriptEnabled={true}
          nestedScrollEnabled
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBarReact.currentHeight || 35 + 2,
  },
});
