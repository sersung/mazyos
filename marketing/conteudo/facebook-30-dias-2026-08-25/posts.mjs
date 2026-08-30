// 30 posts para 30 dias. Todo número aqui sai dos artigos publicados no
// qualificacanada.com, que citam Job Bank e Skilled Trades Ontario como fonte.
// Nada foi inventado para caber no post.
//
// tema: escuro | bordo | claro | cta | numero
// titulo/apoio: o que vai na imagem. legenda: o texto do post no Facebook.
// link: vai no PRIMEIRO COMENTÁRIO, não no corpo do post.

export const BASE = "https://qualificacanada.com";

export const posts = [
  { n: 1, tema: "escuro", eyebrow: "O que significa",
    titulo: "Skilled worker não é só quem tem diploma.",
    apoio: "Eletricista, encanador, soldador, mecânico. Ontário regula 144 ofícios — e a sua qualificação são as horas que você já trabalhou.",
    legenda: `Skilled worker não é só engenheiro, médico e programador.

Eletricista, encanador, soldador, mecânico, carpinteiro — todos entram na conta. O Canadá chama isso de skilled trades, e em Ontário são 144 ofícios regulados.

O que conta como qualificação, no seu caso, não é diploma. São as horas que você já trabalhou no ofício.

Se você passou os últimos anos numa obra, numa fábrica ou puxando fiação, você já tem o principal. Falta saber como comprovar do jeito que eles pedem.

Expliquei como funciona o órgão que faz essa avaliação — link no primeiro comentário.`,
    link: "/artigos/skilled-trades-ontario-para-brasileiros" },

  { n: 2, tema: "numero", numero: "CAD 34", unidade: "/hora", eyebrow: "Salário real · Job Bank",
    titulo: "É a mediana de um eletricista certificado em Ontário.",
    apoio: "A faixa vai de CAD 20,00 a CAD 50,50. Sem a certificação, você entra como helper — perto do piso.",
    legenda: `Eletricista certificado em Ontário: mediana de CAD 34 por hora.

O dado é do Job Bank, portal do próprio governo canadense. A faixa completa vai de CAD 20,00 a CAD 50,50 por hora — cerca de CAD 70.700 por ano em tempo integral.

Agora a parte que quase ninguém conta: sem a certificação você não entra nessa faixa. Entra como helper ou aprendiz, perto do piso, e sem poder assinar serviço sozinho.

A licença não é papel. É o que separa "ajudante" de "profissional pago pelo valor de mercado".

Levantei as faixas de todos os ofícios, com a fonte do Job Bank. Link no primeiro comentário.`,
    link: "/artigos/quanto-ganha-oficio-tecnico-canada" },

  { n: 3, tema: "bordo", eyebrow: "Ofício compulsório",
    titulo: "Sem licença, é ilegal.",
    apoio: "Eletricista (309A) e encanador (306A) estão entre os 23 ofícios compulsórios de Ontário. Não é \\u201cmal visto\\u201d — é proibido por lei.",
    legenda: `Em Ontário, trabalhar como eletricista sem licença não é "mal visto". É ilegal.

Existe uma diferença que muda toda a sua estratégia, e quase ninguém explica antes de você se mudar:

OFÍCIO COMPULSÓRIO — não dá para exercer sem o Certificate of Qualification. Eletricista (309A) e encanador (306A) estão entre os 23 da lista.

OFÍCIO VOLUNTÁRIO — soldador e carpinteiro, por exemplo. Dá para trabalhar sem a licença, mas você ganha menos e concorre pior.

Se o seu ofício é compulsório, tirar a licença não é "melhoria de carreira". É condição para trabalhar.

Descubra em qual categoria você cai — link no primeiro comentário.`,
    link: "/artigos/licenca-309a-eletricista-canada" },

  { n: 4, tema: "claro", eyebrow: "Avaliação documental",
    titulo: "Dá para começar do Brasil.",
    apoio: "O Trade Equivalency Assessment é documental e pode ser submetido de onde você estiver. Só o exame é presencial.",
    legenda: `Você pode começar a validar sua profissão sem sair do Brasil.

Essa é a informação que eu mais queria ter tido antes de vir.

A avaliação da sua experiência — o Trade Equivalency Assessment — é documental. Você monta o pacote e submete de onde estiver, com a documentação traduzida e digitalizada.

Só o exame de certificação exige presença física em Ontário.

Ou seja: dá para adiantar meses de processo enquanto você ainda organiza a mudança. Muita gente descobre isso tarde e perde esse tempo.

Passo a passo no primeiro comentário.`,
    link: "/artigos/trade-equivalency-assessment-ontario" },

  { n: 5, tema: "escuro", eyebrow: "O processo real",
    titulo: "Levei três negativas antes da licença sair.",
    apoio: "A experiência era real. O problema era como eu apresentava a documentação.",
    legenda: `Levei três negativas antes da minha licença sair.

Sim, três. E a experiência que eu tinha no Brasil era real — anos de trabalho, ofício aprendido na prática.

O problema nunca foi a experiência. Foi como eu apresentei a documentação.

Carta de empregador genérica, sem detalhar tarefa, período e horas. Enquadramento errado do ofício. E o erro que mais derruba brasileiro: usar documentação de EMPREGADO quando o caso era de DONO DO PRÓPRIO NEGÓCIO — são dois caminhos completamente diferentes.

Cada tentativa custou taxa, tradução juramentada e meses de espera.

Se você já levou uma negativa, ela não é o fim. Link no primeiro comentário.`,
    link: "/artigos/negativa-trade-equivalency-assessment" },

  { n: 6, tema: "claro", eyebrow: "Ofício x diploma",
    titulo: "1 a 3 anos para revalidar. Ou um caminho mais curto.",
    apoio: "Médico e engenheiro enfrentam anos de revalidação. Ofício técnico segue outra via: comprovação de experiência e exame.",
    legenda: `Médico e engenheiro levam de 1 a 3 anos para revalidar no Canadá. Ofício técnico tem caminho mais curto.

Não é que seja fácil. É que é mais direto.

Profissões regulamentadas de nível superior exigem registro em órgão provincial, exames e às vezes estágio — processo que se arrasta por anos.

Ofício técnico segue outra via: comprovação de experiência e exame de certificação. Sem exigência de faculdade.

É por isso que, para quem já trabalha num ofício, esse costuma ser o caminho mais realista de entrar no mercado canadense ganhando bem.

Comparei as áreas com mais demanda — link no primeiro comentário.`,
    link: "/artigos/profissoes-com-demanda-no-canada" },

  { n: 7, tema: "bordo", eyebrow: "O erro mais caro",
    titulo: "Empregado e dono do próprio negócio comprovam de formas diferentes.",
    apoio: "São dois pacotes de documentação distintos. Usar o modelo errado não gera pedido de complemento — gera negativa.",
    legenda: `O erro que mais derruba brasileiro no processo: confundir "empregado" com "dono do próprio negócio".

Se você foi registrado numa empresa, seu caminho é carta de empregador detalhada, com tarefas, período e carga horária.

Se você trabalhou por conta — e no Brasil isso é a realidade de muito eletricista, encanador e pedreiro — o pacote é outro: notas fiscais, contratos, registros, declarações.

Usar o modelo errado não gera "pedido de complemento". Gera negativa. E outra taxa.

Eu aprendi isso da pior forma. Link no primeiro comentário.`,
    link: "/artigos/trade-equivalency-assessment-ontario" },

  { n: 8, tema: "numero", numero: "CAD 235", unidade: "+ HST", eyebrow: "Custo real do processo",
    titulo: "É o que custa submeter a avaliação de equivalência.",
    apoio: "O exame de certificação sai por CAD 150 + HST por tentativa, com nota mínima de 70%.",
    legenda: `Quanto custa, de fato, tirar a licença em Ontário.

Ninguém fala dos valores, então aqui estão:

• Trade Equivalency Assessment: CAD 235 + HST
• Exame de certificação (C of Q): CAD 150 + HST POR TENTATIVA
• Nota mínima no exame: 70%

Repare no "por tentativa". É por isso que reprovar sai caro, e é por isso que chutar a documentação sai mais caro ainda — cada negativa é uma taxa nova.

O caminho completo, etapa por etapa, no primeiro comentário.`,
    link: "/artigos/licenca-309a-eletricista-canada" },

  { n: 9, tema: "escuro", eyebrow: "Resultado do TEA",
    titulo: "Não existe \\u201caprovação parcial\\u201d.",
    apoio: "O resultado é binário: aprovado para tentar o exame, ou não aprovado. Quem promete meio-termo não conhece o processo.",
    legenda: `Uma coisa que confunde muita gente sobre o Trade Equivalency Assessment.

O resultado é BINÁRIO. Ou você é aprovado para tentar o exame de certificação, ou não é aprovado.

Não existe "aprovação parcial" de uma mesma aplicação. O que existe é crédito de horas reconhecidas entre ofícios correlatos, quando você já tem certificação em um ofício próximo.

Isso importa porque muda o que você faz depois de uma negativa: não é "completar o que faltou" na mesma aplicação — é montar uma nova, atacando exatamente o ponto que derrubou a anterior.

Como funciona o processo — link no primeiro comentário.`,
    link: "/artigos/trade-equivalency-assessment-ontario" },

  { n: 10, tema: "claro", eyebrow: "Depois da aprovação",
    titulo: "Passar no TEA não te autoriza a trabalhar.",
    apoio: "A aprovação te torna elegível para o exame. Até o Certificate of Qualification sair, só sob supervisão de um licenciado.",
    legenda: `Cuidado com esse mal-entendido: passar no TEA não te autoriza a exercer o ofício.

A aprovação te torna ELEGÍVEL para o exame de certificação. Só isso.

Até o Certificate of Qualification sair, você não pode atuar como eletricista independente em Ontário. O que dá para fazer é trabalhar sob supervisão direta de um eletricista já licenciado — o que, aliás, ajuda a completar horas se a avaliação apontou déficit.

É uma etapa, não a chegada. Quem te vender o contrário está simplificando o que não dá.

Detalhes no primeiro comentário.`,
    link: "/artigos/licenca-309a-eletricista-canada" },

  { n: 11, tema: "numero", numero: "144", unidade: "ofícios", eyebrow: "Skilled Trades Ontario",
    titulo: "Mas o TEA não vale para todos eles.",
    apoio: "A avaliação de equivalência só existe para os ofícios que têm exame de certificação. Os demais são obtidos por aprendizagem.",
    legenda: `A Skilled Trades Ontario regula 144 ofícios. Mas a avaliação de equivalência não vale para todos.

O Trade Equivalency Assessment só está disponível para os ofícios que têm exame de certificação (Certificate of Qualification) — entre eles eletricista (309A, 309C, 442A), encanador (306A), soldador (456A), mecânico industrial e técnico de refrigeração e HVAC.

Ofícios sem exame certificador só se obtêm por aprendizagem, do começo.

Antes de gastar taxa, confirme se o SEU ofício tem exame. É a primeira pergunta do processo, e muita gente pula.

Link no primeiro comentário.`,
    link: "/artigos/trade-equivalency-assessment-ontario" },

  { n: 12, tema: "escuro", eyebrow: "Código do ofício",
    titulo: "309A não é a única licença elétrica.",
    apoio: "Existem a 309C (residencial e rural) e a 442A (industrial). Aplicar no código errado significa recomeçar a avaliação inteira.",
    legenda: `Se você é eletricista, preste atenção nesse detalhe antes de aplicar.

A 309A é a Construction and Maintenance Electrician. Mas não é a única:

• 309C — Electrician, Domestic and Rural: residências e propriedades rurais
• 442A — Industrial Electrician: manutenção industrial

Aplicar no código errado significa recomeçar toda a avaliação de equivalência. Taxa nova, espera nova.

O código certo é o que corresponde ao trabalho que você REALMENTE fez, não ao que soa melhor.

Como identificar o seu — link no primeiro comentário.`,
    link: "/artigos/licenca-309a-eletricista-canada" },

  { n: 13, tema: "claro", eyebrow: "Faixas por ofício · Job Bank",
    titulo: "Não é só eletricista que ganha bem.",
    apoio: "Encanador CAD 20,00–50,38/h. Soldador 21,00–41,28. HVAC 21,00–58,00. Millwright 23,00–48,50. Carpinteiro 22,00–48,00.",
    legenda: `As faixas salariais por ofício em Ontário, segundo o Job Bank:

• Encanador: CAD 20,00 – 50,38/hora
• Soldador: CAD 21,00 – 41,28/hora
• Técnico de HVAC e refrigeração: CAD 21,00 – 58,00/hora
• Mecânico industrial (millwright): CAD 23,00 – 48,50/hora
• Carpinteiro: CAD 22,00 – 48,00/hora

Repare no HVAC: o topo da faixa é o mais alto de todos.

E vale a ressalva de sempre — a mediana reflete melhor quem já está licenciado e atuando há algum tempo do que quem acabou de chegar.

Fonte de cada ofício no artigo. Link no primeiro comentário.`,
    link: "/artigos/quanto-ganha-oficio-tecnico-canada" },

  { n: 14, tema: "bordo", eyebrow: "Além do salário",
    titulo: "83,7% dos eletricistas de Ontário têm ao menos um benefício.",
    apoio: "Entre mecânicos industriais são 93,6%; entre soldadores, 88,5%. Plano de saúde, pensão e licenças remuneradas não entram no valor da hora.",
    legenda: `Os salários que eu publico são valor-hora. Não incluem benefícios. E benefício, no Canadá, pesa.

Segundo o Job Bank, a proporção de trabalhadores em Ontário que recebem ao menos um benefício não salarial — plano de saúde, pensão, licenças remuneradas:

• Mecânicos industriais: 93,6%
• Soldadores: 88,5%
• Eletricistas: 83,7%

Ou seja: quando você compara com o que ganha no Brasil, some isso à conta. Plano de saúde privado no Canadá não é detalhe.

Números completos no primeiro comentário.`,
    link: "/artigos/quanto-ganha-oficio-tecnico-canada" },

  { n: 15, tema: "escuro", eyebrow: "Imigração",
    titulo: "O certificado de Ontário conta pontos no Express Entry.",
    apoio: "O Federal Skilled Trades Program exige certificado emitido por autoridade provincial — e a STO é quem emite em Ontário.",
    legenda: `Sua licença de ofício não serve só para trabalhar. Ela ajuda na imigração.

O Federal Skilled Trades Program, dentro do Express Entry, exige entre outros critérios um certificado de qualificação emitido por uma autoridade provincial.

A Skilled Trades Ontario é exatamente quem emite esse certificado, para os ofícios que regula.

Sem oferta de emprego na mão, o Certificate of Qualification costuma ser o caminho mais realista para quem trabalha com ofício técnico.

Duas coisas resolvidas com um documento só.

Link no primeiro comentário.`,
    link: "/artigos/skilled-trades-ontario-para-brasileiros" },

  { n: 16, tema: "claro", eyebrow: "Mobilidade entre províncias",
    titulo: "Licença de Ontário não vale automaticamente em Alberta.",
    apoio: "Cada província regula seus ofícios. O Red Seal facilita o reconhecimento, mas não dispensa o registro no órgão de destino.",
    legenda: `Erro de planejamento que custa caro: achar que a licença canadense é nacional.

Não é. No Canadá cada província regula seus próprios ofícios. Quem se qualificou em Ontário não está automaticamente qualificado em Alberta ou na Colúmbia Britânica.

Existe o Red Seal, o padrão interprovincial — e a 309A faz parte dele. Isso FACILITA o reconhecimento, mas não garante automaticamente: cada província ainda tem seu processo de registro.

Se você pensa em se mudar dentro do Canadá depois, confirme com o órgão regulador do destino ANTES.

Link no primeiro comentário.`,
    link: "/artigos/skilled-trades-ontario-para-brasileiros" },

  { n: 17, tema: "bordo", eyebrow: "Depois da negativa",
    titulo: "Reenviar a mesma aplicação não muda o resultado.",
    apoio: "Sem mudar nada relevante, é outra rodada de análise e, na maioria dos casos, outra taxa.",
    legenda: `Recebeu negativa no TEA? Não reenvie a mesma coisa.

Parece óbvio, mas é o que mais acontece — a pessoa acha que foi azar, ou que "dessa vez pega".

Sem mudar nada relevante, é só outra rodada de análise e, na maioria dos casos, outra taxa.

O caminho é outro: ler a carta para identificar QUAL critério não foi atendido, classificar o tipo de negativa (falta de horas, falta de abrangência de tarefas, ou problema de documentação) e montar um pacote que ataque exatamente aquele ponto.

E desconfie de quem promete "aprovação garantida". No Canadá, só advogado e consultor registrado no RCIC pode dar aconselhamento formal de imigração.

Link no primeiro comentário.`,
    link: "/artigos/negativa-trade-equivalency-assessment" },

  { n: 18, tema: "escuro", eyebrow: "Carta de empregador",
    titulo: "Genérica, ela derruba a aplicação.",
    apoio: "Precisa detalhar tarefas, período exato e horas trabalhadas. \\u201cTrabalhou como eletricista\\u201d não comprova nada.",
    legenda: `A carta de empregador é onde a maioria das aplicações morre.

Uma carta que diz "Fulano trabalhou como eletricista de 2015 a 2020" não comprova nada para a Skilled Trades Ontario.

O que ela precisa ter:

• As TAREFAS que você executava, descritas
• O PERÍODO exato
• As HORAS trabalhadas

A avaliação não é sobre o cargo que estava na sua carteira. É sobre as competências que você exerceu, comparadas ao padrão do ofício em Ontário.

Se o seu antigo chefe escrever três linhas genéricas, você perdeu a taxa.

Como pedir a carta certa — link no primeiro comentário.`,
    link: "/artigos/negativa-trade-equivalency-assessment" },

  { n: 19, tema: "claro", eyebrow: "Via facilitada",
    titulo: "Quem serviu nas Forças Armadas Canadenses tem rota própria.",
    apoio: "Com certificado militar QL5 ou DP2 em um dos nove ofícios mapeados: avaliação simplificada, sem verificações de trabalho e sem taxa do TEA.",
    legenda: `Uma rota que quase ninguém conhece, e que talvez sirva para alguém que te lê.

Quem tem um Canadian Forces Certificate of Military Achievement com classificação QL5 ou DP2, em um dos nove ofícios equivalentes mapeados pela Skilled Trades Ontario, passa por avaliação simplificada:

• Não precisa de Work Experience Verifications
• Não paga a taxa do TEA

Basta anexar o Member's Personnel Record Resume.

Não é o caso da maioria de quem me lê, mas se você serviu ou conhece quem serviu, compartilha — é dinheiro e meses de diferença.

Link no primeiro comentário.`,
    link: "/artigos/trade-equivalency-assessment-ontario" },

  { n: 20, tema: "bordo", eyebrow: "Sem documentação",
    titulo: "Refugiado sem como comprovar experiência ainda pode aplicar.",
    apoio: "A Skilled Trades Ontario prevê exceções caso a caso, com métodos alternativos de avaliação. O contato é direto com a equipe.",
    legenda: `Se você veio de uma situação em que não dá para comprovar sua experiência no papel, existe caminho.

A Skilled Trades Ontario prevê exceções caso a caso para refugiados, solicitantes de refúgio e imigrantes de regiões afetadas por guerra ou desastre natural que não conseguem obter as verificações de trabalho exigidas.

Métodos alternativos de avaliação podem ser usados. O contato é feito diretamente por e-mail com a equipe deles.

Não é automático e não é rápido. Mas existe, e muita gente desiste sem saber que existe.

Link no primeiro comentário.`,
    link: "/artigos/trade-equivalency-assessment-ontario" },

  { n: 21, tema: "numero", numero: "60", unidade: "dias", eyebrow: "Prazo do IRCC",
    titulo: "É o que você tem depois de receber o convite.",
    apoio: "O ITA não se prorroga com facilidade. Quem não estava com a documentação pronta perde a vez.",
    legenda: `Quando o convite chega, o relógio já está correndo.

Recebeu um ITA (Invitation to Apply)? Você tem geralmente 60 dias para submeter TODA a documentação. E esse prazo não se prorroga com facilidade.

Muita gente perde a vez aí. Não por falta de qualificação — por não estar com os documentos prontos quando o convite chegou.

Tradução juramentada demora. Apostilamento demora. Carta de empregador de emprego antigo demora mais ainda.

Comece a juntar antes de precisar.

Os erros mais comuns do processo — link no primeiro comentário.`,
    link: "/artigos/erros-comuns-de-brasileiros-no-processo" },

  { n: 22, tema: "bordo", eyebrow: "O erro mais grave",
    titulo: "Omitir informação gera banimento de cinco anos.",
    apoio: "Viagem, condição de saúde, histórico, emprego: omitir configura misrepresentation e anula qualquer processo futuro.",
    legenda: `Esse é o erro que não tem conserto.

Mentir ou omitir informação no formulário do IRCC configura MISREPRESENTATION. A consequência: banimento de cinco anos do Canadá e anulação de qualquer processo futuro.

E não é só sobre coisa grande. Omitir uma viagem antiga, uma condição de saúde, um emprego que você achou irrelevante — tudo conta.

O IRCC cruza dados com outros países. O que você acha que ninguém vai ver, eles veem.

Declare tudo. Inclusive o que parece que te prejudica: um problema declarado é analisável, um problema descoberto é fraude.

Link no primeiro comentário.`,
    link: "/artigos/erros-comuns-de-brasileiros-no-processo" },

  { n: 23, tema: "claro", eyebrow: "Quem pode te ajudar",
    titulo: "Só advogado e consultor RCIC podem cobrar por isso.",
    apoio: "Despachante e consultor informal é ilegal no Canadá. E o risco dos erros que ele comete é todo seu.",
    legenda: `Antes de pagar alguém para cuidar do seu processo, confira uma coisa.

No Canadá, apenas advogados de imigração registrados e consultores com registro no RCIC podem COBRAR por serviços de imigração.

Despachante, "assessoria" informal, aquele conhecido que já ajudou uns três — é ilegal por lá. E o risco de todo erro que essa pessoa cometer é seu, não dela.

Junte isso com a promessa de "aprovação garantida" e você tem o retrato do golpe mais comum contra brasileiro nesse mercado.

Ninguém sério garante aprovação. Nem eu.

Link no primeiro comentário.`,
    link: "/artigos/erros-comuns-de-brasileiros-no-processo" },

  { n: 24, tema: "numero", numero: "6 meses", unidade: "de reserva", eyebrow: "Dinheiro na chegada",
    titulo: "O mínimo do IRCC não é o suficiente real.",
    apoio: "Se o emprego demorar mais do que o previsto, você fica sem recurso antes de estabilizar.",
    legenda: `Chegar com o mínimo exigido pelo IRCC é arriscado.

O valor exigido é o que te deixa entrar. Não é o que te sustenta até o primeiro salário.

Se o emprego demorar mais do que você previu — e ele quase sempre demora — você fica sem recurso antes de estabilizar. É aí que a pessoa aceita o primeiro trabalho que aparece, por qualquer valor, e trava a carreira logo na entrada.

A recomendação prática é ter pelo menos SEIS MESES de custo de vida reservados.

Não é pessimismo. É o que dá para você escolher, em vez de aceitar.

Link no primeiro comentário.`,
    link: "/artigos/erros-comuns-de-brasileiros-no-processo" },

  { n: 25, tema: "escuro", eyebrow: "Custo de vida",
    titulo: "Toronto pede CAD 3.000 a 4.500 por mês.",
    apoio: "Winnipeg e Halifax ficam entre CAD 2.000 e 3.000. A escolha da cidade muda mais o seu orçamento do que o seu salário.",
    legenda: `A cidade que você escolhe muda mais o seu orçamento do que o seu salário.

Custo mensal para viver com conforto, sem apertar:

• Toronto: CAD 3.000 – 4.500
• Calgary: CAD 2.500 – 3.500
• Winnipeg ou Halifax: CAD 2.000 – 3.000

Um eletricista licenciado ganha parecido nas três. O que sobra no fim do mês, não.

Toronto concentra vaga e comunidade brasileira — e cobra por isso. Vale a conta antes de decidir por fama.

Os valores destrinchados por categoria estão no primeiro comentário.`,
    link: "/artigos/custo-de-vida-no-canada" },

  { n: 26, tema: "claro", eyebrow: "Saúde",
    titulo: "A saúde pública tem carência para quem chega.",
    apoio: "Em Ontário são cerca de três meses de espera. Seguro privado temporário custa de CAD 50 a 150 por mês.",
    legenda: `O sistema de saúde canadense é universal. Mas não desde o primeiro dia.

Há carência para recém-chegados, e ela varia por província: Ontário exige cerca de três meses de espera; a Colúmbia Britânica é imediata.

Durante esse período, seguro privado temporário custa de CAD 50 a 150 por mês. Não é opcional na prática — um atendimento de emergência sem cobertura custa muito mais que isso.

E um detalhe que pega todo mundo de surpresa: dentista NÃO é coberto pelo sistema público, nem depois da carência.

Planeje esses meses no orçamento. Link no primeiro comentário.`,
    link: "/artigos/custo-de-vida-no-canada" },

  { n: 27, tema: "bordo", eyebrow: "Currículo",
    titulo: "Foto no currículo pode gerar descarte automático.",
    apoio: "Também ficam de fora: idade, estado civil e número de documento. O formato canadense é outro.",
    legenda: `Seu currículo brasileiro não funciona no Canadá. E não é questão de tradução.

O que NÃO entra num resume canadense:

• Foto — pode gerar descarte automático, a empresa evita acusação de discriminação
• Data de nascimento ou idade
• Estado civil
• CPF, RG, número de documento
• Mais de duas páginas

E tem o ATS: o sistema que filtra candidatos por palavra-chave antes de um humano ler. Por isso mandar o mesmo currículo para todas as vagas é desperdício — use as palavras da descrição de cada uma.

O formato completo no primeiro comentário.`,
    link: "/artigos/como-adaptar-curriculo-para-o-canada" },

  { n: 28, tema: "escuro", eyebrow: "Trabalhar legalmente",
    titulo: "Open work permit e closed não são a mesma coisa.",
    apoio: "O employer-specific prende você a uma empresa. O open permite trabalhar para qualquer empregador, em qualquer lugar do Canadá.",
    legenda: `Duas autorizações com nome parecido e consequências muito diferentes.

EMPLOYER-SPECIFIC (closed): vinculado a um empregador. Você só pode trabalhar para aquela empresa. Se sair, perde a autorização.

OPEN WORK PERMIT: qualquer empregador, em qualquer lugar do Canadá.

A diferença aparece no dia em que o emprego não dá certo. Com o closed, você está preso a uma negociação onde não tem saída — e empregador ruim sabe disso.

E antes que perguntem: trabalhar sem autorização pode dar deportação e banimento permanente. Não compensa.

Os caminhos legais estão no primeiro comentário.`,
    link: "/artigos/como-trabalhar-legalmente-no-canada" },

  { n: 29, tema: "claro", eyebrow: "Visto x permissão",
    titulo: "Quem decide quanto tempo você fica é o oficial na chegada.",
    apoio: "O visto serve para cruzar a fronteira. A permissão autoriza a permanência e a atividade. Não são a mesma coisa.",
    legenda: `Confundir "visto" com "permissão" é o mal-entendido mais comum do processo canadense.

VISTO: serve para cruzar a fronteira. Só isso.

PERMISSÃO (permit): autoriza a permanência e a atividade — estudo ou trabalho.

E o detalhe que quase ninguém sabe: quem decide quanto tempo você fica é o OFICIAL DE IMIGRAÇÃO no momento da chegada, não o visto que está no seu passaporte.

Ah, e brasileiro não usa eTA. O Brasil não está na lista de países isentos, então é visitor visa completo.

A diferença entre cada tipo está no primeiro comentário.`,
    link: "/artigos/diferenca-entre-vistos-e-permissoes" },

  { n: 30, tema: "cta", eyebrow: "Primeiro passo",
    titulo: "Guia gratuito para validar seu ofício em Ontário.",
    apoio: "Em português, do processo real. Como identificar seu ofício no sistema canadense e o que dá para adiantar ainda do Brasil.",
    legenda: `Trinta dias falando sobre validação de ofício no Canadá. Se você acompanhou até aqui, esse é o próximo passo.

Montei um guia gratuito com o começo do processo: como identificar o seu ofício dentro do sistema canadense, o que a Skilled Trades Ontario exige de quem vem de fora, e o que dá para adiantar ainda do Brasil.

É o material que eu queria ter tido quando cheguei aqui e não sabia por onde começar.

Em português, do processo real, sem promessa de aprovação garantida — desconfie de quem promete isso.

Link no primeiro comentário.`,
    link: "/guia-gratis" },
];
