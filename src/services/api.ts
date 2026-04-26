import { Medicine, ApiResponse } from '../types';

export const addMedicine = async (medicine: Medicine): Promise<ApiResponse<Medicine>> => {
  try {
    const serverUrl = global.serverUrl || 'http://192.168.1.100:3000/api';
    
    const response = await fetch(`${serverUrl}/medicines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicine),
      timeout: 10000, // 10秒超时
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<Medicine> = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding medicine:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络请求失败',
    };
  }
};

export const healthCheck = async (): Promise<ApiResponse<{ message: string }>> => {
  try {
    const serverUrl = global.serverUrl || 'http://192.168.1.100:3000/api';
    
    const response = await fetch(`${serverUrl}/health`, {
      method: 'GET',
      timeout: 5000, // 5秒超时
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<{ message: string }> = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking server health:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '服务器连接失败',
    };
  }
};
