import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const JobSearchScreen = () => {
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState([]);

  const searchJobs = () => {
    // Function to fetch job data from an API or database
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for jobs..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={searchJobs}
      />
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.jobItem}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.location}>{item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  jobItem: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 16,
    color: '#888',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
});

export default JobSearchScreen;
