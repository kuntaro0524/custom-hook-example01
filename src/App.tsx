import "./styles.css";
import { UserCard } from "./components/UserCard";
import { useAllUsers } from "./hooks/useAllUsers";

export default function App() {
  const { getUsers, userProfiles, loading, error } = useAllUsers();

  const onClickFetchData = () => getUsers();

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
