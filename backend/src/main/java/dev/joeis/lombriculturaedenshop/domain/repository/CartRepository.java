package dev.joeis.lombriculturaedenshop.domain.repository;

import dev.joeis.lombriculturaedenshop.domain.entity.Cart;
import dev.joeis.lombriculturaedenshop.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartRepository extends JpaRepository<Cart, UUID> {

    Optional<Cart> findByUser(User user);

    Optional<Cart> findBySessionId(String sessionId);

    void deleteByUser(User user);

    void deleteBySessionId(String sessionId);
}
