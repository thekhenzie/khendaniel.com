set -e
GITURL=`git config remote.origin.url`
npm install
node build.js
cd build
rm -rf .git/
echo "www.khendaniel.com" > CNAME
git init
git remote add origin $GITURL
git add .
git commit -am "deploy"
git push origin master:gh-pages --force