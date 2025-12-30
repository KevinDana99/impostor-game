import createContextHook from "@nkzw/create-context-hook";
import React, { useEffect, useState } from "react";
import { Animated } from "react-native";
import { useGame } from "./GameContext";

export const [TimerProvider, useTimer] = createContextHook(() => {
  const { config } = useGame();
  const INITIAL_TIME_STATE = config.timerDuration * 60;
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME_STATE);
  const [pulseAnim] = useState(new Animated.Value(1));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  const progress = timeRemaining / (config.timerDuration * 60);
  const isWarning = timeRemaining < 60;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);
  const handleResetTime = () => {
    setTimeRemaining(INITIAL_TIME_STATE);
  };

  return {
    timeRemaining,
    pulseAnim,
    progress,
    isWarning,
    handleResetTime,
    formatTime,
  };
});
