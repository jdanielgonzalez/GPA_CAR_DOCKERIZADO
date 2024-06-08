# Usa una imagen base de Node.js para construir el frontend
FROM node:14 AS build

WORKDIR /app

# Copia los archivos de configuración y las dependencias
COPY package.json .
COPY package-lock.json .

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos y construye la aplicación
COPY . .
RUN npm run build

# Usa una imagen base de Nginx para servir el contenido estático
FROM nginx:alpine

# Copia los archivos construidos desde la imagen de Node.js
COPY --from=build /app/build /usr/share/nginx/html

# Copia los archivos CSS al directorio de Nginx desde la carpeta src
COPY src/style_home.css /usr/share/nginx/html
COPY src/index.css /usr/share/nginx/html

# Copia los archivos JS al directorio de Nginx desde la carpeta src
COPY src/app_home.js /usr/share/nginx/html
COPY src/App.js /usr/share/nginx/html

# Copia la carpeta de imágenes al directorio de Nginx desde la carpeta img
COPY src/img /usr/share/nginx/html/img

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
