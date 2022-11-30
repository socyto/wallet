import { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { StyleSheet, View, StatusBar as StatusBarReact } from "react-native";

import { webClientUrl } from "@env";
import useSocialAuthRequest from "./hooks/useSocialAuthRequest";

export default function App() {
  const webView = useRef<WebView<{ javaScriptEnabledAndroid: boolean }> | null>(
    null
  );

  const { userInfo, promptAsync, logout } = useSocialAuthRequest();

  const handlePostMessage = (eventMessage: { event: string; data: any }) => {
    if (!webView.current) return;

    webView.current.postMessage(JSON.stringify(eventMessage));
  };

  const handleOnMessage = (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);
    if (message.event === "login") {
      const { provider } = message.data;
      promptAsync(provider);
    } else if (message.event === "logout") {
      logout();
    }
  };

  useEffect(() => {
    if (userInfo) {
      handlePostMessage({ event: "auth", data: userInfo.jwt });
    }
  }, [userInfo]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        source={{ uri: webClientUrl }}
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
