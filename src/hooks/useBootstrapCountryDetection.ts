import { useEffect, useRef } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useResolvedCountryCode } from '@/hooks/useResolvedCountryCode';
import { detectCountryCodeFromGps } from '@/services/locale/detectCountry';

/**
 * Usuarios free sin countryCode: un intento de GPS al iniciar sesión
 * para habilitar/ocultar Cursos y Congresos.
 */
export function useBootstrapCountryDetection() {
  const { profile, isAdmin } = useAuth();
  const { countryCode, ready, setCountryCode } = useResolvedCountryCode();
  const attempted = useRef(false);

  useEffect(() => {
    if (!ready || attempted.current) return;
    if (isAdmin || profile?.sanatorioId) return;
    if (countryCode) return;
    if (!profile) return;

    attempted.current = true;
    void (async () => {
      const detected = await detectCountryCodeFromGps();
      if (!detected) return;
      await setCountryCode(detected === 'AR' ? 'AR' : detected);
    })();
  }, [countryCode, isAdmin, profile, ready, setCountryCode]);
}
