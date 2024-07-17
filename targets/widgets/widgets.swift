import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), title: "RNR 1: The First One", imageData: nil, episodeCount: 1, guid: nil)
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), title: "RNR 1: The First One", imageData: nil, episodeCount: 1, guid: nil)
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        // Notice the App Group is used here
        let userDefaults = UserDefaults(suiteName: "group.cr2024im.data")
        // And the key for the data that we use in the MST store.
        let episodesJsonString = userDefaults?.string(forKey: "episodes") ?? "[]"

        let decoded: [EpisodeFromStore] = try! JSONDecoder().decode([EpisodeFromStore].self, from: Data(episodesJsonString.utf8))

        let firstEpisode = decoded.first

        if (firstEpisode != nil) {
            // pass the data to the widget
            let entry = SimpleEntry(date: Date(), title: firstEpisode?.title ?? "", imageData: nil, episodeCount: decoded.count, guid: firstEpisode?.guid)

            // Some other stuff to make the widget update...
            let timeline = Timeline(entries: [entry], policy: .atEnd)
            completion(timeline)
        } else {
            // pass the data to the widget
            let entry = SimpleEntry(date: Date(), title: "", imageData: nil, episodeCount: 0, guid: nil)

            // Some other stuff to make the widget update...
            let timeline = Timeline(entries: [entry], policy: .atEnd)
            completion(timeline)
        }
    }
}

struct SimpleEntry: TimelineEntry {
  let date: Date
  let title: String
  var imageData: UIImage?
  let episodeCount: Int
  let guid: String?
}

struct EpisodeFromStore: Codable {
  let guid: String
  let title: String
  let thumbnail: String
}

struct FavoriteEpisodeWidgetEntryView : View {
  var entry: Provider.Entry

  var body: some View {
    VStack {
      if (entry.episodeCount == 0) {
        Text("No favorite episodes yet!")
      } else {
        Text(entry.title)
      }
    }
  }
}

struct FavoriteEpisodeWidget: Widget {
    let kind: String = "FavoriteEpisodeWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            if #available(iOS 17.0, *) {
                FavoriteEpisodeWidgetEntryView(entry: entry)
                    .containerBackground(.fill.tertiary, for: .widget)
            } else {
                FavoriteEpisodeWidgetEntryView(entry: entry)
                    .padding()
                    .background()
            }
        }
        .configurationDisplayName("My Widget")
        .description("This is an example widget.")
    }
}

#Preview(as: .systemSmall) {
    FavoriteEpisodeWidget()
} timeline: {
    SimpleEntry(date: Date(), title: "RNR 1: The First One", imageData: nil, episodeCount: 1, guid: nil)
}