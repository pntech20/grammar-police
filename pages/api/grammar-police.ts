// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Only POST requests allowed" });
    }
    const data = JSON.parse(req.body);
    const { prompt } = data;

    // {
    //   model: "text-davinci-003",
    //   prompt: "Correct this to standard English:\n\nShe no went to the market.",
    //   temperature: 0,
    //   max_tokens: 60,
    //   top_p: 1.0,
    //   frequency_penalty: 0.0,
    //   presence_penalty: 0.0,
    // }

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Correct this to standard English:${prompt}`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    res
      .status(200)
      .json({ data: response?.data?.choices[0]?.text, message: "Success!" });
  } catch (error: any) {
    return res.status(400).json({
      errMessage: error?.response?.data?.error?.message || error?.message,
    });
  }
}
