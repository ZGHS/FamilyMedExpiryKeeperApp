import { Medicine, ApiResponse } from '../types';

const fetchWithTimeout = async (url: string, options: RequestInit, timeout: number): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const addMedicine = async (medicine: Medicine): Promise<ApiResponse<Medicine>> => {
  try {
    const serverUrl = (global as any).serverUrl || 'http://192.168.1.100:3000/api';
    
    const response = await fetchWithTimeout(`${serverUrl}/medicines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicine),
    }, 10000);

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
    const serverUrl = (global as any).serverUrl || 'http://192.168.1.100:3000/api';
    
    const response = await fetchWithTimeout(`${serverUrl}/health`, {
      method: 'GET',
    }, 5000);

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
