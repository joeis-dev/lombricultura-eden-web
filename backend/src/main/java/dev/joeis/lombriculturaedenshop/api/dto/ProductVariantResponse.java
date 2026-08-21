package dev.joeis.lombriculturaedenshop.api.dto;

import dev.joeis.lombriculturaedenshop.domain.entity.ProductVariant;
import java.math.BigDecimal;
import java.util.UUID;

public record ProductVariantResponse(
        UUID id,
        String label,
        BigDecimal price,
        Integer stock,
        Boolean isActive,
        Integer sortOrder) {

    public static ProductVariantResponse from(ProductVariant variant) {
        return new ProductVariantResponse(
                variant.getId(),
                variant.getLabel(),
                variant.getPrice(),
                variant.getStock(),
                variant.getIsActive(),
                variant.getSortOrder());
    }
}
