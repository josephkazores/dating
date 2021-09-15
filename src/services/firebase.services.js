import app, { firebase } from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import '@react-native-firebase/functions'
import '@react-native-firebase/database'
import '@react-native-firebase/firestore'

// import DevicesFBServices from './devicesFB.services'
// import MessagingFBServices from './messagingFB.services'
import config from './config.json'

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      app.initializeApp(config)
    }

    this.authUser = {}
    this.auth = app.auth()
    this.db = app.firestore()
    this.functions = app.functions()

    this.auth.onAuthStateChanged((user) => {
      this.authUser = { user }
    })

    this.auth.onUserChanged((user) => {
      this.authUser = { user }
    })
  }

  checkAuthorization = () => {
    if (!this.auth.currentUser) {
      return [
        '[error/unauthorized] You are unauthorized to perform any operation. Please login and try again.',
      ]
    }

    return []
  }

  processSnapshots({ query, setLastRef = Function.prototype } = {}) {
    return query
      .get()
      .then((querySnapshot) => {
        const data = []

        setLastRef(querySnapshot.docs[querySnapshot.docs.length - 1])

        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          })
        })

        return [null, data]
      })
      .catch((error) => {
        return [error]
      })
  }

  signIn({ email, password }) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => err)
  }

  createUserProfile = ({
    id,
    username,
    fullName,
    email,
    social = {},
    avatar = TEMPORARY_AVATAR,
    cover = TEMPORARY_COVER,
  } = {}) => {
    const newSocial = {
      location: '',
      biography: '',
      company: '',
      education: '',
      phone: '',
      birthday: null,
      facebook: 'https://www.facebook.com/',
      twitter: 'https://www.twitter.com/',
      instagram: 'https://www.instagram.com/',
      linkedin: 'https://www.linkedin.com/',
      tumblr: 'https://www.tumblr.com/',
      mediaArray: [],
      ...social,
    }

    const user = {
      id,
      avatar,
      cover,
      username,
      fullName,
      email,
      social: newSocial,
    }

    return this.setFBDoc({
      doc: id,
      docData: user,
    })
  }

  signUp({ fullName, username, email, password }) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => app.auth().currentUser)
      .then(async (currentUser) => {
        await this.createUserProfile({
          id: currentUser.uid,
          email,
          username,
          fullName,
        })

        return currentUser
      })
      .then(async (currentUser) => {
        await currentUser.updateProfile({
          username,
          displayName: fullName,
          photoURL: TEMPORARY_AVATAR,
        })
      })
      .then(() => ({ user: app.auth().currentUser }))
      .catch((err) => err)
  }

  updateProfile({ displayName, username, photoURL, ...rest }) {
    const profile = {
      username,
      displayName,
      photoURL,
      ...rest,
    }

    return this.auth.currentUser.updateProfile(profile)
  }

  signOut() {
    // const [token] = await MessagingFBServices.getFCMToken()

    // await DevicesFBServices.deactivateUserDevice(token)

    return this.auth.signOut()
  }

  sendPasswordResetEmail(emailAddress) {
    return this.auth
      .sendPasswordResetEmail(emailAddress)
      .then(() => ({ success: true }))
      .catch((error) => ({ error }))
  }

  getFBCollectionData({
    endCollection,
    parentCollection = 'users',
    parentDoc,
  } = {}) {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .doc(parentDoc || this.auth.currentUser.uid)
      .collection(endCollection)
  }

  getFBCollectionWhere = ({
    parentCollection = 'users',
    key,
    value,
    operator = '==',
  } = {}) => {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db.collection(parentCollection).where(key, operator, value)
  }

  getFBCollectionDataWhereBool({
    endCollection,
    key,
    value,
    parentCollection = 'users',
    parentDoc,
  } = {}) {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .doc(parentDoc || this.auth.currentUser.uid)
      .collection(endCollection)
      .where(key, '==', value)
  }

  addFBData({ values, doc, endCollection, parentCollection = 'users' } = {}) {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .doc(doc || this.auth.currentUser.uid)
      .collection(endCollection)
      .add(values)
  }

  updateFBData({
    values,
    doc,
    endCollection,
    parentCollection = 'users',
  } = {}) {
    const { id } = values
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    const clone = { ...values }
    delete clone.id

    return this.db
      .collection(parentCollection)
      .doc(doc || this.auth.currentUser.uid)
      .collection(endCollection)
      .doc(id)
      .update({
        ...clone,
      })
  }

  addFBDoc = ({ parentCollection = 'users', docData = {} } = {}) => {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .add(docData)
      .then((res) => [null, res])
      .catch((err) => [err])
  }

  setFBDoc = ({ parentCollection = 'users', doc, docData = {} } = {}) => {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .doc(doc)
      .set({
        ...docData,
      })
      .then((res) => [null, res])
      .catch((err) => [err])
  }

  getFBData({ id, parentDoc, endCollection, parentCollection = 'users' } = {}) {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .doc(parentDoc || this.auth.currentUser.uid)
      .collection(endCollection)
      .doc(id)
  }

  getFBDoc = ({ parentCollection = 'users', doc } = {}) => {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    const colllectionDoc = doc ? doc : this.auth.currentUser.uid

    return this.db.collection(parentCollection).doc(colllectionDoc)
  }

  deleteFBDoc = ({ parentCollection, doc } = {}) => {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .doc(doc)
      .delete()
      .then((res) => [null, res])
      .catch((err) => [err])
  }

  updateFBDoc({ doc, docData, parentDoc, parentCollection = 'users' } = {}) {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .doc(parentDoc || this.auth.currentUser.uid)
      .update({
        [doc]: docData,
      })
  }

  updateMultipleFBDoc({
    docs = {},
    parentDoc,
    parentCollection = 'users',
  } = {}) {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .doc(parentDoc || this.auth.currentUser.uid)
      .update({
        ...docs,
      })
  }

  async deleteMultipleFBData({
    ids,
    endCollection,
    parentCollection = 'users',
  } = {}) {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    let batch = this.db.batch()
    if (ids && ids.length > 0) {
      ids.forEach((id) => {
        let dataRef = this.db
          .collection(parentCollection)
          .doc(`${this.auth.currentUser.uid}`)
          .collection(endCollection)
          .doc(id)
        batch.delete(dataRef)
      })
      batch.commit()
    }
  }
}
const TEMPORARY_AVATAR =
  'https://firebasestorage.googleapis.com/v0/b/loanpalz/o/static%2Fprofile-default.jpg?alt=media'

const TEMPORARY_COVER =
  'https://firebasestorage.googleapis.com/v0/b/loanpalz/o/static%2Fprofile-default.jpg?alt=media'

export const FirebaseService = new Firebase()
export default app
