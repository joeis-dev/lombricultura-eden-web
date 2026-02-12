# Plugin Development Guide

This guide explains how to create custom plugins to extend the e-commerce platform functionality.

## Plugin Architecture

The platform uses a modular plugin system that allows you to add new features without modifying the core codebase.

### Plugin Structure

```
plugins/
└── my-plugin/
    ├── backend/
    │   ├── MyPluginService.java
    │   ├── MyPluginController.java
    │   ├── MyPluginRepository.java
    │   └── MyPluginConfig.java
    ├── frontend/
    │   ├── components/
    │   │   └── MyPluginWidget.tsx
    │   ├── hooks/
    │   │   └── useMyPlugin.ts
    │   └── index.ts
    ├── plugin.json
    └── README.md
```

## Creating a Plugin

### 1. Plugin Manifest

**File**: `plugins/my-plugin/plugin.json`

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "My custom plugin",
  "author": "Your Name",
  "dependencies": {
    "backend": ["spring-boot-starter-web"],
    "frontend": ["react", "axios"]
  },
  "configuration": {
    "enabled": true,
    "settings": {
      "apiKey": "",
      "webhookUrl": ""
    }
  },
  "hooks": {
    "onOrderCreated": "handleOrderCreated",
    "onProductUpdated": "handleProductUpdated"
  }
}
```

### 2. Backend Plugin

#### Service

**File**: `plugins/my-plugin/backend/MyPluginService.java`

```java
package com.shop.ecommerce.plugins.myplugin;

import org.springframework.stereotype.Service;
import com.shop.ecommerce.domain.entity.Order;

@Service
public class MyPluginService {
    
    public void handleOrderCreated(Order order) {
        // Custom logic when order is created
        System.out.println("Plugin: Order created - " + order.getId());
    }
    
    public void processCustomLogic(String data) {
        // Your custom business logic
    }
}
```

#### Controller

**File**: `plugins/my-plugin/backend/MyPluginController.java`

```java
package com.shop.ecommerce.plugins.myplugin;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/plugins/my-plugin")
@RequiredArgsConstructor
public class MyPluginController {
    
    private final MyPluginService myPluginService;
    
    @PostMapping("/action")
    public ResponseEntity<String> performAction(@RequestBody String data) {
        myPluginService.processCustomLogic(data);
        return ResponseEntity.ok("Action performed");
    }
    
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        return ResponseEntity.ok(Map.of(
            "enabled", true,
            "version", "1.0.0"
        ));
    }
}
```

#### Configuration

**File**: `plugins/my-plugin/backend/MyPluginConfig.java`

```java
package com.shop.ecommerce.plugins.myplugin;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnProperty(name = "plugins.my-plugin.enabled", havingValue = "true")
public class MyPluginConfig {
    
    @Bean
    public MyPluginService myPluginService() {
        return new MyPluginService();
    }
}
```

### 3. Frontend Plugin

#### Component

**File**: `plugins/my-plugin/frontend/components/MyPluginWidget.tsx`

```typescript
import { useState, useEffect } from 'react';
import { useMyPlugin } from '../hooks/useMyPlugin';

export const MyPluginWidget = () => {
  const { data, loading, performAction } = useMyPlugin();
  
  return (
    <div className="my-plugin-widget">
      <h3>My Plugin</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>{data}</p>
          <button onClick={performAction}>Perform Action</button>
        </div>
      )}
    </div>
  );
};
```

#### Hook

**File**: `plugins/my-plugin/frontend/hooks/useMyPlugin.ts`

```typescript
import { useState, useEffect } from 'react';
import apiClient from '@services/api';

export const useMyPlugin = () => {
  const [data, setData] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchStatus();
  }, []);
  
  const fetchStatus = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/plugins/my-plugin/status');
      setData(response.data.status);
    } finally {
      setLoading(false);
    }
  };
  
  const performAction = async () => {
    await apiClient.post('/plugins/my-plugin/action', { data: 'test' });
    await fetchStatus();
  };
  
  return { data, loading, performAction };
};
```

## Plugin Examples

### Example 1: Loyalty Points Plugin

**Purpose**: Add loyalty points system to reward customers

**Backend**:
```java
@Service
public class LoyaltyPointsService {
    
    public void awardPoints(Order order) {
        int points = calculatePoints(order.getTotalAmount());
        // Save points to user account
    }
    
    private int calculatePoints(BigDecimal amount) {
        return amount.multiply(BigDecimal.valueOf(0.1)).intValue();
    }
}
```

**Frontend**:
```typescript
export const LoyaltyPointsDisplay = () => {
  const { points } = useLoyaltyPoints();
  
  return (
    <div className="loyalty-points">
      <span>Points: {points}</span>
    </div>
  );
};
```

### Example 2: Product Recommendations Plugin

**Purpose**: Show personalized product recommendations

**Backend**:
```java
@Service
public class RecommendationService {
    
