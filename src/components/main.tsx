import React, {useEffect} from 'react';
import {Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import CircleIcon from './circleIcon';
import ContentText from './contentText';
import colors from '../global/colors';
import context from '../global/context';

const MainContainer: React.FC<any> = () => {
  const {width} = useWindowDimensions();
  const buttonContainerWidth = width * 0.8;
  const slideWidth = (width * 0.8) / 2;
  const lText = context.lText;
  const dText = context.dText;
  const [modeText, setModeText] = React.useState(lText);
  const translateX = useSharedValue(slideWidth * 0);
  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        modeText === lText
          ? withTiming(colors.WHITE)
          : withTiming(colors.LIGHT_BLACK),
    };
  });
  const buttonContainerBackgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        modeText === lText ? withTiming(colors.GRAY) : withTiming(colors.BLACK),
    };
  });
  const slideBackgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        modeText === lText
          ? withTiming(colors.WHITE)
          : withTiming(colors.LIGHT_BLACK),
    };
  });
  const buttonTextColorAnimation = useAnimatedStyle(() => {
    return {
      color:
        modeText === lText
          ? withTiming(colors.LIGHT_BLACK)
          : withTiming(colors.WHITE),
    };
  });
  // 页面加载时获取状态
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://your-api-endpoint.com/getModeText',
        );
        const json = await response.json();
        setModeText(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const storeModeText = (text: string) => {
    fetch('https://your-api-endpoint.com/setModeText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text}),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        //成功后更新状态
        setModeText(text);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  return (
    <Animated.View style={[styles.container, backgroundColorAnimation]}>
      <CircleIcon modeText={modeText} judgeText={lText} />
      <ContentText modeText={modeText} judgeText={lText} />
      <Animated.View
        style={[
          styles.buttonContainer,
          {width: buttonContainerWidth},
          buttonContainerBackgroundColorAnimation,
        ]}>
        <Animated.View
          style={[
            styles.slideContainer,
            {width: slideWidth},
            translateAnimation,
          ]}>
          <Animated.View
            style={[
              styles.slide,
              {width: (width * 0.7) / 2},
              slideBackgroundColorAnimation,
            ]}
          />
        </Animated.View>
        <Pressable
          style={[styles.button, {width: slideWidth}]}
          onPress={() => {
            storeModeText(lText);
            setModeText(lText); // 方便测试效果，正式代码中需删除
            translateX.value = withSpring(slideWidth * 0);
          }}>
          <Animated.Text style={[styles.buttonText, buttonTextColorAnimation]}>
            {lText}
          </Animated.Text>
        </Pressable>
        <Pressable
          style={[styles.button, {width: slideWidth}]}
          onPress={() => {
            storeModeText(dText);
            setModeText(dText); // 方便测试效果，正式代码中需删除
            translateX.value = withSpring(slideWidth * 1);
          }}>
          <Animated.Text style={[styles.buttonText, buttonTextColorAnimation]}>
            {dText}
          </Animated.Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: colors.GRAY,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.BLACK,
    fontWeight: '500',
    fontSize: 16,
  },
  slideContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    backgroundColor: 'white',
    padding: 23,
    borderRadius: 100,
  },
});

export default MainContainer;
