# Getting started

1. Until the micrometer 0.11.0 release, first clone [Micrometer](github.com/micrometer-metrics/micrometer) and run `./gradlew build pTML`
2. `cd service`
2. In one terminal, run `./atlas.sh`
4. In another, run `./gradlew bootRun`
5. In another, run `./gradlew gatlingRun`

You now have Atlas running, the sample Micrometer-instrumented Boot app running and a Gatling load test running against it that will ramp throughput up and down in 1 minute periods for a while.

4. `cd ../presentation`
5. Run `yarn start`. Point your browser to `localhost:3000`

Once the sample and load test have run for 3-4 minutes, the presentation slide graphs will fill up with data.
