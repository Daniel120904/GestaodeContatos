package com.example.contatos_backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotEmpty;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class ClienteModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 100)
    @NotEmpty(message = "O nome é obrigatório")
    private String nome;

    @Column(nullable = false, unique = true, length = 14)
    @NotEmpty(message = "O CPF é obrigatório")
    private String cpf;

    @Column(nullable = false)
    private LocalDate dataNascimento;

    @Column(length = 255)
    private String endereco;

    @JsonManagedReference
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ContatoModel> contatos = new ArrayList<>();

}
