import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { hexToRgba } from '@/utils/color';

type UserAvatarProps = {
  size?: number;
  avatarUrl?: string | null;
  nombre?: string | null;
  apellido?: string | null;
  email?: string | null;
  accentColor: string;
  surfaceColor: string;
  borderColor: string;
  fontFamily?: string;
};

export function getUserInitial(
  nombre?: string | null,
  apellido?: string | null,
  email?: string | null,
): string {
  const fromName = (nombre ?? '').trim().charAt(0);
  if (fromName) return fromName.toUpperCase();
  const fromLast = (apellido ?? '').trim().charAt(0);
  if (fromLast) return fromLast.toUpperCase();
  const fromEmail = (email ?? '').trim().charAt(0);
  if (fromEmail) return fromEmail.toUpperCase();
  return 'U';
}

/** Avatar circular: foto si hay URL; si no, inicial. */
export function UserAvatar({
  size = 40,
  avatarUrl,
  nombre,
  apellido,
  email,
  accentColor,
  surfaceColor,
  borderColor,
  fontFamily,
}: UserAvatarProps) {
  const uri = avatarUrl?.trim() || '';
  const initial = getUserInitial(nombre, apellido, email);
  const fontSize = Math.round(size * 0.4);

  return (
    <View
      style={[
        styles.frame,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor,
          backgroundColor: uri ? surfaceColor : hexToRgba(accentColor, 0.12),
        },
      ]}>
      {uri ? (
        <Image source={{ uri }} style={styles.image} contentFit="cover" />
      ) : (
        <Typography
          variant="bodyMedium"
          style={{
            color: accentColor,
            fontFamily,
            fontSize,
            lineHeight: fontSize + 2,
          }}>
          {initial}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
