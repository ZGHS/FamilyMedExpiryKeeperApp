import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NavigationProps } from '../types';

const ConfigScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [serverUrl, setServerUrl] = useState<string>('http://192.168.1.100:3000/api');

  const handleSave = () => {
    if (!serverUrl) {
      Alert.alert('错误', '请输入服务器地址');
      return;
    }
    
    // 简单的URL验证
    if (!serverUrl.startsWith('http://') && !serverUrl.startsWith('https://')) {
      Alert.alert('错误', '服务器地址必须以 http:// 或 https:// 开头');
      return;
    }

    // 保存服务器地址到AsyncStorage
    // 这里暂时使用内存存储，实际应用中应使用AsyncStorage
    global.serverUrl = serverUrl;
    
    Alert.alert('成功', '服务器地址已保存', [
      {
        text: '确定',
        onPress: () => navigation.navigate('Main'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>服务器配置</Text>
      <Text style={styles.label}>PC端服务器地址</Text>
      <TextInput
        style={styles.input}
        value={serverUrl}
        onChangeText={setServerUrl}
        placeholder="例如: http://192.168.1.100:3000/api"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>保存</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConfigScreen;
