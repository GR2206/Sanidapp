const { withAndroidManifest } = require('expo/config-plugins');

/**
 * Play Console flags apps that declare both:
 * - BOOT_COMPLETED (from expo-notifications)
 * - restricted FGS types like mediaPlayback/microphone (from expo-audio)
 *
 * Google's static analyzer treats that as a violation even when those paths
 * never connect at runtime. This plugin strips boot-related actions from the
 * NotificationsService receiver while keeping notification event handling.
 *
 * @see https://github.com/expo/expo/issues/41627
 * @see https://developer.android.com/about/versions/15/changes/foreground-service-types
 */
function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function ensureToolsNamespace(manifest) {
  manifest.$ = manifest.$ || {};
  if (!manifest.$['xmlns:tools']) {
    manifest.$['xmlns:tools'] = 'http://schemas.android.com/tools';
  }
}

const NOTIFICATIONS_RECEIVER = 'expo.modules.notifications.service.NotificationsService';
const AUDIO_RECORDING_SERVICE = 'expo.modules.audio.service.AudioRecordingService';

function withDisableNotificationsBootActions(config) {
  return withAndroidManifest(config, (modConfig) => {
    const manifest = modConfig.modResults.manifest;
    const application = manifest.application?.[0];
    if (!application) {
      return modConfig;
    }

    ensureToolsNamespace(manifest);

    const receivers = asArray(application.receiver).filter(
      (receiver) => receiver?.$?.['android:name'] !== NOTIFICATIONS_RECEIVER,
    );

    receivers.push({
      $: {
        'android:name': NOTIFICATIONS_RECEIVER,
        'android:enabled': 'true',
        'android:exported': 'false',
        'tools:node': 'replace',
      },
      'intent-filter': [
        {
          $: { 'android:priority': '-1' },
          action: [
            { $: { 'android:name': 'expo.modules.notifications.NOTIFICATION_EVENT' } },
            { $: { 'android:name': 'android.intent.action.MY_PACKAGE_REPLACED' } },
          ],
        },
      ],
    });

    application.receiver = receivers;

    // App only plays short UI sounds — recording FGS is unused and triggers
    // Android 15 restricted-type warnings together with BOOT receivers.
    const services = asArray(application.service);
    const hasRecordingService = services.some(
      (service) => service?.$?.['android:name'] === AUDIO_RECORDING_SERVICE,
    );

    if (hasRecordingService) {
      application.service = services.filter(
        (service) => service?.$?.['android:name'] !== AUDIO_RECORDING_SERVICE,
      );
      application.service.push({
        $: {
          'android:name': AUDIO_RECORDING_SERVICE,
          'tools:node': 'remove',
        },
      });
    }

    return modConfig;
  });
}

module.exports = withDisableNotificationsBootActions;
