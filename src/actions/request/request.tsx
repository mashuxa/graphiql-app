"use server";

export const request = async (formData: FormData): Promise<string | void> => {
  // const url = formData.get("url") as string;
  // const method = formData.get("method") as string;
  // const body = formData.get("body");
  // const headers = formData.get("headers");

  console.warn(formData);
  // const options = { method, body, headers };

  try {
    const res = await fetch(
      "",
      // options
    );

    if (!res.ok) {
      return "error";
    }

    return res.json();
  } catch (e) {
    console.warn("error: ", e);
  }
};
