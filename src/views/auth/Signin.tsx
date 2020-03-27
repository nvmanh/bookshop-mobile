import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AsyncTuple } from 'iron-redux';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
  BackHandler,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import {
  Toast,
  Portal,
  Button,
  WhiteSpace,
  WingBlank,
  Modal
} from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import BackButton from '../../components/BackButton';
// import { Status } from '../../store/actionsTypes';
import actions, { signIn } from '../../store/auth/actions';
import { RootState } from '../../store/types';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../../components/HandleBackAndroid';
import { Actions } from 'react-native-router-flux';

export interface Props {
  onBack: () => void;
  onBackToHome: () => void;
}
let _loadKey: any = null;
const SignInPage = ({ onBack, onBackToHome }: Props) => {

  const dispatch = useDispatch();
  // const [form, setValues] = useState({
  //   userName: '',
  //   password: '',
  // });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [seePwd, setSeePwd] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const fetchSignIn = useSelector((state: RootState) => state.auth.fetchSignIn);
  useEffect(
    () => () => {
      // componentWillUnmount
      // removeAndroidBackButtonHandler()
      dispatch(actions.clearFetchSignIn());
    },
    []
  );

  const onSignUpPress = () => {
    Actions.signup();
  }

  useEffect(() => {
    const backAction = () => {
      Modal.alert("Exit app", "Do you want to quit app now?", [
        { text: 'Cancel', style: 'default' },
        { text: 'Yes', onPress: () => BackHandler.exitApp() }
      ])
      return true;
    };

    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );
    handleAndroidBackButton(backAction);

    return () => {
      // backHandler.remove();
      removeAndroidBackButtonHandler()
    }
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    }
  }, []);

  useEffect(() => {
    // handleStatusChange
    if (fetchSignIn.loading) {
      _loadKey && Portal.remove(_loadKey);
      _loadKey = Toast.loading('loading...', 0);
    } else {
      _loadKey && Portal.remove(_loadKey);
    }
    if (fetchSignIn.error) {
      Toast.fail(fetchSignIn.message || '');
      // dispatch(resetAuthStatus());
    }
    if (fetchSignIn.data) {
      // onBack();
      onBackToHome();
    }
  }, [fetchSignIn]);

  const onSignInPress = () => {
    if (!username) {
      setTimeout(() => {
        Toast.fail('Username can not be empty');
      }, 1);
      return;
    }
    if (!password) {
      Toast.info('Password can not be empty');
      return;
    }
    dispatch(signIn({ username, password }));
  };

  const textRef = useRef<TextInput>(null);

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <ScrollView contentContainerStyle={styles.wrapper} keyboardDismissMode="interactive">
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <View style={styles.logoWrapper}>
              <Image
                style={styles.logo}
                source={require('../../assets/images/logo.jpeg')}
              />
            </View>
            <View style={styles.main}>
              <View style={styles.inputWrap}>
                <Text style={{ color: '#393939', fontSize: 16, width: 85 }}>
                  Username
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => setUsername(text)}
                  defaultValue={username}
                  placeholder="Input text..."
                  maxLength={30}
                  returnKeyType="next"
                  onSubmitEditing={() => textRef.current!.focus()}
                  // keyboardType="numeric"
                  placeholderTextColor="#a6a6a6"
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={styles.inputWrap}>
                <Text style={{ color: '#393939', fontSize: 16, width: 85 }}>
                  Password
                </Text>
                <TextInput
                  style={styles.input}
                  ref={textRef}
                  onChangeText={text => setPassword(text)}
                  defaultValue={password}
                  secureTextEntry={!seePwd}
                  placeholder="Input text..."
                  returnKeyType="go"
                  maxLength={20}
                  onSubmitEditing={() => onSignInPress()}
                  placeholderTextColor="#a6a6a6"
                  underlineColorAndroid="transparent"
                />
                <TouchableOpacity
                  onPress={() => setSeePwd(!seePwd)}
                  style={styles.seePwdBtn}
                >
                  <Icon
                    name={seePwd ? 'eye' : 'eye-slash'}
                    size={20}
                    style={{ color: '#9E9FA0' }}
                  />
                </TouchableOpacity>
              </View>
              <WingBlank>
                <WhiteSpace size='xl' />
                <WhiteSpace size='xl' />
                <Button type="primary" onPress={() => onSignInPress()}>
                  Login
                </Button>
                <WhiteSpace />
              </WingBlank>
            </View>
          </View>
          {!isKeyboardVisible && (
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <TouchableOpacity style={styles.bottomView} onPress={() => onSignUpPress()}>
                <Text>Have not account yet</Text>
                <Text>Register</Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between'
  },
  navBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 54,
    marginTop: 15,
  },
  navBarTextLeft: {
    marginLeft: 15,
    fontSize: 16,
    color: '#000',
  },
  navBarTextRight: {
    marginRight: 6,
    color: '#6685bd',
    fontSize: 14,
  },
  logoWrapper: {
    marginTop: 35,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
  },
  main: {
    marginTop: 20,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    marginLeft: 22,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E2E2',
  },
  input: {
    flex: 1,
    borderWidth: 0,
    marginRight: 10,
    fontSize: 16,
    color: '#393939',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 50,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 40,
    backgroundColor: '#FED80E',
    borderColor: '#FED80E',
    overflow: 'hidden',
  },
  btnText: {
    textAlign: 'center',
    color: '#393939',
    fontSize: 16,
  },
  registerBtn: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginTop: 40,
    color: '#6685db',
    fontSize: 16,
  },
  seePwdBtn: {
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dynPwdBtn: {
    borderWidth: 0,
    color: '#6685db',
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  navBarTextLeftIcon: {
    marginLeft: 15,
    fontSize: 37,
    color: '#000',
    width: 100,
  },
  bottomView: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 50, //Here is the trick
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
});

SignInPage.propTypes = {};
SignInPage.defaultProps = {};

export default React.memo(SignInPage);
