import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { verticalScale } from "src/utils/scaleHelper";
import { shuffle } from "src/utils/shuffle";

const symbols = [
  "bicycle",
  "bicycle",
  "leaf",
  "leaf",
  "cube",
  "cube",
  "anchor",
  "anchor",
  "paper-plane-o",
  "paper-plane-o",
  "bolt",
  "bolt",
  "bomb",
  "bomb",
  "diamond",
  "diamond",
];

const rank3stars = symbols.length + 2;
const rank2stars = symbols.length + 6;
const rank1stars = symbols.length + 10;
const gameCardsQTY = symbols.length / 2;
const delay = 800;

const BlickPuzzle = () => {
  const [cards, setCards] = useState(shuffle([...symbols]));
  const [animation] = useState(new Animated.Value(0));
  const [opened, setOpened] = useState<string[]>([]);
  const [match, setMatch] = useState(0);
  const [moves, setMoves] = useState(0);
  useEffect(() => {
    initGame();
  }, []);

  const animatePress = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300, // 0.3 секунды
      useNativeDriver: true, // Для повышения производительности используйте native driver
    }).start();
  };

  const animatedStyles = {
    transform: [
      {
        rotateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };

  const initGame = () => {
    setCards(shuffle([...symbols]));
    setOpened([]);
    setMatch(0);
    setMoves(0);
  };

  const setRating = (moves: number) => {
    let rating = 3;
    if (moves > rank3stars && moves < rank2stars) {
      rating = 2;
    } else if (moves > rank2stars && moves < rank1stars) {
      rating = 1;
    } else if (moves > rank1stars) {
      rating = 0;
    }
    return rating;
  };

  const endGame = () => {
    const rating = setRating(moves);
    alert(
      `Congratulations! You Won!\nWith ${moves} Moves and ${rating} Stars.\nBoom Shaka Lak!`,
    );
    initGame();
  };

  const handleCardPress = (index: number) => {
    animatePress();
    if (opened.length > 1) return;

    const updatedOpened = [...opened];
    const card = cards[index];
    updatedOpened.push(card);
    setOpened(updatedOpened);

    if (updatedOpened.length > 1) {
      if (card === updatedOpened[0]) {
        setTimeout(() => {
          setMatch(match + 1);
        }, delay);
      } else {
        setTimeout(() => {
          setOpened([]);
        }, delay / 1.5);
      }

      setMoves(moves + 1);
      const rating = setRating(moves);

      if (gameCardsQTY === match) {
        setTimeout(() => {
          endGame();
        }, 500);
      }
    }
  };
  console.log("cards", cards);
  return (
    <View style={styles.container}>
      <View style={styles.scorePanel}>
        <View style={styles.stars}>
          <FontAwesome name="star" style={styles.starIcon} />
          <FontAwesome name="star" style={styles.starIcon} />
          <FontAwesome name="star" style={styles.starIcon} />
        </View>
        <Text style={styles.moves}>{moves} Moves</Text>
        <TouchableOpacity style={styles.restart} onPress={initGame}>
          <FontAwesome name="repeat" style={styles.restartIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.deck}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              opened.includes(card) && styles.openedCard,
              animatedStyles,
            ]}
            onPress={() => handleCardPress(index)}
          >
            {opened.includes(card) && (
              <Image
                source={{
                  uri: `https://deckofcardsapi.com/static/img/${card}.png`,
                }}
                style={styles.cardImage}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#000",
  },
  scorePanel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: verticalScale(200),
  },
  stars: {
    flexDirection: "row",
    marginRight: verticalScale(5),
  },
  starIcon: {
    fontSize: verticalScale(24),
    color: "#FFFA62",
    marginRight: verticalScale(5),
  },
  moves: {
    color: "#FFF",
    marginRight: verticalScale(5),
  },
  restart: {
    marginLeft: "auto",
  },
  restartIcon: {
    fontSize: verticalScale(24),
    color: "#FFF",
  },
  deck: {
    margin: 0,
    backgroundColor: "#FFFA62",
    padding: verticalScale(16),
    borderRadius: verticalScale(10),
    // boxShadow: "14px 14px 0 0 #000000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    width: verticalScale(80),
    height: verticalScale(80),
    backgroundColor: "#FFCF7F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    marginBottom: verticalScale(15),
    marginRight: verticalScale(15),
    lineHeight: verticalScale(140),
    fontSize: 0,
    color: "#ffffff",
    textAlign: "center",
    borderRadius: 8,
    transform: [{ rotate: "180deg" }],
    // transition: "transform 0.3s ease",
    fontFamily: "FontAwesome",
  },
  openedCard: {
    transform: [{ rotate: "0" }],
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
});

export default BlickPuzzle;
