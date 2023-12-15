**Getting Started**

Set up the following environmental variables in a  `.env`  file:
```
PORT=<portnumber>
LOGLEVEL=<logginglevel>
NATS_SERVER="nats://localhost:<portnumber>"
```
-   `PORT` is the port number where you would like to run the SDK Service application. If not provided, it will default to  `3001`.
-   The `LOGLEVEL` is the desired logging level for the Winston logger (e.g.  `verbose`,  `info`,  `warn`). If not provided, it will default to  `warn`.
-   By default, the NATS server runs on port `4222`. If a different port number is used when starting the Manager Platform, please make sure to include the `NATS_SERVER` address with the respective port number.

The SDK Service is a proxy service that runs between the Manager Platform and the SmoothSail SDK embedded in your application. To ensure that your application runs properly, it is crucial that you run your applications in the correct order. First, start the Manager Platform and SDK Service. Then, you are ready to start using the SmoothSail SDK in your application.

**Server Sent Events (SSE) Endpoint**
 *GET /api/ff-updates-stream*
-   This SSE endpoint is used for the delivery of the feature flag ruleset upon initial connection and real time updates to flag data.
-   To access this stream, the proper SDK key must be provided as an Authorization header when making a request to connect.
