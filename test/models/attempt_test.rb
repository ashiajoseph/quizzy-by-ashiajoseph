# frozen_string_literal: true

require "test_helper"

class AttemptTest < ActiveSupport::TestCase
  def setup
    quiz_creator = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    quiz = quiz_creator.quizzes.create!(title: "Maths")
    @participant = User.new(
      first_name: "Eve", last_name: "Smith", email: "eve@example.com", password: "welcome",
      password_confirmation: "welcome")
    @attempt = @participant.attempts.new(quiz_id: quiz.id)
  end

  def test_attempt_is_valid
    assert @attempt.valid?
  end

  def test_submitted_has_default_value_false_initially
    assert_equal @attempt.submitted, false
  end

  def test_attempt_should_not_be_valid_without_quiz
    @attempt.quiz = nil
    assert_not @attempt.valid?
    assert_includes @attempt.errors.full_messages, "Quiz must exist"
  end

  def test_attempt_should_not_be_valid_without_participant
    @attempt.user = nil
    assert_not @attempt.valid?
    assert_includes @attempt.errors.full_messages, "User must exist"
  end

  def test_correct_answers_count_has_default_value_0_initially
    assert_equal @attempt.correct_answers_count, 0
  end

  def test_incorrect_answers_count_has_default_value_0_initially
    assert_equal @attempt.incorrect_answers_count, 0
  end
end
