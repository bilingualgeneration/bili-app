import { database } from "@/components/Firebase";
import { child, get, ref } from "firebase/database";

export const getReportData = async () => {
  const dbRef = ref(database);

  const userIds = ["user1"];

  const usersDataSnapshots = await Promise.all(
    userIds.map((userId) => get(child(dbRef, `/users/${userId}`))),
  );
  const usersData = usersDataSnapshots.map((item) => item.val());
  console.log("usersData", usersData);
};
