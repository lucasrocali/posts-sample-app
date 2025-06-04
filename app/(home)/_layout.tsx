import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        title: "Feed",
      }}
    >
      <Stack.Screen name="/index" />
      <Stack.Screen name="/posts/[id]" />
    </Stack>
  );
}
