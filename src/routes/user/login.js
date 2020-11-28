import fetch from "isomorphic-fetch";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function post(req, res) {
  try {
    const { email, password } = req.body;
    const result = await fetch(`${process.env.API_BASE_URL}/user/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    });
    const parsed = await result.json();
    if (parsed.status >= 400) {
      res.end(JSON.stringify({ status: parsed.status, message: parsed.message }))
    } else {
      req.session.user = parsed;
      res.end(JSON.stringify(parsed));
    }

  } catch (error) {
    if(error.code === 'ECONNREFUSED'){
      res.end(JSON.stringify({ status: 502, message: "Oops! Something is wrong. Try later." }))
    }
    res.end(JSON.stringify({ error: error.message }));
  }
}