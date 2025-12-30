import { useGame } from "@/contexts/GameContext";
import { useTimer } from "@/contexts/TimerContext";
import React, { useEffect, useState } from "react";
import { Text, Animated, View, StyleSheet } from "react-native";

const Timer = () => {
  const { formatTime, isWarning, progress, pulseAnim, timeRemaining } =
    useTimer();

  return (
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
  );
};

const styles = StyleSheet.create({
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
});

export default Timer;
