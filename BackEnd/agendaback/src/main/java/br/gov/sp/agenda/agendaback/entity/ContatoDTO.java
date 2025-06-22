package br.gov.sp.agenda.agendaback.entity;

import java.sql.Blob;
import java.time.LocalDate;

import br.gov.sp.agenda.agendaback.enums.Categoria;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ContatoDTO {
    private String nome;
    private String telefone;
    private String telefoneSecundario;
    private String email;
    private String endereco;
    private String dataAniversario;
    private String empresa;
    private String cargo;
    private boolean favorito;
    private String categoria;
    private String foto;
}
