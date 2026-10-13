#!/usr/bin/env bash
# Phase 0 baseline: build the current Jekyll site and record its URLs, weights,
# phone-width overflow, screenshots and page text into tests/baseline/.
#
# Needs only Docker. Run from the repo root:
#   scripts/baseline/run.sh
set -euo pipefail
cd "$(dirname "$0")/../.."

OUT=tests/baseline
mkdir -p "$OUT"

echo "==> Building the Jekyll site (Ruby 3.1; Jekyll 3.9 does not run on Ruby 3.3)"
docker run --rm -v "$PWD":/srv/site -w /srv/site -v amr-bundle31:/usr/local/bundle ruby:3.1-bookworm \
  bash -c 'bundle install --quiet && bundle exec jekyll build --destination /srv/site/_site'
git checkout -- Gemfile.lock 2>/dev/null || true   # bundler may rewrite platforms

echo "==> Recording every output file"
(cd _site && find . -type f | sed 's|^\./|/|' | LC_ALL=C sort) > "$OUT/files.txt"

echo "==> Crawling pages"
docker run --rm --ipc=host -v "$PWD":/work -w /tmp mcr.microsoft.com/playwright:v1.48.0-noble \
  bash -c 'npm install --silent --no-save playwright@1.48.0 >/dev/null && cp /work/scripts/baseline/crawl.mjs . && node crawl.mjs /work/_site /work/'"$OUT"

echo "==> Done. See $OUT/"
