
# dev

```sh
npm install # or cnpm install
node index.js <source folder ABSOLUTE path> [format type] [json_escaped]
```

- [format type](https://github.com/BYVoid/OpenCC)
    + default is `t2s`
- json_escaped true or false
    + default is false
    + true: ["軒"] => ["\u8f69"]
    + false: ["軒"] => ["轩"]

## test

```sh
# unit test
mocha

# cli test
./test/test.sh
```