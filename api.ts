import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:3000/api";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@emerald:token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authService = {
  async login(email: string, senha: string) {
    const { data } = await api.post("/usuarios/login", { email, senha });
    await AsyncStorage.setItem("@emerald:token", data.token);
    await AsyncStorage.setItem("@emerald:usuario", JSON.stringify(data.usuario));
    return data;
  },
  async registro(nome: string, email: string, telefone: string, senha: string) {
    const { data } = await api.post("/usuarios/registro", { nome, email, telefone, senha });
    await AsyncStorage.setItem("@emerald:token", data.token);
    await AsyncStorage.setItem("@emerald:usuario", JSON.stringify(data.usuario));
    return data;
  },
  async recuperarSenha(email: string) {
    const { data } = await api.post("/usuarios/recuperar-senha", { email });
    return data;
  },
  async logout() {
    await AsyncStorage.removeItem("@emerald:token");
    await AsyncStorage.removeItem("@emerald:usuario");
  },
  async getUsuarioLocal() {
    const u = await AsyncStorage.getItem("@emerald:usuario");
    return u ? JSON.parse(u) : null;
  },
};

export const ufService = {
  async listar() {
    const { data } = await api.get("/ufs");
    return data;
  },
};

export const cidadeService = {
  async listar() {
    const { data } = await api.get("/cidades");
    return data;
  },
  async porUF(ufId: number) {
    const { data } = await api.get(`/cidades/uf/${ufId}`);
    return data;
  },
};

export default api;
