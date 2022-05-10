import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Button, View, SafeAreaView, Alert, Text, Pressable} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const handleMessage = event => {
    const {
      nativeEvent: {data},
    } = event;
    Alert.alert(data);
    AsyncStorage.setItem('nickname', 'User1', () => {
      console.log('유저 닉네임 저장 완료');
    });

    AsyncStorage.getItem('nickname', (err, result) => {
      console.log(result); // User1 출력
    });
  };
  useEffect(() => {
    AsyncStorage.getItem('nickname', (err, result) => {
      if (result == 'User1') {
        setIsLogin(true);
      }
    });
  }, []);

  const logout = () => {
    AsyncStorage.setItem('nickname', 'User2', () => {
      console.log('데이터 번경');
    });
    AsyncStorage.getItem('nickname', (err, result) => {
      console.log(result); // User1 출력
    });
  };
  return (
    <>
      {isLogin ? (
        <SafeAreaView>
          <Pressable onPress={logout}>
            <Text>test</Text>
          </Pressable>
          <Text>로그인 되었습니다.</Text>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <Pressable onPress={logout}>
            <Text>test</Text>
          </Pressable>
          <WebView
            source={{
              uri: 'https://meetinkorea.kr/board/?id=login',
            }}
            onMessage={handleMessage}
          />
        </SafeAreaView>
      )}
    </>
  );
};

export default App;
