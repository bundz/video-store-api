npm install -g pm2
npm install

cd docs

npm install
pm2 start ecosystem.json

cd ..

pm2-runtime start ecosystem.json