# Empresa

> Memória central do negócio. O Claude lê esse arquivo antes de cada resposta.

**Nome:** Renan Sersun Calefi
**Negócio:** Marca pessoal (Renan) — engenheiro eletricista que também presta serviços digitais
**O que faz:** Sites, SEO, vídeos e cortes de vídeo
**Perfil:** Solopreneur / criador solo
**Atende clientes:** Clientes que querem sites profissionais, carrosséis e melhorias em automação
**Equipe:** Sozinho
**Ferramentas:** VPS própria (hospedagem dos projetos), Google Places API (New), Hunter.io, SMTP + IMAP de domínio próprio
**Principais entregas:** Sites, SEO, vídeos, cortes, carrosséis, automação

## Contexto adicional

Renan é engenheiro eletricista de formação e atua também com serviços digitais (sites, SEO, vídeo). As duas frentes competem pelo mesmo gargalo: captação de clientes.

Infraestrutura: hospeda em VPS própria, não em PaaS (Vercel/Netlify). Projetos novos devem assumir deploy self-hosted — Node + systemd + Nginx com TLS — em vez de function serverless.
