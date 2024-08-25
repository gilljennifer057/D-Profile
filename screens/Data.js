import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      console.log(response.data); // Log the response to check the data
      setData(response.data);
    } catch (err) {
      console.error(err); // Log the error to the console
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {data && (
        <View>
          <Text>Title: {data.title}</Text>
          <Text>Body: {data.body}</Text>
        </View>
      )}
      <Button title="Fetch Data" onPress={fetchData} />
    </View>
  );
};

export default App;

