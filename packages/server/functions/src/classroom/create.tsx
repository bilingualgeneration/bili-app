const admin = require('firebase-admin');
import {onCall} from 'firebase-functions/v2/https';

export const create = onCall(async (request) => {
  // todo: verify that caller is a teacher
  const {name} = request.data;
  createClassroom({
    name,
    schoolId: 'abc',
    userId: 'def',
  });
});

export interface CreateClassroomArgs {
  name: string,
  schoolId: string,
  userId: string,
}

export const createClassroom = async ({
  schoolId,
  name,
  userId,
}: CreateClassroomArgs) => {
  await Promise.all([
    admin.firestore().collection('classrooms').add({
      schoolId,
      teachers: [userId],
      name,
    })
  ]);
};
