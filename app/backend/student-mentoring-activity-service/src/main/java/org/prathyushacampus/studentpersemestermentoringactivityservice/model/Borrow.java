package org.prathyushacampus.studentpersemestermentoringactivityservice.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Borrow {

    @ElementCollection
    @CollectionTable(name = "mentoring_library_subject_books", joinColumns = @JoinColumn(name = "mentoring_activity_id"))
    @Column(name = "book_name")
    private List<String> subjectBooks;

    @ElementCollection
    @CollectionTable(name = "mentoring_library_other_books", joinColumns = @JoinColumn(name = "mentoring_activity_id"))
    @Column(name = "book_name")
    private List<String> otherBooks;

    @ElementCollection
    @CollectionTable(name = "mentoring_library_referred_subject_books", joinColumns = @JoinColumn(name = "mentoring_activity_id"))
    @Column(name = "book_name")
    private List<String> referredSubjectBooks;

    @Column(name = "other_library", columnDefinition = "TEXT")
    private String otherLibrary;
}
