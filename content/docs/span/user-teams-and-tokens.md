---
description: ""
sidebar: "docs"
prev: "/docs/span/clients/"
---

# User teams and tokens

## Teams

**Teams** are built up of one or more **members**. Teams can own resources and
when a team is set as the owner of f.e. a collection in Span all members of that
team can access the contents of that collection.

## Roles

Team members are either **administrators** or regular members. Administrators
have read and write access to the resources they own. A team can have multiple
administrators but never less than one.

An administrator can change everything in a team except his/hers own membership
so if you want to transfer administrator privileges to another member of the
team he/she must first be set as an administrator, then change your role to
a regular member or remove you from the team.

## Invites

If you want to invite another user into a team you must generate an **invite**.
An invite is a token that can be redeemed by anyone and when that token is
redeemed the user that redeems it will be made a member of the team.

An invite can be used only once so if you want to invite multiple people to a
team you must generate an invite for each member.

Newly invited members of the team are by default regular members, ie they have
only read-only access to the resources the team owns.

## Profile

The user profile shows the currently logged in user's profile.

## API Tokens

**API tokens** are quite simple, they are in principle a secret key that can
be used to access the API, f.e. if you create a server process.

API tokens must be set in the `X-API-Token` request header:

This will retrieve the user profile for the token owner:

```bash
curl -HX-API-Token:[your token] https://api.lab5e.com/user/profile
```

**Note:** The **/token** resource isn't available when you access the service via an API Token (for obvious reasons).
