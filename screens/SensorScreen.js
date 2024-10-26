import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import axios from "axios";

export default function SensorScreen() {
  const [humidity, setHumidity] = useState(40); // Exemplo de umidade inicial
  const [imgUri, setImgUri] = useState();

  // Função para determinar a cor baseada na umidade
  const getHumidityColor = (value) => {
    if (value >= 400) {
      return "#FC0909";
    } else if (value >= 293) {
      return "#4BF113";
    } else {
      return "#F0FF1F";
    }
  };

  // Atualiza a imagem baseada na umidade, mas só quando o valor da umidade mudar
  useEffect(() => {
    if (humidity >= 400) {
      setImgUri(require("../img/Árvore 2 (1).png"));
    } else if (humidity >= 293) {
      setImgUri(require("../img/nature-8658421_1280.png"));
    } else {
      setImgUri(require("../img/Árvore.png"));
    }
  }, [humidity]); // O useEffect só será executado quando humidity mudar

  // Função para buscar a umidade do servidor
  const fetchHumidity = async () => {
    try {
      const response = await axios.get("http://192.168.1.12:3000/humidity");
      setHumidity(response.data.humidity); // Supondo que o JSON retornado seja { "humidity": value }
    } catch (error) {
      console.error("Erro ao buscar a umidade:", error);
    }
  };

  // Faz a chamada para buscar a umidade de 1 em 1 segundos
  useEffect(() => {
    // Busca a umidade imediatamente
    fetchHumidity();

    // Configura o intervalo para buscar a umidade a cada 1 segundos (1000 milissegundos)
    const intervalId = setInterval(fetchHumidity, 1000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []); // O useEffect será executado uma vez ao montar o componente

  return (
    <View style={styles.container}>
      {/* Imagem grande */}
      <Image
        source={imgUri} // Usa a URI da imagem dinâmica
        style={styles.largeImage}
      />

      {/* Container para status e umidade */}
      <View style={styles.mainContent}>
        {/* Seção com quadrados coloridos e textos */}
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <View
              style={[styles.statusSquare, { backgroundColor: "#4BF113" }]}
            />
            <Text style={styles.statusText}>Ideal</Text>
          </View>
          <View style={styles.statusItem}>
            <View
              style={[styles.statusSquare, { backgroundColor: "#F0FF1F" }]}
            />
            <Text style={styles.statusText}>Alta</Text>
          </View>
          <View style={styles.statusItem}>
            <View
              style={[styles.statusSquare, { backgroundColor: "#FC0909" }]}
            />
            <Text style={styles.statusText}>Baixa</Text>
          </View>
        </View>

        {/* Seção com título e valor de umidade */}
        <View style={styles.humidityContainer}>
          <Text style={styles.humidityTitle}>Umidade</Text>
          <Text
            style={[
              styles.humidityValue,
              { backgroundColor: getHumidityColor(humidity) },
            ]}
          >
            {humidity}%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  largeImage: {
    width: "100%", // Ajuste conforme necessário
    height: 600, // Ajuste conforme necessário
    resizeMode: "contain", // Ajuste conforme necessário
    marginTop: 20,
    marginBottom: 20,
  },
  mainContent: {
    flexDirection: "row",
    alignItems: "flex-start", // Alinha no topo
    width: "100%",
  },
  statusContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginRight: 20, // Espaçamento entre os status e a umidade
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statusSquare: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
  },
  humidityContainer: {
    flexDirection: "column",
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center",
    flex: 1, // Ocupa o espaço restante
    marginTop: -50,
  },
  humidityTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  humidityValue: {
    fontSize: 32,
    padding: 30,
    borderRadius: 50,
  },
});
