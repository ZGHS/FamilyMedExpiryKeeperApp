import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NavigationProps } from '../types';

const ResultScreen: React.FC<NavigationProps> = ({ navigation, route }) => {
  const { success, message } = route.params || {};

  const handleBackToHome = () => {
    navigation.navigate('Main');
  };

  const handleRetry = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.resultBox, success ? styles.successBox : styles.errorBox]}>
        <Text style={styles.resultIcon}>{success ? '✓' : '✗'}</Text>
        <Text style={styles.resultTitle}>{success ? '发送成功' : '发送失败'}</Text>
        <Text style={styles.resultMessage}>{message || (success ? '药品信息已成功发送到PC端' : '网络请求失败，请检查服务器配置')}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
          <Text style={styles.buttonText}>返回首页</Text>
        </TouchableOpacity>
        {!success && (
          <TouchableOpacity style={[styles.button, styles.retryButton]} onPress={handleRetry}>
            <Text style={styles.buttonText}>重新发送</Text>
          </TouchableOpacity>
        )}
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
    padding: 20,
  },
  resultBox: {
    width: '100%',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  successBox: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  errorBox: {
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#F44336',
  },
  resultIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  resultMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ResultScreen;
