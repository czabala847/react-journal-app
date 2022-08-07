export const uploadFileToCloud = async (file: File) => {
  const urlFetch = "https://api.cloudinary.com/v1_1/dco8l5erh/upload";
  const fd = new FormData();

  fd.append("upload_preset", "journal");
  fd.append("file", file);

  try {
    const response = await fetch(urlFetch, { method: "POST", body: fd });

    if (!response.ok) throw new Error("Ocurrió un error al subir la imagen.");
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.log(error);
    // throw new error(error.message)
  }
};
