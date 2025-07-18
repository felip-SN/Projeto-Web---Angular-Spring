package br.gov.sp.agenda.agendaback.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.gov.sp.agenda.agendaback.entity.Contato;
import br.gov.sp.agenda.agendaback.enums.Categoria;
import br.gov.sp.agenda.agendaback.service.ContatoService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/contato")
public class ContatoController {
    @Autowired
    private ContatoService contatoService;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestPart("contato") Contato contato,
            @RequestPart(value = "foto", required = false) MultipartFile fotoFile) {
        try {

            if (fotoFile != null && !fotoFile.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + fotoFile.getOriginalFilename();
                Path uploadPath = Paths.get("src/main/resources/static/uploads", fileName);
                Files.copy(fotoFile.getInputStream(), uploadPath);

                contato.setFoto("uploads/" + fileName);
            }

            contatoService.save(contato);
            return new ResponseEntity<>("Contato salvo", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao salvar contato", HttpStatus.BAD_REQUEST);
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
