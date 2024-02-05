export * from "./signup";
import { parentProfileUpdate } from "./parentProfileUpdate";
import { childProfileCompletionAdd } from "./childProfileCompletionAdd";

export const parent = {
  profile: {
    update: parentProfileUpdate,
  },
};

export const child = {
  profile: {
    completion: {
      add: childProfileCompletionAdd,
    },
  },
};
