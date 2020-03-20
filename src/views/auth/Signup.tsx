/**
 * @author Leo
 * @email xinlichao2016@gmail.com
 * @create date 2019-09-03 10:07:49
 * @modify date 2019-09-03 10:07:49
 * @desc 注册页，未完善
 */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  BackHandler
} from 'react-native';
import {
  Toast,
  Portal,
  Button,
  WhiteSpace,
  WingBlank,
} from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import actions, { signUp } from '../../store/auth/actions';
import { RootState } from '../../store/types';
export interface Props {
  onBack: () => void;
  onBackToHome: () => void;
}
let _loadKey: any = null;

// TODO: Use KeyboardAvoidingView
const SignupPage = ({ onBack, onBackToHome }: Props) => {

  const dispatch = useDispatch();
  // const [form, setValues] = useState({
  //   userName: '',
  //   password: '',
  // });
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Aa@123456');
  const [seePwd, setSeePwd] = useState(false);
  const [age, setAge] = useState(18);
  const [email, setEmail] = useState('manhnv@ominext.com');
  const [phone, setPhone] = useState('0944014295');

  const fetchSignUp = useSelector((state: RootState) => state.auth.fetchSignUp);
  useEffect(
    () => () => {
      // componentWillUnmount
      // removeAndroidBackButtonHandler()
      dispatch(actions.clearFetchSignUp());
    },
    []
  );

  const onSignUpPress = () => {
    // Actions.signup();
    if (!username || !password || !email || !phone) {
      setTimeout(() => {
        Toast.fail('You must fill all required fields');
      }, 1);
      return;
    }
    
    dispatch(signUp({ username, password, age, phone, email }));
  }

  useEffect(() => {
    // handleStatusChange
    if (fetchSignUp.loading) {
      _loadKey && Portal.remove(_loadKey);
      _loadKey = Toast.loading('登录中...', 0);
    } else {
      _loadKey && Portal.remove(_loadKey);
    }
    if (fetchSignUp.error) {
      Toast.fail(fetchSignUp.message || '');
      // dispatch(resetAuthStatus());
    }
    if (fetchSignUp.data) {
      // onBack();
      onBackToHome();
    }
  }, [fetchSignUp]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo.jpeg')}
        />
      </View>
      <View style={styles.main}>
        <View style={styles.inputWrap}>
          <Text style={{ color: '#393939', fontSize: 16, width: 100 }}>
            UserName (*)
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setUsername(text)}
            defaultValue={username}
            placeholder="Input username"
            maxLength={30}
            autoCapitalize='none'
            // keyboardType="numeric"
            placeholderTextColor="#a6a6a6"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.inputWrap}>
          <Text style={{ color: '#393939', fontSize: 16, width: 100 }}>
            Password (*)
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            defaultValue={password}
            placeholder="Input password"
            maxLength={20}
            autoCapitalize='none'
            placeholderTextColor="#a6a6a6"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.inputWrap}>
          <Text style={{ color: '#393939', fontSize: 16, width: 100 }}>
            Age
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setAge(Number(text))}
            defaultValue={"" + age}
            placeholder="Input age"
            maxLength={20}
            placeholderTextColor="#a6a6a6"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.inputWrap}>
          <Text style={{ color: '#393939', fontSize: 16, width: 100 }}>
            Email (*)
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            defaultValue={email}
            placeholder="Input email"
            maxLength={20}
            autoCapitalize='none'
            keyboardType="email-address"
            placeholderTextColor="#a6a6a6"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.inputWrap}>
          <Text style={{ color: '#393939', fontSize: 16, width: 100 }}>
            Phone (*)
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPhone(text)}
            defaultValue={phone}
            placeholder="Input phone"
            keyboardType="phone-pad"
            maxLength={20}
            placeholderTextColor="#a6a6a6"
            underlineColorAndroid="transparent"
          />
        </View>
        {/* <TouchableOpacity
          style={styles.btn}
          onPress={onSignInPress}
          textStyle={styles.btnText}
        >
          <Text>登录</Text>
        </TouchableOpacity> */}


        <WingBlank>
          <WhiteSpace size='xl' />
          <WhiteSpace size='xl' />
          <Button type="primary" onPress={() => onSignUpPress()}>
            Register
          </Button>
          <WhiteSpace />
        </WingBlank>
      </View>
    </ScrollView>
  );
};

// TODO : Extract common code into a single style
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoWrapper: {
    flex: 1,
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
  defaultMargin: {
    marginTop: 16,
  },
  center: {
    alignSelf: 'center',
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  errorText: {
    color: 'red',
  },
  successText: {
    fontSize: 20,
    color: 'green',
  },
});

SignupPage.navigationOptions = {
  title: 'Signup',
};

export default React.memo(SignupPage);
