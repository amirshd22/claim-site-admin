import { client } from "../config";

export const getMessages = async (access: string, page: string) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.get(
      `systems/contacts/?${page}`,
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
