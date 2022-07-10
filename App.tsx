import { Component } from 'react';
import { WebView } from 'react-native-webview';

import { StyleSheet, Dimensions, View } from 'react-native';

import firebase from "./firebase";


export default class App extends Component {
  webview: WebView | null = null;
  constructor(props: any) {
    super(props);
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

  render() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
      <View style={styles.container}>
        <WebView
          style={{ height: windowHeight, width: windowWidth }}
          originWhitelist={['*']}
          source={{ uri: 'http://192.168.61.199:3000' }}
          onMessage={data => console.log(data)}
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
