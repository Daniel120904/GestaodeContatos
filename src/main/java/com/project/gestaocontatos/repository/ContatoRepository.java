package com.project.gestaocontatos.repository;

import com.project.gestaocontatos.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Long> {

}
