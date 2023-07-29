package bhatt.aayush.Dashboard_survey.surveyComponents;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SurveyDataRepository extends MongoRepository<SurveyDataModel, String>{

}
