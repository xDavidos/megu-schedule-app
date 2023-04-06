import { Stack } from 'expo-router';

import { LoadingLessons } from '../../context/loadingLessons';

export default function Layout() {
  return (
    <>
      <LoadingLessons>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </LoadingLessons>
    </>
  );
}
