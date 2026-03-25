package org.prathyushacampus.studentendprogramservice.model.jsonb;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MiniProject {

    @JsonProperty("year")
    private Integer year;

    @JsonProperty("semester")
    private Integer semester;

    @JsonProperty("title")
    private String title;

    @JsonProperty("guide")
    private UUID guide;

    @JsonProperty("guide_name")
    private String guideName;

    @JsonProperty("presentation_outside")
    private String presentationOutside;

    @JsonProperty("recognition_received")
    private String recognitionReceived;

    @JsonProperty("institutional_support")
    private String institutionalSupport;
}
