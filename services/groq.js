// Mock simples para a assistente Luna usado no cliente (Expo Go).
// Em produção, mova a chamada real da AI para um backend seguro.

export async function askLuna(message) {
  // Simula um pequeno delay de rede
  await new Promise((res) => setTimeout(res, 600));

  // Resposta mock — mantenha curta e consistente com a personalidade da Luna
  return `Luna: Oi! Recebi sua mensagem: "${message}". Posso ajudar com um resumo das despesas, dicas de economia e metas. 💜`;
}
