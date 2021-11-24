# frozen_string_literal: true

require "test_helper"

class QuestionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    user = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = user.quizzes.create!(title: "Maths")
    @question = @quiz.questions.create!(
      question: "question",
      options_attributes: [{ content: "opt1", answer: true }, { content: "opt2", answer: false } ])
    @user_header = headers(user)
  end

  def test_should_create_valid_question__and_options
    post questions_path,
      params: {
        quiz_id: @quiz.id,
        mcq: {
          question: "question",
          options_attributes: [
             { content: "opt1", answer: true },
              { content: "opt2", answer: false } ]
        }
      }, headers: @user_header
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_added", operation: "added")
  end

  def test_shouldnt_create_question_without_content
    post questions_path,
      params: {
        quiz_id: @quiz.id,
        mcq: {
          question: "",
          options_attributes: [
            { content: "opt1", answer: true },
             { content: "opt2", answer: false } ]
        }
      }, headers: @user_header
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Question can't be blank"
  end

  def test_shouldnt_create_question_without_options
    post questions_path,
      params: {
        quiz_id: @quiz.id,
        mcq: {
          question: "question",
          options_attributes: [ ]
        }
      }, headers: @user_header
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_includes response_json["error"], "Options count should be between 2 and 4"
  end

  def test_shouldnt_create_question_without_required_number_of_options
    post questions_path,
      params: {
        quiz_id: @quiz.id,
        mcq:
            {
              question: "question",
              options_attributes: [
               { content: "opt1", answer: true } ]
            }
      }, headers: @user_header
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_includes response_json["error"], "Options count should be between 2 and 4"
  end

  def test_only_one_option_should_be_correct_answer
    post questions_path,
      params: {
        quiz_id: @quiz.id,
        mcq: {
          question: "question",
          options_attributes: [
               { content: "opt1", answer: true },
                { content: "opt2", answer: true } ]
        }
      }, headers: @user_header
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_includes response_json["error"], "Options : Only one option must be correct"
  end

  def test_should_update_question_content
    question2 = "another question"
    questions_params = { quiz_id: @quiz.id, mcq: { question: question2 } }
    put question_path(@quiz.id), params: questions_params, headers: @user_header
    assert_response :success
    @question.reload
    assert_equal @question.question, question2
  end

  def test_shouldnt_update_without_question_content
    questions_params = { quiz_id: @quiz.id, mcq: { question: "" } }
    put question_path(@quiz.id), params: questions_params, headers: @user_header
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Question can't be blank"
  end

  def test_should_destroy_question
    assert_difference "Question.count", -1 do
      delete question_path(@question.id), params: { quiz_id: @quiz.id }, headers: @user_header
    end
    assert_response :success
  end

  def test_destroying_question_will_also_destroy_its_options
    assert_difference "Option.count", -2 do
      delete question_path(@question.id), params: { quiz_id: @quiz.id }, headers: @user_header
    end
    assert_response :success
  end

  def test_not_found_error_raised_for_invalid_question_id
    invalid_id = 100
    get question_path(invalid_id), params: { quiz_id: @quiz.id }, headers: @user_header
    assert_response :not_found
    assert_equal response.parsed_body["error"], t("not_found", entity: "Question")
  end

  def test_not_found_error_raised_for_invalid_quiz_id
    invalid_id = 100
    post questions_path,
      params: {
        quiz_id: invalid_id,
        mcq:
        {
          question: "question",
          options_attributes: [
            { content: "opt1", answer: true },
            { content: "opt2", answer: false } ]
        }
      }, headers: @user_header
    assert_response :not_found
    assert_equal response.parsed_body["error"], t("not_found", entity: "Quiz")
  end
end
