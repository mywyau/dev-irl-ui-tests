#!/usr/bin/env bash

# These tests need to run sequentially
npx playwright test --project=local tests/all_tests --workers=1
