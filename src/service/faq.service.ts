import { client } from "../config";

export const getFaqs = async () => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.get(`systems/faqs/`, config);
    if (status === 200 && typeof data === "object") {
      return data;
    }
    throw new Error(data);
  } catch (error) {
    console.log(error);
  }
};

interface FaQ {
  question: string;
  answer: string;
}

export const createFaq = async (faq: FaQ, access: string) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.post(
      `systems/faq/create/`,
      faq,
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

export const deleteFaq = async (id: string, access: string) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.delete(
      `systems/faq/${id}/delete/`,
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

export const updateFaq = async (faq: FaQ, id: string, access: string) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.patch(
      `systems/faq/${id}/update/`,
      faq,
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
