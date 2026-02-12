package dev.joeis.lombriculturaedenshop.domain.repository;

import dev.joeis.lombriculturaedenshop.domain.entity.Product;
import dev.joeis.lombriculturaedenshop.domain.entity.Review;
import dev.joeis.lombriculturaedenshop.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, UUID> {

    Page<Review> findByProductAndIsApprovedTrue(Product product, Pageable pageable);

    List<Review> findByProductAndIsApprovedTrue(Product product);

    Page<Review> findByUser(User user, Pageable pageable);

    Page<Review> findByIsApprovedFalse(Pageable pageable);

    boolean existsByUserAndProduct(User user, Product product);
}
