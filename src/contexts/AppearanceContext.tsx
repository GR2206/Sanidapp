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

import {
  type AppearanceMode,
  resolveAppearanceIsDark,
} from '@/theme/dashboardColors';

const STORAGE_KEY = 'sanidapp_appearance_mode';

interface AppearanceContextValue {
  mode: AppearanceMode;
  isDark: boolean;
  setMode: (mode: AppearanceMode) => Promise<void>;
  cycleMode: () => Promise<void>;
}

const AppearanceContext = createContext<AppearanceContextValue>({
  mode: 'auto',
  isDark: false,
  setMode: async () => {},
  cycleMode: async () => {},
});

const MODE_ORDER: AppearanceMode[] = ['light', 'dark', 'auto'];

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AppearanceMode>('auto');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value === 'light' || value === 'dark' || value === 'auto') {
        setModeState(value);
      }
    });
  }, []);

  useEffect(() => {
    if (mode !== 'auto') return;

    const interval = setInterval(() => {
      setTick((value) => value + 1);
    }, 60_000);

    return () => clearInterval(interval);
  }, [mode]);

  const setMode = useCallback(async (next: AppearanceMode) => {
    setModeState(next);
    await AsyncStorage.setItem(STORAGE_KEY, next);
  }, []);

  const cycleMode = useCallback(async () => {
    const index = MODE_ORDER.indexOf(mode);
    const next = MODE_ORDER[(index + 1) % MODE_ORDER.length];
    await setMode(next);
  }, [mode, setMode]);

  const isDark = useMemo(() => resolveAppearanceIsDark(mode), [mode, tick]);

  const value = useMemo(
    () => ({
      mode,
      isDark,
      setMode,
      cycleMode,
    }),
    [cycleMode, isDark, mode, setMode],
  );

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>;
}

export function useAppearance(): AppearanceContextValue {
  return useContext(AppearanceContext);
}
