export interface Medicine {
  name: string;
  expiry_date: string;
  category?: string;
  quantity?: number;
  remark?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface NavigationProps {
  navigation: any;
  route: any;
}
