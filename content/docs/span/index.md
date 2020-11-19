---
description: ""
sidebar: "docs"
next: "/docs/span/quick-reference/"
---

# Introduction

Span is a backend that helps you manage data and devices in a Cellular IoT
network.

## Devices

Devices represent - not surprisingly - the _devices_ you have. There are two
required fields for devices: **IMSI** (in practice the SIM card ID) and the
**IMEI** (the hardware identifier). If the IMSI value isn't set correctly the
device won't be recognized by Span when it tries to connect.

## Collections

Devices are grouped in **collections**. A device must be created in Span to get
access. If the device isn't registered in Span it will be rejected when it tries
to connect.

## Outputs

**Outputs** forward the data from devices in a collection to an external
recepient. You can create multiple outputs for each collection. When the data
is forwarded the device and collection settings are included with the payload.

## Firmware

Firmware images are used to manage firmware-over-the-air updates for devices.
Each firmware image have a version and an ID. The ID is only used internally
while the version is used to keep track of what version the different devices
run. All firmware images in a collection must have a unique version number.

Firmware images can be associated with an entire collection, ie all devices in
that collection should run a particular version or per device, ie you can set
which version the device should be running individually.

## A note on teams

**Teams** are set as owners of collections, ie. indirectly the team owns the
devices, outputs and firmware images. Team members that have the administrative
role can add and remove devices from collections. Regular team members have only
read-only access to the collections, devices, outputs and firmware images.

## Tags

Devices, collections, outputs and firmware images can be tagged with metadata.
This is useful f.e. when you have additional information that you need later in
your processing pipeline such as calibration data particular for a device,
identifiers for internal systems, environments ("production", "staging", "test")
or just to keep the resources organized.
