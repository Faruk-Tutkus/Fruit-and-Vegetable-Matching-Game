import React from 'react';
import { StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  Easing,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_SIZE = Math.min(width * 0.2, 120);
const MARGIN = 8;

interface CardProps {
  item: {
    id: number;
    image: string;
    name: string;
  };
  isFlipped: boolean;
  isMatched: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CARD_BACK_IMAGE = 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop&q=80';

// Arka yüz resmini önceden yükle
Image.prefetch(CARD_BACK_IMAGE);

export default function Card({ item, isFlipped, isMatched, onPress }: CardProps) {
  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: withTiming(isFlipped ? '180deg' : '0deg', {
          duration: 600,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        })},
      ],
      backfaceVisibility: 'hidden',
      ...StyleSheet.absoluteFillObject,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: withTiming(isFlipped ? '0deg' : '-180deg', {
          duration: 600,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        })},
      ],
      backfaceVisibility: 'hidden',
      ...StyleSheet.absoluteFillObject,
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const scale = withSpring(isMatched ? 0.95 : 1, {
      damping: 15,
      stiffness: 150,
    });

    return {
      transform: [{ scale }],
      opacity: withTiming(isMatched ? 0.6 : 1, { duration: 300 }),
    };
  });

  return (
    <AnimatedPressable
      style={[styles.card, containerAnimatedStyle]}
      onPress={onPress}
      disabled={isFlipped || isMatched}
    >
      <Animated.View style={[styles.cardFace, frontAnimatedStyle]}>
        <Image
          source={{ uri: CARD_BACK_IMAGE }}
          style={styles.image}
          resizeMode="cover"
          defaultSource={require('../assets/images/icon.png')}
        />
      </Animated.View>
      <Animated.View style={[styles.cardFace, backAnimatedStyle]}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
          defaultSource={require('../assets/images/icon.png')}
        />
      </Animated.View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    margin: MARGIN,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  cardFace: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
});