package com.project.gestaocontatos.service;

import com.project.gestaocontatos.model.Cliente;
import com.project.gestaocontatos.model.Contato;
import com.project.gestaocontatos.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> listarTodos() {
        System.out.println("Buscando todos os clientes...");
        return clienteRepository.findAll(); // Usa o metodo padrão do JpaRepository
    }

    @Transactional
    public Cliente salvarCliente(Cliente cliente) {
        if (clienteRepository.findByCpf(cliente.getCpf()).isPresent()) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }
        return clienteRepository.save(cliente);
    }

    @Transactional
    public Cliente atualizarCliente(Long id, Cliente clienteAtualizado) {
        return clienteRepository.findById(id)
                .map(cliente -> {
                    // Atualiza dados básicos
                    cliente.setNome(clienteAtualizado.getNome());
                    cliente.setDataNascimento(clienteAtualizado.getDataNascimento());
                    cliente.setEndereco(clienteAtualizado.getEndereco());

                    // Atualiza CPF (se alterado)
                    if (!cliente.getCpf().equals(clienteAtualizado.getCpf())) {
                        if (clienteRepository.findByCpf(clienteAtualizado.getCpf()).isPresent()) {
                            throw new IllegalArgumentException("CPF já cadastrado");
                        }
                        cliente.setCpf(clienteAtualizado.getCpf());
                    }

                    // Atualiza contatos (remove antigos e adiciona novos)
                    cliente.getContatos().clear();
                    clienteAtualizado.getContatos().forEach(contato -> {
                        contato.setCliente(cliente);
                        cliente.getContatos().add(contato);
                    });

                    return clienteRepository.save(cliente);
                })
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
    }

    public Optional<Cliente> buscarPorId(Long id) {
        return clienteRepository.findById(id);
    }


}
