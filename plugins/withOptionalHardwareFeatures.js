const { withAndroidManifest } = require('expo/config-plugins');

/**
 * Google Play filtra dispositivos cuando un permiso implica hardware "required"
 * (CAMERA, RECORD_AUDIO, BLUETOOTH, LOCATION, …) o cuando una lib declara
 * <uses-feature android:required="true"/>.
 *
 * Sanidapp debe instalarse en todos los dispositivos posibles: cámara / mic /
 * Bluetooth / GPS son opcionales (QR, salas, ubicación AR). El core de la app
 * (protocolos, fármacos, etc.) no depende de ese hardware.
 *
 * Este plugin debe ir AL FINAL de `plugins` en app.json para correr después de
 * expo-camera, LiveKit y WebRTC.
 *
 * @see https://developer.android.com/guide/topics/manifest/uses-feature-element
 */
const OPTIONAL_FEATURES = [
  'android.hardware.audio.output',
  'android.hardware.bluetooth',
  'android.hardware.bluetooth_le',
  'android.hardware.camera',
  'android.hardware.camera.any',
  'android.hardware.camera.autofocus',
  'android.hardware.camera.front',
  'android.hardware.camera.external',
  'android.hardware.location',
  'android.hardware.location.gps',
  'android.hardware.location.network',
  'android.hardware.microphone',
  'android.hardware.screen.landscape',
  'android.hardware.screen.portrait',
  'android.hardware.telephony',
  'android.hardware.touchscreen',
  'android.hardware.wifi',
  'android.software.leanback',
];

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function markFeatureOptional(name) {
  return {
    $: {
      'android:name': name,
      'android:required': 'false',
      // Gana ante merges de libs nativas (LiveKit / WebRTC / camera).
      'tools:replace': 'android:required',
    },
  };
}

function withOptionalHardwareFeatures(config) {
  return withAndroidManifest(config, (modConfig) => {
    const manifest = modConfig.modResults.manifest;

    manifest.$ = manifest.$ ?? {};
    if (!manifest.$['xmlns:tools']) {
      manifest.$['xmlns:tools'] = 'http://schemas.android.com/tools';
    }

    const byName = new Map();

    for (const feature of asArray(manifest['uses-feature'])) {
      const name = feature?.$?.['android:name'];
      if (!name) continue;
      // Toda feature declarada por plugins/libs queda opcional.
      byName.set(name, markFeatureOptional(name));
    }

    for (const name of OPTIONAL_FEATURES) {
      byName.set(name, markFeatureOptional(name));
    }

    manifest['uses-feature'] = [...byName.values()];
    return modConfig;
  });
}

module.exports = withOptionalHardwareFeatures;
