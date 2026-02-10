package com.example.backend.testimonialsubdomain.presentationlayer;

import com.example.backend.security.JwtService;
import com.example.backend.testimonialsubdomain.businesslogiclayer.TestimonialService;
import com.example.backend.utils.RateLimitingService;
import io.github.bucket4j.Bucket;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc; // Import This
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TestimonialController.class)
@AutoConfigureMockMvc(addFilters = false)
public class TestimonialControllerUnitTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TestimonialService testimonialService;

    @MockitoBean
    private RateLimitingService rateLimitingService;

    @MockitoBean
    private JwtService jwtService;

    @MockitoBean
    private UserDetailsService userDetailsService;

    @Test
    public void whenRateLimitExceeded_thenReturn429() throws Exception {
        Bucket mockBucket = mock(Bucket.class);
        when(mockBucket.tryConsume(1)).thenReturn(false);

        when(rateLimitingService.resolveBucket(anyString())).thenReturn(mockBucket);

        String json = """
            { "content": "Nice!", "author": "Tester", "faxNumber": "" }
        """;

        mockMvc.perform(post("/api/testimonials")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isTooManyRequests());
    }

    @Test
    public void whenRateLimitNotExceeded_thenReturn200() throws Exception {
        Bucket mockBucket = mock(Bucket.class);
        when(mockBucket.tryConsume(1)).thenReturn(true);

        when(rateLimitingService.resolveBucket(anyString())).thenReturn(mockBucket);

        String json = """
            { "content": "Nice!", "author": "Tester", "faxNumber": "" }
        """;

        mockMvc.perform(post("/api/testimonials")
                        // .with(csrf()) <--- REMOVE THIS
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk());
    }
}