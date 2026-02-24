package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String imageUrl;
    private String name;
    private String education;
    private String occupation;
    private String contactNumber;
}