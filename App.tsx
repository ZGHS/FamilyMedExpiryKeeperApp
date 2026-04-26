import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './src/components/MainScreen';
import ConfigScreen from './src/components/ConfigScreen';
import ScanScreen from './src/components/ScanScreen';
import ManualInputScreen from './src/components/ManualInputScreen';
import ResultScreen from './src/components/ResultScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Main" component={MainScreen} options={{ title: '首页' }} />
        <Stack.Screen name="Config" component={ConfigScreen} options={{ title: '服务器配置' }} />
        <Stack.Screen name="Scan" component={ScanScreen} options={{ title: '扫码录入' }} />
        <Stack.Screen name="ManualInput" component={ManualInputScreen} options={{ title: '手动录入' }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: '操作结果' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
