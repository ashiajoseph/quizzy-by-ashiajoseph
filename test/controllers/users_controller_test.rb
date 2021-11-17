# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = @user.quizzes.create!(title: "Maths")
    post users_path,
      params: { user: { first_name: "Eve", last_name: "Smith", email: "eve@example.com" }, quiz_id: @quiz.id }
    @participant = User.find_by(email: "eve@example.com")
  end

  def test_should_create_valid_participant
    assert_difference "User.count", 1 do
      post users_path,
        params: { user: { first_name: "Oliver", last_name: "Smith", email: "oliver@example.com" }, quiz_id: @quiz.id }
    end
    assert_response :success
  end

  def test_shouldnt_create_invalid_participant
    post users_path,
      params: {
        user: {
          first_name: "", last_name: "Smith", email: "  "
        }, quiz_id: @quiz.id
      }
    assert_response :unprocessable_entity
    assert_includes response.parsed_body["error"], "First name can't be blank", "Email is invalid"
  end

  def test_new_participant_is_eligible_to_attend_quiz
    assert_difference "Attempt.count", 1 do
      post users_path,
        params: { user: { first_name: "Oliver", last_name: "Smith", email: "oliver@example.com" }, quiz_id: @quiz.id }
    end
    assert_response :success
    assert_equal response.parsed_body["eligible"], true
  end

  def test_existing_participant_eligible_to_attend_quiz_if_not_submitted
    post users_path,
      params: {
        user:
                {
                  first_name: "Eve",
                  last_name: "Smith",
                  email: "eve@example.com"
                },
        quiz_id: @quiz.id
      }
    assert_response :success
    assert_equal response.parsed_body["eligible"], true
  end

  def test_existing_participant_ineligible_to_attend_same_quiz_if_submitted
    attempt = @participant.attempts.find_by(quiz_id: @quiz.id)
    attempt.update(submitted: true)
    post users_path,
      params: {
        user:
                {
                  first_name: "Eve",
                  last_name: "Smith",
                  email: "eve@example.com"
                },
        quiz_id: @quiz.id
      }
    assert_response :success
    assert_equal response.parsed_body["eligible"], false
  end

  def test_participant_eligible_to_attend_another_quiz
    attempt = @participant.attempts.find_by(quiz_id: @quiz.id)
    attempt.update(submitted: true)
    quiz2 = @user.quizzes.create!(title: "English")
    post users_path,
      params: {
        user:
                {
                  first_name: "Eve",
                  last_name: "Smith",
                  email: "eve@example.com"
                },
        quiz_id: quiz2.id
      }
    assert_response :success
    assert_equal response.parsed_body["eligible"], true
  end
end
