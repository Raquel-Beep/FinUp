/**
 * Serviço de Gerenciamento de Status PREMIUM
 * 
 * Este serviço centraliza toda a lógica relacionada ao status premium do usuário,
 * incluindo verificação de premium, gerenciamento de cartões e limites da Luna.
 */

// Simulação de dados do usuário (em produção, virá do Firebase)
const usuarioDefaults = {
  id: "user_123",
  nome: "Usuário",
  isPremium: false,
  cartoes: [], // Array de cartões registrados
  limitesSugestoes: {
    diario: 5, // Sugestões por dia para usuários não-premium
    usadas: 0,
  },
};

// Dados em memória (em produção, seria no Firebase)
let usuarioAtual = { ...usuarioDefaults };

/**
 * Verifica se o usuário é premium
 * @returns {boolean}
 */
export const ehPremium = () => {
  return usuarioAtual.isPremium === true;
};

/**
 * Ativa o status premium do usuário
 * @returns {boolean} Sucesso da operação
 */
export const ativarPremium = () => {
  usuarioAtual.isPremium = true;
  usuarioAtual.limitesSugestoes.usadas = 0;
  // Em produção, salvar no Firebase
  return true;
};

/**
 * Desativa o status premium do usuário
 * @returns {boolean} Sucesso da operação
 */
export const desativarPremium = () => {
  usuarioAtual.isPremium = false;
  usuarioAtual.limitesSugestoes.usadas = 0;
  // Em produção, salvar no Firebase
  return true;
};

/**
 * Retorna o número de cartões registrados
 * @returns {number}
 */
export const obterQuantidadeCartoes = () => {
  return usuarioAtual.cartoes.length;
};

/**
 * Retorna o limite de cartões para o usuário
 * Não-premium: máx 1 cartão
 * Premium: ilimitado
 * @returns {number|Infinity}
 */
export const obterLimiteCartoes = () => {
  return ehPremium() ? Infinity : 1;
};

/**
 * Verifica se o usuário pode adicionar mais cartões
 * @returns {boolean}
 */
export const podeAdicionarCartao = () => {
  const limite = obterLimiteCartoes();
  const quantidade = obterQuantidadeCartoes();
  
  if (limite === Infinity) {
    return true;
  }
  
  return quantidade < limite;
};

/**
 * Registra um novo cartão para o usuário
 * @param {Object} dadosCartao - Dados do cartão
 * @param {string} dadosCartao.banco - Nome do banco
 * @param {string} dadosCartao.tipo - Tipo do cartão (Crédito/Débito/Ambos)
 * @param {string} dadosCartao.nome - Nome identificador do cartão
 * @param {string} dadosCartao.ultimosDigitos - Últimos 4 dígitos
 * @returns {Object|null} Cartão registrado ou null se não conseguir adicionar
 */
export const registrarCartao = (dadosCartao) => {
  // Verifica limite de cartões
  if (!podeAdicionarCartao()) {
    return null;
  }

  const novoCartao = {
    id: `cartao_${Date.now()}`,
    ...dadosCartao,
    dataCriacao: new Date().toISOString(),
  };

  usuarioAtual.cartoes.push(novoCartao);
  // Em produção, salvar no Firebase
  return novoCartao;
};

/**
 * Remove um cartão registrado
 * @param {string} cartaoId - ID do cartão a remover
 * @returns {boolean} Sucesso da operação
 */
export const removerCartao = (cartaoId) => {
  const indice = usuarioAtual.cartoes.findIndex(c => c.id === cartaoId);
  
  if (indice === -1) {
    return false;
  }

  usuarioAtual.cartoes.splice(indice, 1);
  // Em produção, salvar no Firebase
  return true;
};

/**
 * Retorna lista de todos os cartões do usuário
 * @returns {Array}
 */
export const obterCartoes = () => {
  return [...usuarioAtual.cartoes];
};

/**
 * Retorna um cartão específico pelo ID
 * @param {string} cartaoId - ID do cartão
 * @returns {Object|null}
 */
export const obterCartao = (cartaoId) => {
  return usuarioAtual.cartoes.find(c => c.id === cartaoId) || null;
};

/**
 * Verifica se o usuário pode fazer uma sugestão Luna
 * Usuários não-premium têm limite diário
 * @returns {boolean}
 */
export const podeUsarLuna = () => {
  if (ehPremium()) {
    return true;
  }

  return usuarioAtual.limitesSugestoes.usadas < usuarioAtual.limitesSugestoes.diario;
};

/**
 * Registra o uso de uma sugestão Luna
 * @returns {boolean} Sucesso da operação
 */
export const registrarUsoDaLuna = () => {
  if (!podeUsarLuna()) {
    return false;
  }

  if (!ehPremium()) {
    usuarioAtual.limitesSugestoes.usadas++;
  }

  return true;
};

/**
 * Retorna informações sobre limite de sugestões
 * @returns {Object}
 */
export const obterInfoLunaLimite = () => {
  if (ehPremium()) {
    return {
      temLimite: false,
      sugestoesUsadas: "∞",
      sugestoeDisponivel: "∞",
      mensagem: "Sugestões ilimitadas",
    };
  }

  return {
    temLimite: true,
    sugestoesUsadas: usuarioAtual.limitesSugestoes.usadas,
    sugestoesDisponivel:
      usuarioAtual.limitesSugestoes.diario -
      usuarioAtual.limitesSugestoes.usadas,
    limite: usuarioAtual.limitesSugestoes.diario,
    mensagem: `${usuarioAtual.limitesSugestoes.diario - usuarioAtual.limitesSugestoes.usadas} sugestões disponíveis hoje`,
  };
};

/**
 * Reseta o limite diário de sugestões (deve ser chamado diariamente)
 */
export const resetarLimiteDiario = () => {
  if (!ehPremium()) {
    usuarioAtual.limitesSugestoes.usadas = 0;
  }
};

/**
 * Retorna todos os dados do usuário
 * @returns {Object}
 */
export const obterDadosUsuario = () => {
  return {
    id: usuarioAtual.id,
    nome: usuarioAtual.nome,
    isPremium: usuarioAtual.isPremium,
    cartoes: obterCartoes(),
    lunaInfo: obterInfoLunaLimite(),
  };
};

/**
 * Reseta todos os dados do usuário (para testes)
 */
export const resetarDadosUsuario = () => {
  usuarioAtual = { ...usuarioDefaults };
};

/**
 * Define dados do usuário customizados (para testes)
 */
export const definirDadosUsuario = (dados) => {
  usuarioAtual = { ...usuarioAtual, ...dados };
};
