package com.example.demo;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import io.micrometer.core.annotation.Timed;
import io.micrometer.core.instrument.Metrics;
import io.micrometer.core.instrument.binder.GuavaCacheMetrics;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Random;
import java.util.concurrent.ExecutionException;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

@RestController
class RouletteController {
    Double boomFrequency = 0.5;

    Random r = new Random();

    @GetMapping("/api/roulette")
    @Timed(percentiles = true)
    public String roulette() {
        if (boomFrequency * 100 <= r.nextInt(101))
            return "Success";
        else throw new RuntimeException("Failure");
    }
}

@RestController
class CacheController {
    LoadingCache<Integer, String> cache = GuavaCacheMetrics.monitor(Metrics.globalRegistry,
            CacheBuilder.newBuilder()
                    .recordStats()
                    .maximumSize(1000)
                    .build(new CacheLoader<Integer, String>() {
                        @Override
                        public String load(Integer key) throws Exception {
                            return "loaded";
                        }
                    }),
            "controller.cache");

    Random r = new Random();

    @GetMapping("/api/cache")
    public String useCache(HttpServletRequest request) throws ExecutionException {
        return cache.get(r.nextInt() % 2000);
    }
}