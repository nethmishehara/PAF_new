package com.example.backend.model.sheha;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "learningplans")
public class LearningPlan {
    @Id
    private String id;
    private String title;
    private String status;
    private String startDate;
    private String endDate;
    private List<Resource> resources;

    @Data
    public static class Resource {
        private String name;
        private boolean checked;
    }
}
