# **Máscaras de entrada**

Olá, pessoal! 👋 Que bom ver vocês interessados em aprimorar seus formulários. Essa é uma excelente forma de melhorar a **experiência do usuário (UX)**. Vamos mergulhar fundo e entender como a mágica do `oninput` acontece.

### O que é `oninput`?

O atributo **`oninput`** é um **manipulador de eventos** (event handler) do HTML. Ele dispara uma ação toda vez que o valor de um elemento `<input>` ou `<textarea>` é alterado. A grande diferença para o `onkeyup`, por exemplo, é que ele detecta qualquer mudança, seja por digitação, copiar/colar, arrastar e soltar, ou até mesmo por scripts. Isso o torna perfeito para formatação em tempo real, como no nosso exemplo.

---

### Entendendo o `this.value`

Dentro do contexto do `oninput`, a palavra-chave **`this`** refere-se ao próprio elemento HTML que disparou o evento. Nesse caso, ela aponta para o `<input>` que o usuário está interagindo. Portanto, **`this.value`** é a forma de acessarmos o **valor atual** que o usuário digitou no campo.

A linha `this.value = this.value...` basicamente pega o valor atual do campo, aplica uma série de transformações (os `replace`) e, em seguida, **atualiza o valor do próprio campo** com o resultado formatado. É um ciclo contínuo de "leia, transforme e escreva".

---

### Detalhando os `replace` e as Expressões Regulares

A formatação é feita usando o método **`.replace()`** do JavaScript, que substitui partes de uma string. Ele trabalha em conjunto com as **expressões regulares** (regex), que são padrões de busca para encontrar e manipular texto. Vamos decifrar cada um dos campos.

#### 🎯 CPF (`maxlength="14"`)

* **`this.value.replace(/\D/g, '')`**
    * **`/`**...**`/g`**: Delimita a expressão regular e o flag `g` significa **global**, ou seja, substitui **todas** as ocorrências que encontrar, não apenas a primeira.
    * **`\D`**: É um atalho para **tudo que não for um dígito** (`\d`). Ele remove letras, espaços, pontos, traços, etc., deixando apenas os números. É a nossa "limpeza" inicial.

* **`.replace(/(\d{3})(\d)/, '$1.$2')`** (executado duas vezes)
    * **`(\d{3})`**: Captura um grupo de **três dígitos** (`\d{3}`). Os parênteses `()` criam um grupo de captura.
    * **`(\d)`**: Captura o **próximo dígito** que vier depois.
    * **`'$1.$2'`**: É o que será inserido. O `$1` e `$2` são as **referências** aos grupos capturados. Ele pega o primeiro grupo (`$1`), adiciona um ponto (`.`) e junta com o segundo grupo (`$2`). Como essa linha é executada duas vezes, o resultado é a inserção de dois pontos.

* **`.replace(/(\d{3})(\d{1,2})$/, '$1-$2')`**
    * **`(\d{3})`**: Captura os próximos três dígitos.
    * **`(\d{1,2})`**: Captura os próximos **um ou dois dígitos**.
    * **`$`**: Âncora que significa **final da string**. Isso garante que a substituição para o traço só aconteça no final do valor.
    * **`'$1-$2'`**: Insere o traço entre os dois últimos grupos capturados.

#### 📞 Telefone (`maxlength="15"`)

* **`this.value.replace(/\D/g, '')`**: Remove tudo que não é número, igual ao CPF.

* **`.replace(/(\d{2})(\d)/, '($1) $2')`**
    * **`(\d{2})`**: Captura os dois primeiros dígitos (o DDD).
    * **`(\d)`**: Captura o próximo dígito.
    * **`'($1) $2'`**: Adiciona os parênteses e um espaço, formatando o DDD.

* **`.replace(/(\d{4,5})(\d)/, '$1-$2')`**
    * **`(\d{4,5})`**: Captura os primeiros **quatro ou cinco** dígitos do número (o que é ideal para telefones com 8 ou 9 dígitos).
    * **`(\d)`**: Captura o próximo dígito.
    * **`'$1-$2'`**: Insere o traço, dividindo a primeira parte da segunda do número de telefone.

* **`.replace(/(-\d{4})\d+?$/, '$1')`**
    * **`(-\d{4})`**: Captura um grupo de um traço seguido por quatro dígitos.
    * **`\d+?`**: Tenta capturar um ou mais dígitos **de forma não-gananciosa**.
    * **`$`**: Garante que o padrão é buscado no final da string.
    * **`'$1'`**: Substitui o padrão encontrado, mas **apenas pelo primeiro grupo de captura**, o que efetivamente remove qualquer dígito extra que o usuário tentar digitar depois do 4º dígito após o traço, obedecendo o `maxlength="15"`.

#### ✉️ CEP (`maxlength="9"`)

* **`this.value.replace(/\D/g, '')`**: Limpa o campo.

* **`.replace(/(\d{5})(\d)/, '$1-$2')`**
    * **`(\d{5})`**: Captura os primeiros cinco dígitos.
    * **`(\d)`**: Captura o próximo dígito.
    * **`'$1-$2'`**: Insere o traço após os 5 primeiros dígitos.

* **`.replace(/(-\d{3})\d+?$/, '$1')`**: Similar ao do telefone, essa linha remove qualquer dígito extra após o 3º dígito depois do traço, respeitando o `maxlength="9"`.

Percebem a beleza do **encadeamento de métodos**? A saída de um `replace` se torna a entrada para o próximo, permitindo uma formatação progressiva e precisa.

É isso, pessoal! Agora vocês não apenas usam, mas também entendem a fundo como essa formatação funciona. Essa técnica é muito útil para guiar o usuário e garantir que os dados de entrada estejam no formato correto antes mesmo de serem enviados. 🚀