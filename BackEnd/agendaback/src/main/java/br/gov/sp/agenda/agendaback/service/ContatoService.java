package br.gov.sp.agenda.agendaback.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.gov.sp.agenda.agendaback.entity.Contato;
import br.gov.sp.agenda.agendaback.enums.Categoria;
import br.gov.sp.agenda.agendaback.repository.ContatoRepository;

@Service
public class ContatoService {
    
    @Autowired
    private ContatoRepository contatoRepository;

    public String save(Contato contato){
        this.contatoRepository.save(contato);
        return "Contato salvo com sucesso!";
    }

    public String update(Contato contato, Long id){
        contato.setId(id);
        this.contatoRepository.save(contato);
        return "Contato atualizado com sucesso!";
    }

    public String delete(Long id){
        this.contatoRepository.deleteById(id);
        return "Contato deletado com sucesso!";
    }

    public List<Contato> findAll(){
        List<Contato> lista = this.contatoRepository.findAll();
        return lista;
    }

    public List<Contato> findByCategory(Categoria categoria){
        return this.contatoRepository.findByCategoria(categoria);
    }

    public List<Contato> findFavoritos(){
        return this.contatoRepository.findByFavoritoTrue();
    }

    public List<Contato> buscarPorNome(String nome) {
        return this.contatoRepository.findByNomeContainingIgnoreCase(nome);
    }
}
