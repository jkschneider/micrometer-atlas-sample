package com.example.demo;

import io.micrometer.core.annotation.Timed;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

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
		if(boomFrequency * 100 <= r.nextInt(101))
			return "Phew... I survived!";
		else throw new RuntimeException("Boom");
	}
}
