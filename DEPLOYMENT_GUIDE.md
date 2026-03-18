# 🚀 GIARDINO - Guia de Deployment para Netlify

## Opção 1: Deploy via MCP Integration (Recomendado)

### Passo 1: Conectar Netlify ao Builder.io
1. No topo direito da tela, clique em **"Open MCP Popover"**
2. Procure por **"Netlify"** na lista de integrações
3. Clique para conectar e autentique com sua conta Netlify
4. Selecione ou crie um novo site

### Passo 2: Deploy Automático
1. Após conectar, você verá um botão de deploy no topo
2. Clique em **"Deploy"** para fazer upload do projeto
3. Netlify fará o build automaticamente baseado no `netlify.toml`
4. Seu site estará disponível em uma URL tipo: `https://seu-site.netlify.app`

---

## Opção 2: Deploy Manual via CLI

Se preferir fazer deploy via terminal:

### Pré-requisitos
```bash
npm install -g netlify-cli
```

### Passo 1: Login no Netlify
```bash
netlify login
```

### Passo 2: Build Local (opcional)
```bash
pnpm build
```

### Passo 3: Deploy
```bash
netlify deploy --prod --dir=dist/spa
```

---

## Opção 3: Deploy via GitHub (Recomendado para atualizações automáticas)

### Passo 1: Push para GitHub
```bash
git add .
git commit -m "GIARDINO - Dashboard Premium Final"
git push origin main
```

### Passo 2: Conectar GitHub ao Netlify
1. Acesse https://app.netlify.com
2. Clique em **"New site from Git"**
3. Selecione **GitHub** como provedor
4. Autorize e selecione este repositório

### Passo 3: Configuração de Build
Netlify detectará automaticamente:
- **Build command**: `npm run build:client`
- **Publish directory**: `dist/spa`
- **Node version**: Será usado automaticamente do arquivo `.nvmrc` ou padrão

### Passo 4: Deploy
Clique em **Deploy** e aguarde. A cada push para `main`, Netlify fará deploy automaticamente!

---

## 📊 O que será Deployado

✅ Dashboard GIARDINO completo com:
- Abas: Visão Geral, Receitas, Custos, RH, Viabilidade, Sobre
- Gráficos interativos (Pie, Bar, Area Charts)
- KPI Cards com valores em tempo real
- Tabelas consolidadas sem repetição
- Galeria de fotos do projeto
- Paleta de cores extraída da logo

✅ Funcionalidades PDF:
- Relatório executivo A4 com 9+ páginas
- Resumo financeiro consolidado
- Estrutura de custos detalhada
- Lista completa de serviços
- Informações do projeto

---

## 🌐 Domínios Customizados (Opcional)

### Usar domínio personalizado no Netlify
1. Acesse **Domain settings** no painel do Netlify
2. Clique em **Add custom domain**
3. Coloque seu domínio (ex: giardino-investimento.com)
4. Configure os DNS records conforme instruções

---

## ✅ Checklist de Deployment

- [x] Código está compilando sem erros
- [x] Dev server funcionando em http://localhost:8080
- [x] PDF generator testado e funcionando
- [x] Galeria de fotos integrada
- [x] Cores da logo aplicadas
- [x] netlify.toml configurado

---

## 🔍 Verificação Pós-Deployment

Após o deploy estar live:

1. **Homepage**: Acesse a URL do site
2. **Teste de Navegação**: Clique em todas as abas
3. **Teste de Gráficos**: Verifique se os gráficos carregam
4. **Teste de PDF**: Clique no botão "📄 Gerar Relatório"
5. **Teste de Galeria**: Abra a aba "Sobre" e visualize as fotos

---

## 🆘 Troubleshooting

### "Build failed"
- Verifique se o `package.json` tem todos os scripts
- Confirme que `netlify.toml` está na raiz do projeto
- Verifique versão do Node (recomendado 18+)

### "PDF não gera"
- Certifique-se de que `jspdf` está instalado: `pnpm install jspdf`
- Verify que `html2canvas` está no package.json

### "Galeria não mostra fotos"
- Verifique URLs das imagens no `ProjectGallery.tsx`
- Confirme que as URLs são públicas e acessíveis

---

## 📞 Proximas Ações

1. **Conecte o Netlify** via MCP ou manualmente
2. **Faça seu primeiro deploy**
3. **Compartilhe o link** com os investidores
4. **Configure domínio personalizado** (opcional)
5. **Setup de CI/CD automático** (recomendado)

---

**Pronto! Seu dashboard GIARDINO estará online em minutos! 🎉**