    public List<Product> getRecommendations(UUID userId) {
        // ML-based recommendations
        return recommendationEngine.getRecommendations(userId);
    }
}
```

**Frontend**:
```typescript
export const ProductRecommendations = () => {
  const { recommendations } = useRecommendations();
  
  return (
    <div className="recommendations">
      <h3>Recommended for You</h3>
      <div className="product-grid">
        {recommendations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
```

### Example 3: Advanced Analytics Plugin

**Purpose**: Provide detailed analytics for sellers

**Backend**:
```java
@Service
public class AnalyticsService {
    
    public AnalyticsReport generateReport(UUID sellerId, LocalDate from, LocalDate to) {
        return AnalyticsReport.builder()
            .totalSales(calculateTotalSales(sellerId, from, to))
            .topProducts(getTopProducts(sellerId, from, to))
            .customerMetrics(getCustomerMetrics(sellerId, from, to))
            .build();
    }
}
```

**Frontend**:
```typescript
export const AnalyticsDashboard = () => {
  const { report, loading } = useAnalytics();
  
  return (
    <div className="analytics-dashboard">
      <div className="metrics">
        <MetricCard title="Total Sales" value={report.totalSales} />
        <MetricCard title="Orders" value={report.totalOrders} />
        <MetricCard title="Customers" value={report.totalCustomers} />
      </div>
      <div className="charts">
        <SalesChart data={report.salesData} />
        <TopProductsChart data={report.topProducts} />
      </div>
    </div>
  );
};
```

## Plugin Registration

### Backend

**File**: `backend/src/main/resources/application.yml`

```yaml
plugins:
  enabled:
    - loyalty-points
    - product-recommendations
    - advanced-analytics
  
  loyalty-points:
    enabled: true
    pointsPerDollar: 10
    
  product-recommendations:
    enabled: true
    algorithm: collaborative-filtering
    
  advanced-analytics:
    enabled: true
    retentionDays: 90
```

### Frontend

**File**: `frontend/src/plugins/registry.ts`

```typescript
import { LoyaltyPointsWidget } from '@plugins/loyalty-points';
import { ProductRecommendations } from '@plugins/product-recommendations';
import { AnalyticsDashboard } from '@plugins/advanced-analytics';

export const pluginRegistry = {
  'loyalty-points': {
    component: LoyaltyPointsWidget,
    enabled: true,
  },
  'product-recommendations': {
    component: ProductRecommendations,
    enabled: true,
  },
  'advanced-analytics': {
    component: AnalyticsDashboard,
    enabled: true,
    requiredRole: 'SELLER',
  },
};
```

## Plugin Hooks

The platform provides hooks that plugins can use to integrate with core functionality:

### Available Hooks

1. **onOrderCreated** - Called when a new order is created
2. **onOrderUpdated** - Called when an order is updated
3. **onProductCreated** - Called when a new product is created
4. **onProductUpdated** - Called when a product is updated
5. **onUserRegistered** - Called when a new user registers
6. **onPaymentCompleted** - Called when a payment is completed
7. **onShipmentCreated** - Called when a shipment is created

### Using Hooks

**Backend**:
```java
@Component
public class PluginEventListener {
    
    @Autowired
    private List<PluginService> plugins;
    
    @EventListener
    public void onOrderCreated(OrderCreatedEvent event) {
        plugins.forEach(plugin -> {
            if (plugin.hasHook("onOrderCreated")) {
                plugin.executeHook("onOrderCreated", event.getOrder());
            }
        });
    }
}
```

## Plugin Distribution

### Packaging

```bash
# Create plugin package
cd plugins/my-plugin
tar -czf my-plugin-1.0.0.tar.gz .

# Or create zip
zip -r my-plugin-1.0.0.zip .
```

### Installation

```bash
# Extract plugin
tar -xzf my-plugin-1.0.0.tar.gz -C plugins/

# Enable plugin in configuration
# Edit application.yml and add plugin to enabled list

# Restart application
docker-compose restart backend frontend
```

## Best Practices

1. **Versioning**: Use semantic versioning (MAJOR.MINOR.PATCH)
2. **Documentation**: Include comprehensive README with installation and usage instructions
3. **Testing**: Write tests for your plugin functionality
4. **Configuration**: Make plugin configurable via application.yml
5. **Error Handling**: Handle errors gracefully and provide meaningful error messages
6. **Performance**: Optimize plugin code to avoid impacting core functionality
7. **Security**: Validate all inputs and follow security best practices
8. **Compatibility**: Test plugin with different versions of the platform

## Plugin Marketplace (Future)

In the future, we plan to create a plugin marketplace where developers can:
- Publish plugins
- Discover plugins
- Rate and review plugins
- Purchase premium plugins
- Get support from plugin authors

## Support

For plugin development support:
1. Check the [Plugin API Documentation](./plugin-api.md)
2. Review example plugins in `plugins/examples/`
3. Join the developer community
4. Submit issues on GitHub
