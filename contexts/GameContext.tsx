import createContextHook from "@nkzw/create-context-hook";
import { useState, useCallback } from "react";
import { GameConfig, GameMode, Player } from "@/types/game";
import { getRandomWordPair } from "@/constants/wordPairs";

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
    setConfig((prev) => ({
      ...prev,
      players: prev.players.filter((p) => p.id !== id),
    }));
  }, []);

  const setTimerDuration = useCallback((duration: number) => {
    setConfig((prev) => ({ ...prev, timerDuration: duration }));
  }, []);

  const setImpostorCount = useCallback((count: number) => {
    setConfig((prev) => ({ ...prev, impostorCount: count }));
  }, []);

  const startGame = useCallback(() => {
    const wordPair = getRandomWordPair();
    const shuffledPlayers = [...config.players].sort(() => Math.random() - 0.5);

    const playersWithRoles = shuffledPlayers.map((player, index) => ({
      ...player,
      isImpostor: index < config.impostorCount,
      votes: 0,
    }));

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

  return {
    config,
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
