import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationProps, Medicine } from '../types';
import { addMedicine } from '../services/api';

const ManualInputScreen: React.FC<NavigationProps> = ({ navigation, route }) => {
  const [medicine, setMedicine] = useState<Medicine>({
    name: '',
    expiry_date: '',
    category: '',
    quantity: 1,
    remark: '',
  });
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (route.params?.barcode) {
      // 这里可以根据条形码获取药品信息
      // 暂时只设置条形码值作为药品名称
      setMedicine(prev => ({
        ...prev,
        name: route.params.barcode,
      }));
    }
  }, [route.params]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setMedicine(prev => ({
        ...prev,
        expiry_date: formattedDate,
      }));
    }
  };

  const validateForm = (): boolean => {
    if (!medicine.name.trim()) {
      Alert.alert('错误', '请输入药品名称');
      return false;
    }
    if (!medicine.expiry_date) {
      Alert.alert('错误', '请选择有效期');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await addMedicine(medicine);
      navigation.navigate('Result', { success: response.success, message: response.message });
    } catch (error) {
      Alert.alert('错误', '发送失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>药品名称</Text>
        <TextInput
          style={styles.input}
          value={medicine.name}
          onChangeText={(text) => setMedicine(prev => ({ ...prev, name: text }))}
          placeholder="请输入药品名称"
        />

        <Text style={styles.label}>有效期</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{medicine.expiry_date || '请选择有效期'}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={medicine.expiry_date ? new Date(medicine.expiry_date) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>药品分类</Text>
        <TextInput
          style={styles.input}
          value={medicine.category}
          onChangeText={(text) => setMedicine(prev => ({ ...prev, category: text }))}
          placeholder="请输入药品分类（可选）"
        />

        <Text style={styles.label}>数量</Text>
        <TextInput
          style={styles.input}
          value={medicine.quantity?.toString()}
          onChangeText={(text) => setMedicine(prev => ({ ...prev, quantity: parseInt(text) || 1 }))}
          placeholder="请输入数量"
          keyboardType="numeric"
        />

        <Text style={styles.label}>备注</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={medicine.remark}
          onChangeText={(text) => setMedicine(prev => ({ ...prev, remark: text }))}
          placeholder="请输入备注（可选）"
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? '发送中...' : '发送'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#8E8E93',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ManualInputScreen;
