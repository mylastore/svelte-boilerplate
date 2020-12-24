import fetch from "isomorphic-fetch";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function post (req, res) {
  const result = await fetch(`${process.env.API_BASE_URL}/user/logout`, {
    method: "POST",
    headers
  })
  if(result){
    delete req.session.user
    res.writeHead(302, {
      Location: '/',
      'Content-Type': 'text/plain',
    });
    res.end(JSON.stringify({ message: 'success!' }))
  }

}
