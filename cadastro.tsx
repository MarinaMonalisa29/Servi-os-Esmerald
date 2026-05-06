import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Colors } from "../constants/Colors";
import { authService } from "../services/api";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [termos, setTermos] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function criar() {
    if (!nome || !email || !senha || !confirmar) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }
    if (senha !== confirmar) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }
    if (!termos) {
      Alert.alert("Atenção", "Aceite os Termos de Uso para continuar.");
      return;
    }
    setCarregando(true);
    try {
      await authService.registro(nome.trim(), email.trim(), telefone, senha);
      router.replace("/(tabs)/home");
    } catch (e: any) {
      Alert.alert("Erro", e.response?.data?.erro || "Erro ao criar conta.");
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

        <Text style={styles.titulo}>Criar conta</Text>
        <Text style={styles.subtitulo}>Preencha seus dados</Text>

        <Text style={styles.label}>Nome completo</Text>
        <TextInput style={styles.input} placeholder="Seu nome" value={nome}
          onChangeText={setNome} placeholderTextColor={Colors.gray} />

        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} placeholder="seu@email.com" value={email}
          onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"
          placeholderTextColor={Colors.gray} />

        <Text style={styles.label}>Telefone</Text>
        <TextInput style={styles.input} placeholder="(00) 00000-0000" value={telefone}
          onChangeText={setTelefone} keyboardType="phone-pad"
          placeholderTextColor={Colors.gray} />

        <Text style={styles.label}>Senha</Text>
        <View style={styles.inputSenha}>
          <TextInput style={styles.inputSenhaField} placeholder="••••••••"
            value={senha} onChangeText={setSenha} secureTextEntry={!verSenha}
            placeholderTextColor={Colors.gray} />
          <TouchableOpacity onPress={() => setVerSenha(!verSenha)}>
            <Text style={styles.olho}>{verSenha ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput style={styles.input} placeholder="••••••••" value={confirmar}
          onChangeText={setConfirmar} secureTextEntry
          placeholderTextColor={Colors.gray} />

        <TouchableOpacity style={styles.termosRow} onPress={() => setTermos(!termos)}>
          <View style={[styles.checkbox, termos && styles.checkboxMarcado]}>
            {termos && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termosText}>
            Aceito os{" "}
            <Text style={styles.termosLink}>Termos de Uso</Text>
            {" "}e{" "}
            <Text style={styles.termosLink}>Política de Privacidade</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={criar} disabled={carregando}>
          {carregando ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.btnText}>Criar conta</Text>
          )}
        </TouchableOpacity>

        <View style={styles.rodape}>
          <Text style={styles.rodapeText}>Já tem conta? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.rodapeLink}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: Colors.white, padding: 24, paddingTop: 56 },
  voltar: { marginBottom: 16 },
  voltarText: { fontSize: 24, color: Colors.gray },
  titulo: { fontSize: 22, fontWeight: "600", color: Colors.primaryDark, marginBottom: 4 },
  subtitulo: { fontSize: 14, color: Colors.gray, marginBottom: 24 },
  label: { fontSize: 13, color: Colors.black, marginBottom: 6 },
  input: {
    borderWidth: 0.5, borderColor: Colors.grayBorder,
    borderRadius: 10, padding: 12, fontSize: 14, color: Colors.black, marginBottom: 12,
  },
  inputSenha: {
    flexDirection: "row", alignItems: "center",
    borderWidth: 0.5, borderColor: Colors.grayBorder,
    borderRadius: 10, paddingHorizontal: 12, marginBottom: 12,
  },
  inputSenhaField: { flex: 1, padding: 12, fontSize: 14, color: Colors.black },
  olho: { fontSize: 18 },
  termosRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 20 },
  checkbox: {
    width: 18, height: 18, borderRadius: 4,
    borderWidth: 0.5, borderColor: Colors.grayBorder,
    alignItems: "center", justifyContent: "center",
  },
  checkboxMarcado: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  checkmark: { color: Colors.white, fontSize: 12, fontWeight: "bold" },
  termosText: { flex: 1, fontSize: 13, color: Colors.gray, lineHeight: 18 },
  termosLink: { color: Colors.primary },
  btn: {
    backgroundColor: Colors.primary, padding: 15,
    borderRadius: 12, alignItems: "center", marginBottom: 16,
  },
  btnText: { color: Colors.white, fontSize: 16, fontWeight: "600" },
  rodape: { flexDirection: "row", justifyContent: "center" },
  rodapeText: { color: Colors.gray, fontSize: 13 },
  rodapeLink: { color: Colors.primary, fontSize: 13, fontWeight: "500" },
});
