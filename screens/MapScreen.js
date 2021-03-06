import * as React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { markers, mapDarkStyle, mapStandardStyle } from '../assets/data';
import { StyleSheet, Text, View, Dimensions, Image, TextInput, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useEffect, useState } from 'react';
import { getAllEvents } from '../services/events-service';
import image from '../assets/1.jpg'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapScreen = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            const events = await getAllEvents();
            return events;
        }
        getEvents().then(response => setEvents(response.data)).catch(error => console.log(error));
    }, []);

    useEffect(() => {console.log(events)}, [events])


    const theme = useTheme();

    const initialMapState = {
        markers,
        categories: [
            {
                name: 'Concert',
                icon: <MaterialCommunityIcons style={styles.chipsIcon} name="music" size={18} />,
            },
            {
                name: 'Sports',
                icon: <Ionicons name="ios-basketball" style={styles.chipsIcon} size={18} />,
            },
            {
                name: 'Party',
                icon: <MaterialCommunityIcons name="party-popper" style={styles.chipsIcon} size={18} />,
            },
            {
                name: 'Kids',
                icon: <MaterialCommunityIcons name="emoticon-happy" style={styles.chipsIcon} size={18} />,
            },
            {
                name: 'Competition',
                icon: <MaterialCommunityIcons name="drama-masks" style={styles.chipsIcon} size={15} />,
            },
            {
                name: 'Educational',
                icon: <MaterialCommunityIcons name="bookshelf" style={styles.chipsIcon} size={15} />,

            }
        ],
        region: {
            latitude: 47.0548114,
            longitude: 28.8563714,
            latitudeDelta: 0.045,
            longitudeDelta: 0.0321
        }
    };

    const [state, setState] = React.useState(initialMapState);
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);
    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= state.markers.length) {
                index = state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout
            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { coordinate } = state.markers[index];
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: state.region.latitudeDelta,
                            longitudeDelta: state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);

        });
    });
    const interpolations = events.map((event, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];
        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return { scale };
    });

    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }

    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);

    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                style={styles.map}
                customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}

                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
                mapPadding={{ bottom: 230 }}
                region={{
                    latitude: 47.0548114,
                    longitude: 28.8563714,
                    latitudeDelta: 0.045,
                    longitudeDelta: 0.0321
                }}
            >

                {events.map((event, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    return (
                        <MapView.Marker key={index} coordinate={{latitude: event.lat, longitude: event.lng}} onPress={(e) => onMarkerPress(e)}>
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                    source={require('../assets/pin.png')}
                                    style={[styles.marker, scaleStyle]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </MapView.Marker>
                    );
                })}
            </MapView>

            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Search event"
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 0 }}
                />
                <Ionicons name="ios-search" size={20} />
            </View>

            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={50}
                style={styles.chipsScrollView}
                contentInset={{ // iOS only
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 20
                }}
                contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0
                }}
            >
                {state.categories.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.chipsItem}>
                        {category.icon}
                        <Text>{category.name}</Text>
                    </TouchableOpacity>
                ))}

            </ScrollView>
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                {events.map((event, index) => (
                    <View style={styles.card} key={index}>
                        <Image
                            source={image}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                        <View style={styles.textContent}>
                            <Text numberOfLines={1} style={styles.cardtitle}>{event.name}</Text>
                            <Text numberOfLines={1} style={styles.cardDescription}>{event.description}</Text>
                            <View style={styles.button}>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    style={[styles.signIn, {
                                        borderColor: '#FF6347',
                                        borderWidth: 1
                                    }]}>
                                    <Text style={[styles.textSign, {
                                        color: '#FF6347'
                                    }]}>Interested</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>

        </View>
    );
}
export default MapScreen;



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: '100%'
    },
    image: {
        width: '100%',
        height: 80,

    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 15 : 5,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 64
    },
    marker: {
        width: 22,
        height: 35,
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});