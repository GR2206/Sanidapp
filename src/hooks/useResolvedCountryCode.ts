import { useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import {
  readLocalCountryCode,
  writeLocalCountryCode,
} from '@/services/locale/countryPreference';
import { normalizeCountryCode } from '@/utils/country';

/** Combina country del perfil + preferencia local (GPS / registro). */
export function useResolvedCountryCode() {
  const { profile } = useAuth();
  const [localCountryCode, setLocalCountryCode] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    void readLocalCountryCode().then((code) => {
      if (!alive) return;
      setLocalCountryCode(code);
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  async function setCountryCode(next: string) {
    const code = normalizeCountryCode(next);
    await writeLocalCountryCode(code);
    setLocalCountryCode(code || null);
  }

  return {
    countryCode: profile?.countryCode?.trim() || localCountryCode || '',
    localCountryCode,
    ready,
    setCountryCode,
  };
}
