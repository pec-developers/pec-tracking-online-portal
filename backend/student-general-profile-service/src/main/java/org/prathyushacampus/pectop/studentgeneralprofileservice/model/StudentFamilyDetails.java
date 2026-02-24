package org.prathyushacampus.pectop.studentgeneralprofileservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "student_family_details_t")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentFamilyDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "imageUrl", column = @Column(name = "father_image_url")),
        @AttributeOverride(name = "name", column = @Column(name = "father_name")),
        @AttributeOverride(name = "education", column = @Column(name = "father_education")),
        @AttributeOverride(name = "occupation", column = @Column(name = "father_occupation")),
        @AttributeOverride(name = "contactNumber", column = @Column(name = "father_contact_number"))
    })
    private ParentDetails father;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "imageUrl", column = @Column(name = "mother_image_url")),
        @AttributeOverride(name = "name", column = @Column(name = "mother_name")),
        @AttributeOverride(name = "education", column = @Column(name = "mother_education")),
        @AttributeOverride(name = "occupation", column = @Column(name = "mother_occupation")),
        @AttributeOverride(name = "contactNumber", column = @Column(name = "mother_contact_number"))
    })
    private ParentDetails mother;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "family_details_id") // Creates a foreign key in the sibling table
    private List<StudentSibling> siblings;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "name", column = @Column(name = "guardian_name")),
        @AttributeOverride(name = "contactNumber", column = @Column(name = "guardian_contact_number")),
        @AttributeOverride(name = "address", column = @Column(name = "guardian_address"))
    })
    private LocalGuardian localGuardian;
}
