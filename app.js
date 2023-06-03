import * as dotenv from 'dotenv'
import fetch from 'node-fetch'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import GtfsRealtimeBindings from "gtfs-realtime-bindings"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
const app = express()
const port = 3000
const env = process.env


const options = {
	root: path.join(__dirname)
}

app.get('/', async (req, res) => {
  let params = 'lamin=45.8389&lomin=5.9962&lamax=47.8229&lomax=10.5226'
  let url = "https://opensky-network.org/api/states/all?"

  console.log("Sending Key")
  let response = fetch(url + params, {
    method: "GET",
    headers: {
      "Authorization": "Basic " + Buffer.from(env.USER + ":" + env.PASSWORD).toString('base64')
    }
  })

  response = await response
  let rj = await response.json()
  console.log(rj)

  res.send(rj)
})

app.listen(port, () => {
	console.log('Example app listening on port ' + port)
})
