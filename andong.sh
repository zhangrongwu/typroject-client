#1 预生产 #0 生产  其他则是测试
a="$1"
b="$2"
npm run build
project_path=$(cd `dirname $0`; pwd)

# 服务器参数
DESDIR='/usr/local/nginx/html'
IP='39.96.72.162'
USER='root'

git add .
git pull
git commit -m “自动提交”
git push -u origin master

echo ${project_path}"/dist"

cd ${project_path}


echo  "-----------------------------------------需你购-----------------------------------------"
mkdir app
cp -rf ${project_path}"/dist"/* ./app
scp -r ./app ${USER}@${IP}:${DESDIR}

