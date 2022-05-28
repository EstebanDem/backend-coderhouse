# Desafío 15

## Servidor con balance de carga

### Consignas

Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.

- Agregar en la vista info, el número de procesadores presentes en el servidor.
- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
- Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:

- Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
- El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
- Verificar que todo funcione correctamente.
- Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

Incluir el archivo de configuración de nginx junto con el proyecto.
Incluir también un pequeño documento en donde se detallen los comandos que deben ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores.

Ejemplo:
- pm2 start ./miservidor.js -- --port=8080 --modo=fork
- pm2 start ./miservidor.js -- --port=8081 --modo=cluster
- pm2 start ./miservidor.js -- --port=8082 --modo=fork

### Resolución

Se realizó directamente con pm2 ya que este por parámetro permite recibir si se desea que sea modo fork o modo cluster.

Generamos 4 clusters en 8082, 8083, 8084 y 8085

```console

┬─[esteban@estebandem:~/Desktop/Backend/Entrega-15]
╰─>$ pm2 start ./src/server.js --name="ClusterEn8082" --watch -i 2  -- -p 8082

┬─[esteban@estebandem:~/Desktop/Backend/Entrega-15]
╰─>$ pm2 start ./src/server.js --name="ClusterEn8083" --watch -i 2  -- -p 8083

┬─[esteban@estebandem:~/Desktop/Backend/Entrega-15]
╰─>$ pm2 start ./src/server.js --name="ClusterEn8084" --watch -i 2  -- -p 8084

┬─[esteban@estebandem:~/Desktop/Backend/Entrega-15]
╰─>$ pm2 start ./src/server.js --name="ClusterEn8085" --watch -i 2  -- -p 8085

```



Comprobamos la lista:

```console

┬─[esteban@estebandem:~/Desktop/Backend/Entrega-15]
╰─>$ pm2 list
┌─────┬──────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name             │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼──────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ ClusterEn8082    │ default     │ 1.0.0   │ cluster │ 17066    │ 48s    │ 1    │ online    │ 0%       │ 70.0mb   │ esteban  │ enabled  │
│ 1   │ ClusterEn8082    │ default     │ 1.0.0   │ cluster │ 17072    │ 48s    │ 1    │ online    │ 0%       │ 70.2mb   │ esteban  │ enabled  │
│ 2   │ ClusterEn8083    │ default     │ 1.0.0   │ cluster │ 17084    │ 48s    │ 1    │ online    │ 0%       │ 69.5mb   │ esteban  │ enabled  │
│ 3   │ ClusterEn8083    │ default     │ 1.0.0   │ cluster │ 17078    │ 48s    │ 1    │ online    │ 0%       │ 69.6mb   │ esteban  │ enabled  │
│ 4   │ ClusterEn8084    │ default     │ 1.0.0   │ cluster │ 17259    │ 37s    │ 0    │ online    │ 0%       │ 70.6mb   │ esteban  │ enabled  │
│ 5   │ ClusterEn8084    │ default     │ 1.0.0   │ cluster │ 17266    │ 37s    │ 0    │ online    │ 0%       │ 70.7mb   │ esteban  │ enabled  │
│ 6   │ ClusterEn8085    │ default     │ 1.0.0   │ cluster │ 17368    │ 30s    │ 0    │ online    │ 0%       │ 70.5mb   │ esteban  │ enabled  │
│ 7   │ ClusterEn8085    │ default     │ 1.0.0   │ cluster │ 17375    │ 30s    │ 0    │ online    │ 0%       │ 71.1mb   │ esteban  │ enabled  │
└─────┴──────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

```

Ahora solamente debemos editar nuestro archivo de configuración de nginx para redigir cuando se vaya a /test/random que vaya a -> /test/randoms de los servidores creados anteriormente.

Nos movemos donde tenemos el archivo de configuración y lo editamos:

```console

┬─[esteban@estebandem:/etc/nginx]
╰─>$ sudo nvim nginx.conf
```


```console

events {
}

http {

    upstream backend {
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
        server 127.0.0.1:8085;
    }
    server {
        listen 8080;
        location /test/random/ {
            proxy_pass http://backend/test/randoms/;
        }
    }

}

```



Comprobamos que la sintáxis sea correcta:

```console

─[esteban@estebandem:/etc/nginx]
╰─>$ sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

```

Frenamos y volvemos a prender el servicio

```console

┬─[esteban@estebandem:/etc/nginx]
╰─>$ sudo service nginx stop
┬─[esteban@estebandem:/etc/nginx]
╰─>$ sudo service nginx start

```

Y listo, podemos acceder a través de http://localhost:8080/test/random/

Agregamos un log cuando se genere la lista y podemos comprobarlo a través de **pm2 monit**

```console

┬─[esteban@estebandem:/etc/nginx]
╰─>$ pm2 monit


┌─ Process List ───────────────────────┐┌──  ClusterEn8084 Logs  ────────────────────────────────────────────────────────────────────┐
│[ 0] ClusterEn8082     Mem:  69 MB    ││ ClusterEn8084 > Lista generada                                                             │
│[ 1] ClusterEn8082     Mem:  71 MB    ││                                                                                            │
│[ 2] ClusterEn8083     Mem:  69 MB    ││                                                                                            │
│[ 3] ClusterEn8083     Mem:  70 MB    ││                                                                                            │
│[ 4] ClusterEn8084     Mem:  71 MB    ││                                                                                            │
│[ 5] ClusterEn8084     Mem:  70 MB    ││                                                                                            │
│[ 6] ClusterEn8085     Mem:  69 MB    ││                                                                                            │
│[ 7] ClusterEn8085     Mem:  72 MB    ││                                                                                            │
│                                      ││                                                                                            │
                                            [...]

```

