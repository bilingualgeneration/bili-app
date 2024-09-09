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

const getClassroomAnalyticsByClassroomIds = async (
  firestore: Firestore,
  classroomIds: string[],
) => {
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

    console.log("Classroom Analytics Data:", classroomAnalyticsData);
    return classroomAnalyticsData;
  } catch (error) {
    console.error("Error fetching classroomAnalytics data:", error);
    throw error;
  }
};

export const generateClassroomDashboard = async (
  db: Database,
  firestore: Firestore,
) => {
  console.log("generate class dashboard");

  // Get active classroom IDs
  const q = query(
    collection(firestore, "classroom"),
    where("isActive", "==", true),
  );
  const activeClassroomsSnapshot = await getDocs(q);

  let activeClassroomIds: string[] = [];

  if (!activeClassroomsSnapshot.empty) {
    activeClassroomsSnapshot.forEach((doc: any) => {
      console.log("doc", doc);
      activeClassroomIds.push(doc.id);
    });
  }

  if (activeClassroomIds.length === 0) return;

  const classrooms = {};

  const dbRef = ref(db);

  // Get classroom data
  const classroomValues = await Promise.all(
    activeClassroomIds.map(async (classroomId) => {
      const snapshot = await get(child(dbRef, `/classrooms/${classroomId}`));

      return snapshot.val();
    }),
  );
  activeClassroomIds.forEach((id, index) => {
    if (!classroomValues[index]) return;

    classrooms[id] = classroomValues[index];
  });

  // Get user IDs from classrooms
  let userIds: string[] = [];
  Object.values(classrooms).forEach((classroom: any) => {
    userIds = userIds.concat(Object.keys(classroom.users));
  });

  // Get home data
  const usersData = await Promise.all(
    userIds.map(async (userId) => {
      const snapshot = await get(child(dbRef, `/users/${userId}`));
      return { userId, homeData: snapshot.val() };
    }),
  );

  // Store classroom and home data together
  const classroomAnalytics: Record<string, any> = {};

  for (const [classroomId, classroomData] of Object.entries(classrooms)) {
    classroomAnalytics[classroomId] = {
      users: {},
    };

    for (const [userId, userDataInClassroom] of Object.entries(
      classroomData.users,
    )) {
      if (!classroomAnalytics[classroomId].users[userId]) {
        classroomAnalytics[classroomId].users[userId] = {
          activities: {
            classroom: null,
            home: null,
          },
        };
      }

      classroomAnalytics[classroomId]["users"][userId]["activities"][
        "classroom"
      ] = userDataInClassroom;

      const homeData = usersData.find((item) => item.userId === userId);
      if (homeData) {
        classroomAnalytics[classroomId]["users"][userId]["activities"]["home"] =
          homeData.homeData;
      }
    }
  }

  // Get analytics of classrooms
  const analyticsObjects = await getClassroomAnalyticsByClassroomIds(
    firestore,
    Object.keys(classroomAnalytics),
  );

  // Write analytics to firestore
  const batch = writeBatch(firestore);

  for (const analyticsObj of analyticsObjects) {
    const ref = doc(firestore, "classroomAnalytics", analyticsObj.id);
    batch.update(ref, {
      analytics: classroomAnalytics[analyticsObj.data.classroom],
    });
  }

  await batch.commit();
};

export const generateClassroomDashboardScheduledFunction = onSchedule(
  "every day 00:00",
  async () => {
    const db = admin.database();
    const firestore = admin.firestore();

    await generateClassroomDashboard(db, firestore);
  },
);
