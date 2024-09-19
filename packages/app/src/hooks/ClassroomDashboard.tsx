import React, { createContext, useContext, useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "@/components/Firebase";

const ClassroomDashboardContext = createContext({} as any);

// TODO: fetch from firestore `classroomAnalytics` collection instead
export const ClassroomDashboardProvider: React.FC<
  React.PropsWithChildren<{ classroomId: string }>
> = ({ classroomId, children }) => {
  const [classroomData, setClassroomData] = useState(null);
  const [usersData, setUsersData] = useState({});

  useEffect(() => {
    if (!classroomId) return;

    const fetchClassroomData = async () => {
      try {
        // Fetch classroom data
        const classroomRef = ref(database, `classrooms/${classroomId}`);
        const classroomSnapshot = await get(classroomRef);

        if (classroomSnapshot.exists()) {
          const classroom = classroomSnapshot.val();
          setClassroomData(classroom);

          // Fetch user data for each user ID in the classroom
          const userPromises = Object.keys(classroom.users).map(
            async (userId) => {
              const userRef = ref(database, `users/${userId}`);
              const userSnapshot = await get(userRef);
              if (userSnapshot.exists()) {
                return { [userId]: userSnapshot.val() };
              }
              return null;
            },
          );

          const usersResults = await Promise.all(userPromises);
          const users = usersResults.reduce(
            (acc, user) => ({ ...acc, ...user }),
            {},
          );
          // @ts-ignore
          setUsersData(users);
        }
      } catch (error) {
        console.error("Error fetching classroom data:", error);
      }
    };

    fetchClassroomData();
  }, [classroomId]);

  return (
    <ClassroomDashboardContext.Provider value={{ classroomData, usersData }}>
      {children}
    </ClassroomDashboardContext.Provider>
  );
};

export const useClassroomDashboard = () => {
  return useContext(ClassroomDashboardContext);
};
