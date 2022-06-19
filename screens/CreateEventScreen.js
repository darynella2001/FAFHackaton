import React, {useState} from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateEventScreen = ({navigation}) => {

    
    const [data, setData] = React.useState({
        lat: '',
        long: '',
        start_time: undefined,
        end_time: undefined,
        name: '',
        description: '',
        address: ' ',
        category: ''
    });

    const titleInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                name: val,
            });
        }
    }

    const handleDescription = (val) => {
        setData({
            ...data,
            description: val
        });
    }
    const latitudeChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                lat: val,
            });
        }
    }

    const longitudeChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                long: val,
            });
        }
    }


    const handleCategory = (val) => {
        setData({
            ...data,
            category: val
        });
    };

    const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };


    // findCoordinates = () => {
    //     navigator.geolocation.getCurrentPosition(
    //       position => {
    //         const location = JSON.stringify(position);
    
    //         setState({ location });
    // "      },
    //       error => Alert.alert(error.message),
    //       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //     );
    //   };

    const  [category, setCategory]=useState("Sports");
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#FF6347' barStyle="light-content"/>
          <View style={styles.header}>
            <Text style={styles.text_header}>Create Event!</Text>


            
            <TextInput placeholder="Event Title"
                    style={styles.textInput}
                    onChangeText={(val) => titleInputChange(val)}/>
            
                        
            
            <TextInput placeholder="Event Description"
            style={styles.textInput}
            onChangeText={(val) => titleDescription(val)}/>  
           
            <TextInput placeholder="Latitude"
            style={styles.textInput}
            onChangeText={(val) => latitudeChange(val)}/> 
            <TextInput placeholder="Longitude"
            style={styles.textInput}
            onChangeText={(val) => longitudeChange(val)}/> 
 

        <Picker
			selectedValue={category}
            onValueChange={currentCategory => setCategory(currentCategory)}>
            <Picker.Item label="Sports" value="Sports"/>
            <Picker.Item label="Concerts" value="Concerts"/>
            <Picker.Item label="Party" value="Party"/>
            <Picker.Item label="Kids" value="Kids"/>
            <Picker.Item label="Cultural Events" value="Cultural Events"/>
		</Picker>

        {!isPickerShow && (
        <View style={styles.btnContainer}>
          <Button title="Show Picker" color="purple" onPress={showPicker} />
        </View>
      )}

      {/* The date picker */}
      {isPickerShow && (
        <DateTimePicker
          value={date}
          mode={'datetime'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={false}
          onChange={onChange}
          style={styles.datePicker}
        />
      )}

        <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {loginHandle( data.lat, data.long,data.start_time, data.end_time, data.name, data.description,data.address, data.category )}}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

            </View>
        </View>
          
          
        
       


          {/* <StatusBar backgroundColor='#FF6347' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
       
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="hand-point-up"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Event Title"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => titleInputChange(val)}
                />
                 
                
            </View> */}

            {/* <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {}}
                >
                <LinearGradient
                    colors={['#FFA07A', '#FF6347']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#FF6347',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#FF6347'
                    }]}>Sign In</Text>
                </TouchableOpacity> */}


                {/* <TouchableOpacity onPress={findCoordinates}>
                <Text style={styles.welcome}>Find My Coords?</Text>
                <Text>Location: {this.state.location}</Text>
        </TouchableOpacity> */}
            {/* </View> */}
           
       
      </View>
    );
};

export default CreateEventScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      justifyContent: "center"
    //   backgroundColor: '#5ceb8b'
    },
    header: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 30
    },
    text:{
        color:"#000",
        fontSize: 25
    },
    text_footer: {
        color: '#05375a',
        fontSize: 25    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    text_input:{
        flex:1,
        marginTop:Platform.OS === 'ios'? 0 : -12, 
        paddingLeft:10,
        color:"#05375a",
    },
    textInput: {
        // justifyContent:'flex-start',
        // marginTop: Platform.OS === 'ios' ? 1 : -12,
        paddingLeft: 20,
        paddingTop: 15,
        fontSize: 20,
        paddingBottom :10, 
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });