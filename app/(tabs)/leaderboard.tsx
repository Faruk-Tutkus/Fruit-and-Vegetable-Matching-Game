import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGameStore } from '../../store/gameStore';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function LeaderboardScreen() {
  const { highScores } = useGameStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <View style={styles.decoration} />
      </View>

      <ScrollView style={styles.scoreList}>
        {highScores.length > 0 ? (
          highScores.map((score, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(index * 100).springify()}
              layout={Layout.springify()}
              style={[
                styles.scoreItem,
                index === 0 && styles.goldScore,
                index === 1 && styles.silverScore,
                index === 2 && styles.bronzeScore,
              ]}
            >
              <View style={styles.rank}>
                {index === 0 && <Ionicons name="trophy" size={28} color="#FFD700" />}
                {index === 1 && <Ionicons name="trophy" size={26} color="#C0C0C0" />}
                {index === 2 && <Ionicons name="trophy" size={24} color="#CD7F32" />}
                {index > 2 && <Text style={styles.rankText}>#{index + 1}</Text>}
                }
              </View>
              <Text style={[styles.scoreText, index < 3 && styles.topScore]}>
                {score} points
              </Text>
            </Animated.View>
          ))
        ) : (
          <Animated.View 
            entering={FadeInDown.springify()}
            style={styles.emptyState}
          >
            <Ionicons name="game-controller" size={64} color="#9CA3AF" />
            <Text style={styles.emptyStateText}>No scores yet!</Text>
            <Text style={styles.emptyStateSubtext}>Play a game to set a high score</Text>
          </Animated.View>
        )}
      </ScrollView>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  decoration: {
    width: 40,
    height: 4,
    backgroundColor: '#22C55E',
    borderRadius: 2,
    marginTop: 8,
  },
  scoreList: {
    flex: 1,
    padding: 16,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  goldScore: {
    backgroundColor: '#FFFAF0',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  silverScore: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  bronzeScore: {
    backgroundColor: '#FDF8F6',
    borderWidth: 1,
    borderColor: '#CD7F32',
  },
  rank: {
    width: 50,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B5563',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  topScore: {
    fontSize: 20,
    fontWeight: '700',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 64,
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  emptyStateText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4B5563',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 18,
    color: '#9CA3AF',
    marginTop: 8,
  },
});