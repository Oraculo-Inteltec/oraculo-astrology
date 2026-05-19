# oraculo-astrology

Mapa Astral como serviço com Python 3.13 e FastAPI.

![Diogo's Natal chart](./assets/charts/Diogo.Natal.oraculo.svg)

## Executando

### Docker

Com [Docker](https://www.docker.com) instalado, basta rodar o seguinte comando e uma API HTTP será exposta na porta `8000`

```
docker run -it -p 8000:8000 oraculointeltec/oraculo-astrology:latest
```

## Exploração interativa (`astrology.ipynb`)

O notebook [`astrology.ipynb`](astrology.ipynb) é a referência canónica para humanos e agentes de IA:

- exemplos de `AstrologicalSubject` com dados de nascimento reais (família Machado);
- geração de mapas com `Chart(...)` (SVG no Jupyter);
- padrões de uso do pacote `backend` antes de expor via HTTP.

Abrir a partir da raiz do monorepo Oráculo: `oraculo-astrology/astrology.ipynb`. No OraculoOS, o mesmo motor vive em `../oraculo-os/project/oraculo/astrology/` (cópia integrada; ver [`../oraculo-os/docs/astrology.md`](../oraculo-os/docs/astrology.md)).

## Documentação

O serviço é exposto utilizando [fastAPI](http://fastapi.tiangolo.com), que expõe uma documentação [OpenAPI](https://fastapi.tiangolo.com/reference/openapi/docs/) 
no caminho `/docs`, ou seja, executando com o comando acima, basta acessar o endereço: [http://localhost:8000/docs](http://localhost:8000/docs)


## Agradecimentos

- https://github.com/aloistr/swisseph
- https://pypi.org/project/kerykeion/
