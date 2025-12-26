import { useRouter } from "expo-router";
import { CheckCircle } from "lucide-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useGame } from "@/contexts/GameContext";

export default function VotingScreen() {
  const router = useRouter();
  const { config, castVote, showResults } = useGame();
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const currentVoter = config.players[currentVoterIndex];
  const isLastVoter = currentVoterIndex === config.players.length - 1;

  const handleVote = () => {
    if (!selectedPlayerId) {
      Alert.alert("Selecciona un jugador", "Debes votar por alguien");
      return;
    }

    castVote(currentVoter.id, selectedPlayerId);

    if (isLastVoter) {
      showResults();
      router.push("/results");
    } else {
      setCurrentVoterIndex((prev) => prev + 1);
      setSelectedPlayerId(null);
    }
  };

  if (!currentVoter) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#F093FB", "#F5576C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.turnCounter}>
              Voto {currentVoterIndex + 1} de {config.players.length}
            </Text>
            <Text style={styles.title}>Votación</Text>
          </View>

          <View style={styles.voterCard}>
            <View style={styles.voterAvatar}>
              <Text style={styles.voterAvatarText}>
                {currentVoter.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.voterName}>{currentVoter.name}</Text>
            <Text style={styles.instruction}>
              ¿Quién crees que es el impostor?
            </Text>
          </View>

          <View style={styles.playersSection}>
            <Text style={styles.sectionTitle}>Selecciona un jugador</Text>
            <ScrollView
              style={styles.playersList}
              contentContainerStyle={styles.playersListContent}
              showsVerticalScrollIndicator={false}
            >
              {config.players
                .filter((p) => p.id !== currentVoter.id)
                .map((player) => (
                  <TouchableOpacity
                    key={player.id}
                    style={[
                      styles.playerCard,
                      selectedPlayerId === player.id &&
                        styles.playerCardSelected,
                    ]}
                    onPress={() => setSelectedPlayerId(player.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.playerInfo}>
                      <View style={styles.playerAvatar}>
                        <Text style={styles.playerAvatarText}>
                          {player.name.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <Text style={styles.playerName}>{player.name}</Text>
                    </View>
                    {selectedPlayerId === player.id && (
                      <CheckCircle size={28} color="#4ECDC4" fill="#4ECDC4" />
                    )}
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          <TouchableOpacity
            style={[
              styles.voteButton,
              !selectedPlayerId && styles.voteButtonDisabled,
            ]}
            onPress={handleVote}
            disabled={!selectedPlayerId}
            activeOpacity={0.8}
          >
            <Text style={styles.voteButtonText}>
              {isLastVoter ? "Ver Resultados" : "Confirmar Voto"}
            </Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  turnCounter: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: "900" as const,
    color: "#FFF",
  },
  voterCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  voterAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFF",
  },
  voterAvatarText: {
    fontSize: 36,
    fontWeight: "800" as const,
    color: "#FFF",
  },
  voterName: {
    fontSize: 28,
    fontWeight: "800" as const,
    color: "#FFF",
  },
  instruction: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "rgba(255, 255, 255, 0.9)",
  },
  playersSection: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFF",
    marginBottom: 12,
  },
  playersList: {
    flex: 1,
  },
  playersListContent: {
    gap: 12,
  },
  playerCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "transparent",
  },
  playerCardSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderColor: "#FFF",
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  playerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    fontWeight: "700" as const,
    color: "#FFF",
  },
  voteButton: {
    backgroundColor: "#4ECDC4",
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  voteButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    shadowOpacity: 0,
    elevation: 0,
  },
  voteButtonText: {
    fontSize: 20,
    fontWeight: "800" as const,
    color: "#FFF",
  },
});
