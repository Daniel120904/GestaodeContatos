package com.example.contatos_backend.service;

import com.example.contatos_backend.model.ClienteModel;
import com.example.contatos_backend.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    public List<ClienteModel> listarTodos() {
        System.out.println("Buscando todos os clientes...");
        return clienteRepository.findAll();
    }

    @Transactional
    public ClienteModel salvarCliente(ClienteModel cliente) {
        if (clienteRepository.findByCpf(cliente.getCpf()).isPresent()) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }
        return clienteRepository.save(cliente);
    }

    @Transactional
    public ClienteModel atualizarCliente(Long id, ClienteModel clienteAtualizado) {
        return clienteRepository.findById(id)
                .map(cliente -> {
                    cliente.setNome(clienteAtualizado.getNome());
                    cliente.setDataNascimento(clienteAtualizado.getDataNascimento());
                    cliente.setEndereco(clienteAtualizado.getEndereco());

                    if (!cliente.getCpf().equals(clienteAtualizado.getCpf())) {
                        if (clienteRepository.findByCpf(clienteAtualizado.getCpf()).isPresent()) {
                            throw new IllegalArgumentException("CPF já cadastrado");
                        }
                        cliente.setCpf(clienteAtualizado.getCpf());
                    }

                    cliente.getContatos().clear();
                    clienteAtualizado.getContatos().forEach(contato -> {
                        contato.setCliente(cliente);
                        cliente.getContatos().add(contato);
                    });

                    return clienteRepository.save(cliente);
                })
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
    }

    public Optional<ClienteModel> buscarPorId(Long id) {
        return clienteRepository.findById(id);
    }

    @Transactional
    public void excluirCliente(Long id) {
        ClienteModel cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
        clienteRepository.delete(cliente);
    }
}
