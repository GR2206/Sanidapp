import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';

const STORAGE_KEY = 'sanidapp_text_scale';

export const TEXT_SCALE_MIN = 0.9;
export const TEXT_SCALE_MAX = 1.45;
/** Incremento al tocar las letras A. */
export const TEXT_SCALE_BUTTON_STEP = 0.05;
const DEFAULT_SCALE = 1;

/** @deprecated Prefer TEXT_SCALE_MIN / MAX; se mantiene por compatibilidad. */
export const TEXT_SCALE_STEPS = [0.9, 1, 1.15, 1.3, 1.45] as const;
export type TextScaleStep = number;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface TextScaleContextValue {
  scale: number;
  canDecrease: boolean;
  canIncrease: boolean;
  setScale: (scale: number) => Promise<void>;
  /** Escala continua mientras se arrastra (sin animación brusca). */
  setScaleLive: (scale: number) => void;
  increase: () => Promise<void>;
  decrease: () => Promise<void>;
  /** Escala un tamaño en px (redondeo a 0.5). */
  s: (size: number) => number;
}

const TextScaleContext = createContext<TextScaleContextValue>({
  scale: DEFAULT_SCALE,
  canDecrease: false,
  canIncrease: true,
  setScale: async () => {},
  setScaleLive: () => {},
  increase: async () => {},
  decrease: async () => {},
  s: (size) => size,
});

export function clampTextScale(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_SCALE;
  const clamped = Math.min(TEXT_SCALE_MAX, Math.max(TEXT_SCALE_MIN, value));
  return Math.round(clamped * 100) / 100;
}

function animateScaleChange() {
  LayoutAnimation.configureNext({
    duration: 240,
    create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
    update: { type: LayoutAnimation.Types.easeInEaseOut },
    delete: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
  });
}

export function scalePx(size: number, scale: number): number {
  return Math.round(size * scale * 2) / 2;
}

export function TextScaleProvider({ children }: { children: ReactNode }) {
  const [scale, setScaleState] = useState(DEFAULT_SCALE);
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (!raw) return;
      const parsed = Number.parseFloat(raw);
      if (Number.isFinite(parsed)) {
        setScaleState(clampTextScale(parsed));
      }
    });
  }, []);

  const persistScale = useCallback((next: number, immediate = false) => {
    if (persistTimer.current) {
      clearTimeout(persistTimer.current);
      persistTimer.current = null;
    }
    const write = () => {
      void AsyncStorage.setItem(STORAGE_KEY, String(next));
    };
    if (immediate) {
      write();
      return;
    }
    persistTimer.current = setTimeout(write, 180);
  }, []);

  const setScale = useCallback(
    async (next: number) => {
      const clamped = clampTextScale(next);
      setScaleState(clamped);
      persistScale(clamped, true);
    },
    [persistScale],
  );

  const setScaleLive = useCallback(
    (next: number) => {
      const clamped = clampTextScale(next);
      setScaleState(clamped);
      persistScale(clamped, false);
    },
    [persistScale],
  );

  const increase = useCallback(async () => {
    const next = clampTextScale(scale + TEXT_SCALE_BUTTON_STEP);
    if (next === scale) return;
    animateScaleChange();
    await setScale(next);
  }, [scale, setScale]);

  const decrease = useCallback(async () => {
    const next = clampTextScale(scale - TEXT_SCALE_BUTTON_STEP);
    if (next === scale) return;
    animateScaleChange();
    await setScale(next);
  }, [scale, setScale]);

  const value = useMemo<TextScaleContextValue>(
    () => ({
      scale,
      canDecrease: scale > TEXT_SCALE_MIN + 0.001,
      canIncrease: scale < TEXT_SCALE_MAX - 0.001,
      setScale,
      setScaleLive,
      increase,
      decrease,
      s: (size: number) => scalePx(size, scale),
    }),
    [decrease, increase, scale, setScale, setScaleLive],
  );

  return <TextScaleContext.Provider value={value}>{children}</TextScaleContext.Provider>;
}

export function useTextScale(): TextScaleContextValue {
  return useContext(TextScaleContext);
}
