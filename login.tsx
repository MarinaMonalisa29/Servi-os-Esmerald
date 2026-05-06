import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Colors } from "../constants/Colors";
import { authService } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }
    setCarregando(true);
    try {
      await authService.login(email.trim(), senha);
      router.replace("/(tabs)/home");
    } catch (e: any) {
      Alert.alert("Erro", e.response?.data?.erro || "Credenciais inválidas.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.voltar} onPress={() => router.back()}>
          <Text style={styles.voltarText}>←</Text>
        </TouchableOpacity>

        <View style={styles.logoCircle}>
          <Text style={styles.gem}>💎</Text>
        </View>
        <Text style={styles.titulo}>Bem-vindo de volta</Text>
        <Text style={styles.subtitulo}>Entre na sua conta</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={Colors.gray}
        />

        <Text style={styles.label}>Senha</Text>
        <View style={styles.inputSenha}>
          <TextInput
            style={styles.inputSenhaField}
            placeholder="••••••••"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!verSenha}
            placeholderTextColor={Colors.gray}
          />
          <TouchableOpacity onPress={() => setVerSenha(!verSenha)}>
            <Text style={styles.olho}>{verSenha ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.esqueci}
          onPress={() => router.push("/recuperar-senha")}
        >
          <Text style={styles.esqueciText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={entrar}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.btnText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.btnGoogle}>
          <Text style={styles.btnGoogleText}>Entrar com Google</Text>
        </TouchableOpacity>

        <View style={styles.rodape}>
          <Text style={styles.rodapeText}>Não tem conta? </Text>
          <TouchableOpacity onPress={() => router.push("/cadastro")}>
            <Text style={styles.rodapeLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, backgroundColor: Colors.white,
    padding: 24, paddingTop: 56,
  },
  voltar: { marginBottom: 16 },
  voltarText: { fontSize: 24, color: Colors.gray },
  logoCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: Colors.primaryBg,
    alignItems: "center", justifyContent: "center",
    alignSelf: "center", marginBottom: 16,
  },
  gem: { fontSize: 32 },
  titulo: {
    fontSize: 22, fontWeight: "600", color: Colors.primaryDark,
    textAlign: "center", marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14, color: Colors.gray,
    textAlign: "center", marginBottom: 24,
  },
  label: { fontSize: 13, color: Colors.black, marginBottom: 6 },
  input: {
    borderWidth: 0.5, borderColor: Colors.grayBorder,
    borderRadius: 10, padding: 12, fontSize: 14,
    color: Colors.black, marginBottom: 12,
  },
  inputSenha: {
    flexDirection: "row", alignItems: "center",
    borderWidth: 0.5, borderColor: Colors.grayBorder,
    borderRadius: 10, paddingHorizontal: 12, marginBottom: 8,
  },
  inputSenhaField: { flex: 1, padding: 12, fontSize: 14, color: Colors.black },
  olho: { fontSize: 18 },
  esqueci: { alignSelf: "flex-end", marginBottom: 20 },
  esqueciText: { color: Colors.primary, fontSize: 13 },
  btn: {
    backgroundColor: Colors.primary, padding: 15,
    borderRadius: 12, alignItems: "center", marginBottom: 16,
  },
  btnText: { color: Colors.white, fontSize: 16, fontWeight: "600" },
  divider: {
    flexDirection: "row", alignItems: "center",
    gap: 8, marginBottom: 16,
  },
  dividerLine: { flex: 1, height: 0.5, backgroundColor: Colors.grayBorder },
  dividerText: { color: Colors.gray, fontSize: 13 },
  btnGoogle: {
    borderWidth: 0.5, borderColor: Colors.grayBorder,
    padding: 14, borderRadius: 12, alignItems: "center", marginBottom: 24,
  },
  btnGoogleText: { color: Colors.black, fontSize: 14 },
  rodape: { flexDirection: "row", justifyContent: "center" },
  rodapeText: { color: Colors.gray, fontSize: 13 },
  rodapeLink: { color: Colors.primary, fontSize: 13, fontWeight: "500" },
});
