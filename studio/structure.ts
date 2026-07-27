import type { StructureResolver } from "sanity/structure";

// Custom Studio sidebar: siteSettings as a singleton, pages split by
// placement so it's obvious which ones live under Resurser.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Innehåll")
    .items([
      S.listItem()
        .title("Webbplatsinställningar")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.listItem()
        .title("Sidor")
        .child(
          S.list()
            .title("Sidor")
            .items([
              S.listItem()
                .title("Fristående sidor")
                .child(
                  S.documentList()
                    .title("Fristående sidor")
                    .filter('_type == "page" && placement != "resources"')
                ),
              S.listItem()
                .title("Under Resurser")
                .child(
                  S.documentList()
                    .title("Sidor under Resurser")
                    .filter('_type == "page" && placement == "resources"')
                ),
              S.divider(),
              S.documentTypeListItem("page").title("Alla sidor"),
            ])
        ),
      S.divider(),
      S.documentTypeListItem("post").title("Blogginlägg"),
      S.documentTypeListItem("foredrag").title("Föredrag"),
      S.documentTypeListItem("meditation").title("Meditationer"),
      S.documentTypeListItem("video").title("Videos"),
    ]);
