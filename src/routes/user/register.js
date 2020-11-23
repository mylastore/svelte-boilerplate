import fetch from "isomorphic-fetch";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function post(req, res) {
  try {
    const { email, password } = req.body;

    const result = await fetch(`${process.env.API_BASE_URL}/user/register`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    });

    const parsed = await result.json();
    if (typeof parsed.error !== "undefined") {
      throw new Error(parsed.error);
    }

    req.session.user = parsed;
    res.end(JSON.stringify(parsed));
  } catch (error) {
    res.end(JSON.stringify({ error: error.message }));
  }
}