const admin = require("firebase-admin");
import { onSchedule } from "firebase-functions/v2/scheduler";
import { child, Database, get, ref } from "firebase/database";
import {
  collection,
  doc,
  Firestore,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

/*
const sampledata = {
  classroom: "ID",
  learningTimeSummary: {},
  dashboard: {
    users: {
      user1: {
        activities: {
          home: {
            activityGroup: {
              story1: {
                starsEarned: 1,
              },
            },
          },

          classroom: {
            activityGroup: {
              story1: {
                starsEarned: 2,
              },
            },
          },
        },
      },
    },
  },
};
*/

/**
 * Get classroomAnalytics documents by classroom IDs.
 * @param firestore Firestore instance.
 * @param classroomIds Array of classroom IDs.
 * @returns A list of objects containing document ID and classroom analytics data.
 */
const getClassroomAnalyticsByClassroomIds = async (
  firestore: Firestore,
  classroomIds: string[],
): Promise<Array<{ id: string; data: any }>> => {
  try {
    const q = query(
      collection(firestore, "classroomAnalytics"),
      where("classroom", "in", classroomIds),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching classroomAnalytics documents found.");
      return [];
    }

    // Map the documents to their data
    const classroomAnalyticsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    return classroomAnalyticsData;
  } catch (error) {
    console.error("Error fetching classroomAnalytics data:", error);
    throw error;
  }
};

/**
 * Fetch active classroom IDs from Firestore.
 * @param firestore Firestore instance.
 * @returns A list of active classroom IDs.
 */
const getActiveClassroomIds = async (
  firestore: Firestore,
): Promise<string[]> => {
  const q = query(
    collection(firestore, "classroom"),
    where("isActive", "==", true),
  );
  const activeClassroomsSnapshot = await getDocs(q);

  const activeClassroomIds: string[] = [];
  if (!activeClassroomsSnapshot.empty) {
    activeClassroomsSnapshot.forEach((doc) => activeClassroomIds.push(doc.id));
  }

  return activeClassroomIds;
};

/**
 * Fetch classroom data from Realtime Database for active classroom IDs.
 * @param db Realtime Database instance.
 * @param classroomIds Array of active classroom IDs.
 * @returns An object containing classroom data.
 */
const getClassroomData = async (
  db: Database,
  classroomIds: string[],
): Promise<Record<string, any>> => {
  const dbRef = ref(db);
  const classroomData: Record<string, any> = {};

  const classroomValues = await Promise.all(
    classroomIds.map(async (classroomId) => {
      const snapshot = await get(child(dbRef, `/classrooms/${classroomId}`));
      return snapshot.val();
    }),
  );

  classroomIds.forEach((id, index) => {
    if (classroomValues[index]) {
      classroomData[id] = classroomValues[index];
    }
  });

  return classroomData;
};

/**
 * Fetch user home data from Realtime Database.
 * @param db Realtime Database instance.
 * @param userIds Array of user IDs.
 * @returns An array containing user home data.
 */
const getUserHomeData = async (
  db: Database,
  userIds: string[],
): Promise<Array<{ userId: string; homeData: any }>> => {
  const dbRef = ref(db);

  const usersData = await Promise.all(
    userIds.map(async (userId) => {
      const snapshot = await get(child(dbRef, `/users/${userId}`));
      return { userId, homeData: snapshot.val() };
    }),
  );

  return usersData;
};

/**
 * Generate classroom dashboard analytics by combining classroom and user home data.
 * @param db Realtime Database instance.
 * @param firestore Firestore instance.
 */
export const generateClassroomDashboard = async (
  db: Database,
  firestore: Firestore,
) => {
  console.log("Generate classroom dashboard");

  // Step 1: Get active classroom IDs
  const activeClassroomIds = await getActiveClassroomIds(firestore);
  if (activeClassroomIds.length === 0) return;

  // Step 2: Get classroom data from Realtime Database
  const classrooms = await getClassroomData(db, activeClassroomIds);

  // Step 3: Collect all user IDs from classrooms
  let userIds: string[] = [];
  Object.values(classrooms).forEach((classroom: any) => {
    userIds = userIds.concat(Object.keys(classroom.users));
  });

  // Step 4: Get home data for users
  const usersData = await getUserHomeData(db, userIds);

  // Step 5: Combine classroom data and home data
  const classroomAnalytics: Record<string, any> = {};
  for (const [classroomId, classroomData] of Object.entries(classrooms)) {
    classroomAnalytics[classroomId] = { users: {} };

    for (const [userId, userDataInClassroom] of Object.entries(
      classroomData.users,
    )) {
      classroomAnalytics[classroomId].users[userId] = {
        activities: {
          classroom: userDataInClassroom,
          home:
            usersData.find((item) => item.userId === userId)?.homeData || null,
        },
      };
    }
  }

  // Step 6: Get classroom analytics from Firestore
  const analyticsObjects = await getClassroomAnalyticsByClassroomIds(
    firestore,
    Object.keys(classroomAnalytics),
  );

  // Step 7: Write updated analytics data to Firestore
  const batch = writeBatch(firestore);
  analyticsObjects.forEach((analyticsObj) => {
    const ref = doc(firestore, "classroomAnalytics", analyticsObj.id);
    batch.update(ref, {
      analytics: classroomAnalytics[analyticsObj.data.classroom],
    });
  });

  await batch.commit();
};

/**
 * Schedule function to generate classroom dashboard daily.
 */
export const generateClassroomDashboardScheduledFunction = onSchedule(
  "every day 00:00",
  async () => {
    const db = admin.database();
    const firestore = admin.firestore();
    await generateClassroomDashboard(db, firestore);
  },
);
