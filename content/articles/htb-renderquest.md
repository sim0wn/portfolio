---
date: 2024-07-16
description: "Um desafio simples que consiste na exploração de um SSTI em Go"
title: "RenderQuest - Explorando Server-Side Template Injection em Go"
tags:
  - Write-Up
  - Easy
  - Hack The Box
  - SSTI
  - Go
---

# Visão Geral

> Você encontrou uma aplicação web que permite que você insira templates remotamente para serem renderizados. Sua tarefa é se aproveitar das vulnerabilidades desse sistema para obter a _flag_ escondida. Boa sorte!

Como descrito, esse desafio consiste de uma aplicação web que carrega templates `.tpl` de fontes externas e internas. Como o código-fonte é disponibilizado, é possível analisar o comportamento da aplicação e explorar uma vulnerabilidade de [Server-Side Template Injection](https://portswigger.net/web-security/server-side-template-injection).

# Reconhecimento

Na página inicial, é possível ver alguns dados que são utilizados para carregar os templates e um formulário para informar uma URL para o template.
![Página inicial da aplicação](/images/articles/htb-renderquest/homepage.png)

Vale notar também que a URL possui um parâmetro "page", o qual indica a fonte da qual o template será carregado. Analisando o código-fonte da página, é possível encontrar a função responsável por processar e carregar o conteúdo da URL informada, além de outras funções interessantes.

```go
import (
  /* SNIP */
  "html/template"
  "os/exec"
)
/* SNIP */

func (p RequestData) FetchServerInfo(command string) string {
  out, err := exec.Command("sh", "-c", command).Output()
  if err != nil {
    return ""
  }
  return string(out)
}

/* SNIP */

// executado caso o recurso informado seja local
func readFile(filepath string, basePath string) (string, error) {
  if !isSubdirectory(basePath, filepath) {
    return "", fmt.Errorf("Invalid filepath")
  }
  data, err := os.ReadFile(filepath)
  /* SNIP */
  return string(data), nil
}

// executado caso o recurso informado seja remoto
func readRemoteFile(url string) (string, error) {
  response, err := http.Get(url)
  /* SNIP */
  content, err := io.ReadAll(response.Body)
  /* SNIP */
  return string(content), nil
}

// responsável por processar o template
func getTpl(w http.ResponseWriter, r *http.Request) {
  var page string = r.URL.Query().Get("page")
  var remote string = r.URL.Query().Get("use_remote")

  reqData := &RequestData{}
  /* SNIP */
  reqData.ServerInfo.Hostname = reqData.FetchServerInfo("hostname")
  reqData.ServerInfo.OS = reqData.FetchServerInfo("cat /etc/os-release | grep PRETTY_NAME | cut -d '\"' -f 2")
  reqData.ServerInfo.KernelVersion = reqData.FetchServerInfo("uname -r")
  reqData.ServerInfo.Memory = reqData.FetchServerInfo("free -h | awk '/^Mem/{print $2}'")
  /* SNIP */

  err = tmpl.Execute(w, reqData)
}
/* SNIP */
```

Essas funções são essenciais para identificarmos como esse sistema pode ser explorado. Na ordem em que os processos ocorrem, temos a função `getTpl`, que é responsável por processar o template e enviar os objetos que podem ser acessados pelo template. Para isso, ele chama as funções `readFile` e `readRemoteFile`, de acordo com o valor do parâmetro "use_remote" passado na URL.

A princípio, pode-se imaginar que seja possível incluir o arquivo da flag através do parâmetro `page` e resolver o desafio. Entretanto, isso não é possível principalmente pois o arquivo da flag acompanha um sufixo imprevisível, além de a função `readFile` impedir a leitura de arquivos que não estejam no diretório `templates` ou `app`.

Porém, se observarmos, após realizar a leitura do arquivo de template, a aplicação passa o objeto `reqData` para a instrução `Execute`. Isso permite que os parâmetros do objeto `reqData` sejam acessados pelo template. Entretanto, pesquisando sobre a biblioteca [html/template](https://pkg.go.dev/html/template), utilizada para renderização dos templates da aplicação, encontrei [este artigo](https://www.onsecurity.io/blog/go-ssti-method-research/) que descreve uma vulnerabilidade de SSTI que pode ser escalada para RCE. Quando um objeto é transmitido para ser processado pelo template, todas as suas propriedades se tornam acessíveis no template. Isso se torna um problema principalmente por conta da função `FetchServerInfo`, que permite a execução de código do sistema. Quando o objeto `reqData` é passado para processar o template informado, torna-se possível acessar e executar a função `FetchServerInfo` passando um comando como parâmetro. Dessa forma, tem-se uma RCE (execução de código remoto).

# Explorando a vulnerabilidade

Podemos explorar essa vulnerabilidade criando um arquivo de template em nossa máquina local e expondo-o através de um servidor HTTP e o ngrok. Podemos iniciar um servidor HTTP em Python através do comando `python -m http.server` e expor nossa máquina através do ngrok com o seguinte comando: `ngrok http 8000`. Dessa forma, podemos criar um arquivo de template com um payload malicioso. Como exemplo, um arquivo template.tpl contendo `{{.}}` vai imprimir as propriedades do objeto acessível pelo template. Alterando esse payload para `{{.FetchServerInfo "id"}}` e enviando novamente para ser carregado pela aplicação, a resposta será o resultado do comando `id` executado pela máquina alvo. Dessa forma, temos um RCE que permite navegar pelo sistema e encontrar a _flag_, e basta apenas manipular o argumento do comando `FetchServerInfo`.

# Prova de Conceito

```go
{{.FetchServerInfo "cat $(find / -name flag*.txt -type f)"}}
```
