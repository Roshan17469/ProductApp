package com.productapp.smoketest;

import com.productapp.model.User;
import com.productapp.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class SmokeTest {
    
    @LocalServerPort
    private int port;
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    public void testDatabaseConnection() {
        // Test if we can interact with the database
        long countBefore = userRepository.count();
        assertNotNull(countBefore);
        System.out.println("Database connection successful. Current user count: " + countBefore);
    }
    
    @Test
    public void testApiEndpointReturns200() {
        // Test if API endpoint is accessible
        String url = "http://localhost:" + port + "/api/users";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        System.out.println("API endpoint test passed: " + url);
    }
    
    @Test
    public void testHealthEndpoint() {
        // Test actuator health endpoint
        String url = "http://localhost:" + port + "/actuator/health";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        System.out.println("Health endpoint test passed: " + url);
    }
}

