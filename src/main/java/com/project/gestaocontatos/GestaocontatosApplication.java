package com.project.gestaocontatos;

import com.project.gestaocontatos.model.Cliente;
import com.project.gestaocontatos.model.Contato;
import com.project.gestaocontatos.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.LocalDate;

// npm run dev <-- codigo pa fazer o front rodar

@SpringBootApplication
public class GestaocontatosApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestaocontatosApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**") // Permite todas as rotas
						.allowedOrigins("http://localhost:5173") // Permite o frontend
						.allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos permitidos
						.allowedHeaders("*"); // Headers permitidos
			}
		};
	}
}
