import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card';
import { useGameStore } from '../../store/gameStore';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function GameScreen() {
  const { 
    cards,
    flippedCards,
    matchedPairs,
    moves,
    score,
    initGame,
    flipCard,
    addHighScore
  } = useGameStore();

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (matchedPairs.length === cards.length / 2) {
      addHighScore(score);
    }
  }, [matchedPairs.length]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(800)}
        style={styles.header}
      >
        <Text style={styles.title}>Fruit & Veggie Match</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Ionicons name="move" size={24} color="#4B5563" />
            <Text style={styles.statsText}>Moves: {moves}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="star" size={24} color="#4B5563" />
            <Text style={styles.statsText}>Score: {score}</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View 
        style={styles.board}
        layout={Layout.springify()}
      >
        {cards.map((card, index) => (
          <Card
            key={`${card.id}-${index}`}
            item={card}
            isFlipped={flippedCards.includes(index)}
            isMatched={matchedPairs.includes(card.id)}
            onPress={() => flipCard(index)}
          />
        ))}
      </Animated.View>

      <Pressable 
        style={({ pressed }) => [
          styles.resetButton,
          { transform: [{ scale: pressed ? 0.98 : 1 }] }
        ]}
        onPress={initGame}
      >
        <Ionicons name="refresh" size={24} color="#FFFFFF" />
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },
  statsText: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '600',
  },
  board: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C55E',
    padding: 16,
    margin: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});