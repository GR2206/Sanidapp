import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'sanidapp_text_scale';

/** Pasos de tamaño (1 = normal). */
export const TEXT_SCALE_STEPS = [0.9, 1, 1.15, 1.3, 1.45] as const;
export type TextScaleStep = (typeof TEXT_SCALE_STEPS)[number];

const DEFAULT_SCALE: TextScaleStep = 1;

interface TextScaleContextValue {
  scale: TextScaleStep;
  canDecrease: boolean;
  canIncrease: boolean;
  setScale: (scale: TextScaleStep) => Promise<void>;
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
  increase: async () => {},
  decrease: async () => {},
  s: (size) => size,
});

function nearestStep(value: number): TextScaleStep {
  let best: TextScaleStep = DEFAULT_SCALE;
  let bestDist = Number.POSITIVE_INFINITY;
  for (const step of TEXT_SCALE_STEPS) {
    const dist = Math.abs(step - value);
    if (dist < bestDist) {
      best = step;
      bestDist = dist;
    }
  }
  return best;
}

export function scalePx(size: number, scale: number): number {
  return Math.round(size * scale * 2) / 2;
}

export function TextScaleProvider({ children }: { children: ReactNode }) {
  const [scale, setScaleState] = useState<TextScaleStep>(DEFAULT_SCALE);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (!raw) return;
      const parsed = Number.parseFloat(raw);
      if (Number.isFinite(parsed)) {
        setScaleState(nearestStep(parsed));
      }
    });
  }, []);

  const setScale = useCallback(async (next: TextScaleStep) => {
    setScaleState(next);
    await AsyncStorage.setItem(STORAGE_KEY, String(next));
  }, []);

  const increase = useCallback(async () => {
    const index = TEXT_SCALE_STEPS.indexOf(scale);
    if (index < TEXT_SCALE_STEPS.length - 1) {
      await setScale(TEXT_SCALE_STEPS[index + 1]);
    }
  }, [scale, setScale]);

  const decrease = useCallback(async () => {
    const index = TEXT_SCALE_STEPS.indexOf(scale);
    if (index > 0) {
      await setScale(TEXT_SCALE_STEPS[index - 1]);
    }
  }, [scale, setScale]);

  const value = useMemo<TextScaleContextValue>(() => {
    const index = TEXT_SCALE_STEPS.indexOf(scale);
    return {
      scale,
      canDecrease: index > 0,
      canIncrease: index < TEXT_SCALE_STEPS.length - 1,
      setScale,
      increase,
      decrease,
      s: (size: number) => scalePx(size, scale),
    };
  }, [decrease, increase, scale, setScale]);

  return <TextScaleContext.Provider value={value}>{children}</TextScaleContext.Provider>;
}

export function useTextScale(): TextScaleContextValue {
  return useContext(TextScaleContext);
}
