package com.example.WorkMate360.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class CloudinaryResponse {

    private String publicId;
    private String url;
}
