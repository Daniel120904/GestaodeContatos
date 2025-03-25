package com.project.gestaocontatos.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Contato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String tipo;

    @Column(nullable = false, length = 100)
    private String valor;

    @Column(length = 255)
    private String observacao;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    //gets e sets
    public Long getId() {
        return id;
    }
    public String getTipo() {
        return tipo;
    }
    public String getValor() {
        return valor;
    }
    public String getObservacao() {
        return observacao;
    }
    public Cliente getCliente() {
        return cliente;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public void setValor(String valor) {
        this.valor = valor;
    }
    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }
    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
