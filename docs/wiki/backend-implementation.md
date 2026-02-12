# Backend Implementation Guide

This guide provides detailed instructions for completing the backend implementation.

## Architecture Overview

The backend follows **Clean Architecture** with four main layers:

1. **Domain Layer** - Core business entities and repository interfaces ✅ COMPLETED
2. **Application Layer** - Business logic and use cases ⏳ IN PROGRESS
3. **Infrastructure Layer** - External integrations and persistence ⏳ IN PROGRESS
4. **Presentation Layer** - REST API controllers ⏳ IN PROGRESS

## Completed Components

✅ Domain entities (User, Product, Order, OrderItem, Payment, Shipment, Cart, CartItem, Review)
✅ Repository interfaces
✅ Database schema
✅ Project configuration

## Remaining Tasks

### 1. Security Configuration

Create JWT authentication and authorization:

**File**: `backend/src/main/java/com/shop/ecommerce/infrastructure/security/JwtTokenProvider.java`

```java
@Component
public class JwtTokenProvider {
    @Value("${application.jwt.secret}")
    private String jwtSecret;
    
    @Value("${application.jwt.expiration}")
    private long jwtExpiration;
    
    public String generateToken(Authentication authentication) {
        // Generate JWT token
    }
    
    public boolean validateToken(String token) {
        // Validate JWT token
    }
    
    public String getUserIdFromToken(String token) {
        // Extract user ID from token
    }
}
```

