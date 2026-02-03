# Cache Property Access

**Impact:** LOW-MEDIUM
**Category:** JavaScript Optimization

## Problem

Repeated property access through long chains has overhead.

## Solution

Cache frequently accessed nested properties.

## Examples

### Bad - Repeated Deep Access
```tsx
function processUser(data) {
  // Each access traverses the chain
  if (data.user.profile.settings.notifications.email) {
    sendEmail(data.user.profile.settings.notifications.emailAddress)
  }

  if (data.user.profile.settings.notifications.sms) {
    sendSMS(data.user.profile.settings.notifications.phoneNumber)
  }

  if (data.user.profile.settings.notifications.push) {
    sendPush(data.user.profile.settings.notifications.deviceToken)
  }
}
```

### Good - Cached Reference
```tsx
function processUser(data) {
  // Cache the nested object
  const notifications = data.user.profile.settings.notifications

  if (notifications.email) {
    sendEmail(notifications.emailAddress)
  }

  if (notifications.sms) {
    sendSMS(notifications.phoneNumber)
  }

  if (notifications.push) {
    sendPush(notifications.deviceToken)
  }
}
```

### Loop Optimization
```tsx
// Bad - accessing .length on each iteration
for (let i = 0; i < items.length; i++) {
  process(items[i])
}

// Good - cache length
const len = items.length
for (let i = 0; i < len; i++) {
  process(items[i])
}

// Better - for...of (modern JS)
for (const item of items) {
  process(item)
}
```

### Array Method Chains
```tsx
// Bad - multiple passes
const result = items
  .filter(item => item.active)
  .map(item => item.value)
  .filter(value => value > 0)
  .map(value => value * 2)

// Good - single pass with reduce
const result = items.reduce((acc, item) => {
  if (item.active && item.value > 0) {
    acc.push(item.value * 2)
  }
  return acc
}, [])
```

### Destructuring for Multiple Access
```tsx
// Bad - repeated access
function displayUser(user) {
  return `${user.profile.firstName} ${user.profile.lastName} (${user.profile.email})`
}

// Good - destructure once
function displayUser(user) {
  const { firstName, lastName, email } = user.profile
  return `${firstName} ${lastName} (${email})`
}
```

### React Props Destructuring
```tsx
// Bad - repeated props access
function Card(props) {
  return (
    <div className={props.className}>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <button onClick={props.onClick}>{props.buttonText}</button>
    </div>
  )
}

// Good - destructure in signature
function Card({ className, title, description, onClick, buttonText }) {
  return (
    <div className={className}>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onClick}>{buttonText}</button>
    </div>
  )
}
```

### DOM Property Caching
```tsx
'use client'

// Bad - multiple style accesses
function updateElement(element) {
  element.style.width = '100px'
  element.style.height = '100px'
  element.style.backgroundColor = 'red'
  element.style.border = '1px solid black'
}

// Good - cache style reference
function updateElement(element) {
  const style = element.style
  style.width = '100px'
  style.height = '100px'
  style.backgroundColor = 'red'
  style.border = '1px solid black'
}

// Best - use CSS class
function updateElement(element) {
  element.classList.add('active')
}
```

### Config Object Pattern
```tsx
// Cache complex config access
const config = getConfig()
const { api, features, limits } = config

function makeRequest() {
  return fetch(`${api.baseUrl}${api.endpoints.users}`, {
    headers: { 'X-API-Key': api.key },
    ...(features.compression && { compress: true }),
  })
}
```

## Key Points

1. Cache nested property access in local variables
2. Destructure objects for cleaner, faster access
3. Cache array length in tight loops
4. Consider single-pass array operations
5. Micro-optimization - profile before applying broadly
