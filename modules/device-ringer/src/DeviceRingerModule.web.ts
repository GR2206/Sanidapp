type DeviceRingerNativeModule = {
  getRingerMode: () => 'normal' | 'vibrate' | 'silent';
  getRingVolumeRatio: () => number;
};

/** En web no hay perfil de timbre: siempre permitir sonido. */
const DeviceRingerModule: DeviceRingerNativeModule = {
  getRingerMode: () => 'normal',
  getRingVolumeRatio: () => 1,
};

export default DeviceRingerModule;
