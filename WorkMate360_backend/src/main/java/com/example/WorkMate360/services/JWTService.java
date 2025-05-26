package com.example.WorkMate360.services;

import com.example.WorkMate360.models.Login;
import com.example.WorkMate360.repo.UserRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {

    @Value("${jwt.secret:defaultSecretKeyThatIsAtLeast32BytesLong}")
    private String secretKey;
    private SecretKey key;
    // Replace with your actual secret key

    private static final long TOKEN_VALIDITY = 86400;

    public JWTService(){
        try{
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey key = keyGen.generateKey();
            secretKey =  Base64.getEncoder().encodeToString(key.getEncoded());
        }catch (Exception e){
            e.printStackTrace();
        }
    }// 24 hours in seconds



    @Autowired
    private UserRepo userRepo;


    @PostConstruct
    public void init() {
        try {
//            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
//            SecretKey secretKeyObj = keyGen.generateKey();
//            secretKey = Base64.getEncoder().encodeToString(secretKeyObj.getEncoded());
            key = (SecretKey) getKey();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }


    public String generateToken(String username) {
        // Get the user's role from the database
        Login user = userRepo.findByUsername(username);
        String role = (user != null) ? user.getRole() : null;

        // Create claims with username and role
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);

        
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() *60 *60 *24))
                .and()
                .signWith(getKey())
                .compact();
    }

    private Key getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractRole(String token) {
        final Claims claims = extractAllClaims(token);
        return claims.get("role", String.class);
    }

    public String extraUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey)key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extraUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}