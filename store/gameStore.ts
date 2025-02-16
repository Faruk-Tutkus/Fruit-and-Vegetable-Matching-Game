import { create } from 'zustand';
import { Image } from 'react-native';

const FRUITS_AND_VEGGIES = [
  { id: 1, name: 'Apple', image: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?w=400&h=400&fit=crop&q=80' },
  { id: 2, name: 'Banana', image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&h=400&fit=crop&q=80' },
  { id: 3, name: 'Orange', image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400&h=400&fit=crop&q=80' },
  { id: 4, name: 'Strawberry', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop&q=80' },
  { id: 5, name: 'Broccoli', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop&q=80' },
  { id: 6, name: 'Carrot', image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&h=400&fit=crop&q=80' },
];

// Resimleri önceden yükle
FRUITS_AND_VEGGIES.forEach(item => {
  Image.prefetch(item.image);
});

interface GameState {
  cards: Array<{ id: number; name: string; image: string }>;
  flippedCards: number[];
  matchedPairs: number[];
  moves: number;
  score: number;
  highScores: number[];
  initGame: () => void;
  flipCard: (index: number) => void;
  addHighScore: (score: number) => void;
}

const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useGameStore = create<GameState>((set, get) => ({
  cards: [],
  flippedCards: [],
  matchedPairs: [],
  moves: 0,
  score: 0,
  highScores: [],

  initGame: () => {
    const duplicatedCards = [...FRUITS_AND_VEGGIES, ...FRUITS_AND_VEGGIES];
    const shuffledCards = shuffleArray(duplicatedCards);
    set({
      cards: shuffledCards,
      flippedCards: [],
      matchedPairs: [],
      moves: 0,
      score: 0,
    });
  },

  flipCard: (index: number) => {
    const { flippedCards, cards, matchedPairs } = get();

    if (flippedCards.length === 2) return;

    set({ flippedCards: [...flippedCards, index] });

    if (flippedCards.length === 1) {
      set(state => ({ moves: state.moves + 1 }));

      if (cards[flippedCards[0]].id === cards[index].id) {
        set(state => ({
          matchedPairs: [...state.matchedPairs, cards[index].id],
          score: state.score + 100,
          flippedCards: [],
        }));
      } else {
        setTimeout(() => {
          set({ flippedCards: [] });
        }, 1000);
      }
    }
  },

  addHighScore: (score: number) => {
    set(state => ({
      highScores: [...state.highScores, score]
        .sort((a, b) => b - a)
        .slice(0, 5),
    }));
  },
}));