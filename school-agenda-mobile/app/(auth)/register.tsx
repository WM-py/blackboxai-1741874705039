import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useUser } from '../../src/contexts/UserContext';
import Colors from '../../constants/Colors';

type Role = 'student' | 'teacher' | 'parent' | 'admin';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useUser();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);
      await signUp(email, password, {
        name,
        role,
      });
      router.replace('/(tabs)/calendar');
    } catch (error: any) {
      let errorMessage = 'Ocorreu um erro ao criar a conta';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email já está em uso';
      }
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const RoleButton: React.FC<{ title: string; value: Role }> = ({ title, value }) => (
    <TouchableOpacity
      style={[
        styles.roleButton,
        role === value && styles.roleButtonActive,
      ]}
      onPress={() => setRole(value)}
    >
      <ThemedText
        style={[
          styles.roleButtonText,
          role === value && styles.roleButtonTextActive,
        ]}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.content}>
          <ThemedText style={styles.title}>Criar Conta</ThemedText>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nome completo"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#666"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.showPasswordButton}
              >
                <FontAwesome
                  name={showPassword ? 'eye-slash' : 'eye'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#666"
              />
            </View>

            <ThemedText style={styles.roleLabel}>Você é:</ThemedText>
            <View style={styles.roleContainer}>
              <RoleButton title="Aluno" value="student" />
              <RoleButton title="Professor" value="teacher" />
              <RoleButton title="Responsável" value="parent" />
            </View>

            <TouchableOpacity
              style={[styles.registerButton, loading && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.registerButtonText}>Cadastrar</ThemedText>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.back()}
            >
              <ThemedText style={styles.loginButtonText}>
                Já tem uma conta? Faça login
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  showPasswordButton: {
    padding: 10,
  },
  roleLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: Colors.light.tint,
  },
  roleButtonText: {
    fontSize: 14,
    color: '#666',
  },
  roleButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    color: Colors.light.tint,
  },
});
