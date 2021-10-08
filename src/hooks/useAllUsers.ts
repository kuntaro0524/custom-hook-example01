// 全ユーザ一覧を取得するカスタムフック
import { User } from "../types/api/user";
import { UserProfile } from "../types/userProfile";
import { useState } from "react";
import axios from "axios";

export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  // ロードされたときやエラーの管理をするための共通変数やセット関数の定義
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
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
  return { getUsers, userProfiles, loading, error };
};
