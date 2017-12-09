# misc-utils

This is a compilation of utility functions written in ES6 that I've been updating as and when I run into a requirement that isn't covered by something readily available off-the-shelf. A layer on top of lodash is what it looks like for the most part.


## Install

```bash
npm install --save misc-utils
```

## Usage

```jsx

import { isVoid, deepDiff } from 'misc-utils'
...
let styleX = {
  base: {
    margin: '0 auto'
    background: {
      color: 'white'
    }
  }
}
let styleY = {
  base: {
    margin: 'auto'
  },
  active: {
    width: '100%'
  }
}
let styleDiff = deepDiff(styleX,styleY)
if (!isVoid(styleDiff)) {
  console.log(styleDiff)
}

```

## License

MIT © [Thomas Varghese] (https://github.com/numbervine)
