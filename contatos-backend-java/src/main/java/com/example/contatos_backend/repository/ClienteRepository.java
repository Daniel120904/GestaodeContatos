package com.example.contatos_backend.repository;

import com.example.contatos_backend.model.ClienteModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<ClienteModel,Long> {
    Optional<ClienteModel> findByCpf(String cpf);
}
