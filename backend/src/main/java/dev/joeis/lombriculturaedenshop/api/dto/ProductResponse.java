package dev.joeis.lombriculturaedenshop.api.dto;

import dev.joeis.lombriculturaedenshop.domain.entity.Product;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record ProductResponse(
        UUID id,
        String title,
        String description,
        BigDecimal price,
        Integer stock,
        String category,
        List<String> imageUrls,
        Boolean isActive,
        Boolean isOnSale,
        BigDecimal discountPercent,
        List<ProductVariantResponse> variants,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {

    public static ProductResponse from(Product product) {
        List<ProductVariantResponse> variants = product.getVariants() == null
                ? List.of()
                : product.getVariants().stream()
                        .filter(v -> Boolean.TRUE.equals(v.getIsActive()))
                        .map(ProductVariantResponse::from)
                        .toList();

        return new ProductResponse(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getCategory(),
                product.getImageUrls() == null ? List.of() : product.getImageUrls(),
                product.getIsActive(),
                product.getIsOnSale(),
                product.getDiscountPercent(),
                variants,
                product.getCreatedAt(),
                product.getUpdatedAt());
    }
}
