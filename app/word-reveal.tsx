import { useRouter } from "expo-router";
import { Eye, EyeOff, ChevronRight } from "lucide-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useGame } from "@/contexts/GameContext";
import { useTimer } from "@/contexts/TimerContext";

export default function WordRevealScreen() {
  const router = useRouter();
  const { config, nextPlayer } = useGame();
  const { handleResetTime } = useTimer();
  const [isRevealed, setIsRevealed] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const currentPlayer = config.players[config.currentPlayerIndex];
  const isLastPlayer = config.currentPlayerIndex === config.players.length - 1;

  const word = currentPlayer?.isImpostor
    ? config.currentWordPair?.impostorWord
    : config.currentWordPair?.mainWord;

  const handleReveal = () => {
    setIsRevealed(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleNext = () => {
    setIsRevealed(false);
    fadeAnim.setValue(0);
    if (isLastPlayer) {
      nextPlayer();
      handleResetTime();
      router.push("/game");
    } else {
      nextPlayer();
    }
  };

  if (!currentPlayer || !config.currentWordPair) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={
          currentPlayer.isImpostor && isRevealed
            ? ["#FF6B6B", "#EE5A6F"]
            : ["#4ECDC4", "#44A08D"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.turnCounter}>
              Jugador {config.currentPlayerIndex + 1} de {config.players.length}
            </Text>
          </View>

          <View style={styles.mainContent}>
            <View style={styles.playerCard}>
              <View style={styles.playerAvatar}>
                <Text style={styles.playerAvatarText}>
                  {currentPlayer.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.playerName}>{currentPlayer.name}</Text>
              <Text style={styles.instruction}>Es tu turno</Text>
            </View>

            {!isRevealed ? (
              <View style={styles.revealSection}>
                <View style={styles.hiddenCard}>
                  <EyeOff size={64} color="rgba(255, 255, 255, 0.5)" />
                  <Text style={styles.hiddenText}>Tu palabra está oculta</Text>
                  <Text style={styles.warningText}>
                    Asegúrate de que nadie más esté mirando
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.revealButton}
                  onPress={handleReveal}
                  activeOpacity={0.8}
                >
                  <Eye size={28} color="#FFF" />
                  <Text style={styles.revealButtonText}>Ver mi palabra</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Animated.View
                style={[styles.revealSection, { opacity: fadeAnim }]}
              >
                <View style={styles.wordCard}>
                  <Text
                    style={
                      currentPlayer.isImpostor
                        ? styles.roleLabelImpostor
                        : styles.roleLabel
                    }
                  >
                    {currentPlayer.isImpostor ? "IMPOSTOR" : "CIVIL"}
                  </Text>
                  <Text style={styles.word}>{word}</Text>
                  <Text style={styles.wordDescription}>
                    {currentPlayer.isImpostor
                      ? "Esta es tu pista. Los demás tienen otra palabra."
                      : "Esta es la palabra común del grupo."}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={handleNext}
                  activeOpacity={0.8}
                >
                  <Text style={styles.nextButtonText}>
                    {isLastPlayer ? "Comenzar juego" : "Siguiente jugador"}
                  </Text>
                  <ChevronRight size={28} color="#FFF" />
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Memoriza tu palabra y pásale el teléfono al siguiente jugador
            </Text>
          </View>
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
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
  },
  turnCounter: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    gap: 40,
  },
  playerCard: {
    alignItems: "center",
    gap: 16,
  },
  playerAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#FFF",
  },
  playerAvatarText: {
    fontSize: 48,
    fontWeight: "800" as const,
    color: "#FFF",
  },
  playerName: {
    fontSize: 36,
    fontWeight: "900" as const,
    color: "#FFF",
  },
  instruction: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "rgba(255, 255, 255, 0.9)",
  },
  revealSection: {
    gap: 24,
  },
  hiddenCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 24,
    padding: 40,
    alignItems: "center",
    gap: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderStyle: "dashed" as const,
  },
  hiddenText: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFF",
  },
  warningText: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  revealButton: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  revealButtonText: {
    fontSize: 22,
    fontWeight: "800" as const,
    color: "#FFF",
  },
  wordCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 40,
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: "800" as const,
    color: "#4ECDC4",
    letterSpacing: 2,
  },
  roleLabelImpostor: {
    fontSize: 14,
    fontWeight: "800" as const,
    color: "#FF6B6B",
    letterSpacing: 2,
  },
  word: {
    fontSize: 48,
    fontWeight: "900" as const,
    color: "#2D3436",
  },
  wordDescription: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#636E72",
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: "800" as const,
    color: "#FFF",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
});
