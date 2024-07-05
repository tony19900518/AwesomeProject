import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import colors from '../global/colors';

type Props = {
  modeText: string;
  judgeText: string;
};

const COLOR_LIGHT = colors.BLACK;
const COLOR_DARK = colors.WHITE;

const CircleIcon: React.FC<any> = ({modeText, judgeText}: Props) => {
  const textColorAnimation = useAnimatedStyle(() => {
    return {
      color:
        modeText === judgeText
          ? withTiming(COLOR_LIGHT)
          : withTiming(COLOR_DARK),
    };
  });

  return (
    <View style={styles.textContainer}>
      <Animated.Text style={[styles.titleText, textColorAnimation]}>
        Choose a style
      </Animated.Text>
      <Animated.Text style={[styles.contentText, textColorAnimation]}>
        Pop or subtle. Day or night.
      </Animated.Text>
      <Animated.Text style={[styles.contentText, textColorAnimation]}>
        Customize your interface.
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 14,
  },
  contentText: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
});

export default CircleIcon;
