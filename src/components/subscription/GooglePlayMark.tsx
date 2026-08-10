import Svg, { Path } from 'react-native-svg';

type MarkProps = {
  size?: number;
};

/** Marca reconocible de Google Play (triángulo multicolor). */
export function GooglePlayMark({ size = 18 }: MarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden>
      <Path d="M3.6 2.3 14.1 12 3.6 21.7A2 2 0 0 1 3 20.2V3.8a2 2 0 0 1 .6-1.5Z" fill="#00A0FF" />
      <Path d="M14.1 12 3.6 2.3A2.1 2.1 0 0 1 5.2 2l11.3 6.4L14.1 12Z" fill="#00E3A3" />
      <Path d="M14.1 12 16.5 15.6 5.2 22a2.1 2.1 0 0 1-1.6-.3L14.1 12Z" fill="#FF3A44" />
      <Path d="M21.2 10.7 16.5 8.4 14.1 12l2.4 3.6 4.7-2.3a1.5 1.5 0 0 0 0-2.6Z" fill="#FFD500" />
    </Svg>
  );
}
