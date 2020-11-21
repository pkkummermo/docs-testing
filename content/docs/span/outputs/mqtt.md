---
description: ""
sidebar: "docs"
prev: "/docs/span/outputs/webhook/"
next: "/docs/span/outputs/ifttt/"
---

# MQTT

MQTT outputs are able to connect to a MQTT broker. The endpoint must be
formatted as `tcp://<host>:<port>` for unencrypted connections or
`ssl://<host>:<port>` for TLS connections. TLS connections is highly
recommended. If you use a self-signed certificate you can disable the
certificate check by setting the check flag in the configuration.

The host name must be valid and reachable. The port must _always_ be included
in the endpoint.

The payload is a JSON structure (the IDs and metadata might be different
depending on the device, collection and payload):

```json
{
  "device": {
    "deviceId": "17dh0cf43jfgl8",
    "collectionId": "17dh0cf43jfgli",
    "imei": "111222333444",
    "imsi": "123456789",
    "tags": { "name": "My first device" }
  },
  "payload": "WXVwIHRoaXMgaXMgdGhlIHBheWxvYWQ=",
  "received": 1538163685141,
  "type": "data",
  "transport": "<transport used by the device to deliver the data>",
  "coapMetaData": {
    "method": "POST",
    "path": "<path used by device>"
  },
  "udpMetaData": {
    "localPort": "<the backend's local port>",
    "remotePort": "<the port used on the device>"
  }
}
```
