import React, { useEffect } from 'react';
import apiClient from '@/services/axios';

export default function TestApi() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('db2/users');
        console.log('User Data:', response.data);
      } catch (error) {
        console.error('API call failed:', error);
      }
    };

    fetchData();
  }, []);

  return <div>Check console for API response.</div>;
}
