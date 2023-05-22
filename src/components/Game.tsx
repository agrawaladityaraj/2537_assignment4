/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Stack, Group, Text } from "@mantine/core";

import { ICard, IPokemon } from "../models";

import fetchPokemon from "../utils/fetchPokemon";

interface IProps {
  difficulty: number;
}

function shuffle(arr: any[]): any[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Game({ difficulty }: IProps) {
  const [cards, setCards] = useState<ICard[]>([]);
  const [pair, setPair] = useState<number[]>([]);
  const [pairs, setPairs] = useState<number>(difficulty);
  const [matches, setMatches] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(difficulty * 10);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [powerUp, setPowerUp] = useState<boolean>(false);
  const powerUpRef = useRef<NodeJS.Timeout | null>(null);
  const cardsRef = useRef(cards);

  const getNewGame = async () => {
    const data = await fetchPokemon(difficulty);
    const cardData = shuffle([...data, ...data]).map((pokemon: IPokemon) => ({
      pokemon,
      flipped: false,
      canFlip: true,
    }));
    setCards(cardData);
  };

  const flip = (index: number) => {
    if (
      cards.length === 0 ||
      !cards[index]?.canFlip ||
      pair.length === 2 ||
      powerUp
    )
      return;
    const newCards = [...cards];
    newCards[index].flipped = true;
    newCards[index].canFlip = false;
    setCards(newCards);
    setPair((prev) => [...prev, index]);
    setClicks(clicks + 1);
  };

  useEffect(() => {
    getNewGame();
  }, [difficulty]);

  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  useEffect(() => {
    if (pair.length < 2) return;
    const newCards = [...cards];
    if (newCards[pair[0]].pokemon.id === newCards[pair[1]].pokemon.id) {
      newCards[pair[0]].canFlip = false;
      newCards[pair[1]].canFlip = false;
      setMatches(matches + 1);
      setPairs(pairs - 1);
    } else {
      newCards[pair[0]].flipped = false;
      newCards[pair[1]].flipped = false;
      newCards[pair[0]].canFlip = true;
      newCards[pair[1]].canFlip = true;
    }
    setTimeout(() => {
      setPair([]);
      setCards(newCards);
    }, 1000);
  }, [pair]);

  useEffect(() => {
    if (powerUpRef.current !== null) {
      clearTimeout(powerUpRef.current);
    }
    const powerUpTime = Math.random() * (30000 - 20000) + 20000;

    powerUpRef.current = setTimeout(() => {
      activatePowerUp();
    }, powerUpTime);
  }, [powerUp]);

  useEffect(() => {
    if (pairs === 0) {
      setGameOver(true);
    } else if (timeLeft <= 0) {
      setGameOver(true);
      clearTimeout(powerUpRef.current!);
    } else {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, pairs]);

  const activatePowerUp = () => {
    if (powerUp) return;
    setPowerUp(true);
    const originalState = [...cardsRef.current];
    setCards(cardsRef.current.map((card) => ({ ...card, flipped: true })));
    setTimeout(() => {
      setCards(originalState);
      setPowerUp(false);
    }, 3000);
  };

  return (
    <Stack spacing="lg">
      <Stack spacing="xs">
        <Group>
          <Text fw={700}>Difficulty: </Text>
          <Text>{difficulty}</Text>
        </Group>
        <Group>
          <Text fw={700}>Total Pairs: </Text>
          <Text>{difficulty}</Text>
        </Group>
        <Group>
          <Text fw={700}>Matches: </Text>
          <Text>{matches}</Text>
        </Group>
        <Group>
          <Text fw={700}>Pairs left: </Text>
          <Text>{pairs}</Text>
        </Group>
        <Group>
          <Text fw={700}>Clicks: </Text>
          <Text>{clicks}</Text>
        </Group>
        <Group>
          <Text fw={700}>Time left: </Text>
          <Text>{timeLeft}</Text>
        </Group>
      </Stack>
    </Stack>
  );
}

export default Game;
