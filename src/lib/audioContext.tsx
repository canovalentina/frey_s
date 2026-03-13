"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";

export interface Track {
  id: string;
  title: string;
  artist?: string;
  audioUrl: string;
  coverUrl?: string;
  duration?: number;
  album?: string;
}

interface AudioState {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  volume: number;
}

type AudioAction =
  | { type: "PLAY_TRACK"; track: Track; queue?: Track[] }
  | { type: "TOGGLE_PLAY" }
  | { type: "PAUSE" }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "SET_VOLUME"; volume: number }
  | { type: "CLOSE" };

const initialState: AudioState = {
  currentTrack: null,
  queue: [],
  isPlaying: false,
  volume: 0.8,
};

function audioReducer(state: AudioState, action: AudioAction): AudioState {
  switch (action.type) {
    case "PLAY_TRACK":
      return {
        ...state,
        currentTrack: action.track,
        queue: action.queue ?? state.queue,
        isPlaying: true,
      };
    case "TOGGLE_PLAY":
      return { ...state, isPlaying: !state.isPlaying };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "NEXT": {
      const idx = state.queue.findIndex((t) => t.id === state.currentTrack?.id);
      const next = state.queue[idx + 1] ?? null;
      return { ...state, currentTrack: next, isPlaying: !!next };
    }
    case "PREV": {
      const idx = state.queue.findIndex((t) => t.id === state.currentTrack?.id);
      const prev = state.queue[Math.max(0, idx - 1)] ?? null;
      return { ...state, currentTrack: prev, isPlaying: !!prev };
    }
    case "SET_VOLUME":
      return { ...state, volume: action.volume };
    case "CLOSE":
      return { ...state, currentTrack: null, isPlaying: false };
    default:
      return state;
  }
}

interface AudioContextValue {
  state: AudioState;
  playTrack: (track: Track, queue?: Track[]) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  setVolume: (volume: number) => void;
  close: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(audioReducer, initialState);

  const playTrack = useCallback((track: Track, queue?: Track[]) => {
    dispatch({ type: "PLAY_TRACK", track, queue });
  }, []);

  const togglePlay = useCallback(() => dispatch({ type: "TOGGLE_PLAY" }), []);
  const next = useCallback(() => dispatch({ type: "NEXT" }), []);
  const prev = useCallback(() => dispatch({ type: "PREV" }), []);
  const setVolume = useCallback(
    (volume: number) => dispatch({ type: "SET_VOLUME", volume }),
    []
  );
  const close = useCallback(() => dispatch({ type: "CLOSE" }), []);

  return (
    <AudioContext.Provider
      value={{ state, playTrack, togglePlay, next, prev, setVolume, close }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
}
