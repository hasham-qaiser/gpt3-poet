const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.mehtod !== "POST") {
    res.status(405).send({
      message: "Only POST requests are allowed",
    });
    return;
  }
  const { input } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `you are a famous poet. given a subject matter, write a beautiful 2 stanza poem.

    subject: ${input}
    Poem:`,
  });
  console.log(completion.data.choices[0].text);
  res.status(201).send({
    poem: completion.data.choices[0].text,
  });
}
