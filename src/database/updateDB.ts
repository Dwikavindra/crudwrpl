export const updateProductToDB = async (data: any) => {
  try {
    const result = await fetch(
      "http://localhost:3000/api/product/updateProduct",
      {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    let finalresult = await result.json();
  } catch (e) {
    console.log(e);
  }
};
