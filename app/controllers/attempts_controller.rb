# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :load_attempt, except: :index
  def index
    quiz = Quiz.find_by(id: params[:quizid])
    @questions = quiz.questions
    @options = []
    @questions.each do |question|
      array = []
      question.options.each do |option|
        id, content = option.values_at(:id, :content)
        filtered_option = {
          id: id, content: content
        }
        array.push(filtered_option)
      end
      @options.push(array)
    end
  end

  def update
    unless @attempt.update({ submitted: true })
      render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages.to_sentence }
    end
  end

  def create_attempt_answers
    participantAnswerList = []
    quiz_question_params[:attempt_answers_attributes].each do |answer|
      option = Question.find_by(id: answer[:question_id]).options.find_by(answer: true)
      merged_answer = answer.merge(option_id: option[:id])
      participantAnswerList << merged_answer
    end

    unless @attempt.update({ attempt_answers_attributes: participantAnswerList })
      render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages.to_sentence }
    end
  end

  #   def retrieve_attempt_answers
  #     @correct = @attempt.attempt_answers.select { |qa|  qa.answer.to_i == qa.option_id }.size
  #     @incorrect = @attempt.attempt_answers.size - @correct
  #     res = @attempt.attempt_answers.map { |res| {"#{res.question_id}": {answer: res.answer.to_i, option_id: res.option_id}} }
  #     @result = res.inject(:merge!)
  #   end

  private

    def quiz_question_params
      params.require(:attempts).permit(attempt_answers_attributes: [:question_id, :answer])
    end

    def load_attempt
      @attempt = Attempt.find_by(id: params[:id])
      unless @attempt
        render status: :not_found, json: { error: t("not_found", entity: "Attempt") }
      end
    end
end
