import { StyleSheet, View } from 'react-native';
import Svg, { Line, Path, Rect } from 'react-native-svg';

import { Typography } from '@/components/ui/Typography';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

const WIDTH = 340;
const HEIGHT = 88;
const BASELINE = 52;

/** Un complejo QRS con onda P y T; `stemi` eleva el segmento ST. */
function beatPath(startX: number, stemi: boolean) {
  const y = BASELINE;
  const st = stemi ? y - 14 : y;

  return [
    `M ${startX} ${y}`,
    `L ${startX + 6} ${y}`,
    `Q ${startX + 10} ${y - 5} ${startX + 16} ${y}`,
    `L ${startX + 21} ${y}`,
    `L ${startX + 23} ${y + 3}`,
    `L ${startX + 25} ${y - 24}`,
    `L ${startX + 29} ${y + 10}`,
    `L ${startX + 33} ${y}`,
    `L ${startX + 36} ${st}`,
    `L ${startX + 48} ${st}`,
    `Q ${startX + 54} ${st - 9} ${startX + 60} ${st}`,
    `L ${startX + 64} ${y}`,
  ].join(' ');
}

function buildTrace(stemi: boolean) {
  const offsets = [12, 78, 144, 210];
  return offsets.map((x) => beatPath(x, stemi)).join(' ');
}

function EcgGrid() {
  const lines = [];
  const minor = 8;
  const majorEvery = 5;

  for (let x = 0; x <= WIDTH; x += minor) {
    const major = x % (minor * majorEvery) === 0;
    lines.push(
      <Line
        key={`v-${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={HEIGHT}
        stroke={major ? '#E8B4B4' : '#F3D4D4'}
        strokeWidth={major ? 0.8 : 0.4}
      />,
    );
  }

  for (let y = 0; y <= HEIGHT; y += minor) {
    const major = y % (minor * majorEvery) === 0;
    lines.push(
      <Line
        key={`h-${y}`}
        x1={0}
        y1={y}
        x2={WIDTH}
        y2={y}
        stroke={major ? '#E8B4B4' : '#F3D4D4'}
        strokeWidth={major ? 0.8 : 0.4}
      />,
    );
  }

  return <>{lines}</>;
}

interface EcgStripProps {
  variant: 'normal' | 'stemi';
}

function EcgStrip({ variant }: EcgStripProps) {
  const stemi = variant === 'stemi';

  return (
    <View style={styles.stripFrame}>
      <Svg width="100%" height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <Rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="#FFF9F9" />
        <EcgGrid />
        <Line x1={0} y1={BASELINE} x2={WIDTH} y2={BASELINE} stroke="#FECACA" strokeWidth={0.6} />
        <Path
          d={buildTrace(stemi)}
          stroke="#B91C1C"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

/** Comparación didáctica: ritmo sinusal vs IAMCEST. */
export function PathologyEcgCompareIllustration() {
  return (
    <View style={styles.wrap}>
      <View style={styles.block}>
        <Typography variant="caption" style={styles.caption}>
          Ritmo sinusal normal — 4 complejos (referencia DII)
        </Typography>
        <EcgStrip variant="normal" />
        <Typography variant="caption" style={styles.hint}>
          Onda P antes de cada QRS · segmento ST isoeléctrico · intervalo R-R regular
        </Typography>
      </View>

      <View style={styles.block}>
        <Typography variant="caption" style={styles.caption}>
          IAM con elevación del ST (IAMCEST) — ejemplo pared inferior
        </Typography>
        <EcgStrip variant="stemi" />
        <Typography variant="caption" style={styles.hint}>
          Elevación del ST tras el QRS (≥ 1 mm en ≥ 2 derivaciones contiguas) · activar reperfusión urgente
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
    width: '100%',
  },
  block: {
    gap: spacing.xs,
    width: '100%',
  },
  stripFrame: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#FFF9F9',
  },
  caption: {
    color: palette.text,
    fontWeight: '600',
    textAlign: 'left',
  },
  hint: {
    color: palette.textSecondary,
    textAlign: 'justify',
    lineHeight: 16,
  },
});
