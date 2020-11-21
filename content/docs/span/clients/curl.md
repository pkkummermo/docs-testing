---
description: ""
sidebar: "docs"
prev: "/docs/span/clients/"
next: "/docs/span/clients/go/"
---

# Curl

Technically this isn't a _client_ but these are some copy-and-paste examples of
curl use. `curl` can be very useful when automating API access, f.e. in a build
server. The environment variables `${COLLECTION_ID}` and `${API_TOKEN}` must be
set.

## List all collections

```bash
curl -HX-API-Token:${API_TOKEN} https://api.lab5e.com/span/collections
```

## Extract the "name" tag from a collection

This requires `jq` to extract the JSON field:

```bash
curl -HX-API-Token:${API_TOKEN} https://api.lab5e.com/span/collections/${COLLECTION_ID}/tags | jq -r .Name
```

## Upload firmware image for collection

The firmware image is in the file `app_update.bin` and the version should be set to 1.0.0:

```bash
IMAGE_ID=$(curl -HX-API-Token:${API_TOKEN} -XPOST \
    -F image=@app_update.bin \
    https://api.lab5e.com/span/collections/${COLLECTION_ID}/firmware)

curl -HX-API-Token:${API_TOKEN} \
    -XPATCH -d'{"version":"1.0.0"}' \
    https://api.lab5e.com/span/collections/${COLLECTION_ID}/firmware/${IMAGE_ID}
```
