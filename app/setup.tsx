import { useRouter } from "expo-router";
import {
  UserPlus,
  Trash2,
  Play,
  Users,
  Clock,
  Target,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useGame } from "@/contexts/GameContext";

export default function SetupScreen() {
  const router = useRouter();
  const {
    config,
    addPlayer,
    removePlayer,
    setTimerDuration,
    setImpostorCount,
    startGame,
  } = useGame();
  const [playerName, setPlayerName] = useState("");

  const handleAddPlayer = () => {
    if (playerName.trim().length === 0) {
      Alert.alert("Error", "Por favor ingresa un nombre");
      return;
    }
    if (config.players.length >= 12) {
      Alert.alert("Límite alcanzado", "Máximo 12 jugadores");
      return;
    }
    addPlayer(playerName.trim());
    setPlayerName("");
  };

  const handleStartGame = () => {
    if (config.players.length < 3) {
      Alert.alert(
        "Jugadores insuficientes",
        "Necesitas al menos 3 jugadores para comenzar"
      );
      return;
    }
    if (config.impostorCount >= config.players.length) {
      Alert.alert("Error", "No pueden haber más impostores que jugadores");
      return;
    }
    startGame();
    router.push("/word-reveal");
  };

  const timerOptions = [5, 7, 10];
  const impostorOptions = [1, 2, 3];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#667EEA", "#764BA2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Text style={styles.backButtonText}>← Volver</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Configuración</Text>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Users size={24} color="#FFF" />
                <Text style={styles.sectionTitle}>
                  Jugadores ({config.players.length})
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre del jugador"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={playerName}
                  onChangeText={setPlayerName}
                  onSubmitEditing={handleAddPlayer}
                  returnKeyType="done"
                  maxLength={20}
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddPlayer}
                  activeOpacity={0.7}
                >
                  <UserPlus size={24} color="#FFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.playerList}>
                {config.players.map((player, index) => (
                  <View key={player.id} style={styles.playerCard}>
                    <View style={styles.playerInfo}>
                      <View style={styles.playerAvatar}>
                        <Text style={styles.playerAvatarText}>
                          {player.name.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <Text style={styles.playerName}>{player.name}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removePlayer(player.id)}
                      style={styles.deleteButton}
                    >
                      <Trash2 size={20} color="#FF6B6B" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Clock size={24} color="#FFF" />
                <Text style={styles.sectionTitle}>Tiempo de juego (min)</Text>
              </View>
              <View style={styles.optionsRow}>
                {timerOptions.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.optionButton,
                      config.timerDuration === time &&
                        styles.optionButtonActive,
                    ]}
                    onPress={() => setTimerDuration(time)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        config.timerDuration === time &&
                          styles.optionTextActive,
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Target size={24} color="#FFF" />
                <Text style={styles.sectionTitle}>Número de impostores</Text>
              </View>
              <View style={styles.optionsRow}>
                {impostorOptions.map((count) => (
                  <TouchableOpacity
                    key={count}
                    style={[
                      styles.optionButton,
                      config.impostorCount === count &&
                        styles.optionButtonActive,
                    ]}
                    onPress={() => setImpostorCount(count)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        config.impostorCount === count &&
                          styles.optionTextActive,
                      ]}
                    >
                      {count}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottomSpacer} />
          <View style={styles.containerStartButton}>
            <TouchableOpacity
              style={[
                styles.startButton,
                config.players.length < 3 && styles.startButtonDisabled,
              ]}
              onPress={handleStartGame}
              disabled={config.players.length < 3}
              activeOpacity={0.8}
            >
              <Play size={28} color="#FFF" fill="#FFF" />
              <Text style={styles.startButtonText}>Comenzar Juego</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFF",
  },
  title: {
    fontSize: 40,
    fontWeight: "900" as const,
    color: "#FFF",
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFF",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFF",
  },
  addButton: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 16,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  playerList: {
    gap: 12,
  },
  playerCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  playerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  playerAvatarText: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFF",
  },
  playerName: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "#FFF",
  },
  deleteButton: {
    padding: 8,
  },
  optionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  optionButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  optionButtonActive: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderColor: "#FFF",
  },
  optionText: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "rgba(255, 255, 255, 0.6)",
  },
  optionTextActive: {
    color: "#FFF",
  },
  containerStartButton: {
    position: "fixed",
    bottom: 40,
    padding: 24,
  },
  startButton: {
    position: "relative",
    backgroundColor: "#4ECDC4",
    borderRadius: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  startButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    shadowOpacity: 0,
    elevation: 0,
  },
  startButtonText: {
    fontSize: 22,
    fontWeight: "800" as const,
    color: "#FFF",
  },
  bottomSpacer: {
    height: 40,
  },
});
