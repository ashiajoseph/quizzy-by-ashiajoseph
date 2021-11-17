# frozen_string_literal: true

require "test_helper"

class AttemptsControllerTest < ActionDispatch::IntegrationTest
  def setup
    user = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = user.quizzes.create!(title: "Maths")
    @question = @quiz.questions.create!(
      question: "question",
      options_attributes: [{ content: "opt1", answer: true }, { content: "opt2", answer: false } ])
    @option1 = @question.options.first
    @option2 = @question.options.last
    @participant = User.create!(
      {
        first_name: "Eve", last_name: "Smith", email: "eve@example.com", password: "welcome",
        password_confirmation: "welcome"
      })
    @attempt = @participant.attempts.create!(quiz_id: @quiz.id)
  end

  def create_attempt_answers_records
    post "/attempts/create_attempt_answers",
      params: {
        attempts: {
          attempt_answers_attributes: [ {
            user_selected_option: @option2.id,
            question_id: @question.id
          }]
        }, id: @attempt.id
      }
  end

  def test_list_question_and_option
    get attempts_path, params: { quizid: @quiz.id }
    assert_response :success
    response_body = response.parsed_body
    assert_equal response_body["questions"].length, @quiz.questions.length
    assert_equal response_body["options"].length, @quiz.questions.length
  end

  def test_should_update_attempt_on_submitting_the_quiz
    put attempt_path(@attempt.id)
    assert_response :success
    assert_equal response.parsed_body["notice"], "Submitted Successfully"
  end

  def test_shouldnt_update_on_giving_invalid_id
    invalid_id = 100
    put attempt_path(invalid_id)
    assert_response :not_found
    assert_equal response.parsed_body["error"], "Attempt not found."
  end

  def test_attempt_answers_created_on_submit
    assert_difference "AttemptAnswer.count", 1 do
      create_attempt_answers_records()
    end
    assert_response :success
  end

  def test_attempt_answers_shouldnt_be_created_without_valid_question_id
    invalid_id = 100
    post "/attempts/create_attempt_answers",
      params: {
        attempts: { attempt_answers_attributes: [ { user_selected_option: @option2.id, question_id: invalid_id }] },
        id: @attempt.id
      }
    assert_response :not_found
    assert_equal response.parsed_body["error"], t("not_found", entity: "Question")
  end

  def test_attempt_answer_retrieval
    create_attempt_answers_records()
    get "/attempts/retrieve_attempt_answers", params: { id: @attempt.id }
    assert_response :success
    assert_equal response.parsed_body["result"].length, @quiz.questions.length
  end

  def test_attempt_answer_not_retrieved_on_invalid_attempt_id
    create_attempt_answers_records()
    get "/attempts/retrieve_attempt_answers", params: { id: 100 }
    assert_response :not_found
    assert_equal response.parsed_body["error"], t("not_found", entity: "Attempt")
  end
end
