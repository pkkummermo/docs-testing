---
description: ""
sidebar: "docs"
prev: "/docs/span/bsd-sockets/"
next: "/docs/span/outputs/"
---

# FOTA

When you move on from the "prototype on my desk" to multiple test devices you
soon discover that _upgrades_ are time consuming, particularly if the devices
are far apart or in inaccessible places. Climbing ladders with a laptop and
programming cable soon gets tedious.

FOTA is quite simple in theory: Create a new firmware image, send it to the
device and let the device update itself.

## Versioning

_Versioning_ is the first issue you should solve. Since the device (and you)
needs to know "do I need an upgrade?" a simple version number or string must
be used. A "version" is Span is just a string but for simplicity we'll just
use a number. It doesn't have to be very complicated, a single
`#define VERSION "1"` somewhere in the source code is sufficient. When there's
a new version that should be deployed, change the string to something different,
build the new image and install it on the device.

### Reporting the running version

Span doesn't connect to the device in any way - the devices themselves manages
the communication schedule so the device must report its running version once
in a while. There are two supported methods for this in Span - one uses the
[Lightweight M2M protocol](https://omaspecworks.org/what-is-oma-specworks/iot/lightweight-m2m-lwm2m/), or "lwm2m" for short. The protocol is quite involved and unless you already have support for this built in the _simple FOTA_ protocol is much simpler in use.

## LwM2M FOTA

The LwM2M FOTA mechanism uses the LwM2M object 3 and 5 to retreve the firmware
version, model number, serial number and client manufacturer fields. If the
device requires a new firmware version Span will set the `Firmware URI` field
to the image location and then POST to the `Update` endpoint on the LwM2M
server.

While updating the `State` field is observed to monitor the progress.

A complete example in Zephyr using LwM2M is available at [GitHub](https://github.com/ExploratoryEngineering/nrf9160-telenor/tree/master/samples/fota)

## Simplified FOTA

The simplified FOTA protocol uses CoAP just like LwM2M but the packet format is
a lot simpler. Four strings are TLV encoded in a single buffer:

| ID  | Description         | Type   |
| --- | ------------------- | ------ |
| 1   | Firmware version    | string |
| 2   | Model number        | string |
| 3   | Serial number       | string |
| 4   | Client manufacturer | string |

Span uses just the firmware version field to determine the running version. The
other three fields are stored but not used. These can be used to report other
kinds of versions such as modem firmware version, build names, device ID and
so on.

The strings are encoded as two bytes followed by the string itself:

| 1   | 2      | 3      | 4      | ... | n      |
| --- | ------ | ------ | ------ | --- | ------ |
| ID  | Length | char 1 | char 2 | ... | char N |

Uknown IDs can be discarded and the bytes skipped.

The report is sent via CoAP POST to `coap://172.16.15.14:5683/fw` and Span
responds with another TLV encoded buffer that contains the following fields:

| ID  | Description     | Type   |
| --- | --------------- | ------ |
| 1   | Host name       | string |
| 2   | Port number     | uint32 |
| 3   | Path            | string |
| 4   | Image available | bool   |

The host, port and path fields can be used to build a CoAP URI that points to
a firmware image if it should be downloaded. Fields 1-3 might not be included
if there is no firmware image available for download.

### Encoding the simple FOTA report

Encoding a string into a buffer is quite simple:

```c
size_t encode_tlv_string(uint8_t *buf, uint8_t id, const uint8_t *str)
{
    size_t ret = 0;
    buf[ret++] = id;
    buf[ret++] = strlen(str);
    for (uint8_t i = 0; i < strlen(str); i++)
    {
        buf[ret++] = str[i];
    }
    return ret;
}

#define FIRMWARE_VER_ID 1
#define MODEL_NUMBER_ID 2
#define SERIAL_NUMBER_ID 3
#define CLIENT_MANUFACTURER_ID 4

int fota_encode_simple_report(uint8_t *buffer, size_t *len)
{
    size_t sz = encode_tlv_string(buffer, FIRMWARE_VER_ID, "version1");
    sz += encode_tlv_string(buffer + sz, CLIENT_MANUFACTURER_ID, "manufacturer");
    sz += encode_tlv_string(buffer + sz, SERIAL_NUMBER_ID, "serial");
    sz += encode_tlv_string(buffer + sz, MODEL_NUMBER_ID, "model");
    *len = sz;
    return 0;
}
```

### Decoding the response from Span

Decoding the response from Span are a bit more involved but quite simple:

```c
int decode_tlv_string(const uint8_t *buf, size_t *idx, char *str)
{
    int len = (int)buf[(*idx)++];
    int i = 0;
    for (i = 0; i < len; i++)
    {
        str[i] = buf[(*idx)++];
    }
    str[i] = 0;
    return 0;
}

int decode_tlv_uint32(const uint8_t *buf, size_t *idx, uint32_t *val)
{
    size_t len = (size_t)buf[(*idx)++];
    if (len != 4)
    {
        LOG_ERR("uint32 in TLV buffer isn't 4 bytes");
        return -1;
    }
    *val = 0;
    *val += (buf[(*idx)++] << 24);
    *val += (buf[(*idx)++] << 16);
    *val += (buf[(*idx)++] << 8);
    *val += (buf[(*idx)++]);
    return 0;
}

int decode_tlv_bool(const uint8_t *buf, size_t *idx, bool *val)
{
    size_t len = (size_t)buf[(*idx)++];
    if (len != 1)
    {
        LOG_ERR("bool in TLV buffer isn't 1 byte");
        return -1;
    }

    *val = (buf[(*idx)++] == 1);
    return 0;
}

#define HOST_ID 1
#define PORT_ID 2
#define PATH_ID 3
#define AVAILABLE_ID 4

typedef struct
{
    char host[25];
    uint32_t port;
    char path[25];
    bool scheduled_update;
} simple_fota_response_t;


int decode_simple_response(simple_fota_response_t *resp, const uint8_t *buf, size_t len)
{
    size_t idx = 0;
    int err = 0;
    while (idx < len)
    {
        uint8_t id = buf[idx++];
        switch (id)
        {
        case HOST_ID:
            err = decode_tlv_string(buf, &idx, resp->host);
            if (err)
            {
                return err;
            }
            break;
        case PORT_ID:
            err = decode_tlv_uint32(buf, &idx, &resp->port);
            if (err)
            {
                return err;
            }
            break;
        case PATH_ID:
            err = decode_tlv_string(buf, &idx, resp->path);
            if (err)
            {
                return err;
            }
            break;
        case AVAILABLE_ID:
            err = decode_tlv_bool(buf, &idx, &resp->scheduled_update);
            if (err)
            {
                return err;
            }
            break;
        default:
            printf("Unknown field id in FOTA response: %d\n", id);
            return -1;
        }
    }
    return 0;
}
```
