import { useState, type ReactNode } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { BracketButton } from '@/components/pharmacology/BracketButton';
import { DrugMarkdownBody } from '@/components/pharmacology/DrugMarkdownBody';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import type { BibliographyEntry } from '@/types/protocol';
import { radius, spacing } from '@/theme/spacing';

interface DrugHeaderProps {
  name: string;
}

export function DrugHeader({ name }: DrugHeaderProps) {
  return (
    <View style={styles.header}>
      <BracketButton label={name.trim()} selected />
    </View>
  );
}

export function DrugDivider() {
  const { colors } = useAppTheme();
  return <View style={[styles.dividerTrack, { backgroundColor: colors.borderStrong }]} />;
}

interface DrugSectionCardProps {
  children: ReactNode;
}

/** Recuadro tipo cartilla: ancho completo, borde, sombra y fondo suave. */
export function DrugSectionCard({ children }: DrugSectionCardProps) {
  const { colors, isDashboardDark } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.backgroundSoft,
          borderColor: colors.borderStrong,
          shadowColor: isDashboardDark ? '#000000' : '#1A1A1A',
        },
      ]}>
      {children}
    </View>
  );
}

interface DrugLabeledSectionProps {
  label: string;
  content?: string;
  children?: ReactNode;
}

export function DrugLabeledSection({ label, content, children }: DrugLabeledSectionProps) {
  const { colors } = useAppTheme();
  const hasContent = Boolean(content?.trim()) || Boolean(children);
  if (!hasContent) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Typography variant="bodyMedium" style={[styles.label, { color: colors.text }]}>
        {label}
      </Typography>
      <DrugSectionCard>
        {content ? <DrugMarkdownBody content={content} /> : null}
        {children}
      </DrugSectionCard>
    </View>
  );
}

interface DrugBibliographySectionProps {
  entries: BibliographyEntry[];
}

export function DrugBibliographySection({ entries }: DrugBibliographySectionProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();
  const { colors } = useAppTheme();

  if (entries.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.bibTrigger}>
        <BracketButton
          label={t('drug.bibliography')}
          selected={open}
          onPress={() => setOpen((value) => !value)}
        />
      </View>
      {open ? (
        <DrugSectionCard>
          <View style={styles.bibList}>
            {entries.map((entry, index) => (
              <Typography
                key={`${entry.citation}-${index}`}
                variant="caption"
                style={[styles.bibItem, { color: colors.textSecondary }]}>
                {index + 1}. {entry.citation}
              </Typography>
            ))}
          </View>
        </DrugSectionCard>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: spacing.sm,
  },
  dividerTrack: {
    height: StyleSheet.hairlineWidth,
    marginVertical: spacing.xs,
    width: '100%',
    alignSelf: 'stretch',
  },
  section: {
    gap: spacing.sm,
    width: '100%',
    alignSelf: 'stretch',
  },
  label: {
    textAlign: 'left',
    fontSize: 15,
    letterSpacing: 0.2,
    paddingHorizontal: 2,
  },
  card: {
    width: '100%',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  bibTrigger: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  bibList: {
    gap: spacing.sm,
    width: '100%',
  },
  bibItem: {
    textAlign: 'left',
    lineHeight: 20,
  },
});
