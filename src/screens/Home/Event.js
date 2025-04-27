import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toggleWishlist} from '../../redux/Slices/wishlist';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Event = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);

  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'http://3.7.81.243/projects/plie-api/public/api/events-listing',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:
              'Bearer 148|QwsMFixT9w9MgleAbukZtghUuKNZGxgR1SYDOVMk',
          },
          body: JSON.stringify({}),
        },
      );

      const json = await response.json();
      setEventData(json?.data?.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}) => {
    const inWishlist = wishlist.includes(item?.event_date_id);

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Image
            style={styles.eventImage}
            source={{
              uri: item?.event_profile_img,
            }}
          />
          <View style={styles.infoContainer}>
            <View style={styles.rowSpaceBetween}>
              <Text style={styles.eventTitle}>{item?.event_name}</Text>
              <Image
                source={require('../../assets/nextArrow.png')}
                style={styles.arrowIcon}
              />
            </View>

            <View style={styles.rowSpaceBetween}>
              <Text style={styles.greenText}>{item?.readable_from_date}</Text>
              <Text style={styles.arrowText}>
                `${item?.city}, ${item?.country}`
              </Text>
            </View>

            <Text style={styles.priceText}>{'€30 - €100'}</Text>

            <View style={styles.rowSpaceBetween}>
              <View style={styles.rowWrap}>
                {item?.danceStyles?.map(dsItem => (
                  <Pressable style={styles.tagButton} key={dsItem?.ds_id}>
                    <Text style={styles.tagText}>{dsItem?.ds_name}</Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.row}>
                <Pressable style={{marginRight: 8}}>
                  <Image
                    source={require('../../assets/share.png')}
                    style={styles.actionIcon}
                  />
                </Pressable>
                <Pressable
                  onPress={() => dispatch(toggleWishlist(item?.event_date_id))}
                  hitSlop={8}>
                  <Ionicons
                    name={inWishlist ? 'heart' : 'heart-outline'}
                    size={24}
                    color={inWishlist ? '#21D393' : 'black'}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#34A853" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{'Hello Renzo!'}</Text>
        <Text style={styles.desText}>{'Are you ready to dance?'}</Text>
      </View>
      <FlatList
        data={eventData}
        renderItem={renderItem}
        keyExtractor={item => item?.event_date_id?.toString()}
        contentContainerStyle={styles.flatlistContentStyle}
      />
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingVertical: 20,
  },
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  desText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#828282',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '70%',
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  greenText: {
    fontSize: 14,
    color: '#34A853',
  },
  arrowText: {
    fontSize: 12,
    color: '#666',
  },
  priceText: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
  },
  tagButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    margin: 2,
  },
  tagText: {
    fontSize: 12,
    color: '#333',
  },
  actionIcon: {
    width: 20,
    height: 20,
    tintColor: '#333',
  },
  arrowIcon: {
    width: 15,
    height: 15,
    tintColor: '#999',
  },
  flatlistContentStyle: {
    padding: 8,
    backgroundColor: '#F2F2F2',
    flex: 1,
    paddingTop: 20,
  },
});
