# Fontes e licenças — vídeo de imigração canadense

## Fontes editoriais autorizadas

A pauta diária deve começar pelo feed do **Immigration, Refugees and Citizenship Canada (IRCC)** e conferir o item original antes de escrever qualquer roteiro.

| Prioridade | Fonte | Uso permitido | URL |
|---|---|---|---|
| 1 | Feed RSS do Newsroom do IRCC | Descobrir novos comunicados oficiais publicados pelo IRCC. | https://api.io.canada.ca/io-server/gc/news/en/v2?dept=departmentofcitizenshipandimmigration&sort=publishedDate&orderBy=desc&publishedDate%3E=2021-07-23&pick=50&format=atom&atomtitle=Immigration,%20Refugees%20and%20Citizenship%20Canada |
| 2 | Newsroom do IRCC | Confirmar comunicados, discursos, avisos à imprensa, notas de contexto e declarações. | https://www.canada.ca/en/immigration-refugees-citizenship/news.html |
| 3 | Notices do IRCC | Confirmar mudanças operacionais, prazos, taxas, programas e medidas temporárias. | https://www.canada.ca/en/immigration-refugees-citizenship/news/notices.html |
| 4 | Página do programa ou regra citada pelo IRCC | Confirmar requisitos, vigência e ressalvas antes de explicar o impacto. | https://www.canada.ca/en/immigration-refugees-citizenship.html |

Não usar blogs, perfis sociais, vídeos de terceiros, agregadores ou resultados de busca como base factual da pauta. Eles podem orientar uma investigação, mas nunca bastam para publicação.

## Política de seleção editorial

Escolher um item novo desde a última execução que afete, ou possa afetar, pessoas que desejam visitar, estudar, trabalhar, tornar-se residentes permanentes ou patrocinar familiares no Canadá. Priorizar mudanças confirmadas em programas, critérios, datas, taxas, processos, convites, medidas temporárias e capacidade de processamento.

Excluir anúncios cerimoniais, pesquisas de satisfação, comunicações sem consequência prática, notícias relacionadas apenas a passaporte ou a benefícios não migratórios e medidas para países específicos quando não houver conexão material com a audiência brasileira. Caso a regra seja proposta, teste, consulta ou anúncio futuro, dizer isso explicitamente. Nunca apresentar possibilidade como regra vigente.

Antes de publicar, verificar: a data de publicação, o status da medida, quem é afetado, a data de início ou fim quando houver e o URL primário. Não inventar datas, números, requisitos ou interpretações. Se não houver uma atualização oficial material, registrar **sem publicação** e não reciclar uma notícia antiga como se fosse nova.

## Política de ativos visuais

Usar apenas ativos de origem comprovável. Criar um registro de licença para cada arquivo visual empregado.

| Ordem de preferência | Tipo de ativo | Condição de uso |
|---|---|---|
| 1 | Imagem fotográfica gerada especificamente para o episódio | Deve ser uma cena canadense verossímil, sem texto, logotipos, marcas, pessoas identificáveis ou imitação de fotografia protegida. Registrar prompt, data e arquivo. |
| 2 | Imagem sob licença Open Government Licence – Canada | Confirmar a licença na página do ativo e cumprir a atribuição exigida. |
| 3 | Imagem de domínio público ou CC0 | Salvar URL de origem, titular quando informado e declaração de domínio público/CC0. |
| 4 | Imagem sob CC BY | Salvar URL, autor, versão da licença e texto de atribuição. Adaptar apenas quando a licença permitir. |

Não usar imagens encontradas em mecanismos de busca, mídias sociais, artigos de notícia, bancos pagos sem licença adquirida, imagens com marca d’água, imagens de pessoas reconhecíveis sem autorização inequívoca, nem conteúdo sob licença CC BY-NC, CC BY-ND ou licença desconhecida. Não usar o logo do Governo do Canadá, de aeroportos, universidades, empresas ou consultorias.

Para cenas com pessoas, preferir imagens geradas ou tomadas amplas devidamente licenciadas, sem crianças e sem foco em pessoas em situações de vulnerabilidade. Não usar imagens que sugiram que alguém tenha sido aprovado, negado ou entrevistado pela imigração.

## Registro obrigatório

Criar `asset-registry.json` em cada episódio com um objeto por ativo:

```json
{
  "asset_id": "v01",
  "file": "assets/v01.jpg",
  "type": "generated_photo | open_licence_photo",
  "subject": "Skyline de Toronto ao amanhecer",
  "source_url": "https://... ou null",
  "author": "nome ou null",
  "license": "generated_for_project | OGL-Canada | CC0 | CC-BY-4.0",
  "attribution": "texto necessário ou null",
  "prompt": "somente quando gerada",
  "checked_at": "YYYY-MM-DDTHH:MM:SSZ"
}
```

Ao montar o vídeo, exibir as atribuições que forem exigidas na descrição do post, não sobrepor texto de atribuição às imagens. Arquivar o registro junto ao vídeo.

## Texto padrão de aviso

> Conteúdo informativo baseado em fonte oficial do IRCC, publicado em [data]. Regras migratórias podem mudar. Verifique a página oficial antes de tomar decisões; este vídeo não substitui orientação jurídica ou migratória individual.

## Referências

[1] [RSS Feeds — Immigration, Refugees and Citizenship Canada](https://www.canada.ca/en/immigration-refugees-citizenship/news/rss.html)

[2] [Newsroom — Immigration, Refugees and Citizenship Canada](https://www.canada.ca/en/immigration-refugees-citizenship/news.html)

[3] [Notices — Immigration, Refugees and Citizenship Canada](https://www.canada.ca/en/immigration-refugees-citizenship/news/notices.html)

[4] [Open Government Licence – Canada](https://open.canada.ca/en/open-government-licence-canada)

[5] [Creative Commons — About CC Licenses](https://creativecommons.org/share-your-work/cclicenses/)
