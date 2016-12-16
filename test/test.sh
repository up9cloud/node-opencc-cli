#!/bin/bash

__DIR__=$(dirname "${BASH_SOURCE[0]}")

cp $__DIR__/source.json $__DIR__/dist.json
node $__DIR__/../index.js $__DIR__/dist.json

SRC=`cat $__DIR__/dist.json`
EXPECT=`cat $__DIR__/expect.json`

if [ "$SRC" != "$EXPECT" ];then
	echo "[failed] expect $EXPECT should be $SRC";
	exit 2;
fi

cp $__DIR__/source.json $__DIR__/dist.json
node $__DIR__/../index.js $__DIR__/dist.json t2s true

SRC=`cat $__DIR__/dist.json`
EXPECT=`cat $__DIR__/expect.escaped.json`

if [ "$SRC" != "$EXPECT" ];then
	echo "[failed] expect $EXPECT should be $SRC";
	exit 2;
fi