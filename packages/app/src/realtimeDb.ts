import { database } from "@/components/Firebase";
import { child, get, increment, ref, update } from "firebase/database";

// Hearts are increment only, there is no need to do a max comparison
export const updateActivityHearts = () => {};

export const updateActivityStars = async ({
  classroomId,
  userId,
  activity,
  activityId,
  stars,
}: {
  classroomId: string | null;
  userId: string | null;
  activity: string;
  activityId: string;
  stars: number;
}) => {
  const dbRef = ref(database);

  const updates: {
    [key: string]: any;
  } = {};

  if (!classroomId) {
    // Updte max stars for this activity
    const activityPath = `/users/${userId}/home/activities/${activity}/${activityId}`;
    const activityDataSnapshot = await get(child(dbRef, activityPath));

    const currStarsEarned = activityDataSnapshot.val()?.starsEarned || 0;

    if (stars > currStarsEarned) {
      updates[activityPath] = {
        starsEarned: stars,
      };
    }

    // Atomically increment home total Stars
    const homeTotalStarsPath = `/users/${userId}/home/totalStars`;

    const diffInStars = Math.max(0, stars - currStarsEarned);

    if (diffInStars > 0) {
      updates[homeTotalStarsPath] = increment(diffInStars);
    }

    // Atomically increment user total stars
    const userTotalStarsPath = `/users/${userId}/totalStars`;

    if (diffInStars > 0) {
      updates[userTotalStarsPath] = increment(diffInStars);
    }
  } else {
    // Updte max accuracy for this activity
    const activityPath = `/classrooms/${classroomId}/users/${userId}/activities/${activity}/${activityId}`;
    const activityDataSnapshot = await get(child(dbRef, activityPath));

    const currStarsEarned = activityDataSnapshot.val()?.starsEarned || 0;

    if (stars > currStarsEarned) {
      updates[activityPath] = {
        starsEarned: stars,
      };
    }

    // Atomically increment classroom total Stars
    const classroomTotalStarsPath = `/classrooms/${classroomId}/users/${userId}/totalStars`;

    const diffInStars = Math.max(0, stars - currStarsEarned);

    if (diffInStars > 0) {
      updates[classroomTotalStarsPath] = increment(diffInStars);
    }

    // Atomically increment user total stars
    const userTotalStarsPath = `/users/${userId}/totalStars`;

    if (diffInStars > 0) {
      updates[userTotalStarsPath] = increment(diffInStars);
    }
  }

  // Update
  update(dbRef, updates);
};
