import axios from "axios";
import { base64ToFile } from "../../utils/converter";
import configuration from "../../config";

export const uploadInFileIO = async ({
  imageBase64,
  title
}: {
  imageBase64: string;
  title: string;
}) => {
  const file = base64ToFile(imageBase64, title);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("expires", "1d");
  const { data } = await axios.post("https://file.io/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${configuration.fileIoKey}`
    }
  });

  if (!data) return;

  return data?.link;
};
