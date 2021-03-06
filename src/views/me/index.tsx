import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  Toast,
  Portal,
  Button,
  WhiteSpace,
  WingBlank,
} from '@ant-design/react-native';
import CommonTouchable from '../../components/CommonTouchable';
import { logout } from '../../store/actions';
import { RootState } from '../../store/types';

export interface Props {
  openSignin: () => void;
}

let _loadKey: any = null;

const Page = ({ openSignin }: Props) => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const fetchUserInfo = useSelector((state: RootState) => state.auth.fetchUserInfo);
  let name = '';
  if (fetchUserInfo.data) {
    name = fetchUserInfo.data.name;
  }

  const fetchLogOut = useSelector((state: RootState) => state.auth.fetchLogout);

  useEffect(() => {
    // componentDidMount
    // dispatch(initializeApp());
    if (fetchLogOut.loading) {
      _loadKey && Portal.remove(_loadKey);
      _loadKey = Toast.loading('Loading...', 0);
    } else {
      _loadKey && Portal.remove(_loadKey);
    }
    if (fetchLogOut.error) {
      Toast.fail(fetchLogOut.message || '');
      // dispatch(resetAuthStatus());
    }
    if (fetchLogOut.data) {
      // onBack();
      // onBackToHome();
      openSignin();
    }

  }, [fetchLogOut]);

  const _logout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} keyboardDismissMode="interactive">
        <View style={styles.headerCardWrap}>
          <View style={styles.headerCard}>
            <View style={styles.avatarWrap}>
              <Image
                style={styles.avatar}
                source={require('../../assets/images/logo.jpeg')}
              />
            </View>
            {
              !token ? (
                <CommonTouchable
                  onPress={() => openSignin()}
                  style={{ paddingVertical: 20, paddingHorizontal: 30 }}
                >
                  <Text style={{ color: '#777777' }}>Disable</Text>
                </CommonTouchable>
              ) : (
                <Text style={{ color: '#777777' }}>{name}</Text>
              )
            }
          </View>
        </View>
        <View style={{ width: '100%', marginTop: 90, paddingHorizontal: 40 }}>
          {
            token ? (
              <Button type="primary" onPress={() => _logout()}>
                Logout
              </Button>
            ) : null
          }
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarWrap: {
    width: 60,
    height: 60,
    borderRadius: 60,
    position: 'absolute',
    top: -25,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  headerCardWrap: {
    width: '100%',
    alignItems: 'center',
    height: 174,
    backgroundColor: '#3D7EFF',
  },
  headerCard: {
    marginTop: 84,
    width: 290,
    height: 120,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

Page.propTypes = {};
Page.defaultProps = {};

export default React.memo(Page);
