---
description: ""
sidebar: "docs"
prev: "/docs/span/quick-reference/"
next: "/docs/span/bsd-sockets/"
---

# AT-commands

## Generic AT commands

| Command       | Description                |
| ------------- | -------------------------- |
| `AT+CIMI`     | Show IMSI                  |
| `AT+CGSN=1`   | Show IMEI                  |
| `AT+CGPADDR`  | Show allocated IP address  |
| `AT+CGDCONT?` | Show the APN configuration |

## SARA N2

### Set up APN

This will configure the APN for a SARA N2 modem, set it to automatically connect
on boot and reboot the modem:

```text
AT+CGDCONT=0,"IP","mda.lab5e"
AT+NCONFIG="AUTOCONNECT","TRUE"
AT+NRB
```

### Send "hello world"

This will create a new socket, send "hello world" to Span and then close the socket:

```text
AT+NSOCR="DGRAM",17,8888,1
AT+NSOST=0,"172.16.15.14",1234,12,"48656C6C6F20576F726C6421"
AT+NSOCL=0
```

Note that the payload is hex encoded and that the length (12) is the number of
bytes, not the length of the encoded string.

**Tip:**
AT commands might have variants even for the same chipset. Consult the documentation
if you get ERROR responses from the commmands. Some versions require quoted
strings, others not.
