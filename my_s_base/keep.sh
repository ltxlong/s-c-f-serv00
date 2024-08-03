#!/bin/bash

# ARGO 隧道参数（如需固定 ARGO 隧道，请把 ey 开头的 ARGO 隧道的 token 填入 ARGO_AUTH ，仅支持这一种方式固定，隧道域名代理的协议为 HTTP ，端口为 VMPORT 同端口。如果不固定 ARGO 隧道，请删掉ARGO_DOMAIN那行，保留ARGO_AUTH这行。）
ARGO_AUTH=''

# domain里的工作目录，事先创建好这个目录，这个目录里有s-c-f-serv00.sh、index.js、keep.sh等（必填）
# 格式：/home/用户名（登录的）/domains/用户名（登录的，但好像全是小写字母）.serv00.net/sbox-c-f
DOMAIN_WORKDIR=

# 程序工作目录 （必填）
# 格式：/home/用户名（登录的）/s-c-f-serv00
WORKDIR=

# keep index.js
if ! pgrep -f "index.js" > /dev/null
then
  nohup node ${DOMAIN_WORKDIR}/index.js >/dev/null 2>&1 &
  echo "index.js restarted"
fi

sleep 10

# keep sing-box
if ! pgrep -f "sing-box-freebsd" > /dev/null
then
  nohup ${WORKDIR}/sing-box-freebsd run -c ${WORKDIR}/config.json >/dev/null 2>&1 &
  echo "sing-box-freebsd restarted"
fi

# keep argo tunnel
if ! pgrep -f "cloudflared-freebsd tunnel" > /dev/null
then
  nohup ${WORKDIR}/cloudflared-freebsd tunnel --edge-ip-version auto --protocol http2 run --token ${ARGO_AUTH} >/dev/null 2>&1 &
  echo "cloudflared-freebsd tunnel restarted"
fi

echo "-----------------------------------------"
echo "keep service finished~"
