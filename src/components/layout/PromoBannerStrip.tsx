import { Image } from 'expo-image';
import { router, type Href } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

import { LogoMark } from '@/components/ui/LogoMark';
import { FittingBannerText } from '@/components/ui/FittingBannerText';
import { Typography } from '@/components/ui/Typography';
import type { BannerSlot } from '@/types/banner';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

const BANNER_MIN_HEIGHT = 52;
const BANNER_MAX_HEIGHT = 88;
const BANNER_INSET = 20;
/** Sombra estándar de banners en toda la app (todos los sanatorios). */
const BANNER_SHADOW = {
  shadowColor: palette.text,
  shadowOpacity: 0.12,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 6 },
  elevation: 5,
} as const;
/** Margen mínimo al borde del recuadro para el logo en inicio. */
const HOME_LOGO_EDGE_MARGIN = 2;
const HOME_LOGO_SCALE = 2.25;
const HOME_TITLE_FONT_SIZE = 12;
const HOME_SUBTITLE_FONT_SIZE = 8;
const HOME_BANNER_MIN_FONT_SCALE = 0.82;
const HOME_STRIP_GAP_SCALE = 0.9;

interface PromoBannerSlotProps {
  slot: BannerSlot;
  height: number;
  variant?: 'default' | 'home';
}

function hasActiveContent(slot: BannerSlot): boolean {
  return slot.enabled && Boolean(slot.imageUrl || slot.title);
}

export function PromoBannerSlot({ slot, height, variant = 'default' }: PromoBannerSlotProps) {
  const active = hasActiveContent(slot);
  const isHome = variant === 'home';
  const innerHeight = height - BANNER_INSET * 2;
  const logoBase = Math.min(36, innerHeight * 0.62);
  const homeLogo = Math.min(innerHeight, logoBase * 1.8);
  const logoSize = Math.round(
    isHome
      ? Math.min(height - HOME_LOGO_EDGE_MARGIN * 2, homeLogo * HOME_LOGO_SCALE)
      : logoBase,
  );

  const handlePress = async () => {
    if (!active) return;
    hapticLight();
    if (slot.appRoute) {
      router.push(slot.appRoute as Href);
      return;
    }
    if (!slot.linkUrl) return;
    await WebBrowser.openBrowserAsync(slot.linkUrl);
  };

  const interactive = active && Boolean(slot.appRoute || slot.linkUrl);

  const content = (
    <View style={[styles.shadowWrap, { height }]}>
      <View
        style={[
          styles.frame,
          active && styles.frameActive,
          isHome && active && styles.frameHome,
        ]}>
      {active && slot.imageUrl ? (
        <View style={styles.inset}>
          <Image
            source={{ uri: slot.imageUrl }}
            style={styles.image}
            contentFit="cover"
            accessibilityLabel={slot.title ?? slot.label}
          />
        </View>
      ) : active && slot.title ? (
        <View style={styles.inset}>
          <View style={[styles.contentRow, isHome && styles.contentRowHome]}>
            <LogoMark embedded size={logoSize} />
            <View
              style={[
                styles.textBlock,
                isHome && styles.textBlockHome,
                isHome && { maxHeight: innerHeight },
              ]}>
              {isHome ? (
                <FittingBannerText
                  maxFontSize={HOME_TITLE_FONT_SIZE}
                  minFontScale={HOME_BANNER_MIN_FONT_SCALE}
                  numberOfLines={2}
                  style={[styles.bannerTitle, styles.homeTitle]}>
                  {slot.title}
                </FittingBannerText>
              ) : (
                <Typography
                  variant="bodyMedium"
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  minimumFontScale={0.72}
                  style={styles.bannerTitle}>
                  {slot.title}
                </Typography>
              )}
              {slot.subtitle ? (
                isHome ? (
                  <FittingBannerText
                    variant="caption"
                    color={palette.textSecondary}
                    maxFontSize={HOME_SUBTITLE_FONT_SIZE}
                    minFontScale={HOME_BANNER_MIN_FONT_SCALE}
                    numberOfLines={2}
                    style={[styles.bannerSubtitle, styles.homeSubtitle]}>
                    {slot.subtitle}
                  </FittingBannerText>
                ) : (
                  <Typography
                    variant="caption"
                    color={palette.textSecondary}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    minimumFontScale={0.72}
                    style={styles.bannerSubtitle}>
                    {slot.subtitle}
                  </Typography>
                )
              ) : null}
            </View>
          </View>
        </View>
      ) : (
        <View style={[styles.placeholder, styles.inset]}>
          <Typography variant="caption" color={palette.textMuted} style={styles.placeholderLabel}>
            {slot.label}
          </Typography>
          <Typography variant="caption" color={palette.textMuted} numberOfLines={1}>
            Espacio reservado · {slot.id}
          </Typography>
        </View>
      )}
      </View>
    </View>
  );

  if (interactive) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={slot.title ?? slot.label}
        onPress={handlePress}
        style={({ pressed }) => [pressed && styles.pressed]}>
        {content}
      </Pressable>
    );
  }

  return content;
}

