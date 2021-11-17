# frozen_string_literal: true

require "test_helper"

class AttemptAnswerTest < ActiveSupport::TestCase
  def setup
    quiz_creator = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    quiz = quiz_creator.quizzes.create!(title: "Maths")
    question = quiz.questions.create!(
      question: "question", options_attributes: [{ content: "opt1", answer: true },
{ content: "opt2", answer: false } ])
    option1 = question.options.first
    option2 = question.options.last
    participant = User.create!(
      first_name: "Eve", last_name: "Smith", email: "eve@example.com", password: "welcome",
      password_confirmation: "welcome")
    @attempt = participant.attempts.create!(quiz_id: quiz.id)
    @participant_answer = @attempt.attempt_answers.new(
      user_selected_option: option1.id, question_id: question.id,
      option_id: option2.id)
  end

  def test_attempt_answer_is_valid
    assert @participant_answer.valid?
  end

  def test_attempt_answer_should_not_be_valid_without_question
    @participant_answer.question = nil
    assert_not @attempt.valid?
  end

  def test_attempt_answer_should_not_be_valid_without_attempt
    @participant_answer.attempt = nil
    assert_not @attempt.valid?
  end

  def test_attempt_answer_should_not_be_valid_without_correct_option
    @participant_answer.option = nil
    assert_not @attempt.valid?
  end
end
