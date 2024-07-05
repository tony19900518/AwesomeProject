import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  Mask,
} from '@shopify/react-native-skia';
import React, {useEffect} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import colors from '../global/colors';

type Props = {
  modeText: string;
  judgeText: string;
};

const RADIUS = 70;
const COLOR_LIGHT_START = colors.RED;
const COLOR_LIGHT_END = colors.ORANGE;
const COLOR_DARK_START = colors.PURPLE;
const COLOR_DARK_END = colors.BLUE;
const MASK_COLOR_LIGHT = colors.WHITE;
const MASK_COLOR_DARK = colors.BLACK;

const CircleIcon: React.FC<any> = ({modeText, judgeText}: Props) => {
  const {height} = useWindowDimensions();
  const gradientColorStart = useSharedValue(COLOR_LIGHT_START);
  const gradientColorEnd = useSharedValue(COLOR_LIGHT_END);
  const cy = useSharedValue(0);
  const mask = useSharedValue(0);

  const colorsValue = useDerivedValue(() => {
    return [gradientColorStart.value, gradientColorEnd.value];
  });

  useEffect(() => {
    if (modeText === judgeText) {
      gradientColorStart.value = withTiming(COLOR_LIGHT_START);
      gradientColorEnd.value = withTiming(COLOR_LIGHT_END);
      cy.value = withTiming(0);
      mask.value = withTiming(0);
    } else {
      gradientColorStart.value = withTiming(COLOR_DARK_START);
      gradientColorEnd.value = withTiming(COLOR_DARK_END);
      cy.value = withSpring(RADIUS / 2, {duration: 500});
      mask.value = withTiming(RADIUS, {duration: 500});
    }
  }, [cy, gradientColorEnd, gradientColorStart, judgeText, mask, modeText]);

  return (
    <Canvas style={[styles.container, {marginTop: height * 0.1}]}>
      <Mask
        mode="luminance"
        mask={
          <Group>
            <Circle
              cx={RADIUS}
              cy={RADIUS}
              r={RADIUS}
              color={MASK_COLOR_LIGHT}
            />
            <Circle cx={RADIUS} cy={cy} r={mask} color={MASK_COLOR_DARK} />
          </Group>
        }>
        <Circle cx={RADIUS} cy={RADIUS} r={RADIUS} />
        <LinearGradient
          colors={colorsValue}
          origin={{x: RADIUS, y: RADIUS}}
          transform={[{rotate: -90}]}
          start={{x: 0, y: 0}}
          end={{x: RADIUS * 2, y: RADIUS * 2}}
        />
      </Mask>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  container: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    alignSelf: 'center',
    transform: [{rotate: '45deg'}],
  },
});

export default CircleIcon;
