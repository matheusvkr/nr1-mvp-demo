# HOWTOBUILD.md

# Build + Deploy funcionando (GitHub Pages + Next.js)

## 1. Configuração do `next.config.mjs`

```js
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',

  trailingSlash: true,

  basePath: isProd ? '/nr1-mvp-demo' : '',
  assetPrefix: isProd ? '/nr1-mvp-demo' : '',

  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
```

---

# 2. Limpar builds antigos

PowerShell:

```powershell
rm -r -fo .next
rm -r -fo out
```

---

# 3. Gerar build

```bash
npm run build
```

Isso gera a pasta:

```txt
out/
```

---

# 4. Entrar na pasta `out`

```powershell
cd out
```

---

# 5. Criar `.nojekyll`

IMPORTANTE:

Sem isso o GitHub Pages ignora a pasta `_next`.

```powershell
echo.> .nojekyll
```

---

# 6. Inicializar git dentro da pasta `out`

```powershell
git init
```

---

# 7. Adicionar arquivos

```powershell
git add .
```

---

# 8. Criar commit

```powershell
git commit -m "deploy"
```

---

# 9. Criar branch `gh-pages`

```powershell
git branch -M gh-pages
```

---

# 10. Adicionar remoto

```powershell
git remote add origin https://github.com/matheusvkr/nr1-mvp-demo.git
```

---

# 11. Fazer deploy

```powershell
git push -f origin gh-pages
```

---

# 12. Configurar GitHub Pages

GitHub:

```txt
Settings
→ Pages
```

Selecionar:

```txt
Deploy from a branch
```

Branch:

```txt
gh-pages
```

Folder:

```txt
/ (root)
```

---

# 13. URL final

```txt
https://matheusvkr.github.io/nr1-mvp-demo/
```

---

# Estrutura esperada da pasta `out`

```txt
out/
 ├── _next/
 ├── index.html
 ├── 404.html
 ├── .nojekyll
```

---

# Validação

Abrir DevTools:

```txt
F12 → Network
```

Os arquivos devem carregar de:

```txt
/nr1-mvp-demo/_next/static/
```

e NÃO de:

```txt
/_next/static/
```
