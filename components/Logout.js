import { getAuth, signOut } from "firebase/auth";

export default function Logout({ route, navigation }) {
  const auth = getAuth();
  signOut(auth).then(() => {
    console.log("logged out")
  }).catch((error) => console.error(error));
}
