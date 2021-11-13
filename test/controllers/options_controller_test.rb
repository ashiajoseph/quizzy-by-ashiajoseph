# frozen_string_literal: true

require "test_helper"

class OptionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    user = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    quiz = user.quizzes.create!(title: "Maths")
    @question = quiz.questions.create!(
      question: "question",
      options_attributes: [{ content: "opt1", answer: true }, { content: "opt2", answer: false } ])
  end

  def test_should_create_valid_options
    post options_path,
      params: {
        option: {
          question_id: @question.id,
          list: [ { content: "option1", answer: false }, { content: "option2", answer: true }]
        }
      }, headers: @user_header
    assert_response :success
  end

  def test_shouldnt_save_inavlid_options
    post options_path,
      params: {
        option: {
          question_id: @question.id,
          list: [ { content: "", answer: false }, {
            content: "option2", answer: true
          } ]
        }
      }, headers: @user_header
    assert_response :unprocessable_entity
    assert_equal response.parsed_body["error"], "Content can't be blank"
  end

  def test_not_found_error_raised_for_invalid_question_id
    invalid_id = 100
    post options_path,
      params: {
        option: {
          question_id: invalid_id,
          list: [ { content: "option1", answer: false }, { content: "option2", answer: true }]
        }
      }, headers: @user_header
    assert_response :not_found
    assert_equal response.parsed_body["error"], t("not_found", entity: "Question")
  end
end
