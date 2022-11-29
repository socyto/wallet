import { useEffect, useState } from "react";

import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { AuthSessionResult, ResponseType } from "expo-auth-session";

import {
  googleIosClientId,
  googleAndroidClientId,
  googleExpoClientId,
  facebookIosClientId,
  facebookAndroidClientId,
  facebookExpoClientId,
  backendUrl,
} from "@env";

WebBrowser.maybeCompleteAuthSession();

interface UserInfo {
  jwt: string;
  user: any;
}

export default function useSocialAuthRequest() {
  const [socialAccessToken, setSocialAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
  const [provider, setProvider] = useState("");

  const [_googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      expoClientId: googleExpoClientId,
      iosClientId: googleIosClientId,
      androidClientId: googleAndroidClientId,
      webClientId: googleExpoClientId,
    });

  const [_facebookRequest, facebookResponse, facebookPromptAsync] =
    Facebook.useAuthRequest({
      expoClientId: facebookExpoClientId,
      clientId: facebookExpoClientId,
      androidClientId: facebookAndroidClientId,
      iosClientId: facebookIosClientId,
    });

  const promptAsync = (provider: string) => {
    setProvider(provider);
    if (provider === "google") {
      googlePromptAsync();
    } else if (provider === "facebook") {
      facebookPromptAsync();
    }
  };

  const fetchUserDataBySocialAccessToken = async () => {
    const url = `${backendUrl}/api/auth/${provider}/callback?access_token=${socialAccessToken}`;
    console.log(url);
    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        console.log(`Couldn't login to Strapi. Status: ${res.status}`);
      }

      const data = await res.json();
      setUserInfo(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const logout = ()=>{
    setUserInfo(undefined);
    setSocialAccessToken("");
  }

  useEffect(() => {
    let authSessionResult: AuthSessionResult | null = null;
    if (googleResponse?.type === "success") {
      authSessionResult = googleResponse;
    }
    if (facebookResponse?.type === "success") {
      authSessionResult = facebookResponse;
    }

    if (authSessionResult) {
      const { authentication } = authSessionResult;
      setSocialAccessToken(authentication?.accessToken || "");
    }
  }, [googleResponse, facebookResponse]);

  useEffect(() => {
    if (socialAccessToken) {
      fetchUserDataBySocialAccessToken();
    }
  }, [socialAccessToken]);

  return {
    userInfo,
    logout,
    promptAsync,
  };
}
