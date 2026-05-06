import React, { useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions,
} from "react-native";
import { router } from "expo-router";
import { Colors } from "../constants/Colors";

const { width } = Dimensions.get("window");

const slides = [
  {
    icon: "🔍",
    titulo: "Encontre serviços",
    descricao: "Busque profissionais qualificados perto de você com facilidade e rapidez.",
  },
  {
    icon: "🛡️",
    titulo: "Contrate com segurança",
    descricao: "Todos os profissionais são verificados e avaliados pela comunidade.",
  },
  {
    icon: "⭐",
    titulo: "Avalie e confie",
    descricao: "Avalie os serviços e ajude outros usuários a encontrar os melhores profissionais.",
  },
];

export default function OnBoarding() {
  const [atual, setAtual] = useState(0);

  function proximo() {
    if (atual < slides.length - 1) {
      setAtual(atual + 1);
    } else {
      router.replace("/login");
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.pular} onPress={() => router.replace("/login")}>
        <Text style={styles.pularText}>Pular</Text>
      </TouchableOpacity>

      <View style={styles.slide}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>{slides[atual].icon}</Text>
        </View>
        <Text style={styles.titulo}>{slides[atual].titulo}</Text>
        <Text style={styles.descricao}>{slides[atual].descricao}</Text>
      </View>

      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, i === atual && styles.dotAtivo]} />
        ))}
      </View>

      <TouchableOpacity style={styles.btn} onPress={proximo}>
        <Text style={styles.btnText}>
          {atual === slides.length - 1 ? "Começar" : "Próximo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: Colors.white,
    alignItems: "center", justifyContent: "center", padding: 24,
  },
  pular: { position: "absolute", top: 56, right: 24 },
  pularText: { color: Colors.gray, fontSize: 14 },
  slide: { alignItems: "center", marginBottom: 40 },
  iconWrap: {
    width: 120, height: 120, borderRadius: 24,
    backgroundColor: Colors.primaryBg,
    alignItems: "center", justifyContent: "center", marginBottom: 28,
  },
  icon: { fontSize: 56 },
  titulo: {
    fontSize: 22, fontWeight: "600", color: Colors.primaryDark,
    textAlign: "center", marginBottom: 12,
  },
  descricao: {
    fontSize: 15, color: Colors.gray, textAlign: "center",
    lineHeight: 22, paddingHorizontal: 12,
  },
  dots: { flexDirection: "row", gap: 8, marginBottom: 32 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#C0DD97" },
  dotAtivo: { width: 20, borderRadius: 4, backgroundColor: Colors.primary },
  btn: {
    width: width - 48, backgroundColor: Colors.primary,
    padding: 16, borderRadius: 12, alignItems: "center",
  },
  btnText: { color: Colors.white, fontSize: 16, fontWeight: "600" },
});
