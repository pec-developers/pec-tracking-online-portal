package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParentDetails {
    private String imageUrl;
    private String name;
    private String education;
    private String occupation;
    private Long contactNumber;
}