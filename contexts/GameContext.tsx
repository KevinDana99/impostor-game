import createContextHook from "@nkzw/create-context-hook";
import { useState, useCallback, useEffect } from "react";
import { GameConfig, GameMode, Player } from "@/types/game";
import { getRandomWordPair } from "@/constants/wordPairs";
import { router } from "expo-router";
import { Animated } from "react-native";

const createPlayer = (name: string): Player => ({
  id: Math.random().toString(36).substr(2, 9),
  name,
  isImpostor: false,
  isAlive: true,
  votes: 0,
});

export const [GameProvider, useGame] = createContextHook(() => {
  const [config, setConfig] = useState<GameConfig>({
    mode: "offline",
    players: [],
    impostorCount: 1,
    timerDuration: 5,
    currentWordPair: null,
    currentPlayerIndex: 0,
    phase: "setup",
    votedPlayers: new Set(),
    gameStartTime: null,
  });
  const INITIAL_TIME_STATE = config.timerDuration * 60;
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME_STATE);
  const [pulseAnim] = useState(new Animated.Value(1));

  const setGameMode = useCallback((mode: GameMode) => {
    setConfig((prev) => ({ ...prev, mode }));
  }, []);

  const addPlayer = useCallback((name: string) => {
    const player = createPlayer(name);
    setConfig((prev) => ({
      ...prev,
      players: [...prev.players, player],
    }));
  }, []);

  const removePlayer = useCallback((id: string) => {
    setConfig((prev) => {
      const players = prev.players.filter((p) => p.id !== id);
      console.log({ currentPlayers: players, id });
      return {
        ...prev,
        players: prev.players.filter((p) => p.id !== id),
      };
    });
  }, []);

  const setTimerDuration = useCallback((duration: number) => {
    setConfig((prev) => ({ ...prev, timerDuration: duration }));
  }, []);

  const setImpostorCount = useCallback((count: number) => {
    setConfig((prev) => ({ ...prev, impostorCount: count }));
  }, []);
  const getRandomInt = (max: number) => {
    const min = 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const startGame = useCallback(() => {
    const wordPair = getRandomWordPair();
    const shuffledPlayers = [...config.players].sort(() => Math.random() - 0.5);
    const randomIndex = getRandomInt(config.players.length - 1);
    const playersWithRoles = shuffledPlayers.map((player, index) => ({
      ...player,
      index,
      randomIndex,
      isImpostor: index === randomIndex,
      votes: 0,
    }));

    console.log({ playersWithRoles });

    setConfig((prev) => ({
      ...prev,
      players: playersWithRoles,
      currentWordPair: wordPair,
      currentPlayerIndex: 0,
      phase: "word-reveal",
      votedPlayers: new Set(),
    }));
  }, [config.players, config.impostorCount]);

  const nextPlayer = useCallback(() => {
    setConfig((prev) => {
      if (prev.currentPlayerIndex < prev.players.length - 1) {
        return {
          ...prev,
          currentPlayerIndex: prev.currentPlayerIndex + 1,
        };
      } else {
        return {
          ...prev,
          phase: "discussion",
          gameStartTime: Date.now(),
        };
      }
    });
  }, []);

  const startVoting = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      phase: "voting",
      players: prev.players.map((p) => ({ ...p, votes: 0 })),
      votedPlayers: new Set(),
    }));
  }, []);

  const handleResetVoting = () => {
    startVoting();
  };

  const castVote = useCallback((voterId: string, votedForId: string) => {
    setConfig((prev) => {
      const newVotedPlayers = new Set(prev.votedPlayers);
      newVotedPlayers.add(voterId);

      return {
        ...prev,
        players: prev.players.map((p) =>
          p.id === votedForId ? { ...p, votes: p.votes + 1 } : p
        ),
        votedPlayers: newVotedPlayers,
      };
    });
  }, []);

  const showResults = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      phase: "results",
    }));
  }, []);

  const resetGame = useCallback(() => {
    setConfig({
      mode: "offline",
      players: [],
      impostorCount: 1,
      timerDuration: 5,
      currentWordPair: null,
      currentPlayerIndex: 0,
      phase: "setup",
      votedPlayers: new Set(),
      gameStartTime: null,
    });
  }, []);
  const handleResetTime = () => {
    setTimeRemaining(INITIAL_TIME_STATE);
  };

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

  return {
    config,
    timeRemaining,
    pulseAnim,
    handleResetTime,
    resetVoting: handleResetVoting,
    setGameMode,
    addPlayer,
    removePlayer,
    setTimerDuration,
    setImpostorCount,
    startGame,
    nextPlayer,
    startVoting,
    castVote,
    showResults,
    resetGame,
  };
});
