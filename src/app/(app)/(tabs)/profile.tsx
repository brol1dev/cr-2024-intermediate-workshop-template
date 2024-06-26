import Slider from "@react-native-community/slider"
import { observer } from "mobx-react-lite"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, TextField, Toggle } from "src/components"
import { TxKeyPath } from "src/i18n"
import { useStores } from "src/models"
import { colors, spacing } from "src/theme"

export default observer(function ProfileScreen() {
  const {
    profileStore: { profile },
  } = useStores()

  const { name, location, yoe, bio, openToWork, remote, rnFamiliarity, setProp } = profile

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$container}
      keyboardShouldPersistTaps="handled"
    >
      <Text preset="heading" tx="demoProfileScreen.title" style={$title} />
      <TextField
        labelTx="demoProfileScreen.name"
        containerStyle={$textField}
        placeholderTx="demoProfileScreen.name"
        value={name}
        onChangeText={(text) => setProp("name", text)}
      />
      <TextField
        labelTx="demoProfileScreen.location"
        containerStyle={$textField}
        placeholderTx="demoProfileScreen.location"
        value={location}
        onChangeText={(text) => setProp("location", text)}
      />
      <TextField
        labelTx="demoProfileScreen.yoe"
        containerStyle={$textField}
        keyboardType="number-pad"
        placeholderTx="demoProfileScreen.yoe"
        value={yoe}
        onChangeText={(text) => setProp("yoe", text)}
      />
      <Text
        preset="formLabel"
        tx="demoProfileScreen.rnFamiliarity"
        style={{ marginBottom: spacing.xs }}
      />
      <Text
        tx={`demoProfileScreen.familiaritySubtitles.${rnFamiliarity}` as TxKeyPath}
        style={$familiaritySubtitle}
      />
      <Slider
        minimumValue={0}
        maximumValue={4}
        minimumTrackTintColor={colors.tint}
        maximumTrackTintColor={colors.palette.secondary500}
        tapToSeek
        step={1}
        value={rnFamiliarity}
        onValueChange={(value) => setProp("rnFamiliarity", value)}
        style={$slider}
        renderStepNumber
        StepMarker={({ stepMarked }) => (
          <View
            style={[
              $stepMarkerStyle,
              stepMarked && {
                backgroundColor: colors.transparent,
              },
            ]}
          />
        )}
      />

      <Toggle
        labelTx="demoProfileScreen.job"
        variant="switch"
        labelPosition="left"
        containerStyle={$textField}
        value={openToWork}
        onPress={() => setProp("openToWork", !openToWork)}
      />
      <Toggle
        labelTx="demoProfileScreen.remote"
        variant="switch"
        labelPosition="left"
        containerStyle={$textField}
        value={remote}
        onPress={() => setProp("remote", !remote)}
      />
      <Text preset="formLabel" tx="demoProfileScreen.skills" />
      <Text tx="demoProfileScreen.addMulti" disabled style={$textField} />
      <TextField
        labelTx="demoProfileScreen.bio"
        containerStyle={$textField}
        multiline
        placeholderTx="demoProfileScreen.bio"
        value={bio}
        onChangeText={(text) => setProp("bio", text)}
      />
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
}

const $textField: ViewStyle = {
  marginBottom: spacing.sm,
}

const $stepMarkerStyle: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: colors.tint,
  marginTop: 6,
}

const $slider: ViewStyle = { marginBottom: spacing.xl }

const $familiaritySubtitle: TextStyle = { alignSelf: "center" }