---
date: 2024-05-09
description: Uma breve exploração dos tipos de memórias presentes no Arduino Uno para compreender a arquitetura das memórias computacionais.
tags:
  - Arquitetura de Computadores
title: Entendendo os tipos de memória através da arquitetura do Arduino Uno
---

## Arquitetura do Arduino Uno

De acordo com os _datasheets_ do Arduino Uno e de seu processador, pode-se encontrar os seguintes tipos
de memórias nele:

- Memória Flash;
- Memória SRAM (_Static Random Access Memory_);
- Memória EEPROM (_Electrically Erasable Programmable Memory_);

Embora existam variações na nomenclatura, é importante lembrar que, por definição, essas memórias compartilham características. Portanto, ao detalhar o funcionamento de cada memória, você verá que, por exemplo, a memória Flash não deixa de ser também um tipo de memória acesso aleatório. Entretanto, ela é mais comumente classificada como memória de armazenamento não volátil.

## Classificação dos tipos de memória

Para entender o funcionamento dos variados tipos de memória, pode-se classificá-las de acordo com alguns critérios.

|  Critério  |       Variação I       |      Variação II      |
| :--------: | :--------------------: | :-------------------: |
|   Acesso   | Persistência dos dados | Manipulação dos dados |
| Sequencial |        Volátil         |    Somente leitura    |
| Aleatório  |      Não volátil       |   Leitura e escrita   |

### Quanto ao acesso

O acesso pode ser sequencial ou aleatório. O acesso aleatório indica que é possível acessar determinado espaço da memória sem ter que percorrer tudo o que foi escrito. Como exemplo, tem-se a fita, que armazena os dados sequencialmente, pois é preciso percorrer a fita para encontrar alguma informação na memória. Se numa fita foram gravadas 4 músicas e você deseja ouvir a terceira, terá que percorrer as duas primeiras músicas para acessá-la. Num disco rígido, por outro lado, é possível buscar uma informação da memória independentemente de onde esteja. Adicionalmente, no Arduino UNO, tem-se a memória Flash, que acessa os dados de forma aleatória. Ou seja, é possível armazenar dados e buscá-los conforme a necessidade de acesso, sem que seja necessário percorrer tudo o que já foi escrito.

### Quanto a persistência dos dados

A persistência indica a capacidade da memória de armazenar os dados após a corrente elétrica ser extinta. Como exemplo, um pendrive pode receber arquivos e ser removido do computador sem que os dados sejam excluídos. Ou seja, extinguiu-se a corrente elétrica, mas pessistiram-se os dados. A memória primária de um computador, por outro lado, perde completamente seus dados assim que extingui-se a corrente elétrica, isto é, desliga-se o computador. No caso do Arduino UNO, tem-se uma memória SRAM que não persiste os dados após a reinicialização, sendo utilizada para salvar as referências aos dados utilizados pelo software.

### Quanto a manipulação dos dados

O último critério da tabela indica a capacidade da memória de ser reescrita múltiplas vezes ou ter sido feita para ser programada uma vez e então ter a capacidade apenas de leitura. Pode-se usar o DVD como exemplo. Dentre os tipos de DVDs existentes no mercado, pode-se ter o DVD R e o DVD RW. Enquanto o DVD R não pode ser reescrito, o DVD RW pode ter seus dados alterados múltiplas vezes. Outro exemplo é a BIOS do computador, que fica armazenada em um dispositivo de memória programável, mas que não foi feito para ser regravável. Embora os computadores atuais utilizem memórias que permitem a reprogramação da BIOS para, por exemplo, atualizações, essa capacidade de escrita se limita a um espaço de tempo específico no qual pode ser realizada a reprogramção. Entretanto, não é como um pendrive que se pode escrever ou apagar os dados conforme o usuário precisar.

## Utilização no Arduino

Com base nas características definidas anteriormente, podemos analisar cada memória presente no Arduino e sua utilização.

### Memória Flash

É um tipo de memória de acesso aleatório, não volátil e de leitura e escrita. Por conta de suas capacidades, ela é utilizada no Arduino para armazenar o programa que deseja executar.

### Memória SRAM

É um tipo de memória primária que possui as seguintes características: quanto ao acesso, aleatório; quanto a persistência, volátil; quanto a manipulação dos dados, leitura e escrita. Existem outros tipos de memória RAM, como a DRAM (_Dynamic Random Access Memory_), porém a SRAM se difere pela sua velocidade. Enquanto a DRAM necessita realizar uma atualização constante para encontrar as informações, a SRAM possui mais transistores que eliminam a necessidade dessa atualização, resultando em uma velocidade muito maior. Como consequência, porém, é mais custosa e maior que uma DRAM. Por conta de suas capacidades, ela é utilizada para armazenar a pilha de memória, isto é, os dados necessários para a execução de software.

### Memória EEPROM

É um tipo de memória não volátil de acesso aleatório, apenas leitura e programável elétricamente. Isto é, ela persiste os dados após a extinção de corrente elétrica, e pode ser reprogramada. Entretanto, não é utilizada com a intenção de ter seus dados sobescritos a todo momento. Portanto, ela é comumente utilizada para armazenar pequenos dados de configurações do dispositivo. No caso do Arduino não é diferente. Como ela persiste os dados entre reinicializações, uma de suas aplicações pode ser armazenar preferências do usuário definidas através do software que foi salvo na memória Flash. Sua flexibilidade de ser reprogramável através de software permite que o desenvolvedor a utilize da maneira que for necessária de acordo com a aplicação
