import { useRouter } from "expo-router";
import { AlertCircle, Users as UsersIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useGame } from "@/contexts/GameContext";

export default function GameScreen() {
  const router = useRouter();
  const { config, startVoting, timeRemaining, pulseAnim } = useGame();

  console.log("pase por game");
  const handleVoting = () => {
    startVoting();
    router.push("/voting");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = timeRemaining / (config.timerDuration * 60);
  const isWarning = timeRemaining < 60;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={isWarning ? ["#FF6B6B", "#EE5A6F"] : ["#667EEA", "#764BA2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Discusión</Text>
            <Text style={styles.headerSubtitle}>
              Hablen entre ustedes y descubran al impostor
            </Text>
          </View>

          <View style={styles.timerSection}>
            <Animated.View
              style={[
                styles.timerCircle,
                {
                  transform: [{ scale: isWarning ? pulseAnim : 1 }],
                },
              ]}
            >
              <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
              <Text style={styles.timerLabel}>restante</Text>
            </Animated.View>

            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${progress * 100}%`,
                    backgroundColor: isWarning ? "#FF6B6B" : "#4ECDC4",
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <UsersIcon size={32} color="#FFF" />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Jugadores activos</Text>
                <Text style={styles.infoValue}>{config.players.length}</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <AlertCircle size={32} color="#FF6B6B" />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Impostores</Text>
                <Text style={styles.infoValue}>{config.impostorCount}</Text>
              </View>
            </View>
          </View>

          <View style={styles.playersSection}>
            <Text style={styles.playersTitle}>Jugadores</Text>
            <ScrollView
              style={styles.playersList}
              contentContainerStyle={styles.playersListContent}
              showsVerticalScrollIndicator={false}
            >
              {config.players.map((player, index) => (
                <View key={player.id} style={styles.playerItem}>
                  <View style={styles.playerAvatar}>
                    <Text style={styles.playerAvatarText}>
                      {player.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.playerItemName}>{player.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={handleVoting}
            activeOpacity={0.8}
          >
            <AlertCircle size={28} color="#FFF" />
            <Text style={styles.emergencyButtonText}>
              Votación de Emergencia
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
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "900" as const,
    color: "#FFF",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  timerSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  timerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 8,
    borderColor: "#FFF",
    marginBottom: 24,
  },
  timerText: {
    fontSize: 56,
    fontWeight: "900" as const,
    color: "#FFF",
  },
  timerLabel: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  progressBarContainer: {
    width: "100%",
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  infoSection: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 24,
    fontWeight: "800" as const,
    color: "#FFF",
  },
  playersSection: {
    flex: 1,
    marginBottom: 20,
  },
  playersTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFF",
    marginBottom: 12,
  },
  playersList: {
    flex: 1,
  },
  playersListContent: {
    gap: 8,
  },
  playerItem: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  playerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  playerAvatarText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFF",
  },
  playerItemName: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFF",
  },
  emergencyButton: {
    backgroundColor: "#FF6B6B",
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
    elevation: 8,
  },
  emergencyButtonText: {
    fontSize: 20,
    fontWeight: "800" as const,
    color: "#FFF",
  },
});
