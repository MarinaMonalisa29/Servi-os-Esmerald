import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { Colors } from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";

export default function SplashScreen() {
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem("@emerald:token");

      if (token) {
        router.replace("/(tabs)/home");
      } else {
        setShowQR(true);
      }
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Text style={styles.gem}>💎</Text>
      </View>

      <Text style={styles.title}>SERVIÇOS EMERALD</Text>
      <Text style={styles.subtitle}>marketplace de serviços</Text>

      {showQR ? (
        <>
          <Text style={styles.qrText}>Escaneie para entrar</Text>

          <QRCode
            value="https://seu-site.com/login"
            size={200}
          />
        </>
      ) : (
        <ActivityIndicator
          style={styles.loader}
          color={Colors.primaryLight}
          size="small"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e8e8e8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  gem: { fontSize: 52 },

  title: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 2,
    textAlign: "center",
  },

  subtitle: {
    color: Colors.primaryLight,
    fontSize: 14,
    marginTop: 6,
    marginBottom: 30,
  },

  qrText: {
    color: Colors.white,
    marginBottom: 16,
    fontSize: 16,
  },

  loader: { marginTop: 8 },
});
