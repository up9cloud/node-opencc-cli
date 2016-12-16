
# dev

- npm install

## usage

會把該資料夾直接置換

```sh
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

## TODO

- ignore files (.jpg, etc...)
