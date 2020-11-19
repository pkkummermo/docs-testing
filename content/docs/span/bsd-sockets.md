---
description: ""
sidebar: "docs"
prev: "/docs/span/at-commands/"
next: "/docs/span/fota/"
---

# BSD Sockets

If your device SDK uses BSD Sockets or a socket-compatible library this will
create a new socket, send "hello world" to Span and close the socket:

```c
/* Set up the buffer and length */
const char *buffer = "Hello World";
len = strlen(buffer);

/* Create a new UDP socket */
int sock = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
if (sock < 0)
{
    printf("Error opening socket: %d\n", sock);
    return;
}

/* Set up the remote address for Span; 172.16.15.14 port 1234 */
static struct sockaddr_in remote_addr = {
    sin_family : AF_INET,
};
remote_addr.sin_port = htons(1234);
net_addr_pton(AF_INET, "172.16.15.14", &remote_addr.sin_addr);

/* Send the buffer */
int err = sendto(sock, buffer, len, 0, (struct sockaddr *)&remote_addr, sizeof(remote_addr));
if (err < 0)
{
    printf("Unable to send data: %d\n", err);
}
/* ...and close the socket */
close(sock);
```

Note that `net_addr_pton` might have a different name.
