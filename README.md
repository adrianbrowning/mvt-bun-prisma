## A minimum reproducible repo showing unexpected termination when using prisma

`bun no-brk` AND `bun just-inspect` both show the following:

```text
$ bun run src/index.ts
Clearing db start
```

```text
$ bun run --inspect src/index.ts
--------------------- Bun Inspector ---------------------
Listening:
  ws://localhost:6499/80uc9qwbpz6
Inspect in browser:
  https://debug.bun.sh/#localhost:6499/80uc9qwbpz6
--------------------- Bun Inspector ---------------------
Clearing db start
```

Whereas running `bun with-brk` gives:

```text
$ bun --inspect-brk run src/index.ts
--------------------- Bun Inspector ---------------------
Listening:
  ws://localhost:6499/ur9fw7be6j
Inspect in browser:
  https://debug.bun.sh/#localhost:6499/ur9fw7be6j
--------------------- Bun Inspector ---------------------
Clearing db start
Clearing db done
run start
{
  id: 1,
  email: "alice@prisma.io",
  name: "Alice",
}
run done
closing db start
closing db done
Ended: Mon Feb 26 2024 11:48:32 GMT+0000 (Greenwich Mean Time), took 0.07280554100000063 seconds
```
