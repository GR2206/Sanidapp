import { useMemo } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useSanatorioTheme } from '@/contexts/SanatorioThemeContext';
import { feedScopeForProfile } from '@/services/content/feedService';
import type { FeedPublishScope } from '@/types/feed';

/**
 * Cursos/Congresos visibles para todos (free mundial + sanatorios).
 */
export function useFeedVisibility(_localCountryCode?: string | null) {
  return useMemo(
    () => ({ canShowFeeds: true as const, reason: 'worldwide' as const }),
    [],
  );
}

/**
 * Supervisor (padrón) o admin → pueden publicar.
 * Docente aprobado (canPublishFeeds) → publica en feed global free.
 * Supervisor con sanatorio: puede elegir institución (privado) o público.
 */
export function useFeedManageAccess() {
  const { profile, isAdmin, isSupervisor } = useAuth();
  const { sanatorio, previewSanatorioId } = useSanatorioTheme();

  return useMemo(() => {
    let linkedSanatorioId: string | null = null;
    let sanatorioName: string | null = null;
    const canPublishAsDocente = Boolean(profile?.canPublishFeeds);

    if (isAdmin) {
      linkedSanatorioId = previewSanatorioId?.trim() || null;
      sanatorioName = linkedSanatorioId ? (sanatorio?.name ?? null) : null;
    } else if (isSupervisor) {
      linkedSanatorioId = profile?.sanatorioId?.trim() || null;
      sanatorioName =
        sanatorio?.id === linkedSanatorioId
          ? (sanatorio?.name ?? profile?.sanatorioName ?? null)
          : (profile?.sanatorioName ?? null);
    }

    const canManage = isAdmin || isSupervisor || canPublishAsDocente;
    const defaultScope = feedScopeForProfile({
      isAdmin,
      isSupervisor,
      canPublishFeeds: canPublishAsDocente,
      sanatorioId: linkedSanatorioId,
    });

    const canPublishPublic =
      isAdmin || canPublishAsDocente || (isSupervisor && Boolean(linkedSanatorioId));
    const canPublishInstitution = Boolean(linkedSanatorioId) && (isAdmin || isSupervisor);
    const canChooseScope = canPublishPublic && canPublishInstitution;

    const availableScopes: FeedPublishScope[] = [];
    if (canPublishInstitution && linkedSanatorioId) {
      availableScopes.push({ type: 'sanatorio', sanatorioId: linkedSanatorioId });
    }
    if (canPublishPublic) {
      availableScopes.push({ type: 'global' });
    }

    return {
      canManage,
      scope: defaultScope,
      availableScopes,
      canChooseScope,
      canPublishPublic,
      canPublishInstitution,
      sanatorioId: linkedSanatorioId,
      sanatorioName,
      isAdmin,
      isGlobalScope: defaultScope?.type === 'global',
      canPublishAsDocente,
      /** Para stamp en publicaciones públicas del sanatorio. */
      organizerSanatorioId: linkedSanatorioId,
      organizerSanatorioName: sanatorioName,
    };
  }, [
    isAdmin,
    isSupervisor,
    previewSanatorioId,
    profile?.canPublishFeeds,
    profile?.sanatorioId,
    profile?.sanatorioName,
    sanatorio?.id,
    sanatorio?.name,
  ]);
}
