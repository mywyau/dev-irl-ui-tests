#!/bin/bash

# Usage:
# ./testOnly.sh tests/login.spec.ts
# ./testOnly.sh tests/login.spec.ts "should login with Google"

FILE=$1
NAME_FILTER=$2

if [ -z "$FILE" ]; then
  echo "Usage: ./testOnly.sh <test-file> [test-name-filter]"
  exit 1
fi

CMD="npx playwright test --project=local $FILE"

if [ ! -z "$NAME_FILTER" ]; then
  CMD="$CMD -g \"$NAME_FILTER\""
fi

echo "Running: $CMD"
eval $CMD
