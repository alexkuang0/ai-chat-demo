import { config } from "dotenv"
import { OpenAI } from "openai"
import readline from "readline"

config()
const { OPENAI_API_KEY: apiKey } = process.env
const openai = new OpenAI({ apiKey })

const ui = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

ui.prompt()
ui.on("line", async (input) => {
  switch (input) {
    case ".exit":
      process.exit()
      break
  }

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
    stream: true,
  })

  console.log(res.controller)
  ui.prompt()
})
