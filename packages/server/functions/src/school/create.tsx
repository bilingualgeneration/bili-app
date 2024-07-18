const admin = require('firebase-admin');
import {HttpsError} from 'firebase-functions/v2/https';
import {onCall} from 'firebase-functions/v2/https';

export const create = onCall(async (request) => {
  // todo: verify caler
  const {name} = request.data;
  if(request.auth!.token.email !== 'jon@sharemeals.org'){
    throw new HttpsError('unauthenticated', 'unauthenticated');
  }
  await Promise.all([
    admin.firestore().collection('schools').add({
      name,
    })
  ]);
});
