package com.example.demo

import io.gatling.core.Predef.{ holdFor, _ }
import io.gatling.core.scenario.Simulation
import io.gatling.http.Predef._

import scala.concurrent.duration._

class MetricsSimulation extends Simulation {
  val httpProtocol = http.baseURL("http://localhost:8080")
    .shareConnections
    .disableCaching

  val scn = scenario("load test the API in the demo app")
    .exec(http("roulette").get("/api/roulette").check(status in (200, 500)))
    .exec(http("cache").get("/api/cache").check(status in 200))

  // see http://gatling.io/docs/current/general/simulation_setup/#simulation-setup for other options

  // mimick a short phase periodic load
  val upAndDown = List(jumpToRps(100)) ++ (0 until 100).flatMap(_ => List(
    reachRps(100) in (30 seconds),
    holdFor(30 seconds),
    reachRps(200) in (30 seconds),
    holdFor(30 seconds)
  ))

  setUp(scn.inject(constantUsersPerSec(1000) during (30 minutes)))
    .throttle(upAndDown)
    .protocols(httpProtocol)
}
