# 使用 Node.js 官方基础镜像
FROM node:16-alpine AS builder

# 设置工作目录
WORKDIR /app

# 仅复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件（不包括被 .dockerignore 忽略的文件）
COPY . .

# 构建项目
RUN npm run build:prod

# 使用 Nginx 作为生产环境的 Web 服务器
FROM nginx:alpine

# 复制构建结果到 Nginx 静态文件目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
