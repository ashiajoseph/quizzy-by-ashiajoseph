# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    quiz = user.quizzes.new(title: "Maths")
    @question = quiz.questions.new(question: "question")
  end

  def test_question_should_be_valid
    assert @question.valid?
  end

  def test_question_title_should_be_present
    @question.question = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Question can't be blank"
  end

  def test_question_title_should_not_exceed_maximum_length
    @question.question = "q" * 151
    assert_not @question.valid?
  end

  def test_question_should_not_be_valid_without_quiz
    @question.quiz = nil
    assert @question.invalid?
  end
end
