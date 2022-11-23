import { Component, useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { StyleSheet, View, StatusBar as StatusBarReact } from "react-native";

import firebase from "./firebase";
import appEvent from "./handler/appEvent";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

// export class App1 extends Component {
//   webview: WebView | null = null;
//   constructor(props: any) {
//     super(props);

//     this.handleOnMessage = this.handleOnMessage.bind(this);
//     this.handlePostMessage = this.handlePostMessage.bind(this);
//   }

//   handlePostMessage() {
//     if (!this?.webview) return;
//     const user = firebase.auth.currentUser;
//     this.webview.postMessage(
//       JSON.stringify({
//         event: "auth",
//         data: user?.getIdToken(),
//       })
//     );
//   }

//   handleOnMessage = (event: WebViewMessageEvent) => {
//     const message = JSON.parse(event.nativeEvent.data);
//     if (message.event === "login") {
//       appEvent.signIn(message.data);
//     }
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <StatusBar />
//         <WebView
//           style={{ flex: 1 }}
//           originWhitelist={["*"]}
//           source={{ uri: "http://192.168.9.140:3000/" }}
//           onMessage={this.handleOnMessage}
//           onError={(error) => console.log(error)}
//           ref={(r) => (this.webview = r)}
//           javaScriptEnabledAndroid={true}
//           javaScriptEnabled={true}
//         />
//       </View>
//     );
//   }
// }

export default function App() {
  const webView = useRef<WebView<{ javaScriptEnabledAndroid: boolean }> | null>(
    null
  );

  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    // expoClientId:
    //   "20928212086-mqb72976fos5mku437t03sooq7a9n4qq.apps.googleusercontent.com",
    // iosClientId:
    //   "20928212086-mqb72976fos5mku437t03sooq7a9n4qq.apps.googleusercontent.com",
    // androidClientId:
    //   "20928212086-mqb72976fos5mku437t03sooq7a9n4qq.apps.googleusercontent.com",
    // webClientId:
    //   "20928212086-mqb72976fos5mku437t03sooq7a9n4qq.apps.googleusercontent.com",
    expoClientId:
      "20928212086-mqb72976fos5mku437t03sooq7a9n4qq.apps.googleusercontent.com",
    iosClientId:
      "20928212086-junp085r5c54s3lovsa8emiq941jgqjv.apps.googleusercontent.com",
    androidClientId:
      "20928212086-junp085r5c54s3lovsa8emiq941jgqjv.apps.googleusercontent.com",
    webClientId:
      "20928212086-junp085r5c54s3lovsa8emiq941jgqjv.apps.googleusercontent.com",
  });

  const handlePostMessage = () => {
    if (!webView.current) return;

    const user = firebase.auth.currentUser;
    webView.current.postMessage(
      JSON.stringify({
        event: "auth",
        data: user?.getIdToken(),
      })
    );
  };

  const handleOnMessage = (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);
    if (message.event === "login") {
      // appEvent.signIn(message.data);
      const { provider, ...user } = message.data;
      if (provider === "google") {
        promptAsync();
      }
    }
  };

  const fetchUserData = async (providerName: string) => {
    const backendUrl = "http://192.168.1.11:1337";
    const url = `${backendUrl}/api/auth/${providerName}/callback?access_token=${accessToken}`;
    console.log(url);
    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        console.log(`Couldn't login to Strapi. Status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      setAccessToken(authentication?.accessToken || "");
    }
  }, [response]);

  useEffect(() => {
    if (accessToken) {
      fetchUserData("google");
    }
  }, [accessToken]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        source={{ uri: "http://192.168.1.11:8080/" }}
        onMessage={handleOnMessage}
        onError={(error) => console.log(error)}
        ref={webView}
        javaScriptEnabledAndroid={true}
        javaScriptEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBarReact.currentHeight || 35 + 2,
  },
});
