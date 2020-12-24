import fetch from "isomorphic-fetch"

export async function post (req, res) {
  try{
    const {_id} = req.body
    const result = await fetch(`${process.env.API_BASE_URL}/user/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${req.headers.authorization}`
      },
      body: JSON.stringify({_id})
    })
    if(result){
      delete req.session.user
      res.writeHead(302, {
        Location: '/',
        'Content-Type': 'text/plain',
      });
      res.end(JSON.stringify({ message: 'success!' }))
    }
  }catch (err){
    if(error.code === 'ECONNREFUSED'){
      res.end(JSON.stringify({ status: 502, message: "Oops! Something is wrong. Try later." }))
    }
    res.end(JSON.stringify({error: err.message}))
  }

}
