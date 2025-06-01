package br.gov.sp.agenda.agendaback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.sp.agenda.agendaback.entity.Contato;
import java.util.List;
import br.gov.sp.agenda.agendaback.enums.Categoria;



public interface ContatoRepository extends JpaRepository<Contato, Long> {

    List<Contato> findByFavoritoTrue();

    List<Contato> findByCategoria(Categoria categoria);

    List<Contato> findByNomeContainingIgnoreCase(String nome);
}
