import fetch from "isomorphic-fetch";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function post (req, res) {

  const result = await fetch(`http://localhost:8000/api/user/logout`, {
    method: "POST",
    headers
  });

  delete req.session.user
  res.writeHead(302, {
    Location: '/',
    'Content-Type': 'text/plain',
  });

  res.end(JSON.stringify({ message: 'success!' }))
}
