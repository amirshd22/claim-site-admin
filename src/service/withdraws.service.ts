import { client } from "../config";

export const getWithdraws = async (
  access: string,
  sort: string,
  page: string
) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.post(
      `users/all_withdraws/?${page}`,
      { order_by: sort },
      config
    );
    if (status === 200 && typeof data === "object") {
      return data;
    }
    throw new Error(data);
  } catch (error) {
    console.log(error);
  }
};

export const pay = async (access: string, id: string, profile_id: string) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.post(
      `users/pay/`,
      { withdraw_id: id, profile_id },
      config
    );
    if (status === 200) {
      return data;
    }
    throw new Error(data);
  } catch (error) {
    console.log(error);
  }
};
