import React from "react"
import { Platform } from "react-native"
import * as QuickActions from "expo-quick-actions"
import { useQuickActionRouting, RouterAction } from "expo-quick-actions/router"
import { Redirect, Stack } from "expo-router"
import { observer } from "mobx-react-lite"
import { useStores } from "src/models"
import { useThemeProvider } from "src/utils/useAppTheme"

export default observer(function Layout() {
  const {
    authenticationStore: { isAuthenticated },
    profileStore: {
      profile: { darkMode },
    },
  } = useStores()

  useQuickActionRouting()

  React.useEffect(() => {
    QuickActions.setItems<RouterAction>([
      {
        title: "Update your profile",
        subtitle: "Keep your deets up-to-date!",
        icon: Platform.OS === "android" ? undefined : "contact", // we'll come back to the Android icon
        id: "0",
        params: { href: "/(app)/(tabs)/profile" },
      },
    ])
  }, [])

  const { themeScheme, setThemeContextOverride, ThemeProvider } = useThemeProvider(
    darkMode ? "dark" : "light",
  )

  if (!isAuthenticated) {
    return <Redirect href="/log-in" />
  }

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  )
})
