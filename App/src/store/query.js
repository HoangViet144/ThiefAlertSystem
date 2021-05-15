import firestore from '@react-native-firebase/firestore'

export const userRef = firestore().collection('user')
export const friendLst = (userId) => firestore().collection('user').doc(userId).collection('friends')
export const sendMess = (userA, userB, messContent) => {
  const messObj = {
    dateCreated: firestore.Timestamp.fromMillis(new Date()),
    userSentId: userA,
    userReceivedId: userB,
    messContent: messContent
  }
  if (userA > userB) [userA, userB] = [userB, userA]
  return firestore().collection('user').doc(userA).collection('chat').doc('chatHistory').collection(userB).add(messObj)
}
export const oldMessRef = (userA, userB) => {
  if (userA > userB) [userA, userB] = [userB, userA]
  return firestore().collection('user').doc(userA).collection('chat').doc('chatHistory').collection(userB)
}
export const convertTime = (doc) => {
  return {
    ...doc,
    dateCreated: doc.dateCreated.toMillis()
  }
}