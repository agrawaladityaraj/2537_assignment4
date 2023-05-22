import { useState } from "react";
import {
  MantineProvider,
  Box,
  Stack,
  Title,
  Group,
  Switch,
  Radio,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

import "./App.css";
import Game from "./components/Game";

function App() {
  const theme = useMantineTheme();

  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<number>(5);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: darkTheme ? "dark" : "light",
        fontFamily: "Monaco, Courier, monospace",
        fontFamilyMonospace: "Monaco, Courier, monospace",
        headings: { fontFamily: "Monaco, Courier, monospace" },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack
          sx={{
            maxWidth: "1200px",
            padding: "2vw",
          }}
          spacing="lg"
        >
          <Title order={2}>Welcome to the Pokemon Game!</Title>
          <Group position="center">
            <Switch
              onChange={() => setDarkTheme(!darkTheme)}
              size="md"
              color={theme.colorScheme === "dark" ? "gray" : "dark"}
              label={darkTheme ? "Light Theme" : "Dark Theme"}
              onLabel={
                <IconSun
                  size="1rem"
                  stroke={2.5}
                  color={theme.colors.yellow[4]}
                />
              }
              offLabel={
                <IconMoonStars
                  size="1rem"
                  stroke={2.5}
                  color={theme.colors.blue[6]}
                />
              }
            />
          </Group>
          {!gameStarted && (
            <Radio.Group
              name="difficulty"
              label="Difficulty level"
              value={difficulty.toString()}
              onChange={(value: string) => setDifficulty(parseInt(value))}
              size="md"
            >
              <Group mt="sm">
                <Radio size="sm" value="5" label="Easy"></Radio>
                <Radio size="sm" value="10" label="Medium"></Radio>
                <Radio size="sm" value="15" label="Hard"></Radio>
              </Group>
            </Radio.Group>
          )}
          {gameStarted ? (
            <Button
              onClick={() => {
                setGameStarted(false);
                setDifficulty(5);
              }}
            >
              Reset Game
            </Button>
          ) : (
            <Button
              onClick={() => {
                setGameStarted(true);
              }}
            >
              Start Game
            </Button>
          )}
          {gameStarted && <Game difficulty={difficulty} />}
        </Stack>
      </Box>
    </MantineProvider>
  );
}

export default App;
