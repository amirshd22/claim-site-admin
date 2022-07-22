import { client } from "../config";

export const login = async (username: string, password: string) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.post(
      "users/login/",
      { username, password },
      config
    );
    if (status === 200) {
      localStorage.setItem("userInfo", JSON.stringify(data.access));
      return data.access;
    }
    throw new Error(data);
  } catch (error) {
    console.log(error);
  }
};
