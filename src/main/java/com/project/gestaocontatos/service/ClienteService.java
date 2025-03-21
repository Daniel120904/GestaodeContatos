package com.project.gestaocontatos.service;

import com.project.gestaocontatos.model.Cliente;
import com.project.gestaocontatos.model.Contato;
import com.project.gestaocontatos.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> listarTodos() {
        System.out.println("Buscando todos os clientes...");
        return clienteRepository.findAll(); // Usa o metodo padrão do JpaRepository
    }

    public Cliente salvarCliente(Cliente cliente) {
        // Valida CPF único
        if (clienteRepository.findByCpf(cliente.getCpf()).isPresent()) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }
        return clienteRepository.save(cliente);
    }

}
