import { useRouter } from "expo-router";
import { Trophy, XCircle, Home, RotateCcw, Crown } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useGame } from "@/contexts/GameContext";

export default function ResultsScreen() {
  const router = useRouter();
  const { config, resetGame } = useGame();
  const sortedPlayers = [...config.players].sort((a, b) => b.votes - a.votes);
  const selectedPlayer = sortedPlayers[0];
  const checkedVoting = () => {
    const equals = sortedPlayers.every(
      (player) => player.votes === sortedPlayers[0].votes && player.votes !== 0
    );
    console.log({ equals }, "estas en results");
    if (equals) {
      router.push({
        pathname: "/preliminary",
        params: {
          id: 999,
          equal: 1,
          isImpostor: 0,
        },
      });
      return;
    } else {
      router.push({
        pathname: "/preliminary",
        params: {
          id: selectedPlayer.id,
          isImpostor: selectedPlayer.isImpostor ? 1 : 0,
          equal: null,
        },
      });
      return;
    }
  };

  const mostVoted = selectedPlayer;
  const civiliansWon = mostVoted && mostVoted.isImpostor;

  const handlePlayAgain = () => {
    //resetGame();
    router.push("/setup");
  };

  const handleGoHome = () => {
    resetGame();
    router.push("/");
  };

  useEffect(() => {
    checkedVoting();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={civiliansWon ? ["#4ECDC4", "#44A08D"] : ["#FF6B6B", "#EE5A6F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            {civiliansWon ? (
              <Trophy size={80} color="#FFF" strokeWidth={2.5} />
            ) : (
              <XCircle size={80} color="#FFF" strokeWidth={2.5} />
            )}
            <Text style={styles.title}>
              {civiliansWon ? "¡CIVILES GANARON!" : "¡IMPOSTORES GANARON!"}
            </Text>
            <Text style={styles.subtitle}>
              {civiliansWon ? "Atraparon al impostor" : "El impostor escapó"}
            </Text>
          </View>

          <View style={styles.eliminatedSection}>
            <Text style={styles.sectionTitle}>Jugador Eliminado</Text>
            {mostVoted && (
              <View style={styles.eliminatedCard}>
                <View style={styles.eliminatedBadge}>
                  <Crown size={32} color="#FFD700" fill="#FFD700" />
                </View>
                <View style={styles.eliminatedAvatar}>
                  <Text style={styles.eliminatedAvatarText}>
                    {mostVoted.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.eliminatedName}>{mostVoted.name}</Text>
                <View
                  style={[
                    styles.roleBadge,
                    mostVoted.isImpostor
                      ? styles.impostorBadge
                      : styles.civilBadge,
                  ]}
                >
                  <Text style={styles.roleBadgeText}>
                    {mostVoted.isImpostor ? "IMPOSTOR" : "CIVIL"}
                  </Text>
                </View>
                <Text style={styles.votesText}>{mostVoted.votes} votos</Text>
              </View>
            )}
          </View>

          <View style={styles.wordSection}>
            <Text style={styles.sectionTitle}>Las Palabras</Text>
            <View style={styles.wordCards}>
              <View style={styles.wordCard}>
                <Text style={styles.wordLabel}>CIVILES</Text>
                <Text style={styles.wordText}>
                  {config.currentWordPair?.mainWord}
                </Text>
              </View>
              <View style={styles.wordCard}>
                <Text style={styles.wordLabel}>IMPOSTOR</Text>
                <Text style={styles.wordText}>
                  {config.currentWordPair?.impostorWord}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.rolesSection}>
            <Text style={styles.sectionTitle}>Roles de Jugadores</Text>
            <View style={styles.rolesList}>
              {config.players.map((player) => (
                <View key={player.id} style={styles.roleCard}>
                  <View style={styles.rolePlayerInfo}>
                    <View style={styles.roleAvatar}>
                      <Text style={styles.roleAvatarText}>
                        {player.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.rolePlayerName}>{player.name}</Text>
                  </View>
                  <View
                    style={[
                      styles.roleTag,
                      player.isImpostor ? styles.impostorTag : styles.civilTag,
                    ]}
                  >
                    <Text
                      style={[
                        styles.roleTagText,
                        player.isImpostor
                          ? styles.impostorTagText
                          : styles.civilTagText,
                      ]}
                    >
                      {player.isImpostor ? "IMPOSTOR" : "CIVIL"}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.votingSection}>
            <Text style={styles.sectionTitle}>Resultados de Votación</Text>
            <View style={styles.votesList}>
              {sortedPlayers.map((player, index) => (
                <View key={player.id} style={styles.voteCard}>
                  <View style={styles.votePlayerInfo}>
                    <Text style={styles.voteRank}>#{index + 1}</Text>
                    <View style={styles.voteAvatar}>
                      <Text style={styles.voteAvatarText}>
                        {player.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.votePlayerName}>{player.name}</Text>
                  </View>
                  <Text style={styles.voteCount}>{player.votes}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <View style={styles.bottomSpacer} />
          <TouchableOpacity
            style={styles.playAgainButton}
            onPress={handlePlayAgain}
            activeOpacity={0.8}
          >
            <RotateCcw size={24} color="#FFF" />
            <Text style={styles.playAgainButtonText}>Jugar de Nuevo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={handleGoHome}
            activeOpacity={0.8}
          >
            <Home size={24} color="#FFF" />
            <Text style={styles.homeButtonText}>Menú Principal</Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    gap: 16,
  },
  title: {
    fontSize: 44,
    fontWeight: "900" as const,
    color: "#FFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "rgba(255, 255, 255, 0.9)",
  },
  eliminatedSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFF",
    marginBottom: 16,
  },
  eliminatedCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    gap: 16,
    position: "relative" as const,
  },
  eliminatedBadge: {
    position: "absolute" as const,
    top: 16,
    right: 16,
  },
  eliminatedAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#FFF",
  },
  eliminatedAvatarText: {
    fontSize: 48,
    fontWeight: "800" as const,
    color: "#FFF",
  },
  eliminatedName: {
    fontSize: 32,
    fontWeight: "900" as const,
    color: "#FFF",
  },
  roleBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  impostorBadge: {
    backgroundColor: "#FF6B6B",
  },
  civilBadge: {
    backgroundColor: "#4ECDC4",
  },
  roleBadgeText: {
    fontSize: 14,
    fontWeight: "800" as const,
    color: "#FFF",
    letterSpacing: 1,
  },
  votesText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "rgba(255, 255, 255, 0.9)",
  },
  wordSection: {
    marginBottom: 32,
  },
  wordCards: {
    flexDirection: "row",
    gap: 12,
  },
  wordCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    gap: 8,
  },
  wordLabel: {
    fontSize: 12,
    fontWeight: "800" as const,
    color: "#636E72",
    letterSpacing: 1,
  },
  wordText: {
    fontSize: 24,
    fontWeight: "800" as const,
    color: "#2D3436",
  },
  rolesSection: {
    marginBottom: 32,
  },
  rolesList: {
    gap: 12,
  },
  roleCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rolePlayerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  roleAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  roleAvatarText: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFF",
  },
  rolePlayerName: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFF",
  },
  roleTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  impostorTag: {
    backgroundColor: "#FF6B6B",
    borderWidth: 1,
    borderColor: "#F4F4F4",
  },
  civilTag: {
    backgroundColor: "rgba(78, 205, 196, 0.3)",
    borderWidth: 1,
    borderColor: "#F4F4F4",
  },
  roleTagText: {
    fontSize: 11,
    fontWeight: "800" as const,
    letterSpacing: 0.5,
  },
  impostorTagText: {
    color: "#F4F4F4",
  },
  civilTagText: {
    color: "#F4F4F4",
  },
  votingSection: {
    marginBottom: 32,
  },
  votesList: {
    gap: 12,
  },
  voteCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  votePlayerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  voteRank: {
    fontSize: 16,
    fontWeight: "800" as const,
    color: "rgba(255, 255, 255, 0.6)",
    width: 32,
  },
  voteAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  voteAvatarText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFF",
  },
  votePlayerName: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFF",
  },
  voteCount: {
    fontSize: 24,
    fontWeight: "800" as const,
    color: "#FFF",
  },
  buttonsContainer: {
    position: "fixed",
    gap: 16,
    marginBottom: 20,
    bottom: 40,
    padding: 24,
  },
  playAgainButton: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 20,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  playAgainButtonText: {
    fontSize: 18,
    fontWeight: "800" as const,
    color: "#FFF",
  },
  homeButton: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 20,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: "800" as const,
    color: "#FFF",
  },
  bottomSpacer: {
    height: 40,
  },
});
