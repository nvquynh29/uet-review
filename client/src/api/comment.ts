import instance from "./index";

export const createComment = async (id: string, comment: object) => {
  const { data } = await instance.post(`posts/${id}/comment`, comment);
  return data;
};
