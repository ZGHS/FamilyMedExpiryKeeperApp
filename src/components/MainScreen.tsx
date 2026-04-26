import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NavigationProps } from '../types';

const MainScreen: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>家庭药品效期管家</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Scan')}
        >
          <Text style={styles.buttonText}>扫码录入</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ManualInput')}
        >
          <Text style={styles.buttonText}>手动录入</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.configButton}
          onPress={() => navigation.navigate('Config')}
        >
          <Text style={styles.configButtonText}>服务器配置</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 60,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  configButton: {
    backgroundColor: '#8E8E93',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 40,
  },
  configButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default MainScreen;
