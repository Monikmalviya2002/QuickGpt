import "dotenv/config";
 const API_KEY=process.env.API_KEY;


async function run() {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: "the capital of india" }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

run();
