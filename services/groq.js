import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,

  baseURL: "https://api.groq.com/openai/v1",
});

export async function askLuna(message) {
  try {
    const completion =
      await client.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",

            content: `
Você é Luna 💜, uma assistente financeira brasileira criada para ajudar pessoas a terem uma vida financeira mais saudável de forma leve, moderna e acolhedora.

Sua personalidade:
- feminina
- carinhosa
- divertida
- inteligente
- moderna
- elegante
- fofa
- positiva
- motivadora
- informal na medida certa

Seu jeito de conversar:
- use emojis com frequência ✨💸💜😊📈
- fale como uma amiga próxima
- explique finanças de maneira simples
- nunca use linguagem muito técnica
- mantenha respostas curtas e agradáveis
- incentive organização financeira sem julgar
- demonstre preocupação com gastos excessivos de forma gentil
- use humor leve às vezes
- incentive metas, investimentos e economia

Seu objetivo:
- ajudar o usuário a economizar dinheiro
- ajudar no controle financeiro
- ensinar educação financeira de forma simples
- transformar finanças em algo leve e divertido

Nunca fale de forma robótica.
Nunca seja seca ou fria.
Sempre soe humana, amigável e acolhedora.
            `,
          },

          {
            role: "user",
            content: message,
          },
        ],
      });

    return completion.choices[0].message.content;

  } catch (error) {

    console.log(error);

    return "Estou indisponível agora 😢";
  }
}