interface PromoBannerStripProps {
  banners: BannerSlot[];
  /** Altura fija por banner; si no se indica, se calcula según el ancho. */
  bannerHeight?: number;
  /** Menos márgenes para pantallas compactas (inicio). */
  dense?: boolean;
  showSectionLabel?: boolean;
  variant?: 'default' | 'home';
}

/** Tres recuadros lineales para promociones (bannerTOP, bannerMEDIO, bannerBOT). */
export function PromoBannerStrip({
  banners,
  bannerHeight: bannerHeightProp,
  dense = false,
  showSectionLabel = true,
  variant = 'default',
}: PromoBannerStripProps) {
  const { width } = useWindowDimensions();
  const bannerHeight =
    bannerHeightProp ??
    Math.min(BANNER_MAX_HEIGHT, Math.max(BANNER_MIN_HEIGHT, Math.round(width * 0.18)));

  return (
    <View style={[styles.strip, dense && styles.stripDense, variant === 'home' && styles.stripHome]}>
      {showSectionLabel ? (
        <Typography variant="label" style={[styles.sectionLabel, dense && styles.sectionLabelDense]}>
          Novedades y formación
        </Typography>
      ) : null}
      {banners.map((slot) => (
        <PromoBannerSlot key={slot.id} slot={slot} height={bannerHeight} variant={variant} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
    width: '100%',
  },
  stripHome: {
    gap: Math.round(spacing.lg * HOME_STRIP_GAP_SCALE),
    marginBottom: 0,
    width: '112%',
    marginLeft: '-6%',
    alignSelf: 'center',
  },
  sectionLabel: {
    marginBottom: spacing.xs,
  },
  sectionLabelDense: {
    marginBottom: 0,
    fontSize: 11,
  },
  shadowWrap: {
    width: '100%',
    borderRadius: radius.md,
    ...BANNER_SHADOW,
  },
  frame: {
    flex: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.white,
    overflow: 'hidden',
  },
  frameActive: {
    borderColor: palette.borderStrong,
  },
  stripDense: {
    gap: spacing.xs,
    marginBottom: 0,
  },
  frameHome: {
    backgroundColor: palette.white,
    borderColor: palette.border,
  },
  inset: {
    flex: 1,
    padding: BANNER_INSET,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    maxWidth: '100%',
  },
  contentRowHome: {
    width: '100%',
  },
  textBlock: {
    flexShrink: 1,
    minWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  textBlockHome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
  },
  bannerTitle: {
    textAlign: 'center',
    width: '100%',
    fontSize: 14,
    lineHeight: 17,
  },
  bannerSubtitle: {
    textAlign: 'center',
    width: '100%',
    fontSize: 11,
    lineHeight: 14,
  },
  homeTitle: {
    color: palette.accent,
    letterSpacing: 0.2,
    fontSize: HOME_TITLE_FONT_SIZE,
  },
  homeSubtitle: {
    fontSize: HOME_SUBTITLE_FONT_SIZE,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: radius.sm,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    backgroundColor: palette.backgroundSoft,
  },
  placeholderLabel: {
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    fontSize: 10,
  },
  pressed: {
    opacity: 0.92,
  },
});
