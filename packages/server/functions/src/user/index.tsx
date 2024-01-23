export * from "./signup";
import { parentProfileUpdate } from "./parentProfileUpdate";

export const parent = {
  profile: {
    update: parentProfileUpdate,
  },
};
