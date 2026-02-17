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
public class LocalGuardian {
    private String name;
    private Long contactNumber;
    private String address;
}