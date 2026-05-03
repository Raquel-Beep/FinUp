# 💰 FinUp

Aplicativo de gestão financeira pessoal, multiplataforma, focado em automação, inteligência artificial e apoio à tomada de decisões financeiras.

---

## 📌 Sobre o Projeto

O **FinUp** é um projeto acadêmico desenvolvido por alunos da **Unisuam**, sob supervisão do professor **Vinicius Pinto**. A proposta é criar uma solução moderna e inteligente para ajudar usuários a organizarem suas finanças com mais clareza, praticidade e autonomia.

---

## 🎯 Objetivo

Desenvolver um aplicativo que permita ao usuário **registrar, acompanhar e otimizar seus gastos** de forma automatizada e inteligente.

O sistema contará com a assistente virtual **Luna (IA)**, responsável por:

* Analisar hábitos de consumo
* Categorizar despesas automaticamente
* Gerar insights personalizados
* Auxiliar na tomada de decisões financeiras mais conscientes

O aplicativo também terá:

* Dashboards dinâmicos em tempo real
* Notificações proativas com alertas e recomendações
* Modelo **Free + Pro (R$ 9,99)** com recursos avançados

---

## 🚀 Funcionalidades

* Registro de movimentações financeiras (manual e automático)
* Categorização inteligente de despesas
* Relatórios e dashboards interativos em tempo real
* Assistente virtual **Luna (IA)**
* Notificações e alertas financeiros inteligentes
* Sistema de assinatura (Free e Pro)

---

## 🔌 Integrações e Plataforma

* Desenvolvimento mobile com **React Native**
* Integração com API **Efibank (Efipay)** para:

  * Cobranças
  * Notificações

🔗 API: [https://dev.efipay.com.br/docs/api-cobrancas/notificacoes/](https://dev.efipay.com.br/docs/api-cobrancas/notificacoes/)

---

## 🚫 Fora do Escopo (Nesta Fase)

* Integração direta com bancos (Open Finance)
* Funcionalidades de investimentos complexos
* Serviços financeiros regulados (PIX, empréstimos, etc.)

---

## 👩‍💻👨‍💻 Equipe

* Raquel
* Gabriel
* Cristhyan
* Luana
* Clarissa
* Nathan

---

## 🎓 Informações Acadêmicas

* Curso: Desenvolvimento Mobile
* Período: 4º semestre
* Instituição: Unisuam

---

## 🎨 Processo de Design (Figma)

O desenvolvimento das interfaces foi dividido em dois grupos:

* **Projeto 1:** Luana, Raquel e Cristhyan
* **Projeto 2:** Clarissa, Nathan e Gabriel

Após análises e comparações, o **Projeto 2** foi escolhido como base principal devido a:

* Paleta de cores mais atrativa
* Melhor organização visual
* Navegação mais intuitiva
* Melhor distribuição dos elementos
* Maior consistência no design

O Projeto 1 contribuiu com melhorias importantes, embora tenha apresentado:

* Excesso de minimalismo
* Menor quantidade de informações exibidas
* Paleta de cores menos atrativa para o grupo

---

## 🧠 Desafio Técnico

Integração com notificações nativas do Android:

* Uso do **NotificationListenerService**
* Captura de notificações de apps bancários
* Envio de dados para API via **POST (axios/fetch)**
* Autenticação por token
* Exibição no app via **FlatList**

Fluxo resumido:

1. Captura da notificação (Java/Kotlin)
2. Envio para o React Native (Bridge)
3. Armazenamento via API
4. Exibição no frontend

---

## 🛠️ Tecnologias Utilizadas

* React Native
* Java / Kotlin (Android Nativo)
* Node.js
* API Efibank (Efipay)

---

## 📱 Status do Projeto

🚧 Em desenvolvimento

---

## 🔗 Repositório

👉 [https://github.com/Raquel-Beep/FinUp](https://github.com/Raquel-Beep/FinUp)

---

## 🤝 Contribuição

Este é um projeto acadêmico, mas sugestões e melhorias são sempre bem-vindas!

---

💡 *Organize hoje para viver melhor amanhã com o FinUp.*
