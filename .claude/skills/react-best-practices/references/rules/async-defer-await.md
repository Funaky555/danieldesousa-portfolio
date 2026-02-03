# Defer Await Until Needed

**Impact:** CRITICAL
**Category:** Async Operations

## Problem

Awaiting promises immediately blocks subsequent code that could start executing.

## Solution

Start promises early, await only when the result is needed.

## Examples

### Bad - Immediate Await
```tsx
async function Page() {
  const data = await fetchData()  // Blocks here
  const config = await fetchConfig()  // Then blocks here

  return <Component data={data} config={config} />
}
```

### Good - Deferred Await
```tsx
async function Page() {
  // Start both fetches immediately
  const dataPromise = fetchData()
  const configPromise = fetchConfig()

  // Await when needed
  const [data, config] = await Promise.all([dataPromise, configPromise])

  return <Component data={data} config={config} />
}
```

### Good - Pass Promise to Child
```tsx
async function Page() {
  // Start fetch, don't await
  const dataPromise = fetchData()

  return (
    <Suspense fallback={<Loading />}>
      <DataComponent dataPromise={dataPromise} />
    </Suspense>
  )
}

async function DataComponent({ dataPromise }) {
  const data = await dataPromise  // Await in component
  return <div>{data}</div>
}
```

### Good - Conditional Await
```tsx
async function Page({ shouldFetch }) {
  // Start fetch, but only await if needed
  const dataPromise = fetchData()

  if (!shouldFetch) {
    return <EmptyState />
  }

  const data = await dataPromise
  return <DataView data={data} />
}
```

## Key Points

1. Starting a promise is not the same as awaiting it
2. Move `await` as late as possible in execution
3. Use `Promise.all()` when awaiting multiple promises
4. Pass promises to child components when using Suspense
