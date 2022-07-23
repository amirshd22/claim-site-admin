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

export const getAllUsers = async (access: string) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.get("users/", config);
    if (status === 200) {
      return data;
    }
    throw new Error(data);
  } catch (error) {
    console.log(error);
  }
};

export const getGlobalInfo = async () => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.get("systems/global/", config);
    if (status === 200) {
      return data;
    }
    throw new Error(data);
  } catch (error) {
    console.log(error);
  }
};

interface Info {
  users: string;
  total_withdrawals: string;
}

export const updateGlobalInfo = async (access: string, info: Info) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.patch(
      "systems/global/update/",
      info,
      config
    );
    if (status === 200) {
      alert(data);
    }
    throw new Error(data);
  } catch (error) {
    console.log(error);
  }
};
