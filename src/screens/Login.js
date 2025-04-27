import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('testpracticaluser001@mailinator.com');
  const [password, setPassword] = useState('Test@123');
  const [secureText, setSecureText] = useState(true);

  const login = async () => {
    try {
      const response = await fetch(
        'http://3.7.81.243/projects/plie-api/public/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      );

      const data = await response?.json();
      if (response.ok) {
        const token = data?.data?.token;
        if (token) {
          await AsyncStorage.setItem('accessToken', token);
          navigation.navigate('Home');
        } else {
          Alert.alert('Login Failed');
        }
      } else {
        Alert.alert('Login Failed' || 'Invalid credentials');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Login Error', 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex1}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar backgroundColor={'#d3d3d3'} />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}>
        <View style={styles.loginImageText}>
          <Text style={styles.logo}>Pliē</Text>

          <Image
            source={{uri: 'https://img.icons8.com/ios/100/image--v1.png'}}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.inputView}>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="email@email.com"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                style={styles.passwordInput}
                secureTextEntry={secureText}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable
                onPress={() => setSecureText(!secureText)}
                hitSlop={10}>
                <Ionicons
                  name={secureText ? 'eye-off' : 'eye'}
                  size={22}
                  color="gray"
                />
              </Pressable>
            </View>
          </View>

          <Pressable style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </Pressable>

          <Pressable style={styles.signInBtn} onPress={login}>
            <Text style={styles.signInText}>Sign In</Text>
          </Pressable>

          <Text style={styles.signupText}>
            Not a member? <Text style={styles.signupLink}>Sign Up Here</Text>
          </Text>

          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>or Sign In with:</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialIcons}>
            <Image
              source={require('../assets/google.png')}
              style={styles.icon}
            />
            <Image
              source={require('../assets/appleLogin.png')}
              style={styles.icon}
            />
            <Image
              source={require('../assets/facebook.png')}
              style={styles.icon}
            />
          </View>

          <Pressable style={styles.guestBtn}>
            <Text style={styles.guestText}>Enter as Guest</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  logo: {
    fontSize: 50,
    fontWeight: '600',
    marginTop: 20,
  },
  logoImage: {
    width: 40,
    height: 40,
    tintColor: 'black',
    marginBottom: 40,
    marginTop: 60,
  },
  inputBox: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    elevation: 2,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#828282',
  },
  signInBtn: {
    backgroundColor: '#21D393',
    padding: 14,
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 4,
    marginBottom: 20,
    width: '32%',
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupText: {
    marginBottom: 30,
    fontSize: 12,
    textAlign: 'right',
  },
  signupLink: {
    textDecorationLine: 'underline',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#4F4F4F',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#4F4F4F',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 30,
    alignSelf: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  guestBtn: {},
  guestText: {
    color: '#555',
    fontSize: 12,
    textAlign: 'right',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    elevation: 2,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  loginImageText: {
    backgroundColor: '#d3d3d3',
    width: '100%',
    alignItems: 'center',
    height: '40%',
    justifyContent: 'center',
  },
  inputView: {
    padding: 30,
    width: '100%',
    backgroundColor: 'white',
    flex: 1,
  },
});
