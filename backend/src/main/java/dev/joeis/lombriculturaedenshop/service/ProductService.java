package dev.joeis.lombriculturaedenshop.service;

import dev.joeis.lombriculturaedenshop.api.dto.ProductResponse;
import dev.joeis.lombriculturaedenshop.domain.repository.ProductRepository;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class ProductService {

    private static final int MAX_PAGE_SIZE = 200;

    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<ProductResponse> getActiveProducts() {
        return productRepository
                .findByIsActiveTrue(PageRequest.of(0, MAX_PAGE_SIZE, Sort.by(Sort.Direction.ASC, "title")))
                .map(ProductResponse::from)
                .getContent();
    }

    @Transactional(readOnly = true)
    public ProductResponse getProduct(UUID id) {
        return productRepository
                .findById(id)
                .filter(product -> Boolean.TRUE.equals(product.getIsActive()))
                .map(ProductResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    }
}
