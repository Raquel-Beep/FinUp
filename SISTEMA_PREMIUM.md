# Sistema PREMIUM do FinUp

## 📋 Visão Geral

O sistema PREMIUM foi implementado no FinUp para permitir que usuários desbloqueiem funcionalidades avançadas através de uma assinatura mensal de **R$ 9,99/mês**.

## 🎯 Funcionalidades Implementadas

### 1. **Duas Novas Telas de PREMIUM**

#### **PremiumBenefitsScreen** (`screens/PremiumBenefitsScreen.js`)
- Exibe os benefícios de se tornar premium
- Mostra vantagens de múltiplos cartões
- Apresenta comparativo entre plano gratuito e premium
- Permite aceitar para ir ao registro de cartão ou recusar

#### **CardRegistrationScreen** (`screens/CardRegistrationScreen.js`)
- Permite ao usuário registrar seus cartões bancários
- Suporta principais bancos brasileiros (Itaú, Bradesco, Nubank, etc.)
- Tipos de cartão: Crédito, Débito ou Ambos
- Validações de segurança (apenas últimos 4 dígitos armazenados)
- Preview visual do cartão registrado

### 2. **Serviço de Gerenciamento Premium** (`services/premiumService.js`)

Centraliza toda a lógica relacionada ao status premium:

```javascript
// Verificar se é premium
ehPremium() → boolean

// Ativar/desativar premium
ativarPremium() → boolean
desativarPremium() → boolean

// Gerenciamento de cartões
obterQuantidadeCartoes() → number
obterLimiteCartoes() → number | Infinity
podeAdicionarCartao() → boolean
registrarCartao(dados) → Object
removerCartao(cartaoId) → boolean
obterCartoes() → Array

// Gerenciamento de sugestões Luna
podeUsarLuna() → boolean
registrarUsoDaLuna() → boolean
obterInfoLunaLimite() → Object
resetarLimiteDiario() → void
```

### 3. **Restrições por Tipo de Usuário**

#### **Usuário Não-Premium (Gratuito)**
- ❌ Máximo **1 cartão** registrado
- ❌ Máximo **5 sugestões diárias** da Luna
- ✓ Acesso básico ao aplicativo
- ✓ Visualização de despesas

#### **Usuário PREMIUM**
- ✅ **Ilimitado** de cartões registrados
- ✅ **Ilimitado** de sugestões da Luna
- ✅ Lançamento automático de despesas (futura implementação)
- ✅ Suporte prioritário (futura implementação)

## 🔧 Fluxo de Navegação

```
HomeScreen
    ↓
ProScreen (Chamada ao PRO/PREMIUM)
    ↓
PremiumBenefitsScreen (Mostrar benefícios)
    ├─ Aceitar → CardRegistrationScreen (Registrar cartão)
    │            ↓
    │            Retorna ao Home (Premium ativado)
    │
    └─ Recusar → Volta para Home (Sem Premium)
```

## 📱 Mudanças em Telas Existentes

### **AssistenteScreen** (Tela da Luna)
- Adicionada verificação de limite de sugestões
- Exibe aviso quando usuário não-premium está chegando ao limite
- Mostra mensagem com número de sugestões disponíveis
- Alert quando limite diário é atingido

### **ProScreen**
- Agora navega para `PremiumBenefitsScreen` ao clicar "Ativar PRO agora"

### **App.js**
- Adicionadas rotas para as novas telas:
  - `PremiumBenefits` → PremiumBenefitsScreen
  - `CardRegistration` → CardRegistrationScreen

## 🔐 Segurança

- Apenas os **últimos 4 dígitos** do cartão são armazenados
- Nenhuma informação de CVV ou número completo é registrada
- Dados são tratados com criptografia no Firebase (implementação futura)

## 🗄️ Estrutura de Dados Firebase (Recomendado)

```
users/
  ├── user_id/
  │   ├── nome: string
  │   ├── email: string
  │   ├── isPremium: boolean
  │   ├── dataPremium: timestamp (quando ativou)
  │   ├── cartoes/
  │   │   ├── cartao_1/
  │   │   │   ├── banco: string
  │   │   │   ├── tipo: string
  │   │   │   ├── nome: string
  │   │   │   ├── ultimosDigitos: string
  │   │   │   └── dataCriacao: timestamp
  │   │   └── ...
  │   └── sugestoesLuna/
  │       ├── usadas: number
  │       ├── limite: number
  │       └── dataReset: timestamp
```

## 🔄 Próximas Implementações

1. **Integração com Firebase**
   - Salvar status premium no Firestore
   - Sincronizar dados de cartões

2. **Integração com Pagamento**
   - Stripe ou Mercado Pago
   - Gerenciar assinatura mensal

3. **Lançamento Automático de Despesas**
   - Ler notificações do dispositivo
   - Processar automaticamente no app

4. **Dashboard de Cartões**
   - Tela para gerenciar cartões registrados
   - Editar/remover cartões
   - Ver limite de crédito (quando integrado com bancos)

## 💡 Como Usar o Serviço Premium

### Verificar se usuário é premium:
```javascript
import { ehPremium } from "../services/premiumService";

if (ehPremium()) {
  // Mostrar funcionalidade premium
}
```

### Verificar limite de cartões:
```javascript
import { podeAdicionarCartao } from "../services/premiumService";

if (!podeAdicionarCartao()) {
  Alert.alert("Limite de cartões atingido", "Atualize para PREMIUM");
}
```

### Verificar limite de sugestões Luna:
```javascript
import { 
  podeUsarLuna, 
  registrarUsoDaLuna,
  obterInfoLunaLimite 
} from "../services/premiumService";

if (!podeUsarLuna()) {
  Alert.alert("Limite atingido", obterInfoLunaLimite().mensagem);
  return;
}

// Usar Luna
registrarUsoDaLuna();
await askLuna(mensagem);
```

## 🎨 Cores e Tema

- **Cor PREMIUM**: `#A93EFF` (Roxo)
- **Cor Secundária**: `#7B2FF7` (Roxo Escuro)
- **Cor de Fundo**: `#F8F2FC` (Roxo muito claro)

## 📞 Suporte

Para dúvidas sobre a implementação, verifique:
- `services/premiumService.js` - Toda a lógica
- `screens/PremiumBenefitsScreen.js` - Tela de benefícios
- `screens/CardRegistrationScreen.js` - Tela de registro de cartão
- `screens/AssistenteScreen.js` - Integração de limite Luna
