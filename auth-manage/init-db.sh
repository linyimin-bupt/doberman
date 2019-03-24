#! /bin/bash

# 判断相关命令是否存在
cmd_is_exist () {
  echo "check $1 cmd is install ..."
  _r=`which $1`
  if [ $? -eq 0 ]
  then
    echo "OK"
  else
    echo "请先安装$1, 并添加$1到PATH变量中" && exit 1
  fi 
}

echo "如果数据库已经存在，会被删除然后重新创建，是否继续(Y or N):"

read option

if [ $option == "Y" ]; then
  :
else
  exit 0
fi
  

if [[ -z $1 || -z $2 ]]; then
  echo "请指定mysql用户名和密码" && exit 1
else

  cmd_is_exist "mysql"

  echo "-------------------------------"
  echo "开始创建相关数据库，及数据库表..."

  _r=`mysql -u$1 -p$2 -e "source $PWD/db_auth.sql"`
  if [ $? -eq 0 ]; then
    echo "数据库信息创建完成。"
  else
    echo "数据库创建失败！"
  fi
fi

