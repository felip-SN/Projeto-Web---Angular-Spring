package br.gov.sp.agenda.agendaback.entity;

import java.time.LocalDate;

import br.gov.sp.agenda.agendaback.enums.Categoria;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Contato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String telefone;
    private String telefoneSecundario;
    private String email;
    private String endereco;

    @Lob
    private byte[] foto;
    private LocalDate dataAniversario;

    private String empresa;
    private String cargo;

    private Boolean favorito;

    @Enumerated(EnumType.STRING)
    private Categoria categoria;
}
