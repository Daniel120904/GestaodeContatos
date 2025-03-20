package com.project.gestaocontatos.repository;

import com.project.gestaocontatos.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Busca por CPF (para validação de unicidade)
    Optional<Cliente> findByCpf(String cpf);
}

