pnpm run migration:show
read -p "Continue migration (y/n)?" choice
case "$choice" in
  y|Y ) npx typeorm migration:run -d dist/database/postgres/providers/database.providers.js;;
  n|N ) echo "migration aborted";;
  * ) echo "invalid command";;
esac