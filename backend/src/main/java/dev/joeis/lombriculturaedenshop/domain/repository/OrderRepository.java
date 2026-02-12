package dev.joeis.lombriculturaedenshop.domain.repository;

import dev.joeis.lombriculturaedenshop.domain.entity.Order;
import dev.joeis.lombriculturaedenshop.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {

    Page<Order> findByUser(User user, Pageable pageable);

    List<Order> findByGuestEmail(String guestEmail);

    List<Order> findByGuestPhone(String guestPhone);

    @Query("SELECT o FROM Order o WHERE o.guestEmail = :email OR o.guestPhone = :phone")
    List<Order> findGuestOrders(@Param("email") String email, @Param("phone") String phone);

    Page<Order> findByStatus(Order.OrderStatus status, Pageable pageable);

    @Query("SELECT o FROM Order o JOIN o.items oi WHERE oi.product.seller.id = :sellerId")
    Page<Order> findOrdersBySeller(@Param("sellerId") UUID sellerId, Pageable pageable);
}
