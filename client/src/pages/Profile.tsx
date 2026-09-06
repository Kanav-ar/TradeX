import { useAuth } from "../context/Auth/AuthContext";

export default function Profile() {
  const {currentUser} = useAuth();

  return (
    <div>
      {
        currentUser ? <div></div> : <div>You must be logged in to view this page </div>
      }
    </div>
  );
}