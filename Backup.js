import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Modal, Text, Alert, TouchableOpacity, FlatList, ImageBackground,} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import { Appbar, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';



const DiaryScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);

  useEffect(() => {
    fetchDiaryEntries();
  }, []);

  const fetchDiaryEntries = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await axios.get('https://45a6-2001-8f8-1f10-5156-f131-44b3-b650-1afc.ngrok-free.app/api/diary', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDiaryEntries(response.data.data);
    } catch (error) {
      console.error('Error fetching diary entries:', error);
      Alert.alert('Error', 'Failed to fetch diary entries');
    }
  };
  
  const handleAddEntry = async () => {
    try {
      const response = await axios.post('https://45a6-2001-8f8-1f10-5156-f131-44b3-b650-1afc.ngrok-free.app/api/diary', { title, description });
      setTitle('');
      setDescription('');
      fetchDiaryEntries();
    } catch (error) {
      console.error('Error adding entry:', error);
      Alert.alert('Error', 'Failed to add entry');
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      const response = await axios.delete(`https://45a6-2001-8f8-1f10-5156-f131-44b3-b650-1afc.ngrok-free.app/api/diary/${id}`);
      fetchDiaryEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
      Alert.alert('Error', 'Failed to delete entry');
    }
  };

  const handleEditEntry = (diaryEntry) => {
    setCurrentEntry(diaryEntry);
    setTitle(diaryEntry.title);
    setDescription(diaryEntry.description);
    setEditModalVisible(true);
  };

  const handleUpdateEntry = async () => {
    if (currentEntry && title && description) {
      try {
        const response = await axios.put(`https://45a6-2001-8f8-1f10-5156-f131-44b3-b650-1afc.ngrok-free.app/api/diary/${currentEntry.id}`, { title, description });
        setTitle('');
        setDescription('');
        setCurrentEntry(null);
        setEditModalVisible(false);
        fetchDiaryEntries();
      } catch (error) {
        console.error('Error updating entry:', error);
        Alert.alert('Error', 'Failed to update entry');
      }
    } else {
      Alert.alert('Error', 'Title and description cannot be empty');
    }
    
  };
  
  const handleLogout =  async () => {
    await AsyncStorage.removeItem("token");

    navigation.navigate("Login");
  };

  const renderItem = ({ item }) => (
    <View style={styles.diaryItem}>
      <Text style={styles.diaryTitle}>{item.title}</Text>
      <Text style={styles.diaryDescription}>{item.description}</Text>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeText}>{moment(item.created_at).format('YYYY-MM-DD')}</Text>
        <Text style={styles.dateTimeText}>{moment(item.created_at).format('HH:mm')}</Text>
      </View>
      <View style={styles.diaryActions}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#313D61' }]}
          onPress={() => handleEditEntry(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'gray', marginLeft: 20 }]}
          onPress={() => handleDeleteEntry(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground source={require('../assets/R.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content  />
        <IconButton
          icon="logout"
          size={24}
          onPress={handleLogout} 
        />
      </Appbar.Header>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Write your diary entry here..."
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#313D61' }]}
          onPress={handleAddEntry}
        >
          <Text style={styles.buttonText}>Add Entry</Text>
        </TouchableOpacity>
        <FlatList
          data={diaryEntries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />

        <Modal
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Entry</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Write your diary entry here..."
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#313D61' }]}
              onPress={handleUpdateEntry}
            >
              <Text style={styles.buttonText}>Update Entry</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'gray' }]}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop:30,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Keep the input background semi-transparent for readability
  },
  button: {
    backgroundColor: '#313D61',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Keep the modal background semi-transparent for readability
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  diaryItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Keep the diary item background semi-transparent for readability
  },
  diaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  diaryDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeText: {
    fontSize: 12,
    color: '#666',
  },
  diaryActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

export default DiaryScreen;
