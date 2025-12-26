export type Player = {
  id: string;
  name: string;
  isImpostor: boolean;
  isAlive: boolean;
  votes: number;
};

export type GameMode = "offline" | "online";

export type GamePhase =
  | "setup"
  | "word-reveal"
  | "discussion"
  | "voting"
  | "results";

export type WordPair = {
  mainWord: string;
  impostorWord: string;
};

export type GameConfig = {
  mode: GameMode;
  players: Player[];
  impostorCount: number;
  timerDuration: number;
  currentWordPair: WordPair | null;
  currentPlayerIndex: number;
  phase: GamePhase;
  votedPlayers: Set<string>;
  gameStartTime: number | null;
};
