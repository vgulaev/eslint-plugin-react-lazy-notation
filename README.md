It is common plugin. I use it in Visual Code.

Edit your eslint conf:
1. Add `react-lazy-notation` to your `plugins` section
2. Add `react-lazy-notation/react-lazy-notation` to your rule notation

Hint
```json
{
  'plugins': [
    'react-lazy-notation'
  ],
  'rules': {
    'react-lazy-notation/react-lazy-notation': 'error'
  }
}
```
