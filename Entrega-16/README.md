# Desafío 16

## Loggers, Gzip y análisis de performance.

### Consignas

Incorporar al proyecto de servidor de trabajo la compresión gzip.

Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro.

Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:

   - Ruta y método de todas las peticiones recibidas por el servidor (info)
   - Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)

Errores lanzados por las apis de mensajes y productos, únicamente (error)
Considerar el siguiente criterio:
  - Loggear todos los niveles a consola (info, warning y error)
  - Registrar sólo los logs de warning a un archivo llamada warn.log
  - Enviar sólo los logs de error a un archivo llamada error.log

----

Luego, realizar el análisis completo de performance del servidor con el que venimos trabajando.

Vamos a trabajar sobre la ruta '/info', en modo fork, agregando ó extrayendo un console.log de la información colectada antes de devolverla al cliente. Además desactivaremos el child_process de la ruta '/randoms'

Para ambas condiciones (con o sin console.log) en la ruta '/info' OBTENER:

  - El perfilamiento del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process. 
  - Utilizaremos como test de carga Artillery en línea de comandos, emulando 50 conexiones concurrentes con 20 request por cada una. Extraer un reporte con los resultados en archivo de texto.

----

Luego utilizaremos Autocannon en línea de comandos, emulando 100 conexiones concurrentes realizadas en un tiempo de 20 segundos. Extraer un reporte con los resultados (puede ser un print screen de la consola)

  - El perfilamiento del servidor con el modo inspector de node.js --inspect. Revisar el tiempo de los procesos menos performantes sobre el archivo fuente de inspección.
  - El diagrama de flama con 0x, emulando la carga con Autocannon con los mismos parámetros anteriores.
  
Realizar un informe en formato pdf sobre las pruebas realizadas incluyendo los resultados de todos los test (texto e imágenes). 

👉 Al final incluir la conclusión obtenida a partir del análisis de los datos.

### Conclusión

Sin console log

```console

╰─>$ node benchmark.js
Running tests
Running 20s test @ http://localhost:3030/test/info
100 connections


┌─────────┬────────┬────────┬────────┬────────┬───────────┬──────────┬────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev    │ Max    │
├─────────┼────────┼────────┼────────┼────────┼───────────┼──────────┼────────┤
│ Latency │ 131 ms │ 160 ms │ 293 ms │ 424 ms │ 173.93 ms │ 51.78 ms │ 665 ms │
└─────────┴────────┴────────┴────────┴────────┴───────────┴──────────┴────────┘
┌───────────┬────────┬────────┬────────┬────────┬──────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg      │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼────────┼──────────┼─────────┼────────┤
│ Req/Sec   │ 257    │ 257    │ 600    │ 700    │ 572.15👈 │ 113.28  │ 257    │
├───────────┼────────┼────────┼────────┼────────┼──────────┼─────────┼────────┤
│ Bytes/Sec │ 154 kB │ 154 kB │ 361 kB │ 421 kB │ 344 kB   │ 68.2 kB │ 154 kB │
└───────────┴────────┴────────┴────────┴────────┴──────────┴─────────┴────────┘

Req/Bytes counts sampled once per second.
# of samples: 20

12k requests in 20.07s, 6.88 MB read

```

El resultado de Artillery nos indica (ver archivo para resultados completos)

```console

http.response_time:
  min: ......................................................................... 4 👈
  max: ......................................................................... 393 👈
  median: ...................................................................... 141.2 👈 
  p95: ......................................................................... 210.6 👈
  p99: ......................................................................... 308 👈

```

Benchmark con console Log

```console

╰─>$ node benchmark.js
Running tests (CON CONSOLE LOG)
Running 20s test @ http://localhost:3030/test/info
100 connections


┌─────────┬────────┬────────┬────────┬────────┬───────────┬──────────┬────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev    │ Max    │
├─────────┼────────┼────────┼────────┼────────┼───────────┼──────────┼────────┤
│ Latency │ 173 ms │ 220 ms │ 446 ms │ 562 ms │ 238.81 ms │ 70.81 ms │ 830 ms │
└─────────┴────────┴────────┴────────┴────────┴───────────┴──────────┴────────┘
┌───────────┬────────┬────────┬────────┬────────┬──────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg      │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼────────┼──────────┼─────────┼────────┤
│ Req/Sec   │ 218    │ 218    │ 427    │ 540    │ 415.35👈 │ 81.88   │ 218    │
├───────────┼────────┼────────┼────────┼────────┼──────────┼─────────┼────────┤
│ Bytes/Sec │ 131 kB │ 131 kB │ 257 kB │ 325 kB │ 250 kB   │ 49.3 kB │ 131 kB │
└───────────┴────────┴────────┴────────┴────────┴──────────┴─────────┴────────┘

Req/Bytes counts sampled once per second.
# of samples: 20

8k requests in 20.07s, 5 MB read

```

El resultado de Artillery nos indica (ver archivo para resultados completos)

```console

http.response_time:
  min: ......................................................................... 15  👈
  max: ......................................................................... 461 👈
  median: ...................................................................... 172.5 👈
  p95: ......................................................................... 228.2 👈 
  p99: ......................................................................... 376.2 👈
  
```

👈Todas las pruebas realizadas nos indican que en el caso que logueamos por consola la respuesta antes de ser enviada el tiempo de respuesta es mayor y que en el mismo tiempo, se pueden manejar menos requests. 



