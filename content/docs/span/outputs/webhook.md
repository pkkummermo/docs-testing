---
description: ""
sidebar: "docs"
prev: "/docs/span/outputs/"
next: "/docs/span/outputs/mqtt/"
---

# Webhook

The webhook output `POST`s the device payloads to a web server somewhere on the
Internet.

The web server must acknowledge the POST with a 2xx response. If the response is
anything else than a 2xx response Span will consider the webhook to be offline
and will back off a bit before retrying. If the webhook still fails it will back
off for some more up to five minutes.

The payload looks roughly like this (the IDs and metadata might be different
depending on the device, collection and payload):

```json
{
  "messages": [
      {
        "device": {
        "deviceId":"17dh0cf43jfgl8",
        "collectionId":"17dh0cf43jfgli",
        "imei":"111222333444",
        "imsi":"123456789",
        "tags":{ "name":"My first device" }
        },
        "payload":"WXVwIHRoaXMgaXMgdGhlIHBheWxvYWQ=",
        "received":1538163685141,
        "type": "data",
        "transport": "<transport used by the device to deliver the data>",
        "coapMetaData": {
        "method": "POST",
        "path": "<path used by device">
        },
        "udpMetaData": {
        "localPort": "<the backend's local port>",
        "remotePort": "<the port used on the device>"
        }
      }
    ]
}
```

If there are multiple messages received since the last POST by Span the list of devices (`messages`) will contain more than one payload.
