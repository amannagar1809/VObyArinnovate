const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteConfig = {
  name: "Arinnovate Workspaces",
  description:
    "Flexible workspaces for independent professionals and growing teams.",
  url: new URL(configuredSiteUrl || "http://localhost:3000"),
};