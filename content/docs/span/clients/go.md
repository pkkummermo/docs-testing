---
description: ""
sidebar: "clients"
prev: "/docs/span/clients/curl/"
next: "/docs/span/user-teams-and-tokens/"
---

# Go client

The [Go](https://golang.org/) client is at [https://github.com/lab5e/spanclient-go](https://github.com/lab5e/spanclient-go).

## Creating a new client

```go
import (
    "context"
    "fmt"

    "github.com/lab5e/spanclient-go"
)

const token = "[set this to your API token]"

func main() {
    config := spanclient.NewConfiguration()

    client := spanclient.NewAPIClient(config)

    ctx := context.WithValue(context.Background(),
        spanclient.ContextAPIKey,
        spanclient.APIKey{
            Key:    token,
        })

    fmt.Println("Client created")
}
```

More examples are available in [the spanclient-go GitHub repository](https://github.com/lab5e/spanclient-go/tree/master/examples).
