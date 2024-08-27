import axios from "axios";

export async function GET() {
  try {
    console.log("Starting FileMaker Data API login process...");

    // FileMaker Data API Login
    const authResponse = await axios.post(
      "https://databasedev.barlowresearch.com/fmi/data/vLatest/databases/EricTesting/sessions",
      {},
      {
        auth: {
          username: "api",
          password: "apipass",
        },
      }
    );

    console.log(
      "Login successful. Token received:",
      authResponse.data.response.token
    );

    const token = authResponse.data.response.token;

    console.log("Fetching data from FileMaker...");

    // Fetch Data from FileMaker
    const dataResponse = await axios.get(
      "https://databasedev.barlowresearch.com/fmi/data/vLatest/databases/EricTesting/layouts/EricTesting/records",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Data fetched successfully:", dataResponse.data.response.data);

    // Extract the object, 'col_1' and 'col_2'  fields from the response

    //This first one is key... It contains the whole object from the layout 'EricTesting'
    const thisObject = dataResponse.data.response.data;

    // 'col_1' and 'col_2' hardcoded for the first record
    const col_1 = dataResponse.data.response.data[0].fieldData.col_1;
    const col_2 = dataResponse.data.response.data[0].fieldData.col_2;

    // Return the object, col_1 and col_2 as JSON
    return new Response(JSON.stringify({ col_1, col_2, thisObject }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error occurred:", error.message);
    console.error("Full error object:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
