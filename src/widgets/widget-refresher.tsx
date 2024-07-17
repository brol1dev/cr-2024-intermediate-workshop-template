import { Platform } from "react-native"
import { Episode } from "src/models/Episode"
import IosWidgetRefresh from "../../modules/ios-widget-refresh";

export const updateEpisodesWidget = (episodes: Episode[]) => {
  if (Platform.OS === "android") {
    // refresh android widget here
  }
  if (Platform.OS === "ios") {
    IosWidgetRefresh.set( "episodes", JSON.stringify(episodes.slice()), "group.cr2024im.data")
  }
}
