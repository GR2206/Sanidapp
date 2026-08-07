import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BracketButton } from '@/components/pharmacology/BracketButton';
import { PathologyEcgCompareIllustration } from '@/components/pathology/PathologyEcgCompareIllustration';
import { PathologyMarkdownBody } from '@/components/pathology/PathologyMarkdownBody';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import type { BibliographyEntry } from '@/types/protocol';
import type { PathologyClinicalBox, PathologyClinicalIllustration, PathologyRelatedDrug } from '@/types/pathology';
import { spacing } from '@/theme/spacing';

interface PathologyHeaderProps {
  name: string;
}

export function PathologyHeader({ name }: PathologyHeaderProps) {
  return (
    <View style={styles.header}>
      <BracketButton label={name.trim()} selected />
    </View>
  );
}

export function PathologyDivider() {
  const { colors } = useAppTheme();
  return <View style={[styles.dividerTrack, { backgroundColor: colors.borderStrong }]} />;
}

interface PathologyBodyProps {
  content: string;
}

export function PathologyBody({ content }: PathologyBodyProps) {
  if (!content.trim()) {
    return null;
  }

  return (
    <View style={styles.body}>
      <PathologyMarkdownBody content={content} />
    </View>
  );
}

interface PathologyClinicalBoxSectionProps {
  box: PathologyClinicalBox;
}

function ClinicalIllustration({ id }: { id: PathologyClinicalIllustration }) {
  if (id === 'ecg-sinus-vs-stemi') {
    return <PathologyEcgCompareIllustration />;
  }

  return null;
}

export function PathologyClinicalBoxSection({ box }: PathologyClinicalBoxSectionProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.clinicalBox,
        {
          borderColor: colors.borderStrong,
          backgroundColor: colors.backgroundSoft,
        },
      ]}>
      <Typography variant="bodyMedium" style={[styles.clinicalBoxTitle, { color: colors.textAccent }]}>
        {box.title}
      </Typography>
      {box.illustration ? <ClinicalIllustration id={box.illustration} /> : null}
      {box.content?.trim() ? <PathologyMarkdownBody content={box.content} compact /> : null}
    </View>
  );
}

interface PathologyRelatedDrugsSectionProps {
  items: PathologyRelatedDrug[];
  onDrugPress: (drugId: string) => void;
}

export function PathologyRelatedDrugsSection({ items, onDrugPress }: PathologyRelatedDrugsSectionProps) {
  const { t } = useLocale();

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Typography variant="bodyMedium" style={styles.label}>
        {t('pathology.relatedDrugs')}:
      </Typography>
      <View style={styles.drugButtons}>
        {items.map((item) => (
          <BracketButton
            key={item.drugId}
            label={item.label ?? item.drugId}
            compact
            onPress={() => onDrugPress(item.drugId)}
          />
        ))}
      </View>
    </View>
  );
}

interface PathologyBibliographySectionProps {
  entries: BibliographyEntry[];
}

export function PathologyBibliographySection({ entries }: PathologyBibliographySectionProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  if (entries.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.bibTrigger}>
        <BracketButton label={t('pathology.bibliography')} selected={open} onPress={() => setOpen((value) => !value)} />
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
    marginVertical: spacing.md,
    width: '100%',
  },
  body: {
    width: '100%',
    paddingLeft: spacing.xs,
    alignSelf: 'stretch',
  },
  clinicalBox: {
    width: '100%',
    paddingLeft: spacing.xs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: 12,
    gap: spacing.sm,
  },
  clinicalBoxTitle: {
    fontSize: 14,
    letterSpacing: 0.2,
    textAlign: 'left',
  },
  section: {
    gap: spacing.md,
    width: '100%',
  },
  label: {
    textAlign: 'left',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  drugButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
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
    textAlign: 'justify',
    lineHeight: 20,
  },
});
