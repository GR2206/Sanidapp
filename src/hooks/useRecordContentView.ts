import { useEffect } from 'react';

import { recordContentView, type RecordContentViewInput } from '@/services/storage/userActivityStorage';

export function useRecordContentView(input: RecordContentViewInput | null) {
  useEffect(() => {
    if (!input?.id || !input.title) return;
    void recordContentView(input);
  }, [input?.id, input?.type, input?.title, input?.subtitle]);
}
