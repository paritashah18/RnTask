import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const WhishList = () => {
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

  const filteredEvents = eventData.filter(event =>
    wishlist.includes(event?.event_date_id),
  );

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          style={styles.eventImage}
          source={{
            uri: item?.event_profile_img ?? 'https://via.placeholder.com/80',
          }}
        />
        <View style={styles.infoContainer}>
          <View style={styles.rowSpaceBetween}>
            <Text style={styles.eventTitle}>{item?.event_name}</Text>
          </View>

          <View style={styles.rowSpaceBetween}>
            <Text style={styles.greenText}>{item?.readable_from_date}</Text>
            <Text style={styles.arrowText}>
              {item?.city
                ? `${item?.city}, ${item?.country}`
                : 'Unknown Location'}
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
          </View>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#34A853" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {filteredEvents.length > 0 ? (
        <FlatList
          data={filteredEvents}
          renderItem={renderItem}
          keyExtractor={item => item?.event_date_id?.toString()}
          contentContainerStyle={{padding: 8}}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Favourite Events Yet!</Text>
        </View>
      )}
    </View>
  );
};

export default WhishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    fontWeight: '600',
  },
});
