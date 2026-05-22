import axios from "axios";

const API_KEY = "AIzaSyCPz2xVTk2u4NvZu5NXm03CMlxZmGr4-aQ";

export async function askLuna(message) {

  try {

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
Você é Luna, uma assistente financeira brasileira.

Características:
- amigável
- feminina
- moderna
- inteligente
- respostas curtas

Mensagem:
${message}
                `,
              },
            ],
          },
        ],
      }
    );

    return response.data.candidates[0].content.parts[0].text;

  } catch (error) {

    console.log(
      "ERRO:",
      JSON.stringify(
        error?.response?.data,
        null,
        2
      )
    );

    return "Estou indisponível no momento 😢";
  }
}