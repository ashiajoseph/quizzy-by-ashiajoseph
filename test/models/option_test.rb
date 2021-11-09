# frozen_string_literal: true

require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    quiz = user.quizzes.new(title: "Maths")
    @question = quiz.questions.new(question: "question")
    @option1 = @question.options.new(content: "option1", answer: false)
    @option2 = @question.options.new(content: "option2", answer: true)
  end

  def test_option_content_should_be_present
    @option1.content = ""
    assert_not @option1.valid?
  end

  def test_option_should_have_valid_question
    @option1.question = nil
    assert_not @option1.valid?
  end

  def test_only_one_among_the_options_belonging_to_a_question_should_be_the_correct_answer
    selected = @question.options.select { |option| option.answer == true }
    assert_equal selected.length, 1
  end

  def test_question_has_between_two_to_four_options
    no_of_options = @question.options.length
    assert_includes 2..4, no_of_options
  end
end
