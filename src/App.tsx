import axios from "axios";
import { useState } from "react";
import { UserCard } from "./components/UserCard";
import "./styles.css";
import { User } from "./types/api/user";
import { UserProfile } from "./types/userProfile";

export default function App() {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);

  const onClickFetchData = () => {
    // jsonplaceholderからユーザデータを取得する
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // 取得してきたuserオブジェクトの配列に対してmap関数を適用してUserProfileという独自のオブジェクトへ格納していく作業
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        // セット関数を利用して得られたデータの配列を userProfiles に適用する
        setUserProfiles(data);
      });
  };

  return (
    <div className="App">
      <button onClick={onClickFetchData}> get user info </button>
      {/* userProfilesに対してレンダリングを行う。
      map関数で<UserCard>オブジェクトを作成してレンダリング */}
      {userProfiles.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
