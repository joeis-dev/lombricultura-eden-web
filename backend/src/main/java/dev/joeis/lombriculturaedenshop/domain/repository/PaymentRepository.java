package dev.joeis.lombriculturaedenshop.domain.repository;

import dev.joeis.lombriculturaedenshop.domain.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    Optional<Payment> findByStripePaymentId(String stripePaymentId);

    Optional<Payment> findByOrderId(UUID orderId);
}
