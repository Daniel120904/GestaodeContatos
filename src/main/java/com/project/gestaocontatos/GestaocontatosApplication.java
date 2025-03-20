package com.project.gestaocontatos;

import com.project.gestaocontatos.model.Cliente;
import com.project.gestaocontatos.model.Contato;
import com.project.gestaocontatos.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;

@SpringBootApplication
public class GestaocontatosApplication implements CommandLineRunner {

	@Autowired
	private ClienteService clienteService;

	public static void main(String[] args) {
		SpringApplication.run(GestaocontatosApplication.class, args);

		System.out.println("Funciona ai");

	}

	@Override
	public void run(String... args) throws Exception {
		// Criar cliente
		Cliente cliente = new Cliente();
		cliente.setNome("Maria Oliveira");
		cliente.setCpf("98765432100"); // Sem máscara
		cliente.setDataNascimento(LocalDate.of(1985, 10, 20));
		cliente.setEndereco("Avenida Principal, 456");

		// Criar contato
		Contato contato = new Contato();
		contato.setTipo("E-mail");
		contato.setValor("maria@exemplo.com");

		// Associar contato ao cliente
		cliente.adicionarContato(contato);

		// Salvar cliente e contato (em cascata)
		clienteService.salvarCliente(cliente);

		System.out.println("Cliente e contato salvos com sucesso!");
	}

}
