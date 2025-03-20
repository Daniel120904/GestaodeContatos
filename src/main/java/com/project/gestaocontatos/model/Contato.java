package com.project.gestaocontatos.model;

import jakarta.persistence.*;

@Entity
public class Contato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String tipo; // Ex: "Telefone", "E-mail"

    @Column(nullable = false, length = 100)
    private String valor; // Ex: "123456789", "email@exemplo.com"

    @Column(length = 255)
    private String observacao;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    // Getters e Setters (ou use Lombok)
}
