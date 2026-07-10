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
  getUiSoundsEnabled,
  primeUiSounds,
  setUiSoundsEnabled,
} from '@/services/audio/uiSoundService';

const STORAGE_KEY = 'sanidapp_ui_sounds_enabled';

interface SoundPreferencesContextValue {
  soundsEnabled: boolean;
  setSoundsEnabled: (enabled: boolean) => Promise<void>;
  toggleSounds: () => Promise<void>;
}

const SoundPreferencesContext = createContext<SoundPreferencesContextValue>({
  soundsEnabled: true,
  setSoundsEnabled: async () => {},
  toggleSounds: async () => {},
});

export function SoundPreferencesProvider({ children }: { children: ReactNode }) {
  const [soundsEnabled, setSoundsEnabledState] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (value === '0') {
          setSoundsEnabledState(false);
          setUiSoundsEnabled(false);
        } else {
          setSoundsEnabledState(true);
          setUiSoundsEnabled(true);
        }
      })
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated || !soundsEnabled) return;
    primeUiSounds();
  }, [hydrated, soundsEnabled]);

  const setSoundsEnabled = useCallback(async (next: boolean) => {
    setSoundsEnabledState(next);
    setUiSoundsEnabled(next);
    await AsyncStorage.setItem(STORAGE_KEY, next ? '1' : '0');
    if (next) {
      primeUiSounds();
    }
  }, []);

  const toggleSounds = useCallback(async () => {
    await setSoundsEnabled(!getUiSoundsEnabled());
  }, [setSoundsEnabled]);

  const value = useMemo(
    () => ({
      soundsEnabled,
      setSoundsEnabled,
      toggleSounds,
    }),
    [setSoundsEnabled, soundsEnabled, toggleSounds],
  );

  return (
    <SoundPreferencesContext.Provider value={value}>{children}</SoundPreferencesContext.Provider>
  );
}

export function useSoundPreferences(): SoundPreferencesContextValue {
  return useContext(SoundPreferencesContext);
}
