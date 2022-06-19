import React, {useState, useEffect} from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { data } from '../model/data';
import Card from '../components/Card';
import { getEventsByCategory } from '../services/events-service';

const CardListScreen = ({ navigation, route }) => {

  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      const events = await getEventsByCategory(route.params.title);
      return events;
    }
    getEvents().then(response => setEvents(response.data)).catch(error => console.log(error));
  }, []);

  useEffect(() => { console.log(events) }, [events])

  const renderItem = ({ item }) => {
    return (
      <Card
        itemData={item}
        onPress={() => navigation.navigate('CardItemDetails', { itemData: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CardListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center'
  },
});