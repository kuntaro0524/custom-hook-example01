import axios from "axios";
import { useState } from "react";
import { UserCard } from "./components/UserCard";
import "./styles.css";
import { User } from "./types/api/user";
import { UserProfile } from "./types/userProfile";

export default function App() {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  // ロードされたときやエラーの管理をするための共通変数やセット関数の定義
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onClickFetchData = () => {
    setLoading(true);
    setError(false);
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
      })
      // データの取得に失敗したかどうかによってフラグを変更する
      .catch(() => {
        setError(true);
      })
      // エラーが出ても出なくてもロードの状態はFalseに戻す
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <button onClick={onClickFetchData}> get user info </button>
      <br />
      {/* エラーの状態によって条件分岐する
      以下の例だと三項演算子を二重にして実装をしている */}
      {error ? (
        <p style={{ color: "red" }}> データの取得に失敗しました </p>
      ) : loading ? (
        <p> Loading...</p>
      ) : (
        <>
          {/* userProfilesに対してレンダリングを行う。
      map関数で<UserCard>オブジェクトを作成してレンダリング */}
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
