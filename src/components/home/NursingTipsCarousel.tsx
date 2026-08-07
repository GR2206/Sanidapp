import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import {
  NURSING_CAROUSEL_TIP_IDS,
  nursingCarouselTipKey,
} from '@/constants/nursingReminders';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { loadGuardTipOfDay, type ResolvedGuardTip } from '@/services/content/guardTipService';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { spacing } from '@/theme/spacing';
import { mixHexWithBlack } from '@/utils/color';

const PAGE_GAP = spacing.sm;
const SIDE_INSET = 0;
/** Tiempo entre slides (era 6.5s; pedían más lento). */
const AUTO_ADVANCE_MS = 11000;
/** Altura fija para que todas las tarjetas midan igual. */
const CARD_HEIGHT = 124;

type CarouselSlide = {
  id: string;
  kicker: string;
  text: string;
  colors: [string, string, string];
};

/** Gradiente siempre oscuro (texto blanco legible; sin parches claros). */
function deepBrandGradient(base: string, deepen = 0): [string, string, string] {
  const hex = base?.trim() || '#0077B6';
  return [
    mixHexWithBlack(hex, 0.08 + deepen),
    mixHexWithBlack(hex, 0.28 + deepen),
    mixHexWithBlack(hex, 0.48 + deepen),
  ];
}

/**
 * Carrusel de tips de enfermería (cotidianos + tip clínico del día).
 * Free y sanatorios (gradientes derivados de la paleta de marca).
 */
export function NursingTipsCarousel() {
  const { t, locale } = useLocale();
  const { colors, fonts, hasBranding, theme } = useDashboardTheme();
  const [guardTip, setGuardTip] = useState<ResolvedGuardTip | null>(null);
  const [pageWidth, setPageWidth] = useState(Dimensions.get('window').width - spacing.lg * 2);
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const brandPrimary = hasBranding ? theme.primary : '#00B4D8';
  const brandAccent = hasBranding ? theme.accent : '#0077B6';
  const guardColors = useMemo(
    () =>
      hasBranding
        ? deepBrandGradient(brandPrimary, 0)
        : (['#00B4D8', '#0077B6', '#023E8A'] as [string, string, string]),
    [brandPrimary, hasBranding],
  );
  const tipColorsA = useMemo(
    () =>
      hasBranding
        ? deepBrandGradient(brandPrimary, 0.06)
        : (['#059669', '#047857', '#065F46'] as [string, string, string]),
    [brandPrimary, hasBranding],
  );
  const tipColorsB = useMemo(
    () =>
      hasBranding
        ? deepBrandGradient(brandAccent, 0.1)
        : (['#0284C7', '#0369A1', '#0C4A6E'] as [string, string, string]),
    [brandAccent, hasBranding],
  );

  useEffect(() => {
    let active = true;
    void loadGuardTipOfDay(locale).then((next) => {
      if (active) setGuardTip(next);
    });
    return () => {
      active = false;
    };
  }, [locale]);

  const slides: CarouselSlide[] = [
    ...(guardTip
      ? [
          {
            id: `guard-${guardTip.id}`,
            kicker: guardTip.label || t('home.guardTipLabel'),
            text: guardTip.text,
            colors: guardColors,
          },
        ]
      : []),
    ...NURSING_CAROUSEL_TIP_IDS.map((id, tipIndex) => ({
      id,
      kicker: t('nursing.tipsKicker'),
      text: t(nursingCarouselTipKey(id)),
      colors: tipIndex % 2 === 0 ? tipColorsA : tipColorsB,
    })),
  ];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % slides.length;
        scrollRef.current?.scrollTo({ x: next * (pageWidth + PAGE_GAP), animated: true });
        return next;
      });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [pageWidth, slides.length]);

  function onScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const x = event.nativeEvent.contentOffset.x;
    const next = Math.round(x / (pageWidth + PAGE_GAP));
    setIndex(Math.max(0, Math.min(next, slides.length - 1)));
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <View
      style={styles.wrap}
      onLayout={(event) => {
        const width = event.nativeEvent.layout.width;
        if (width > 0) setPageWidth(width);
      }}>
      <Typography
        variant="label"
        style={[
          styles.sectionTitle,
          { color: FREE_QUICK_ACCESS_TONES.pediatrico.label, fontFamily: fonts.semiBold },
        ]}>
        {`💡 ${t('nursing.carouselTitle')}`}
      </Typography>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        decelerationRate="fast"
        snapToInterval={pageWidth + PAGE_GAP}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        contentContainerStyle={{ gap: PAGE_GAP, paddingHorizontal: SIDE_INSET }}
        style={styles.scroller}>
        {slides.map((slide) => (
          <View key={slide.id} style={[styles.cardOuter, { width: pageWidth, height: CARD_HEIGHT }]}>
            <LinearGradient
              colors={slide.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}>
              <Typography variant="caption" style={styles.kicker} numberOfLines={1}>
                {slide.kicker}
              </Typography>
              <Typography variant="bodyMedium" style={styles.text} numberOfLines={4}>
                {slide.text}
              </Typography>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dots}>
        {slides.map((slide, dotIndex) => (
          <View
            key={slide.id}
            style={[
              styles.dot,
              dotIndex === index
                ? [styles.dotActive, { backgroundColor: brandPrimary, width: 16 }]
                : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.xs,
  },
  sectionTitle: {
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  scroller: {
    overflow: 'visible',
  },
  cardOuter: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: Platform.OS === 'android' ? 3 : 0,
  },
  card: {
    borderRadius: 18,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.xs,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  kicker: {
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: 0.4,
    fontWeight: '700',
  },
  text: {
    color: '#FFFFFF',
    lineHeight: 20,
    flexShrink: 1,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  dotActive: {},
});
