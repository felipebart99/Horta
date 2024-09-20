import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function SensorScreen() {
  const [humidity, setHumidity] = useState(40); // Exemplo de umidade inicial
  const [imgUri, setImgUri] = useState();

  // Função para determinar a cor baseada na umidade
  const getHumidityColor = (value) => {
    if (value >= 60) {
      return "#4BF113";
    } else if (value >= 40) {
      return "#F0FF1F";
    } else {
      return "#FC0909";
    }
  };

  // Atualiza a imagem baseada na umidade, mas só quando o valor da umidade mudar
  useEffect(() => {
    if (humidity >= 60) {
      setImgUri(require("../img/nature-8658421_1280.png"));
    } else if (humidity >= 40) {
      setImgUri(require("../img/Árvore.png"));
    } else {
      setImgUri(require("../img/Árvore 2 (1).png"));
    }
  }, [humidity]); // O `useEffect` só será executado quando `humidity` mudar

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
            <Text style={styles.statusText}>Baixa</Text>
          </View>
          <View style={styles.statusItem}>
            <View
              style={[styles.statusSquare, { backgroundColor: "#FC0909" }]}
            />
            <Text style={styles.statusText}>Muito Baixa</Text>
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
