package br.gov.sp.agenda.agendaback.controller;

import java.sql.Blob;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.gov.sp.agenda.agendaback.entity.Contato;
import br.gov.sp.agenda.agendaback.entity.ContatoDTO;
import br.gov.sp.agenda.agendaback.enums.Categoria;
import br.gov.sp.agenda.agendaback.service.ContatoService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/contato")
public class ContatoController {
    @Autowired
    private ContatoService contatoService;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody ContatoDTO contatoDTO) {
        try {
            Contato contato = new Contato();
            contato.setNome(contatoDTO.getNome());
            contato.setTelefone(contatoDTO.getTelefone());
            contato.setTelefoneSecundario(contatoDTO.getTelefoneSecundario());
            contato.setEmail(contatoDTO.getEmail());
            contato.setEndereco(contatoDTO.getEndereco());
            contato.setDataAniversario(
                    LocalDate.parse(contatoDTO.getDataAniversario())
            );
            contato.setEmpresa(contatoDTO.getEmpresa());
            contato.setCargo(contatoDTO.getCargo());
            contato.setCategoria(Categoria.valueOf(contatoDTO.getCategoria())); 


            if (contatoDTO.getFoto() != null && contatoDTO.getFoto().contains(",")) {
                String base64Data = contatoDTO.getFoto().split(",")[1]; 
                byte[] imageBytes = Base64.getDecoder().decode(base64Data);
                Blob blob = new SerialBlob(imageBytes);
                contato.setFoto(new Blob[] { blob });
            }

            contatoService.save(contato);
            return ResponseEntity.status(HttpStatus.CREATED).body("Criado com sucesso");
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@RequestBody Contato contato, @PathVariable Long id) {
        try {
            String message = this.contatoService.update(contato, id);
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/favoritar/{id}")
    public ResponseEntity<String> favoritar(@RequestBody Contato contato, @PathVariable Long id,
            @RequestParam boolean favorito) {
        try {
            String favoritado = this.contatoService.favoritar(contato, favorito, id);
            return new ResponseEntity<>(favoritado, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getContatos")
    public ResponseEntity<Page<Contato>> pagination(@RequestParam int pageNumber, @RequestParam int pageSize) {
        try {
            Page<Contato> pagination = this.contatoService.pagination(pageNumber - 1, pageSize);
            return new ResponseEntity<>(pagination, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            String message = this.contatoService.delete(id);
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/favoritos")
    public ResponseEntity<List<Contato>> findFavorite() {
        try {
            List<Contato> favoritos = this.contatoService.findFavoritos();
            return new ResponseEntity<>(favoritos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Contato>> findByCategory(@PathVariable Categoria categoria) {
        try {
            List<Contato> contatos = this.contatoService.findByCategory(categoria);
            return new ResponseEntity<>(contatos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Contato>> buscarPorNome(@RequestParam String nome) {
        try {
            List<Contato> contatos = this.contatoService.buscarPorNome(nome);
            return new ResponseEntity<>(contatos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
