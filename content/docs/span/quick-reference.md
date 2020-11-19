---
description: ""
sidebar: "docs"
prev: "/docs/span/"
next: "/docs/span/at-commands/"
---

# Quick reference

## APNs

| Provider  | APN name    |
| --------- | ----------- |
| Telenor N | `mda.lab5e` |

## Endpoints

Endpoints are the same for all providers.

| Protocol | Address                     | Notes                         |
| -------- | --------------------------- | ----------------------------- |
| UDP      | `172.16.15.14:1234`         | Payload is accepted as is     |
| CoAP     | `coap://172.16.15.14:5683/` | POST to send, GET to retrieve |

## API

- API endpoint is at [https://api.lab5e.com/span/](https://api.lab5e.com/span/).
- Console is at [https://span.lab5e.com/](https://span.lab5e.com/)
- API Reference documentation is at [https://docs.lab5e.com/span/](https://docs.lab5e.com/span/)
