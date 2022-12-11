
import { createRef, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Participant } from '../../components/Participant';
import { styles } from "./styles";

export function Home() {
  const [ participants, setParticipants] = useState<string[]>([]);
  const [ participant, setParticipant] = useState<string>('');

  const handleAddParticipant = (): void => {
    if(participants.includes(participant)) {
      Alert.alert("participante ja existe");
      console.error("participante ja existe");
      return;
    }

    setParticipants((prevState) => ([participant, ...prevState]))
    setParticipant('');
  }

  const handleRemoveParticipant = (name: string): void => {
    Alert.alert('', `remover participante ${name}?`, [
      {
        text: 'sim',
        onPress: () => {
          setParticipants((prevState) => {
            prevState.splice(prevState.indexOf(name), 1);
            return [...prevState];
          });
        }
      },
      {
        text: 'não'
      }
    ])


    participants.splice(participants.indexOf(name),1);
    setParticipants([...participants]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>
      
      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022,
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={(text) => setParticipant(text)}
          value={participant}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddParticipant}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant name={item} onRemove={handleRemoveParticipant} />
        )}
      />
    </View>
  )
}