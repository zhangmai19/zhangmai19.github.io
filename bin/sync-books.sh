#!/usr/bin/env bash
#
# Sync Notion reading list CSV to _data/books.json
#
# Workflow:
#   1. In Notion, open your book database → ... → Export → Markdown & CSV
#   2. Save the CSV to the same path each time, e.g.:
#      /mnt/d/hku/readinglist/Mai Reading List.csv
#   3. Run: ./bin/sync-books.sh
#   4. The script regenerates _data/books.json, commits, and pushes.
#
# Usage:
#   ./bin/sync-books.sh                           # use default CSV path
#   ./bin/sync-books.sh /path/to/my-books.csv     # use a specific CSV file
#
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DEFAULT_CSV="/mnt/d/hku/readinglist/Mai Reading List.csv"
CSV_FILE="${1:-$DEFAULT_CSV}"

if [ ! -f "$CSV_FILE" ]; then
  echo "ERROR: CSV file not found: $CSV_FILE"
  echo ""
  echo "Please export your Notion reading list as CSV first:"
  echo "  Notion → ... → Export → Markdown & CSV"
  echo ""
  echo "Or specify a different path:"
  echo "  $0 /path/to/your-books.csv"
  exit 1
fi

echo " → Reading: $CSV_FILE"

cd "$REPO_DIR"

# Regenerate books.json from CSV
python3 - "$CSV_FILE" << 'PYEOF'
import csv, json, re, sys

csv_path = sys.argv[1]
with open(csv_path, 'r', encoding='utf-8-sig', newline='') as f:
    reader = csv.DictReader(f)
    books = []
    for row in reader:
        name = row.get('Name', '').strip()
        if not name:
            continue
        name = name.replace('\xa0', ' ')
        name = re.sub(r'  +', ' ', name)
        books.append({
            'name': name,
            'type': row.get('Type', '').strip(),
            'status': row.get('Status', '').strip(),
            'score': row.get('Score', '').strip(),
            'author': row.get('Author', '').strip(),
        })

with open('_data/books.json', 'w', encoding='utf-8') as out:
    json.dump(books, out, ensure_ascii=False, indent=2)

print(f'✓ Written _data/books.json: {len(books)} books')
statuses = {}
for b in books:
    statuses[b['status']] = statuses.get(b['status'], 0) + 1
for s, c in sorted(statuses.items()):
    print(f'  {s}: {c}')
PYEOF

# Show diff
if git diff --quiet _data/books.json; then
  echo ""
  echo "No changes detected — books.json is already up to date."
  exit 0
fi

echo ""
echo "Changes detected:"
git diff --stat _data/books.json

# Commit and push
git add _data/books.json
git commit -m "chore: sync reading list from Notion CSV ($(date +%Y-%m-%d))"
git push origin main

echo ""
echo "✓ Done! Deploying to https://zhangmai19.github.io/books/"
