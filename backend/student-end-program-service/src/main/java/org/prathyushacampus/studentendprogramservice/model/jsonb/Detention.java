package org.prathyushacampus.studentendprogramservice.model.jsonb;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Detention {

    @JsonProperty("description")
    private String description;

    @JsonProperty("attachments")
    private List<String> attachments;
}
