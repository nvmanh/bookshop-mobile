import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Platform, Dimensions, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import {
  WhiteSpace,
  ListView,
  Flex,
  Toast,
  Portal,
  List
} from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import LoadingSpinner from '../../components/LoadingSpinner';
import CommonEmptyView from '../../components/CommonEmptyView';
import CommonTouchable from '../../components/CommonTouchable';
import { RootState } from '../../store/types';
import actions, { book, Book } from '../../store/home/actions';
import { fetchService } from '../../store/fetchService';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

let _loadKey: number | null = null;
let _abortFetch: (() => void) | null = null;

const Page = () => {
  // const listViewRef = useRef<?>(null);
  const dispatch = useDispatch();

  const fetchList = useSelector((state: RootState) => state.home.fetchBook);

  const [currentPage, setCurrentPage] = useState(0);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // const [page] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [title, setTitle] = useState('');
  const [bookData, setBookData] = useState([]);

  const flastListRef = useRef<FlatList<Book>>(null);

  useEffect(() => {
    // handleStatusChange
    if (fetchList.loading) {
      if (currentPage === 0) {
        _loadKey && Portal.remove(_loadKey);
        _loadKey = Toast.loading('loading...', 0);
      }
    } else {
      _loadKey && Portal.remove(_loadKey);
    }
    if (fetchList.error) {
      setLoading(false);
      Toast.fail(fetchList.message || '');
      if (_abortFetch) {
        _abortFetch();
      }
    }
    if (fetchList.data) {
      const { content, totalPages } = fetchList.data;
      setBookData(content);
      setTotalPage(totalPages);
      setRefreshing(false);
      setLoading(false);
    }
  }, [fetchList]);

  const fetchData = () => {
    setLoading(true);
    dispatch(book({ pageNo: currentPage, pageSize: 10, descending: true }))
  }

  const renderHeader = () => {
    return (
      <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>
        `Test`
      </Text>
    );
  }

  const renderFooter = () => {
    console.log("loading >>>>>>", loading);

    if (!loading) {
      return (<View></View>);
    }
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}
      >
        <ActivityIndicator animating size='large' />
      </View>
    );
  }

  const handleRefresh = () => {
    setCurrentPage(1);
    fetchData();
  }

  const handleLoadMore = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      fetchData();
    } else {
      setLoading(false);
    }
  }

  const onPressItem = (item: any): void => {
    console.log(item);
  };

  const renderPaginationFetchingView = () => {
    if (currentPage === 0) {
      return null;
    }
    return <LoadingSpinner height={HEIGHT * 0.2} text="loading..." />;
  };

  const renderItem = (item: Book) => {
    return (
      <List.Item extra={item.price} arrow="horizontal" onPress={() => { }}>{item.name}</List.Item>
    );
  };

  return (
    <View style={styles.container}>

      <FlatList<Book>
        ref={flastListRef}
        data={bookData}
        keyExtractor={item => `${item.id}`}
        // ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        renderItem={({ item }) => {
          return renderItem(item);
        }}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f5',
  },
  label: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderBottomLeftRadius: 10,
  },
  itemContainer: {
    padding: 10,
    paddingRight: 0,
    margin: 10,
    marginBottom: 0,
    borderRadius: 2,
    backgroundColor: '#fff',
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
