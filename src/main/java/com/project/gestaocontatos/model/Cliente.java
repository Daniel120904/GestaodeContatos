package com.project.gestaocontatos.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.http.converter.json.GsonBuilderUtils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor // Gera um construtor sem argumentos
@AllArgsConstructor // Gera um construtor com todos os argumentos
@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    private List<Contato> contatos = new ArrayList<>();


    public void adicionarContato(Contato contato) {
        contato.setCliente(this); // Associa o contato ao cliente
        contatos.add(contato);
    }

    public Long getId() {
        return id;
    }
    public String getNome() {
        return nome;
    }
    public String getCpf() {
        return cpf;
    }
    public LocalDate getDataNascimento() {
        return dataNascimento;
    }
    public String getEndereco() {
        return endereco;
    }
    public List<Contato> getContatos() {
        return contatos;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
    public void setContatos(List<Contato> contatos) {
        this.contatos = contatos;
    }


}