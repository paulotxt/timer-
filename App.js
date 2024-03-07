import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const CronometroApp = () => {
  const [tempo, setTempo] = useState(0);
  const [running, setRunning] = useState(false);
  const [voltas, setVoltas] = useState([]);
  const cronometroRef = useRef(null);
  //Função para o botão do timer 
  const handleBotaoPress = () => {
    if (running) {
      clearInterval(cronometroRef.current);
      setRunning(false);
     
      setTempo(0);
      setVoltas([]);
    } else {
      cronometroRef.current = setInterval(() => {
        setTempo((prevTempo) => prevTempo + 0.1);
      }, 100);
      setRunning(true);
    }
  };
// funcao para marca o tenpo 
  const marcaTempo = () => {
    if (running) {
      setVoltas((prevVoltas) => [...prevVoltas, tempo.toFixed(1)]);
    }
  };
  //Função para zera o tenpo 
  const zerarTempo = () => {
    clearInterval(cronometroRef.current);
    setRunning(false);
    setTempo(0);
    setVoltas([]);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./SRC/img/coridas.png')} 
        style={styles.imagem}
      />
      <Text style={styles.contagem}>{tempo.toFixed(1)}s</Text>
      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botao} onPress={handleBotaoPress}>
          <Text>{running ? 'Zerar' : 'Iniciar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={marcaTempo}>
          <Text>Marca Tempo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.voltasContainer}>
        {voltas.map((volta, index) => (
          <Text key={index} style={styles.voltaItem}>{`Volta ${index + 1}: ${volta}s`}</Text>
        ))}
      </View>
    </View>
  );
};
 // Estilização
const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -190,
  },
  imagem: {
    width: 190, 
    height: 130, 
  },
  contagem: {
    fontSize: 40,
    marginVertical:20,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  botao: {
    backgroundColor:'blue',
    padding: 15,
    borderRadius: 8,
  },
  voltasContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  voltaItem: {
    fontSize: 20,
    marginBottom: 3,
  },
});

export default CronometroApp;
