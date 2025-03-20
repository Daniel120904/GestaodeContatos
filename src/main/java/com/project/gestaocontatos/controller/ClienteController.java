package com.project.gestaocontatos.controller;

import com.project.gestaocontatos.model.Cliente;
import com.project.gestaocontatos.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "http://localhost:5173") // Permite requisições do frontend
public class ClienteController {

}
