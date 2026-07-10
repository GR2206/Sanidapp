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

import { useAuth } from '@/contexts/AuthContext';
import type { UserProfile } from '@/types/auth';
import type { Sanatorio } from '@/types/sanatorio';
import { getLocalSanatorio } from '@/services/firebase/authService';
import { palette } from '@/theme/colors';

export interface SanatorioTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  logoUrl: string | null;
  fontFamily: string;
  logoAspectRatio: number;
  homeLogoScale: number;
  logoShape: 'horizontal' | 'circle';
  circleLogoFit: 'cover' | 'contain';
  circleLogoInset: number;
  circleLogoCoverScale: number;
  dashboardHeaderLogoCoverScale: number;
  dashboardWatermarkCoverScale: number;
  dashboardWatermarkCircle: boolean;
  dashboardLogoBlendBackground: boolean;
  dashboardHeaderLogoInset: number | null;
  dashboardWatermarkLogoInset: number | null;
  boldAccentText: boolean;
  neutralChrome: boolean;
  transparentMenu: boolean;
  alternateButtonColors: boolean;
}

const DEFAULT_THEME: SanatorioTheme = {
  primary: palette.accent,
  secondary: palette.backgroundSoft,
  accent: palette.accent,
  background: palette.background,
  logoUrl: null,
  fontFamily: 'Inter',
  logoAspectRatio: 0.28,
  homeLogoScale: 1,
  logoShape: 'horizontal',
  circleLogoFit: 'cover',
  circleLogoInset: 1,
  circleLogoCoverScale: 1,
  dashboardHeaderLogoCoverScale: 1,
  dashboardWatermarkCoverScale: 1,
  dashboardWatermarkCircle: false,
  dashboardLogoBlendBackground: false,
  dashboardHeaderLogoInset: null,
  dashboardWatermarkLogoInset: null,
  boldAccentText: false,
  neutralChrome: false,
  transparentMenu: false,
  alternateButtonColors: false,
};

const ADMIN_PREVIEW_STORAGE_KEY = 'sanidapp_admin_preview_sanatorio_id';

interface SanatorioThemeContextValue {
  sanatorio: Sanatorio | null;
  theme: SanatorioTheme;
  hasBranding: boolean;
  isAdminPreview: boolean;
  previewSanatorioId: string | null;
  setPreviewSanatorioId: (sanatorioId: string | null) => Promise<void>;
}

const SanatorioThemeContext = createContext<SanatorioThemeContextValue>({
  sanatorio: null,
  theme: DEFAULT_THEME,
  hasBranding: false,
  isAdminPreview: false,
  previewSanatorioId: null,
  setPreviewSanatorioId: async () => {},
});

function themeFromSanatorio(sanatorio: Sanatorio): SanatorioTheme {
  return {
    primary: sanatorio.branding.primary,
    secondary: sanatorio.branding.secondary,
    accent: sanatorio.branding.accent,
    background: sanatorio.branding.background,
    logoUrl: sanatorio.branding.logoUrl,
    fontFamily: sanatorio.branding.fontFamily,
    logoAspectRatio: sanatorio.branding.logoAspectRatio ?? 0.28,
    homeLogoScale: sanatorio.branding.homeLogoScale ?? 1,
    logoShape: sanatorio.branding.logoShape ?? 'horizontal',
    circleLogoFit: sanatorio.branding.circleLogoFit ?? 'cover',
    circleLogoInset: sanatorio.branding.circleLogoInset ?? 0.86,
    circleLogoCoverScale: sanatorio.branding.circleLogoCoverScale ?? 1,
    dashboardHeaderLogoCoverScale: sanatorio.branding.dashboardHeaderLogoCoverScale ?? 1,
    dashboardWatermarkCoverScale: sanatorio.branding.dashboardWatermarkCoverScale ?? 1,
    dashboardWatermarkCircle: sanatorio.branding.dashboardWatermarkCircle ?? false,
    dashboardLogoBlendBackground: sanatorio.branding.dashboardLogoBlendBackground ?? false,
    dashboardHeaderLogoInset: sanatorio.branding.dashboardHeaderLogoInset ?? null,
    dashboardWatermarkLogoInset: sanatorio.branding.dashboardWatermarkLogoInset ?? null,
    boldAccentText: sanatorio.branding.boldAccentText ?? false,
    neutralChrome: sanatorio.branding.neutralChrome ?? false,
    transparentMenu: sanatorio.branding.transparentMenu ?? false,
    alternateButtonColors: sanatorio.branding.alternateButtonColors ?? false,
  };
}

interface SanatorioThemeProviderProps {
  profile: UserProfile | null;
  children: ReactNode;
}

export function SanatorioThemeProvider({ profile, children }: SanatorioThemeProviderProps) {
  const { isAdmin } = useAuth();
  const [previewSanatorioId, setPreviewSanatorioIdState] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      setPreviewSanatorioIdState(null);
      return;
    }

    AsyncStorage.getItem(ADMIN_PREVIEW_STORAGE_KEY).then((value) => {
      setPreviewSanatorioIdState(value || null);
    });
  }, [isAdmin]);

  const setPreviewSanatorioId = useCallback(
    async (sanatorioId: string | null) => {
      if (!isAdmin) {
        return;
      }

      if (sanatorioId) {
        await AsyncStorage.setItem(ADMIN_PREVIEW_STORAGE_KEY, sanatorioId);
      } else {
        await AsyncStorage.removeItem(ADMIN_PREVIEW_STORAGE_KEY);
      }

      setPreviewSanatorioIdState(sanatorioId);
    },
    [isAdmin],
  );

  /** Admin: solo aplica branding si eligió un sanatorio en vista previa; null = app original. */
  const activeSanatorioId = isAdmin
    ? previewSanatorioId
    : (profile?.sanatorioId ?? null);

  const sanatorio = activeSanatorioId ? getLocalSanatorio(activeSanatorioId) : null;
  const isAdminPreview = Boolean(isAdmin && previewSanatorioId && sanatorio);
  const hasBranding = Boolean(
    sanatorio && (sanatorio.status === 'ready' || isAdminPreview),
  );

  const theme: SanatorioTheme = sanatorio ? themeFromSanatorio(sanatorio) : DEFAULT_THEME;

  const value = useMemo<SanatorioThemeContextValue>(
    () => ({
      sanatorio,
      theme,
      hasBranding,
      isAdminPreview,
      previewSanatorioId: isAdmin ? previewSanatorioId : null,
      setPreviewSanatorioId,
    }),
    [
      hasBranding,
      isAdmin,
      isAdminPreview,
      previewSanatorioId,
      sanatorio,
      setPreviewSanatorioId,
      theme,
    ],
  );

  return (
    <SanatorioThemeContext.Provider value={value}>{children}</SanatorioThemeContext.Provider>
  );
}

export function useSanatorioTheme(): SanatorioThemeContextValue {
  return useContext(SanatorioThemeContext);
}
