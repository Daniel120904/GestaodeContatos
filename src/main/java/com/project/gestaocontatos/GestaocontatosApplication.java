package com.project.gestaocontatos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GestaocontatosApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestaocontatosApplication.class, args);
		System.out.println("Hello World!");
	}
/*
src/main/java
└── com
    └── exemplo
        └── gestaocontatos
            ├── controller
            │   └── ClienteController.java
            ├── model
            │   ├── Cliente.java
            │   └── Contato.java
            ├── repository
            │   ├── ClienteRepository.java
            │   └── ContatoRepository.java
            ├── service
            │   └── ClienteService.java
            └── GestaoContatosApplication.java
*/
}
