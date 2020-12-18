## /techs - Tecnologias

| Verbo HTTP | Ação             | Descrição                                        | Código e Retorno           |
| ---------- | ---------------- | ------------------------------------------------ | -------------------------- |
| `GET`      | Listagem / Busca | Retorna a lista de tecnologias, filtradas ou não | 200 Success: `Array<Tech>` |
| `POST`     | Cadastro         | Cadastra uma nova categoria                      | 201 Created: `Tech`        |
| `DELETE`   | Deletar          | Deleta uma categoria cadastrada                  | 204 No Content             |

---

### Detalhes de cada chamada e seus retornos

---

#### GET: Listagem / Busca

**URL** : `/techs` <br />
**Método HTTP** : `GET`  <br /> 
**Precisa estar logado** : Não  <br />
**Parametros** : <br />

| Parametro | Obrigatoriedade | Passado por | Tipo | Descrição |
|-----------|-----------------|-------------|------|-----------|
| `search`  | Opcional        | Query | `string` | O parametro servirá para buscar apenas techs que tenham este texto no nome |

##### Exemplo de Chamada (sem busca):

Chamada

```
  GET: /techs
```

:heavy_check_mark: Retorno:

```
[
  {
    "id": "8099f613-4074-4f3b-ab3b-4b2bbfc86523",
    "name": "NodeJS",
    "created_at": "2020-07-12T01:01:26.365Z",
    "updated_at": "2020-07-12T01:01:26.365Z"
  },
  {
    "id": "ec535e01-92df-466b-acdc-eccf7af38c01",
    "name": "React Native",
    "created_at": "2020-07-12T01:01:34.213Z",
    "updated_at": "2020-07-12T01:01:34.213Z"
  }
]
```

##### Exemplo de chamada com Busca textual

Chamada:

```
GET: /techs?search=react
```

Parâmetros passados: <br />
`search` passado por Query <br />

:heavy_check_mark: Retorno:

```
[
  {
    "id": "ec535e01-92df-466b-acdc-eccf7af38c01",
    "name": "React Native",
    "created_at": "2020-07-12T01:01:34.213Z",
    "updated_at": "2020-07-12T01:01:34.213Z"
  }
]
```

---
#### POST: Cadastro

**URL** : `/techs` <br />
**Método HTTP** : `POST`  <br /> 
**Precisa estar logado** : Não  <br />
**Parametros** : <br />

| Parametro | Obrigatoriedade | Passado por | Tipo | Descrição |
|-----------|-----------------|-------------|------|-----------|
| `name`    | Obrigatório     | POST | `string` | O nome da categoria sendo cadastrada |


##### Exemplo de chamada para cadastro

Chamada:

```
POST: /techs
```

Parâmetros passados `BODY / Json`: 
```
{
  "name": "React Native"
}
```

:heavy_check_mark: Retorno no sucesso:
`201 - Created` - E no corpo retorna a entidade cadastrada
```
{
  "name": "React Native",
  "id": "ec535e01-92df-466b-acdc-eccf7af38c01",
  "created_at": "2020-07-12T01:01:34.213Z",
  "updated_at": "2020-07-12T01:01:34.213Z"
}
```

:x: Retorno na falha:
`409 - Conflict` - Quando a tecnologia que está sendo cadastrada já existe na base
```
{
  "status": "error",
  "message": "Tech já cadastrada"
}
```
---

#### POST: Delete

**URL** : `/techs/:id` <br />
**Método HTTP** : `DELETE`  <br /> 
**Precisa estar logado** : Não  <br />
**Parametros** : <br />

| Parametro | Obrigatoriedade | Passado por | Tipo | Descrição |
|-----------|-----------------|-------------|------|-----------|
| `id`      | Obrigatório     | URL         | `uuid`/`string` | Id / uuid da tech a ser excluída |


##### Exemplo de exclusão

Chamada:

```
DELETE: /techs/ec535e01-92df-466b-acdc-eccf7af38c01
```

Parâmetros passados `URL`: 
`id`

:heavy_check_mark: Retorno no sucesso:
`204 - No Content` - retorno sem corpo

:x: Retorno na falha:
`404 - Not Found` - Quando o id passado por rota não corresponde a um id de tecnologia na base
```
{
  "error": "Tech não encontrada"
}
```

