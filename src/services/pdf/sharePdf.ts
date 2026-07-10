import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import { i18nError } from '@/i18n/resolveMessage';

export async function sharePdfFromHtml(html: string, dialogTitle: string): Promise<void> {
  const { uri } = await Print.printToFileAsync({ html });

  const canShare = await Sharing.isAvailableAsync();
  if (!canShare) {
    throw i18nError('pdf.shareUnavailable');
  }

  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle,
    UTI: 'com.adobe.pdf',
  });
}
