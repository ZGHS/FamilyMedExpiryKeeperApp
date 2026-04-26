import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Camera, CameraPermissionRequestResult, useCameraDevices } from 'react-native-vision-camera';
import { NavigationProps } from '../types';

const ScanScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const result: CameraPermissionRequestResult = await Camera.requestCameraPermission();
    setHasPermission(result.granted);
    
    if (!result.granted) {
      Alert.alert(
        '相机权限',
        '需要相机权限才能扫码',
        [
          { text: '取消', style: 'cancel' },
          { text: '去设置', onPress: () => {} },
        ]
      );
    }
  };

  const handleBarcodeScanned = (event: any) => {
    if (scanned) return;
    
    setScanned(true);
    const { barcode } = event;
    
    // 这里可以根据条形码获取药品信息
    // 暂时直接跳转到手动录入界面，填充扫码结果
    navigation.navigate('ManualInput', { barcode: barcode });
  };

  const handleRetry = () => {
    setScanned(false);
  };

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>无法获取相机设备</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>需要相机权限</Text>
        <TouchableOpacity style={styles.button} onPress={requestCameraPermission}>
          <Text style={styles.buttonText}>请求权限</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerEnabled={true}
      />
      <View style={styles.overlay}>
        <View style={styles.scanArea} />
        <Text style={styles.scanText}>请将条形码对准扫描框</Text>
      </View>
      {scanned && (
        <View style={styles.scanComplete}>
          <Text style={styles.scanCompleteText}>扫描完成</Text>
          <TouchableOpacity style={styles.button} onPress={handleRetry}>
            <Text style={styles.buttonText}>重新扫描</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    borderRadius: 10,
  },
  scanText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  scanComplete: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanCompleteText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ScanScreen;
