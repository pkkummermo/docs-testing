---
description: ""
sidebar: "outputs"
prev: "/docs/span/fota/"
next: "/docs/span/outputs/webhook/"
---

# Outputs

Span supports the following outputs:

- Websockets - this provides a live stream of data from devices and/or collections directly through the API.
- Webhooks
- MQTT
- IFFT

## Word of warning

A websocket isn't suited for production systems, only for testing and demonstration purposes. Use either webhooks or MQTT if you want message buffering.
