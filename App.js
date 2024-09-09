import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, StatusBar, useWindowDimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard, useColorScheme } from 'react-native';

export default function App() {
  const { width, height } = useWindowDimensions(); 
  const [orientation, setOrientation] = useState('portrait');
  const colorScheme = useColorScheme();

  const getOrientation = () => (width < height ? 'portrait' : 'landscape');

  useEffect(() => {
    setOrientation(getOrientation()); 
  }, [width, height]);

  const imageWidth = width * 0.8;

  useEffect(() => {
    const backgroundColor = colorScheme === 'dark' ? '#67BF7F' : '#CD5C5C';
    const barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(backgroundColor); 
    }
    StatusBar.setBarStyle(barStyle); 
  }, [colorScheme]); 

  return (
    <>
      <View>
        <StatusBar translucent={false} />
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
            <Image
              source={require('./assets/6955957.png')}   
              style={[
                styles.image,
                { 
                  width: imageWidth, 
                  height: orientation === 'portrait' ? imageWidth * 0.6 : height * 0.3,
                }
              ]}
              resizeMode="contain"
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập tên bạn"
            />
            <View style={[
              orientation === 'portrait' ? styles.verticalLayout : styles.horizontalLayout,
            ]}>
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { 
                    width: orientation === 'portrait' ? 150 : 200,
                    height: orientation === 'portrait' ? 50 : 60,
                  }
                ]}
                onPress={() => alert('1')}
              >
                <Text style={styles.buttonText}>Button 1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { 
                    width: orientation === 'portrait' ? 150 : 200,
                    height: orientation === 'portrait' ? 50 : 60,
                  }
                ]}
                onPress={() => alert('2')}
              >
                <Text style={styles.buttonText}>Button 2</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.select({
      ios: 20,
      android: 10,
    }),
    minHeight: '100%', 
  },
  image: {
    marginBottom: 20,
  },
  verticalLayout: {
    flexDirection: 'column',
  },
  horizontalLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    margin: 5,
    borderRadius: 15,
    backgroundColor: '#007BFF', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    paddingHorizontal: 10,
    marginBottom: 20,
    padding: Platform.select({
      ios: 15,
      android: 10,
    }),
  },
});
