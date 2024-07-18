# s-c-f-serv00
sing-box + cloudflare + freebsd 支持在 serv00 上搭建 3 个 vmess
这个脚本会占用 3 个 tcp 端口，如果有其他需求你可以自行爆改本脚本

# clone 本脚本到 serv00 服务器
    # -1.登录 serv00 服务器并执行命令下载脚本到 serv00 服务器
    rm -fv ${HOME}/s-c-f-serv00.sh
    wget -t 3 -T 10 --verbose --show-progress=on --progress=bar --no-check-certificate --hsts-file=/tmp/wget-hsts -c \
                          "https://raw.githubusercontent.com/UiLgNoD-lIaMtOh/s-c-f-serv00/master/s-c-f-serv00.sh" \
                          -O ${HOME}/s-c-f-serv00.sh
  ![image](https://github.com/user-attachments/assets/52e31201-750d-4253-bd9f-e67be5e4b876)

# serv00 开放端口，搭建 ARGO cloudflare tunnel 固定
    # 0.前提开放 serv00 vmess 端口比如 9246 9247 9248 并打开文件管理打开脚本进行编辑替换端口
  ![image](https://github.com/user-attachments/assets/7cff9113-1bf3-4b77-b9b7-a39b4a60ec5a)
  ![image](https://github.com/user-attachments/assets/10d772ed-4ec2-401c-a0f6-25b49b9a2ccb)
  ![image](https://github.com/user-attachments/assets/8ee9136d-063e-4339-ad39-96da0ec3ff2d)
  ![image](https://github.com/user-attachments/assets/88d7cd52-87c1-4271-a387-7258c2583b74)
  ![image](https://github.com/user-attachments/assets/c67360d5-e942-4718-b5b2-f5d0b9a89af9)

    # 1.前提有个域名 cloudns 可以免费注册一个二级域名，比如得到 fine.dns-dynamic.net
  ![image](https://github.com/user-attachments/assets/592ab3fb-56cd-47bb-ac29-133c52bf7f63)
  ![image](https://github.com/user-attachments/assets/c0bb15e9-65bf-4084-8313-33cc5470a7a9)
  ![image](https://github.com/user-attachments/assets/5e5b32df-e24a-4c33-979c-70c67637c160)

    # 2.将 fine.dns-dynamic.net 托管到 cloudflare 并将 cloudflare 的两个 dns 添加到 cloudns dns 记录中，并删除 cloudns 其他 NS
  ![image](https://github.com/user-attachments/assets/505136d8-2e13-4f2d-9495-7a35d24fa6fc)
  ![image](https://github.com/user-attachments/assets/cbac2ce5-2b2e-4317-b81b-411f081923b0)
  ![image](https://github.com/user-attachments/assets/d20293cb-6aa0-48ca-99b6-9c8aec4c28d7)
  ![image](https://github.com/user-attachments/assets/c94843aa-c071-4830-9e1d-c6a3ef36cf3f)
  ![image](https://github.com/user-attachments/assets/57f9d70b-1288-4ae7-addd-d8aeb1e1c6b2)
  ![image](https://github.com/user-attachments/assets/887815d0-96b4-4ed8-8bfc-440a47e30a71)
  ![image](https://github.com/user-attachments/assets/023cb744-95bd-4409-9d6b-67564792c8da)
  ![image](https://github.com/user-attachments/assets/8aea54b2-bc18-4248-924b-15741dc99192)
  ![image](https://github.com/user-attachments/assets/cd24341b-d633-457c-b5ef-9a68fb8cab91)
  ![image](https://github.com/user-attachments/assets/30c8cf5b-2e09-4274-8a4a-7594d56ed8ca)
  ![image](https://github.com/user-attachments/assets/28faccb2-9d93-4380-aa94-2dbccd46918e)
  ![image](https://github.com/user-attachments/assets/236174fe-bca5-4e5f-aaa9-6911a6367426)
  ![image](https://github.com/user-attachments/assets/9bc788b4-50ee-4e53-b89e-85c229b2edfa)
  ![image](https://github.com/user-attachments/assets/92c0529a-22b5-41ff-bb5e-2d1251d5ef98)
    
    # 3.进入 cloudflare network tunnel 添加一个 tunnel 得到 token 并保留 ey开头后面的字符替换到脚本 
  ![image](https://github.com/user-attachments/assets/48d04cb9-cdd9-4714-a752-594adaefd9f3)
  ![image](https://github.com/user-attachments/assets/521d7fd1-5856-4ddd-8ecf-63df56ad5ddd)
  ![image](https://github.com/user-attachments/assets/32b255c1-e10d-4789-a216-0e23fa19056e)
  ![image](https://github.com/user-attachments/assets/c5aec947-5b11-4d2e-95c8-7c63a961f505)
  ![image](https://github.com/user-attachments/assets/37a24b55-e794-4fb8-b6ec-8eb2b9f9050f)
  ![image](https://github.com/user-attachments/assets/f45bccff-c9f9-4112-80c9-b0baa2b3245f)
  ![image](https://github.com/user-attachments/assets/83ee3468-acf1-4bf3-82d8-3e4fcd320895)
  ![image](https://github.com/user-attachments/assets/e7ab6721-f665-4fbc-8a8c-94c5eeb8c1f1)
  ![image](https://github.com/user-attachments/assets/f6770b8f-c096-4fcf-8987-7531470d1422)
  ![image](https://github.com/user-attachments/assets/557dd04d-27a5-46f6-8fdd-c04a52e75d78)

    # 4.在 tunnel 中添加一个自定义域名比如 serv00-one.fine.dns-dynamic.net 添加server比如 http://localhost:9246 9246 就是 serv00 开放端口
  ![image](https://github.com/user-attachments/assets/faec58ae-9cc8-48f8-bc86-dc4eeaf05468)
  ![image](https://github.com/user-attachments/assets/25266d45-c1fd-41a7-ac8b-26eddf6c15b6)
  ![image](https://github.com/user-attachments/assets/a7b3e0db-7c6c-4502-a7a2-bf16b3ad14e4)
  ![image](https://github.com/user-attachments/assets/2297191a-1142-4c7e-9132-3b7538da6163)

    # 5.执行脚本，得到订阅信息和客户端文件，并且可以在 serv00 panel 里下载支持 mihomo nekobox 或者 sing-box 的配置文件
    chmod -v u+x ${HOME}/s-c-f-serv00.sh
    bash ${HOME}/s-c-f-serv00.sh
  ![image](https://github.com/user-attachments/assets/76884512-3bbd-4ebe-94c0-512aedc0917f)
  ![image](https://github.com/user-attachments/assets/9bdcdaab-52b7-40d5-a4b6-14adfc129c65)

# serv00 保活，防止3个月回收
    # 6.serv00 服务器保活，防止3个月回收

    # serv00 保活脚本
    cat <<UiLgNoD-lIaMtOh | tee ${HOME}/auto_ssh.sh
    #!/bin/bash
    sshpass -p 'ssh密码' ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -tt $(whoami)@$(hostname) "uname -a" &
    UiLgNoD-lIaMtOh

    # 执行测试
    chmod -v u+x ${HOME}/auto_ssh.sh ; bash ${HOME}/auto_ssh.sh

    # 查看当前 crontab
    echo '当前 crontab'
    crontab -l
    
    # 写入 crontab 
    cat <<UiLgNoD-lIaMtOh | tee ${HOME}/crontab >/dev/null
    $(crontab -l | sed '/auto_ssh.sh/d')
    @reboot cd ${HOME} ; bash auto_ssh.sh >/dev/null 2>&1
    UiLgNoD-lIaMtOh
    crontab ${HOME}/crontab
    rm -fv ${HOME}/crontab
    
    # 检查写入之后的 crontab
    echo '写入之后的 crontab'
    crontab -l

# 感谢
serv00 Revolutionary Free Hosting: [https://www.serv00.com/offer](https://www.serv00.com/offer)  
cloudns domain for free: [https://www.cloudns.net/](https://www.cloudns.net/)  
cloudflare dashboard for free: [https://dash.cloudflare.com/](https://dash.cloudflare.com/)  
yuri@FreeBSD.org sing-box for freebsd:[https://www.freshports.org/net/sing-box](https://www.freshports.org/net/sing-box)  
Unofficial FreeBSD cloudflared builds : [https://cloudflared.bowring.uk/](https://cloudflared.bowring.uk/)  
Saika's Blog serv00自动续期：[https://saika.us.kg/2024/01/27/serv00_logs/#%E8%87%AA%E5%8A%A8%E7%BB%AD%E6%9C%9F](https://saika.us.kg/2024/01/27/serv00_logs/#%E8%87%AA%E5%8A%A8%E7%BB%AD%E6%9C%9F)  



 
  
 
     
    
