package expo.modules.deviceringer

import android.content.Context
import android.media.AudioManager
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class DeviceRingerModule : Module() {
  private val audioManager: AudioManager
    get() {
      val context = appContext.reactContext ?: throw Exceptions.ReactContextLost()
      return context.getSystemService(Context.AUDIO_SERVICE) as AudioManager
    }

  override fun definition() = ModuleDefinition {
    Name("DeviceRinger")

    /** `normal` | `vibrate` | `silent` */
    Function("getRingerMode") {
      when (audioManager.ringerMode) {
        AudioManager.RINGER_MODE_SILENT -> "silent"
        AudioManager.RINGER_MODE_VIBRATE -> "vibrate"
        else -> "normal"
      }
    }

    /** Volumen del perfil de timbre (0–1), no el de multimedia. */
    Function("getRingVolumeRatio") {
      val max = audioManager.getStreamMaxVolume(AudioManager.STREAM_RING).coerceAtLeast(1)
      val current = audioManager.getStreamVolume(AudioManager.STREAM_RING).coerceIn(0, max)
      current.toDouble() / max.toDouble()
    }
  }
}
