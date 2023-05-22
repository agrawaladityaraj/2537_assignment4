import React, { useState, useEffect } from "react";
import { MantineProvider, Box, Stack, Title } from "@mantine/core";

import "./App.css";

function App() {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<5 | 10 | 15>(5);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleReset = () => {
    setGameStarted(false);
    setDifficulty(5);
  };

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: darkTheme ? "dark" : "light",
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
        </Stack>
      </Box>
    </MantineProvider>
  );
}

export default App;
