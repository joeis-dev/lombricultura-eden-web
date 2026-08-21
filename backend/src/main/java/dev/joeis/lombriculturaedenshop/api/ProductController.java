package dev.joeis.lombriculturaedenshop.api;

import dev.joeis.lombriculturaedenshop.api.dto.ProductResponse;
import dev.joeis.lombriculturaedenshop.service.ProductService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<ProductResponse> list() {
        return productService.getActiveProducts();
    }

    @GetMapping("/{id}")
    public ProductResponse detail(@PathVariable UUID id) {
        return productService.getProduct(id);
    }
}
