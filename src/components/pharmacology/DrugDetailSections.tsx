import { useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { BracketButton } from '@/components/pharmacology/BracketButton';
import { DrugMarkdownBody } from '@/components/pharmacology/DrugMarkdownBody';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import type { BibliographyEntry } from '@/types/protocol';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

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
  return <View style={styles.dividerTrack} />;
}

interface DrugLabeledSectionProps {
  label: string;
  content?: string;
  children?: ReactNode;
}

export function DrugLabeledSection({ label, content, children }: DrugLabeledSectionProps) {
  const hasContent = Boolean(content?.trim()) || Boolean(children);
  if (!hasContent) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Typography variant="bodyMedium" style={styles.label}>
        {label}:
      </Typography>
      {content ? (
        <View style={styles.body}>
          <DrugMarkdownBody content={content} />
        </View>
      ) : null}
      {children ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

interface DrugBibliographySectionProps {
  entries: BibliographyEntry[];
}

export function DrugBibliographySection({ entries }: DrugBibliographySectionProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  if (entries.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.bibTrigger}>
        <BracketButton label={t('drug.bibliography')} selected={open} onPress={() => setOpen((value) => !value)} />
      </View>
      {open ? (
        <View style={styles.bibList}>
          {entries.map((entry, index) => (
            <Typography key={`${entry.citation}-${index}`} variant="caption" style={styles.bibItem}>
              {index + 1}. {entry.citation}
            </Typography>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  dividerTrack: {
    height: 1,
    backgroundColor: palette.borderStrong,
    marginVertical: spacing.md,
    width: '100%',
  },
  section: {
    gap: spacing.md,
    width: '100%',
  },
  label: {
    textAlign: 'left',
    color: palette.text,
    fontSize: 15,
    letterSpacing: 0.2,
  },
  body: {
    width: '100%',
    paddingLeft: spacing.xs,
  },
  bibTrigger: {
    width: '100%',
    alignItems: 'center',
  },
  bibList: {
    gap: spacing.sm,
    width: '100%',
    paddingTop: spacing.sm,
    paddingLeft: spacing.xs,
  },
  bibItem: {
    textAlign: 'left',
    color: palette.textSecondary,
    lineHeight: 20,
  },
});
