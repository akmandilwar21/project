import firebase from "./firebaseConfig";

const auth= firebase.auth()
const registerUser = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
};

const loginUser = (email, password) => {
    let temp=auth.signInWithEmailAndPassword(email, password);
    console.log(temp.user);
    return auth.signInWithEmailAndPassword(email, password);
};

const logoutUser = ()=>{
    return auth.signOut();
}

const sendPasswordRestEmail = (Email) => {
    return auth.sendPasswordResetEmail(Email);
}

const loginWithGoogle = () => {
    const provider= new firebase.auth.GoogleAuthProvider;

    return auth.signInWithPopup(provider);
};

const subscribeToAuthChange = (handleAuthChange) => {
    auth.onAuthStateChanged((user) => {
        handleAuthChange(user);
    })
}

const FirebaseAuthService = {
    registerUser, loginUser,logoutUser, sendPasswordRestEmail, loginWithGoogle, subscribeToAuthChange 
}

export default FirebaseAuthService;