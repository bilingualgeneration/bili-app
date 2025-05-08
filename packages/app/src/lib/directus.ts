import {
  authentication,
  createDirectus,
  graphql,
  readMe,
  rest,
  withToken,
} from "@directus/sdk";

export const directus = createDirectus("http://localhost:8055")
  .with(authentication("session", { credentials: "include" }))
  .with(graphql({ credentials: "include" }))
  .with(rest({ credentials: "include" }));

export const getClasses = () => {
  return directus.request(() => ({
    path: "/flows/trigger/49885252-63a9-4141-b363-4a6e0ac99d5d",
    method: "GET",
  }));
};

export const getProfile = () => {
  return directus.request(
    readMe({
      fields: ["*"],
    }),
  );
};
