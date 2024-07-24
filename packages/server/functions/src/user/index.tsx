export * from "./signup";
import { parentProfileUpdate } from "./parentProfileUpdate";
import { childProfileCompletionAdd } from "./childProfileCompletionAdd";
import { recordActivity } from "./recordActivity";

export const activity = {
  record: recordActivity,
};

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