**File**: `backend/src/main/java/com/shop/ecommerce/infrastructure/security/SecurityConfig.java`

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/api/products/**", "/api-docs/**", "/swagger-ui/**").permitAll()
                .requestMatchers("/api/seller/**").hasRole("SELLER")
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
```

### 2. Application Services

#### AuthService

**File**: `backend/src/main/java/com/shop/ecommerce/application/service/AuthService.java`

Implement:
- `register(RegisterRequest)` - User registration
- `login(LoginRequest)` - User authentication
- `refreshToken(String)` - Token refresh
- `linkGuestOrders(User, String email, String phone)` - Link guest orders to new account

#### ProductService

**File**: `backend/src/main/java/com/shop/ecommerce/application/service/ProductService.java`

Implement:
- `createProduct(CreateProductRequest)` - Create new product (seller only)
- `updateProduct(UUID id, UpdateProductRequest)` - Update product
- `deleteProduct(UUID id)` - Soft delete product
- `getProduct(UUID id)` - Get product details
- `searchProducts(String query, Pageable)` - Search products
- `getProductsByCategory(String category, Pageable)` - Filter by category
- `getFeaturedProducts()` - Get featured products for homepage

#### OrderService

**File**: `backend/src/main/java/com/shop/ecommerce/application/service/OrderService.java`

Implement:
- `createOrder(CreateOrderRequest)` - Create order from cart
- `getOrder(UUID id)` - Get order details
- `getUserOrders(UUID userId, Pageable)` - Get user's orders
- `getGuestOrders(String email, String phone)` - Get guest orders
- `updateOrderStatus(UUID id, OrderStatus status)` - Update order status
- `cancelOrder(UUID id)` - Cancel order
- `getSellerOrders(UUID sellerId, Pageable)` - Get orders for seller

#### CartService

**File**: `backend/src/main/java/com/shop/ecommerce/application/service/CartService.java`

Implement:
- `getCart(UUID userId, String sessionId)` - Get or create cart
- `addItem(UUID cartId, UUID productId, int quantity)` - Add item to cart
- `updateItemQuantity(UUID itemId, int quantity)` - Update quantity
- `removeItem(UUID itemId)` - Remove item
- `clearCart(UUID cartId)` - Clear all items
- `mergeGuestCart(String sessionId, UUID userId)` - Merge guest cart with user cart

#### PaymentService

**File**: `backend/src/main/java/com/shop/ecommerce/application/service/PaymentService.java`

Implement:
- `createPaymentIntent(UUID orderId)` - Create Stripe payment intent
- `confirmPayment(String paymentIntentId)` - Confirm payment
- `handleWebhook(String payload, String signature)` - Handle Stripe webhooks
- `refundPayment(UUID paymentId)` - Process refund

#### ShippingService

**File**: `backend/src/main/java/com/shop/ecommerce/application/service/ShippingService.java`

Implement:
- `calculateShippingRates(Address address, List<OrderItem> items)` - Get shipping rates
- `createShipment(UUID orderId, ShippingOption option)` - Create shipment
- `getTrackingInfo(String trackingNumber)` - Get tracking information
- `updateShipmentStatus(UUID shipmentId, ShipmentStatus status)` - Update status

### 3. External Integrations

#### Stripe Integration

**File**: `backend/src/main/java/com/shop/ecommerce/infrastructure/external/StripePaymentGateway.java`

```java
@Service
public class StripePaymentGateway {
    @Value("${application.stripe.api-key}")
    private String stripeApiKey;
    
    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }
    
    public PaymentIntent createPaymentIntent(BigDecimal amount, String currency) {
        // Create Stripe payment intent
    }
    
    public PaymentIntent confirmPaymentIntent(String paymentIntentId) {
        // Confirm payment
    }
    
    public Refund createRefund(String paymentIntentId, BigDecimal amount) {
        // Process refund
    }
}
```

#### Skydropx Integration

**File**: `backend/src/main/java/com/shop/ecommerce/infrastructure/external/SkydropxShippingProvider.java`

```java
@Service
public class SkydropxShippingProvider {
    @Value("${application.skydropx.api-key}")
    private String apiKey;
    
    @Value("${application.skydropx.api-url}")
    private String apiUrl;
    
    private final WebClient webClient;
    
    public List<ShippingRate> getShippingRates(Address address, List<OrderItem> items) {
        // Call Skydropx API to get rates
    }
    
    public ShipmentLabel createShipment(Order order, ShippingRate rate) {
        // Create shipment and generate label
    }
    
    public TrackingInfo getTrackingInfo(String trackingNumber) {
        // Get tracking information
    }
}
```

#### Email Service

**File**: `backend/src/main/java/com/shop/ecommerce/infrastructure/external/EmailNotificationProvider.java`

```java
@Service
public class EmailNotificationProvider {
    private final JavaMailSender mailSender;
    
    public void sendOrderConfirmation(Order order) {
        // Send order confirmation email
    }
    
    public void sendShippingNotification(Order order, Shipment shipment) {
        // Send shipping notification
    }
    
    public void sendWelcomeEmail(User user) {
        // Send welcome email
    }
}
```

### 4. REST Controllers

#### AuthController

**File**: `backend/src/main/java/com/shop/ecommerce/presentation/controller/AuthController.java`

```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        // Register user
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        // Login user
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody RefreshTokenRequest request) {
        // Refresh token
    }
}
```

#### ProductController

**File**: `backend/src/main/java/com/shop/ecommerce/presentation/controller/ProductController.java`

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getProducts(
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String category,
        Pageable pageable
    ) {
        // Get products with filters
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable UUID id) {
        // Get product details
    }
    
    @GetMapping("/featured")
    public ResponseEntity<List<ProductResponse>> getFeaturedProducts() {
        // Get featured products
    }
}
```

#### OrderController

**File**: `backend/src/main/java/com/shop/ecommerce/presentation/controller/OrderController.java`

```java
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        // Create order
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable UUID id) {
        // Get order details
    }
    
    @GetMapping("/guest")
    public ResponseEntity<List<OrderResponse>> getGuestOrders(
        @RequestParam(required = false) String email,
        @RequestParam(required = false) String phone
    ) {
        // Get guest orders
    }
}
```

### 5. DTOs (Data Transfer Objects)

Create request and response DTOs in `backend/src/main/java/com/shop/ecommerce/presentation/dto/`:

- `RegisterRequest.java`
- `LoginRequest.java`
- `AuthResponse.java`
- `CreateProductRequest.java`
- `UpdateProductRequest.java`
- `ProductResponse.java`
- `CreateOrderRequest.java`
- `OrderResponse.java`
- `CartResponse.java`
- `PaymentResponse.java`
- `ShippingRateResponse.java`

### 6. Exception Handling

**File**: `backend/src/main/java/com/shop/ecommerce/infrastructure/config/GlobalExceptionHandler.java`

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(ex.getMessage()));
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );
        return ResponseEntity.badRequest()
            .body(new ErrorResponse("Validation failed", errors));
    }
}
```

### 7. OpenAPI Configuration

**File**: `backend/src/main/java/com/shop/ecommerce/infrastructure/config/OpenApiConfig.java`

```java
@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("E-commerce Platform API")
                .version("1.0.0")
                .description("REST API for E-commerce Platform"))
            .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
            .components(new Components()
                .addSecuritySchemes("bearerAuth",
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")));
    }
}
```

### 8. Testing

Create tests in `backend/src/test/java/com/shop/ecommerce/`:

#### Unit Tests

```java
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    @Mock
    private ProductRepository productRepository;
    
    @InjectMocks
    private ProductService productService;
    
    @Test
    void shouldCreateProduct() {
        // Test product creation
    }
}
```

#### Integration Tests

```java
@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void shouldGetProducts() throws Exception {
        mockMvc.perform(get("/api/products"))
            .andExpect(status().isOk());
    }
}
```

## Testing the Backend

```bash
# Run all tests
./mvnw test

# Run specific test class
./mvnw test -Dtest=ProductServiceTest

# Run with coverage
./mvnw clean verify

# View coverage report
open target/site/jacoco/index.html
```

## API Documentation

Once implemented, access the API documentation at:
- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/api-docs

## Next Steps

1. Implement security configuration (JWT)
2. Create all application services
3. Implement external integrations (Stripe, Skydropx)
4. Create REST controllers
5. Add exception handling
6. Write comprehensive tests
7. Document all endpoints with OpenAPI annotations
