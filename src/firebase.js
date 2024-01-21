import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut, updatePassword, updateProfile } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import toast from "react-hot-toast";

const firebaseConfig = {
   apiKey: "AIzaSyAEba4kNLxijrrOr7i3udFgbo3dfStUhrw",
   authDomain: "asgoflix.firebaseapp.com",
   projectId: "asgoflix",
   storageBucket: "asgoflix.appspot.com",
   messagingSenderId: "187183976068",
   appId: "1:187183976068:web:5d74302d6ba2413bb93cd1"
 };
 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getFirestore(app);
 export const storage = getStorage(app);

//  export const register = async (file, username, email, password) => {
//    try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     const storageRef = ref(storage, `images/${username}_${Date.now()}`);

//     const uploadTask = uploadBytesResumable(storageRef, file);
//     uploadTask.on(
//       (error) => {
//         console.log(error.message);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//           // user profili guncellemesi
//           await updateProfile(user, {
//             displayName: username,
//             photoURL: downloadURL,
//           });
//           // store user data in firestore database
//           await setDoc(doc(db, "Users", user.uid), {
//             uid: user.uid,
//             displayName: username,
//             email,
//             photoURL: downloadURL,
//           });
//         });
//       }
//     );
//      console.log("User registered:", user);
//      return user;
//    } catch (error) {
//      console.error("Registration error:", error);
//      throw error;
//    }
//  };
 
export const register = async (email, password, displayName) => {
  const auth = getAuth(app);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Kullanıcı adını güncelleme
    await updateProfile(user, {
      displayName: displayName,
    });

    return user;
  } catch (error) {
    throw error;
  }
};
 export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    toast.success("Sign in successful");
    return user
  } catch (error) { 
    toast.error("Login failed. Please check your email and password.");
  }
 };
 export const logout = async () => {
  await signOut(auth)
     .then(() => {
       toast.success("Logged out");
     })
     .catch(() => {
       toast.error("Logout failed. Please try again.");
     });
 };
 export const resetPassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Password Updated!");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};
export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success(
      `${auth.currentUser.email} adresine dogrulama maili gonderildi`
    );
  } catch (error) {
    toast.error(error.message);
  }
};
export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profile Updated");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};
export default app;

//  export { signUp, signIn };
