import { useRouter } from "expo-router";
import { Users, Wifi, WifiOff } from "lucide-react-native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useGame } from "@/contexts/GameContext";

export default function MainMenuScreen() {
  const router = useRouter();
  const { setGameMode } = useGame();

  const handleOfflineMode = () => {
    setGameMode("offline");
    router.push("/setup");
  };

  const handleOnlineMode = () => {
    setGameMode("online");
    router.push("/setup");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#FF6B6B", "#FFE66D", "#4ECDC4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Users size={80} color="#FFF" strokeWidth={2.5} />
            <Text style={styles.title}>IMPOSTOR</Text>
            <Text style={styles.subtitle}>¿Quién es el impostor?</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.modeButton}
              onPress={handleOfflineMode}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <WifiOff size={32} color="#FF6B6B" strokeWidth={2.5} />
                <Text style={styles.buttonTitle}>Modo Offline</Text>
                <Text style={styles.buttonSubtitle}>
                  Juega con amigos localmente
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modeButton, styles.onlineButton]}
              onPress={handleOnlineMode}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <Wifi size={32} color="#4ECDC4" strokeWidth={2.5} />
                <Text style={styles.buttonTitle}>Modo Online</Text>
                <Text style={styles.buttonSubtitle}>Próximamente...</Text>
              </View>
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>PRONTO</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Un juego de deducciones y mentiras
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
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 56,
    fontWeight: "900" as const,
    color: "#FFF",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "#FFF",
    opacity: 0.9,
  },
  buttonContainer: {
    gap: 20,
    paddingVertical: 20,
  },
  modeButton: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    position: "relative" as const,
  },
  onlineButton: {
    opacity: 0.7,
  },
  buttonContent: {
    alignItems: "center",
    gap: 12,
  },
  buttonTitle: {
    fontSize: 28,
    fontWeight: "800" as const,
    color: "#2D3436",
    marginTop: 4,
  },
  buttonSubtitle: {
    fontSize: 15,
    fontWeight: "500" as const,
    color: "#636E72",
  },
  comingSoonBadge: {
    position: "absolute" as const,
    top: 16,
    right: 16,
    backgroundColor: "#FFE66D",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  comingSoonText: {
    fontSize: 11,
    fontWeight: "800" as const,
    color: "#2D3436",
    letterSpacing: 1,
  },
  footer: {
    alignItems: "center",
    paddingTop: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#FFF",
    opacity: 0.8,
  },
});
