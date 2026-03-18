package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "student_public_profile_t")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentPublicProfile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private UUID studentId;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "academic_details_id")
    private StudentAcademicDetails academicDetails;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "personal_details_id")
    private StudentPersonalDetails personalDetails;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "family_details_id")
    private StudentFamilyDetails familyDetails;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_details_id")
    private StudentAddressDetails addressDetails;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "academic_history_id")
    private StudentAcademicHistory academicHistory;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "misc_details_id")
    private StudentMiscDetails miscDetails;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "socio_economic_details_id")
    private StudentSocioEconomicDetails socioEconomicDetails;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ambition_details_id")
    private StudentAmbitionDetails ambitionDetails;
}
