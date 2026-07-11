import { requireOptionalNativeModule } from 'expo-modules-core';

import type { RingerMode } from './DeviceRinger.types';

type DeviceRingerNativeModule = {
  getRingerMode: () => RingerMode;
  getRingVolumeRatio: () => number;
};

const DeviceRingerModule =
  requireOptionalNativeModule<DeviceRingerNativeModule>('DeviceRinger');

export default DeviceRingerModule;
