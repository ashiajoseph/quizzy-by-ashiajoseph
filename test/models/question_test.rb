# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = user.quizzes.new(title: "Maths")
    @question = @quiz.questions.new(
      question: "question",
      options_attributes: [{ content: "opt1", answer: true }, { content: "opt2", answer: false } ])
  end

  def test_question_should_be_valid
    assert @question.valid?
  end

  def test_question_title_should_be_present
    @question.question = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Question can't be blank"
  end

  def test_question_should_not_be_valid_without_quiz
    @question.quiz = nil
    assert @question.invalid?
    assert_includes @question.errors.full_messages, "Quiz must exist"
  end

  def test_question_should_have_valid_no_of_options
    question = @quiz.questions.new(question: "question2", options_attributes: [{ content: "opt1", answer: true }])
    assert_not question.valid?
    assert_includes question.errors.full_messages, "Options count should be between 2 and 4"
  end

  def test_only_one_among_the_options_belonging_to_a_question_should_be_the_correct_answer
    question = @quiz.questions.new(
      question: "question2",
      options_attributes: [{ content: "opt1", answer: true }, { content: "opt2", answer: true }])
    assert_not question.valid?
    assert_includes question.errors.full_messages, "Options : Only one option must be correct"
  end
end
