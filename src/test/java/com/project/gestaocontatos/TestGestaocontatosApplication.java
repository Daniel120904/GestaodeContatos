package com.project.gestaocontatos;

import org.springframework.boot.SpringApplication;

public class TestGestaocontatosApplication {

	public static void main(String[] args) {
		SpringApplication.from(GestaocontatosApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
