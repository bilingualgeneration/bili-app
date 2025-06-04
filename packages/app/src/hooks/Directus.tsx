import { authentication, createDirectus, rest } from "@directus/sdk";

import type { ApiCollections } from "@/types/directus.d.ts";

export const directus = createDirectus<ApiCollections>(
  import.meta.env.VITE_DIRECTUS_URL,
)
  .with(authentication("session", { credentials: "include" }))
  .with(
    rest({
      credentials: "include",
    }),
  );
