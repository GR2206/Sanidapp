import * as Location from 'expo-location';

import { normalizeCountryCode } from '@/utils/country';

/**
 * Intenta resolver país por GPS + reverse geocode.
 * Devuelve ISO alpha-2 (p. ej. "AR") o null si el usuario niega permiso / falla.
 */
export async function detectCountryCodeFromGps(): Promise<string | null> {
  try {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (!permission.granted) {
      return null;
    }

    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const places = await Location.reverseGeocodeAsync({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    const iso = places[0]?.isoCountryCode ?? places[0]?.country ?? null;
    const code = normalizeCountryCode(iso);
    return code || null;
  } catch {
    return null;
  }
}
